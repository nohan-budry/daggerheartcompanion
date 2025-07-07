import type {LayoutLoad} from "../../../.svelte-kit/types/src/routes/classes/$types";

import rawDomains from '$lib/data/domains.json';
import type Domain from "$lib/models/Domain";

export const load: LayoutLoad = () => {
    let domains: Domain[] = rawDomains;
    return {domains};
}