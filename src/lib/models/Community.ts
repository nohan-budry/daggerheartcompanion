import type Feature from "$lib/models/Feature";

export default interface Community {
    name: string
    description: string
    adjectives: string
    features: Feature[]
}