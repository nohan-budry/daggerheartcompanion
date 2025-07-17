import {error} from "@sveltejs/kit";
import {slugify} from "$lib/utils/slugify";

export const load = async ({parent, params}) => {
    let {classData} = await parent();

    let subclass = classData.subclasses
        .find(({name}) => slugify(name) === params.subclass);

    if (subclass) {
        return {subclass};
    }

    error(404, `Subclass ${params.subclass} not found`);
}