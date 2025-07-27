import {error} from '@sveltejs/kit';
import type {PageLoad} from './$types';
import {slugify} from "$lib/utils/slugify";
import type {EntryGenerator} from "./$types";
import rawCommunities from '$lib/data/communities.json';
import type Community from "$lib/models/Community";

export const entries: EntryGenerator = async () => {
    return (rawCommunities as Community[])
        .map(({name}) => ({slug: slugify(name)}));
}

export const load: PageLoad = async ({parent, params}) => {
    let {communities} = await parent();

    let community = communities.find(
        ({name}) => slugify(name) === params.slug
    );

    if (community) {
        return {community};
    }

    error(404, 'Not found');
}