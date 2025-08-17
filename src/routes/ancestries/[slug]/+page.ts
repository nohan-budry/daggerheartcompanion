import {error} from '@sveltejs/kit';
import type {PageLoad} from './$types';
import {slugify} from "$lib/utils/slugify";

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