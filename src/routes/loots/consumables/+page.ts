import type {PageLoad} from './$types';
import rawConsumables from '$lib/data/loots/consumables.json'
import type Loot from "$lib/models/Loot";

export const load: PageLoad = async () => {
    return {consumables: rawConsumables as Loot[]};
}
