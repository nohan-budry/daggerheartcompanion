import {error} from '@sveltejs/kit';
import type {PageLoad} from './$types';

function slugify(name: string): string {
    return name.toLowerCase().replace(/\s/g, '-');
}

export const load: PageLoad = async ({parent, params}) => {
    let {classesData} = await parent();

    let classData = classesData.find(
        ({name}) => slugify(name) === params.slug
    );

    if (classData) {
        return {classData};
    }

    error(404, 'Not found');
}