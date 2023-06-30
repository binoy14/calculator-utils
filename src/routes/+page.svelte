<script lang="ts">
  import ButtonInput from '../components/ButtonInput.svelte';
  import type { HandleCalculationOptions } from '../components/types';

  let price: number | undefined = undefined;
  let discount: number | undefined = undefined;
  let tax: number | undefined = undefined;
  let finalPrice: string = '0';

  const allowedDiscounts = [10, 15, 20, 25, 30];
  const allowedTaxes = [5, 7, 7.5, 10];

  function calculateDiscount(opts?: HandleCalculationOptions) {
    const { inputDiscount, inputTax } = opts ?? {};

    if (inputDiscount !== undefined) {
      discount = inputDiscount;
    }

    if (inputTax !== undefined) {
      tax = inputTax;
    }

    let totalPrice = price;

    if (typeof totalPrice === 'number' && discount !== undefined) {
      totalPrice = totalPrice - (totalPrice * discount) / 100;
    }

    if (typeof totalPrice === 'number' && tax !== undefined) {
      totalPrice = totalPrice + (totalPrice * tax) / 100;
    }

    finalPrice = typeof totalPrice === 'number' ? totalPrice.toFixed(2) : '0';
  }
</script>

<div class="container m-auto flex h-screen flex-col items-center p-4 md:w-96">
  <div class="relative grid h-40 w-full overflow-hidden rounded bg-white p-2 shadow-md">
    <span class="absolute right-2 top-2 text-amber-700">Final Price</span>
    <span
      class="flex w-full items-center gap-2 self-end justify-self-end overflow-x-auto overflow-y-hidden text-right text-6xl font-bold text-gray-500"
    >
      <span class="text-3xl font-normal">$</span>
      <span class="flex-1">{finalPrice}</span>
    </span>
  </div>

  <div class="mt-4 w-full">
    <label for="price" class="sr-only">Price:</label>
    <input
      placeholder="Price"
      type="number"
      id="price"
      bind:value={price}
      on:input={() => calculateDiscount()}
      class="w-full appearance-none rounded px-2 py-4 shadow"
      min="0"
    />
  </div>

  <ButtonInput
    items={allowedDiscounts}
    type="inputDiscount"
    originalValue={discount}
    handleCalculation={calculateDiscount}
    title="Discount %"
  />

  <ButtonInput
    items={allowedTaxes}
    type="inputTax"
    originalValue={tax}
    handleCalculation={calculateDiscount}
    title="Tax %"
  />
</div>
