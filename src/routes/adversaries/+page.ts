import type {PageLoad} from "./$types";

export const load: PageLoad = async ({parent}) => {
    let {content} = await parent();
    return {adversaries: content.adversaries}
}