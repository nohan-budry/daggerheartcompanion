import type Feature from "$lib/models/Feature";

export interface Beastform {
    category: string,
    examples?: string[],
    traits?: {},
    evasion?: number,
    attack?: {
        range: string
        trait: string,
        damage: string
    },
    advantages?: string[],
    features: Feature[]
}

export interface Subclass {
    name: string,
    description: string,
    spellcastTrait?: string,
    features: {
        foundation: Feature[],
        specialization: Feature[],
        mastery: Feature[],
    };
}

export default interface ClassData {
    name: string
    description: string
    domains: string[]
    startingEvasion: number
    startingHitPoints: number
    classItems: string[]
    hopeFeatures: Feature[]
    classFeatures: Feature[]
    subclasses: Subclass[]
    beastformOptions?: Beastform[][]
}