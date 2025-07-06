import {error} from '@sveltejs/kit';
import type {PageLoad} from './$types';

function slugify(name: string): string {
    return name.toLowerCase().replace(/\s/g, '-');
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