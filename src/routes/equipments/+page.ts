import type {LayoutLoad} from "../../../.svelte-kit/types/src/routes/classes/$types";

import rawEquipments from '$lib/data/equipments.json';
import type Equipment from "$lib/models/Equipment";

function filterEquipments(equipments: Equipment[], type: string, tier: number): Equipment[] {
    return equipments.filter((item) => item.type === type && item.tier === tier);
}

export const load: LayoutLoad = () => {
    let equipments: Equipment[] = rawEquipments;

    let primaryWeapons: {tier1: Equipment[], [k: string]: Equipment[]} = {
        tier1: filterEquipments(equipments, "Primary Weapon", 1)
    }

    let secondaryWeapons: {tier1: Equipment[], [k: string]: Equipment[]} = {
        tier1: filterEquipments(equipments, "Secondary Weapon", 1)
    }

    let armors: {tier1: Equipment[], [k: string]: Equipment[]} = {
        tier1: filterEquipments(equipments, "Armor", 1)
    }

    return {primaryWeapons, secondaryWeapons, armors};
}