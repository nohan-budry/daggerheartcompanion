import {error} from '@sveltejs/kit';
import type {PageLoad} from './$types';
import {slugify} from "$lib/utils/slugify";import type {EntryGenerator} from "./$types";
import rawDomains from '$lib/data/domains.json';
import type Domain from "$lib/models/Domain";

export const entries: EntryGenerator = async () => {
    return (rawDomains as Domain[])
        .map(({name}) => ({slug: slugify(name)}));
}

export const load: PageLoad = async ({parent, params}) => {
    let {domains} = await parent();

    let domain = domains.find(
        ({name}) => slugify(name) === params.slug
    );

    if (domain) {
        return {domain};
    }

    error(404, 'Not found');
}
