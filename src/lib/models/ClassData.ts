import type Feature from "$lib/models/Feature";

export interface Beastform {
    category: string,
    examples: string[],
    traits: {},
    evasion: 2,
    attack: {
        range: string
        trait: string,
        damage: string
    },
    advantages: string[],
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

export interface ClassData {
    name: string
    description: string
    domains: string[]
    startingEvasion: number
    startingHitPoints: number
    classItems: string[]
    hopeFeatures: Feature[]
    classFeatures: Feature[]
    subclasses: Subclass[]
    beastformOptions?: {
        tier1: Beastform[]
        [tier:string]: Beastform[]
    }
}