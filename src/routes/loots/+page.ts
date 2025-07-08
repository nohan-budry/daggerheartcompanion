import type {LayoutLoad} from "../../../.svelte-kit/types/src/routes/classes/$types";
import type Loot from "$lib/models/Loot";
import rawReusables from '$lib/data/loots/reusables.json';
import rawConsumables from '$lib/data/loots/consumables.json';

export const load: LayoutLoad = () => {
    let reusables: Loot[] = rawReusables;
    let consumables: Loot[] = rawConsumables;

    return {reusables, consumables};
}