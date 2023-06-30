<script lang="ts">
	let price: number | undefined = undefined;
	let discount: number | undefined = undefined;
	let tax: number | undefined = undefined;
	let finalPrice: string = '0';

	const allowedDiscounts = [10, 15, 20, 25, 30];
	const allowedTaxes = [5, 7, 7.5, 10];

	function calculateDiscount(opts?: { inputDiscount?: number; inputTax?: number }) {
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

<div class="flex flex-col justify-center items-center h-screen container md:w-96 m-auto p-4">
	<div class="bg-white shadow-md h-40 w-full rounded grid p-2 overflow-hidden relative">
		<span class="text-amber-700 absolute right-2 top-2">Final Price</span>
		<span
			class="w-full text-gray-500 font-bold text-6xl self-end justify-self-end overflow-auto flex text-right gap-2 items-center"
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
			class="w-full px-2 py-4 rounded appearance-none shadow"
			min="0"
		/>
	</div>

	<div class="mt-4 shadow w-full">
		<div class="bg-white w-full text-amber-700 rounded-t border pl-2">Discount %:</div>
		<div class="inline-flex">
			{#each allowedDiscounts as allowedDiscount, i}
				<button
					class="bg-white shadow font-bold px-2 py-4 {i === 0 && 'rounded-bl'} {discount ===
						allowedDiscount && 'bg-gray-300'}"
					on:click={() => calculateDiscount({ inputDiscount: allowedDiscount })}
					>{allowedDiscount}%</button
				>
			{/each}
			<div>
				<label for="discount" class="sr-only">Discount %</label>
				<input
					type="number"
					id="discount"
					bind:value={discount}
					on:input={() => calculateDiscount()}
					placeholder="%"
					class="w-full px-2 py-4 rounded-br appearance-none shadow"
					min="0"
				/>
			</div>
		</div>
	</div>

	<div class="mt-4 shadow w-full">
		<div class="bg-white w-full text-amber-700 rounded-t border pl-2">Tax %:</div>
		<div class="inline-flex w-full">
			{#each allowedTaxes as allowedTax, i}
				<button
					class="bg-white shadow font-bold px-2 py-4 {i === 0 && 'rounded-bl'} {tax ===
						allowedTax && 'bg-gray-300'}"
					on:click={() => calculateDiscount({ inputTax: allowedTax })}>{allowedTax}%</button
				>
			{/each}
			<div>
				<label for="tax" class="sr-only">Tax %</label>
				<input
					type="number"
					id="tax"
					bind:value={tax}
					on:input={() => calculateDiscount()}
					placeholder="%"
					class="w-full px-2 py-4 rounded-br appearance-none shadow"
					min="0"
				/>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		@apply appearance-none;
	}
</style>
