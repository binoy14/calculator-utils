<script lang="ts">
	import type { HandleCalculationOptions } from './types';

	export let items: number[];
	export let type: 'inputTax' | 'inputDiscount';
	export let originalValue: number | undefined;
	export let handleCalculation: (opts?: HandleCalculationOptions) => void;
	export let title: string;
</script>

<div class="mt-4 w-full shadow">
	<div class="w-full rounded-t border bg-white pl-2 text-amber-700">{title}:</div>
	<div class="inline-flex w-full">
		{#each items as item, i}
			<button
				class="bg-white px-2 py-4 font-bold shadow {i === 0 && 'rounded-bl'} {originalValue ===
					item && 'bg-gray-300'}"
				on:click={() => handleCalculation({ [type]: item })}>{item}%</button
			>
		{/each}
		<div>
			<label for={type} class="sr-only">{title}</label>
			<input
				type="number"
				id={type}
				bind:value={originalValue}
				on:input={() => handleCalculation()}
				placeholder="%"
				class="w-full appearance-none rounded-br px-2 py-4 shadow"
				min="0"
			/>
		</div>
	</div>
</div>

<style lang="postcss">
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		@apply appearance-none;
	}
</style>
