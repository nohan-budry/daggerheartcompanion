import type {LayoutLoad} from "../../../.svelte-kit/types/src/routes/classes/$types";

import rawItems from '$lib/data/items.json';
import type Item from "$lib/models/Item";

function filterItems(items: Item[], type: string, tier: number): Item[] {
    return items.filter((item) => item.type === type && item.tier === tier);
}

export const load: LayoutLoad = () => {
    let items: Item[] = rawItems;

    let primaryWeapons: {tier1: Item[], [k: string]: Item[]} = {
        tier1: filterItems(items, "Primary Weapon", 1)
    }

    let secondaryWeapons: {tier1: Item[], [k: string]: Item[]} = {
        tier1: filterItems(items, "Secondary Weapon", 1)
    }

    let armors: {tier1: Item[], [k: string]: Item[]} = {
        tier1: filterItems(items, "Armor", 1)
    }

    return {primaryWeapons, secondaryWeapons, armors};
}