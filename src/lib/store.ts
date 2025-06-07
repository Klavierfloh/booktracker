import { writable } from 'svelte/store';

export const highestBookId = writable<number>(0);
