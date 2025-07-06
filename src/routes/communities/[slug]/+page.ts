import {error} from '@sveltejs/kit';
import type {PageLoad} from './$types';

function slugify(name: string): string {
    return name.toLowerCase().replace(/\s/g, '-');
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