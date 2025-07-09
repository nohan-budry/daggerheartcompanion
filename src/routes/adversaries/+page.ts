import type {LayoutLoad} from "../../../.svelte-kit/types/src/routes/classes/$types";
import type {Adversary} from "$lib/models/Adversary";
import rawAdversaries from '$lib/data/adversaries.json';

export const load: LayoutLoad = () => {
    let adversaries: Adversary[] = rawAdversaries;

    return {adversaries};
}