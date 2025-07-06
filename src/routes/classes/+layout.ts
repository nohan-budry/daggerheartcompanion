import type {LayoutLoad} from "../../../.svelte-kit/types/src/routes/classes/$types";
import type {ClassData} from "$lib/models/ClassData";

import rawClassesData from '$lib/data/classes.json';

export const load: LayoutLoad = () => {
    let classesData: ClassData[] = rawClassesData;
    return {classesData};
}