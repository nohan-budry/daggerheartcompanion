import type {LayoutLoad} from "./$types";

export const load: LayoutLoad = async ({parent}) => {
    let {content} = await parent();
    return {domains: content.domains};
}