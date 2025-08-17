import type Feature from "$lib/models/Feature";

export interface AdversaryFeature extends Feature {
    type?: string
    value?: string
}

export default interface Adversary {
    name: string,
    tier: number,
    type: string,
    description: string,
    motivesAndTactics: string[],
    difficulty: number,
    thresholds: string,
    hitPoints: number,
    stress: number,
    attack: {
    bonus: number,
        name: string,
        range: string,
        damage: string
}
    experiences: string[],
    features: AdversaryFeature[],
}