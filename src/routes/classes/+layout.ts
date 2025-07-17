import type {LayoutLoad} from "./$types";
import type {ClassData} from "$lib/models/ClassData";

import rawClassesData from '$lib/data/classes.json';

export const load: LayoutLoad = () => {
    return {classesData: rawClassesData as ClassData[]};
}