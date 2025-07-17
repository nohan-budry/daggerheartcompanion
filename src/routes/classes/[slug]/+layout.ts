import {error} from '@sveltejs/kit';
import type {LayoutLoad} from './$types';
import {slugify} from "$lib/utils/slugify";

export const load: LayoutLoad = async ({parent, params}) => {
    let {classesData} = await parent();

    let classData = classesData.find(
        ({name}) => slugify(name) === params.slug
    );

    if (classData) {
        return {classData};
    }

    error(404, 'Not found');
}