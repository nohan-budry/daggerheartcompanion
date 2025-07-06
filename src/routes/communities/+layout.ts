import type {LayoutLoad} from "../../../.svelte-kit/types/src/routes/classes/$types";
import type Community from "$lib/models/Community";

import rawCommunities from "$lib/data/communites.json";


export const load: LayoutLoad = () => {
    let communities: Community[] = rawCommunities;
    return {communities};
}