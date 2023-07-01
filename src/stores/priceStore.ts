import { writable } from 'svelte/store';

export const finalPriceStore = writable(0);
export const taxStore = writable<number | undefined>();
export const discountStore = writable<number | undefined>();
