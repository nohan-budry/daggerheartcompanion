import {error} from '@sveltejs/kit';
import type {PageLoad} from './$types';
import {slugify} from "$lib/utils/slugify";

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