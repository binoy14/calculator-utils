<script lang="ts">
  import { onMount } from 'svelte';
  import ButtonInput from '../../lib/components/ButtonInput.svelte';
  import CloseIcon from '../../lib/components/CloseIcon.svelte';
  import PriceDisplay from '../../lib/components/PriceDisplay.svelte';

  let price: number | undefined = undefined;
  let discount: number | undefined = undefined;
  let tax: number | undefined = undefined;
  let finalPrice: number | undefined = 0;

  let priceInput: HTMLInputElement;

  const allowedDiscounts = [10, 15, 20, 25, 30];
  const allowedTaxes = [5, 7, 7.25, 10];

  function calculateDiscount() {
    let totalPrice = price;

    if (typeof totalPrice !== 'number') {
      finalPrice = 0;
      return;
    }

    if (discount !== undefined) {
      totalPrice = totalPrice - (totalPrice * discount) / 100;
    }

    if (tax !== undefined) {
      totalPrice = totalPrice + (totalPrice * tax) / 100;
    }

    finalPrice = totalPrice ?? 0;
  }

  function handleReset() {
    price = undefined;
    discount = undefined;
    tax = undefined;
    finalPrice = 0;

    priceInput.focus();
  }

  function handleClear() {
    price = undefined;
    finalPrice = 0;
  }

  onMount(() => {
    priceInput.focus();
  });
</script>

<h1 class="mb-4 text-xl font-bold text-white">Discount Calculator</h1>

<div class="inline-flex w-full">
  <label for="price" class="sr-only">Price:</label>
  <input
    placeholder="Price"
    type="number"
    id="price"
    bind:this={priceInput}
    bind:value={price}
    on:input={calculateDiscount}
    class="w-full appearance-none rounded-l px-2 py-4 shadow"
    min="0"
  />
  <button class="rounded-r bg-white px-2" on:click={handleClear}>
    <CloseIcon />
  </button>
</div>

<ButtonInput
  items={allowedDiscounts}
  label="discount"
  title="Discount %"
  placeholder="%"
  bind:value={discount}
  on:inputChange={(e) => {
    discount = e.detail;
    calculateDiscount();
  }}
/>

<ButtonInput
  items={allowedTaxes}
  label="tax"
  title="Tax %"
  placeholder="%"
  bind:value={tax}
  on:inputChange={(e) => {
    tax = e.detail;
    calculateDiscount();
  }}
/>

<PriceDisplay {finalPrice} />

<button
  on:click={handleReset}
  class="mt-4 w-full rounded border border-red-400 bg-white px-4 py-2 font-bold text-red-600 shadow"
  >Reset</button
>
