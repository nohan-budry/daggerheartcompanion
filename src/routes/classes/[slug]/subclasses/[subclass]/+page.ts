import {error} from "@sveltejs/kit";
import {slugify} from "$lib/utils/slugify";
import type {EntryGenerator} from "./$types";
import rawClasses from '$lib/data/classes.json';
import type ClassData from "$lib/models/ClassData";

export const entries: EntryGenerator = async () => {
    return (rawClasses as ClassData[])
        .flatMap(({name, subclasses}) => subclasses.map(
            (subclass) => ({slug: slugify(name), subclass: slugify(subclass.name)})
        ));
}

export const load = async ({parent, params}) => {
    let {classData} = await parent();

    let subclass = classData.subclasses
        .find(({name}) => slugify(name) === params.subclass);

    if (subclass) {
        return {subclass};
    }

    error(404, `Subclass ${params.subclass} not found`);
}