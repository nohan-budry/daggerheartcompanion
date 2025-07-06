import type Feature from "$lib/models/Feature";

export default interface Ancestry {
    name: string
    description: string
    features: Feature[]
}