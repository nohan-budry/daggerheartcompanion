import {error} from '@sveltejs/kit';
import type {EntryGenerator, PageLoad} from './$types';
import {slugify} from "$lib/utils/slugify";
import rawAncestries from '$lib/data/ancestries.json';
import type Ancestry from "$lib/models/Ancestry";

export const entries: EntryGenerator = async () => {
    return (rawAncestries as Ancestry[])
        .map(({name}) => ({slug: slugify(name)}));
}

export const load: PageLoad = async ({parent, params}) => {
    let {ancestries} = await parent();

    let ancestry = ancestries.find(
        ({name}) => slugify(name) === params.slug
    );

    if (ancestry) {
        return {ancestry};
    }

    error(404, 'Not found');
}