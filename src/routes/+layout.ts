import type {LayoutLoad} from './$types';
import ContentApiService from "$lib/services/ContentApiService";
import type Content from "$lib/models/Content";
import {base} from "$app/paths";

export const load: LayoutLoad = async ({fetch}) => {
    const contentApi: ContentApiService = new ContentApiService(`${base}/api/raw`, fetch);
    const content: Content = await contentApi.getContent();

    return {content};
}