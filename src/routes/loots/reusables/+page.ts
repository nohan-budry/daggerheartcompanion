import type {PageLoad} from './$types';
import type Loot from "$lib/models/Loot";
import rawReusables from '$lib/data/loots/reusables.json';

export const load: PageLoad = async () => {
    return {reusables: rawReusables as Loot[]};
}
