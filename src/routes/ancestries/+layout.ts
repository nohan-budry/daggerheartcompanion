import type {LayoutLoad} from "../../../.svelte-kit/types/src/routes/classes/$types";
import type Ancestry from "$lib/models/Ancestry";

import rawAncestries from '$lib/data/ancestries.json';

export const load: LayoutLoad = () => {
    let ancestries: Ancestry[] = rawAncestries;
    return {ancestries};
}