import type Feature from "$lib/models/Feature";

export interface EnvironmentFeature extends Feature {
    type?: string
}

export default interface Environment {
    name: string,
    tier: number,
    type: string,
    description: string,
    impulses: string[],
    difficulty: number | string,
    adversaries: string,
    features: EnvironmentFeature[],
}