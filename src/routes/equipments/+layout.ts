import equipments from "$lib/data/equipments.json";
import type Equipment from "$lib/models/Equipment";
import type {LayoutLoad} from './$types';

export const load: LayoutLoad = () => {
    return {equipments: equipments as Equipment[]};
}