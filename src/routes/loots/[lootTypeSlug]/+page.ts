import type {PageLoad} from './$types';
import {slugify} from "$lib/utils/slugify";
import {error} from "@sveltejs/kit";

export const load: PageLoad = async ({parent, params}) => {
    let {content} = await parent();
    let {loots} = content;

    let filteredLoots = loots.filter(loot => slugify(loot.type) === params.lootTypeSlug);
    if (filteredLoots.length === 0) {
        error(404, 'Not found');
    }

    return {loots: filteredLoots};
}
