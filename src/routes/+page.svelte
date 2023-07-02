<script lang="ts">
  import { onMount } from 'svelte';
  import ButtonInput from '../components/ButtonInput.svelte';
  import { discountStore, finalPriceStore, taxStore } from '../stores/priceStore';
  import CloseIcon from '../components/CloseIcon.svelte';
  import PriceDisplay from '../components/PriceDisplay.svelte';

  let price: number | undefined = undefined;
  let discount: number | undefined = undefined;
  let tax: number | undefined = undefined;

  let priceInput: HTMLInputElement;

  const allowedDiscounts = [10, 15, 20, 25, 30];
  const allowedTaxes = [5, 7, 7.5, 10];

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

    priceInput.focus();
  }

  function handleClear() {
    price = undefined;
    finalPriceStore.set(0);
  }

  onMount(() => {
    priceInput.focus();
  });
</script>

<div class="container m-auto flex h-screen flex-col items-center p-4 md:w-96">
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

  <PriceDisplay />

  <button
    on:click={handleReset}
    class="mt-4 w-full rounded border border-red-400 bg-white px-4 py-2 font-bold text-red-600 shadow">Reset</button
  >
</div>
