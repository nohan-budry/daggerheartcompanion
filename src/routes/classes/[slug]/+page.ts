import type {EntryGenerator} from "./$types";
import rawClasses from '$lib/data/classes.json';
import type {ClassData} from "$lib/models/ClassData";
import {slugify} from "$lib/utils/slugify";

export const entries: EntryGenerator = async () => {
    return (rawClasses as ClassData[])
        .map(({name}) => ({slug: slugify(name)}));
}