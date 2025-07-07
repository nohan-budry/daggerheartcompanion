import type Feature from "$lib/models/Feature";

export interface DomainCard {
    level: number
    name: string
    type: string
    recallCost: number
    feature?: string
    features: Feature[]
}

export default interface Domain {
    name: string
    description: string
    cards: DomainCard[]
}