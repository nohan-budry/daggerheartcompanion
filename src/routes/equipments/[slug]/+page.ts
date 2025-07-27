import type {PageLoad} from './$types';
import {slugify} from "$lib/utils/slugify";import type {EntryGenerator} from "./$types";
import rawEquipments from '$lib/data/equipments.json';
import type Equipment from "$lib/models/Equipment";
import {error} from "@sveltejs/kit";

export const entries: EntryGenerator = async () => {
    return [...new Set(
        (rawEquipments as Equipment[]).map(({type}) => ({slug: slugify(type)}))
    )];
}

export const load: PageLoad = async ({parent, params}) => {
    let {equipments} = await parent();

    let filteredEquipments = equipments.filter(item => slugify(item.type) === params.slug);
    if (filteredEquipments.length === 0) {
        error(404, 'Not found');
    }

    let filteredEquipmentsByTier = [
        filteredEquipments.filter(item => item.tier === 1),
        filteredEquipments.filter(item => item.tier === 2),
        filteredEquipments.filter(item => item.tier === 3),
        filteredEquipments.filter(item => item.tier === 4),
    ];

    return {equipments: filteredEquipmentsByTier};
}
