import type {PageLoad} from './$types';
import {slugify} from "$lib/utils/slugify";

export const load: PageLoad = async ({parent, params}) => {
    let {equipments} = await parent();

    let filteredEquipments = equipments.filter(item => slugify(item.type) === params.slug);
    let filteredEquipmentsByTier = [
        filteredEquipments.filter(item => item.tier === 1),
        filteredEquipments.filter(item => item.tier === 2),
        filteredEquipments.filter(item => item.tier === 3),
        filteredEquipments.filter(item => item.tier === 4),
    ];

    return {equipments: filteredEquipmentsByTier};
}
