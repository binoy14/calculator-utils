import { writable } from 'svelte/store';

export const taxStore = writable<number | undefined>();
export const discountStore = writable<number | undefined>();
