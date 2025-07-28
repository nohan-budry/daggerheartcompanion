import type {PageLoad} from "./$types";
import rawEnvironments from '$lib/data/environments.json';
import type {Environment} from "$lib/models/Environment";

export const load: PageLoad = () => {
    let environments: Environment[] = rawEnvironments;

    return {environments};
}