<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import CloseIcon from './CloseIcon.svelte';

  const dispatch = createEventDispatcher();

  export let items: number[];
  export let label: string;
  export let value: number | undefined;
  export let title: string;

  let handleCalculation = (val?: number) => {
    dispatch('inputChange', val);
  };

  $: {
    handleCalculation(value);
  }

  function handleClear() {
    handleCalculation(undefined);
  }
</script>

<div class="mt-4 w-full shadow">
  <div class="w-full rounded-t border bg-white pl-2 text-amber-700">{title}:</div>
  <div class="inline-flex w-full">
    {#each items as item, i}
      <button
        class="bg-white px-2 py-4 font-bold shadow"
        class:first-item={i === 0}
        class:active={value === item}
        on:click={() => handleCalculation(item)}>{item}%</button
      >
    {/each}
    <div class="inline-flex rounded-br shadow">
      <label for={label} class="sr-only">{title}</label>
      <input type="number" id={label} bind:value placeholder="%" class="w-full appearance-none px-2 py-4" min="0" />
      <button class="bg-white px-2" on:click={handleClear}>
        <CloseIcon />
      </button>
    </div>
  </div>
</div>

<style lang="postcss">
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    @apply appearance-none;
  }

  .first-item {
    @apply rounded-bl;
  }

  .active {
    @apply bg-gray-200;
  }
</style>
