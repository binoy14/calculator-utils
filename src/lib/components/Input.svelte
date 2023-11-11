<script lang="ts">
  import CloseIcon from './CloseIcon.svelte';

  export let name: string;
  export let label: string;
  export let input: HTMLInputElement | undefined;
  export let value: number | undefined;
</script>

<div class="mt-4 inline-flex w-full">
  <label for={name} class="sr-only">{label}</label>
  <input
    placeholder={label}
    type="number"
    id={name}
    bind:this={input}
    bind:value
    on:input
    class="w-full appearance-none rounded-l px-2 py-4 shadow"
    min="0"
  />
  <button class="rounded-r bg-white px-2" on:click>
    <CloseIcon />
  </button>
</div>
