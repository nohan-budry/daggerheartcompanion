import {error} from '@sveltejs/kit';
import type {PageLoad} from './$types';
import {slugify} from "$lib/utils/slugify";

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
