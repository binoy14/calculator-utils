<script lang="ts">
  import { onMount } from 'svelte';
  import ButtonInput from '../components/ButtonInput.svelte';
  import CloseIcon from '../components/CloseIcon.svelte';
  import PriceDisplay from '../components/PriceDisplay.svelte';

  let priceInput: HTMLInputElement;

  let price: number | undefined = undefined;
  let tip: number | undefined = undefined;
  let tipAmount: number | undefined = 0;
  let finalPrice: number | undefined = 0;

  let allowedTips = [15, 20, 25];

  function handleClear() {
    price = undefined;
    finalPrice = 0;
  }

  function calculateTip() {
    let totalPrice = price;

    if (typeof totalPrice !== 'number') {
      finalPrice = 0;
      return;
    }

    if (tip !== undefined) {
      tipAmount = (totalPrice * tip) / 100;
      totalPrice = totalPrice + tipAmount;
    }

    finalPrice = totalPrice ?? 0;
  }

  function handleReset() {
    price = undefined;
    tip = undefined;
    tipAmount = 0;
    finalPrice = 0;

    priceInput.focus();
  }

  onMount(() => {
    priceInput.focus();
  });
</script>

<div class="container m-auto flex h-screen flex-col items-center p-4 md:w-96">
  <h1 class="mb-4 text-xl font-bold text-white">Tip Calculator</h1>

  <div class="inline-flex w-full">
    <label for="price" class="sr-only">Price:</label>
    <input
      placeholder="Price"
      type="number"
      id="price"
      bind:this={priceInput}
      bind:value={price}
      on:input={calculateTip}
      class="w-full appearance-none rounded-l px-2 py-4 shadow"
      min="0"
    />
    <button class="rounded-r bg-white px-2" on:click={handleClear}>
      <CloseIcon />
    </button>
  </div>

  <ButtonInput
    items={allowedTips}
    label="tip"
    title="Tip %"
    bind:value={tip}
    on:inputChange={(e) => {
      tip = e.detail;
      calculateTip();
    }}
  />

  <PriceDisplay finalPrice={tipAmount} title="Tip Amount" />

  <PriceDisplay {finalPrice} />

  <button
    on:click={handleReset}
    class="mt-4 w-full rounded border border-red-400 bg-white px-4 py-2 font-bold text-red-600 shadow">Reset</button
  >
</div>
