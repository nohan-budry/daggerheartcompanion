import type Feature from "$lib/models/Feature";

export default interface Item {
    type: string
    tier: number
    name: string
    trait?: String
    range?: String
    damage?: string
    damageType?: string
    burden?: string
    thresholds?: string
    score?: number
    features: Feature[]
}
