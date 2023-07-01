<script lang="ts">
  import { onMount } from 'svelte';
  import ButtonInput from '../components/ButtonInput.svelte';
  import { discountStore, finalPriceStore, taxStore } from '../stores/priceStore';

  let price: number | undefined = undefined;
  let discount: number | undefined = undefined;
  let tax: number | undefined = undefined;
  let finalPrice = 0;

  let priceInput: HTMLInputElement;

  const allowedDiscounts = [10, 15, 20, 25, 30];
  const allowedTaxes = [5, 7, 7.5, 10];

  finalPriceStore.subscribe((val) => {
    finalPrice = val;
  });

  discountStore.subscribe((val) => {
    discount = val;
    calculateDiscount();
  });

  taxStore.subscribe((val) => {
    tax = val;
    calculateDiscount();
  });

  function calculateDiscount() {
    let totalPrice = price;

    if (typeof totalPrice !== 'number') {
      return finalPriceStore.set(0);
    }

    if (discount !== undefined) {
      totalPrice = totalPrice - (totalPrice * discount) / 100;
    }

    if (tax !== undefined) {
      totalPrice = totalPrice + (totalPrice * tax) / 100;
    }

    finalPriceStore.set(totalPrice ?? 0);
  }

  function handleReset() {
    price = undefined;
    discount = undefined;
    tax = undefined;
    finalPriceStore.set(0);
  }

  onMount(() => {
    priceInput.focus();
  });
</script>

<div class="container m-auto flex h-screen flex-col items-center p-4 md:w-96">
  <div class="relative grid h-40 min-h-[10rem] w-full overflow-hidden rounded bg-white p-2 shadow-md">
    <span class="absolute right-2 top-2 text-amber-700">Final Price</span>
    <span
      class="flex w-full items-center gap-2 self-end justify-self-end overflow-x-auto overflow-y-hidden text-right text-6xl font-bold text-gray-500"
    >
      <span class="text-3xl font-normal">$</span>
      <span class="flex-1">{finalPrice.toFixed(2)}</span>
    </span>
  </div>

  <div class="mt-4 w-full">
    <label for="price" class="sr-only">Price:</label>
    <input
      placeholder="Price"
      type="number"
      id="price"
      bind:this={priceInput}
      bind:value={price}
      on:input={calculateDiscount}
      class="w-full appearance-none rounded px-2 py-4 shadow"
      min="0"
    />
  </div>

  <ButtonInput
    items={allowedDiscounts}
    label="discount"
    title="Discount %"
    bind:value={discount}
    on:inputChange={(e) => discountStore.set(e.detail)}
  />

  <ButtonInput
    items={allowedTaxes}
    label="tax"
    title="Tax %"
    bind:value={tax}
    on:inputChange={(e) => taxStore.set(e.detail)}
  />

  <button
    on:click={handleReset}
    class="mt-4 w-full rounded border border-red-400 bg-white px-4 py-2 font-bold text-red-600 shadow">Reset</button
  >
</div>
