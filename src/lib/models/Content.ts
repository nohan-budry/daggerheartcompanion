import type Adversary from "$lib/models/Adversary";
import type Ancestry from "$lib/models/Ancestry";
import type Community from "$lib/models/Community";
import type ClassData from "$lib/models/ClassData";
import type Equipment from "$lib/models/Equipment";
import type Loot from "$lib/models/Loot";
import type Environment from "$lib/models/Environment";
import type Domain from "$lib/models/Domain";
import {slugify} from "$lib/utils/slugify";

export class SearchIndexItem {
    name: string;
    path: string;
    source: string;
    description?: string;

    constructor(
        name: string,
        path: string,
        source: string,
        description?: string,
    ) {
        this.name = name;
        this.path = path;
        this.source = source;
        this.description = description;
    }
}

export default class Content {
    ancestries: Ancestry[];
    communities: Community[];
    classes: ClassData[];
    domains: Domain[];
    equipments: Equipment[];
    loots: Loot[];
    adversaries: Adversary[];
    environments: Environment[];
    searchIndex: SearchIndexItem[] = [];

    constructor(
        ancestries: Ancestry[],
        communities: Community[],
        classes: ClassData[],
        domains: Domain[],
        equipments: Equipment[],
        loots: Loot[],
        adversaries: Adversary[],
        environments: Environment[],
    ) {
        this.adversaries = adversaries;
        this.ancestries = ancestries;
        this.communities = communities;
        this.classes = classes;
        this.domains = domains;
        this.equipments = equipments;
        this.loots = loots;
        this.environments = environments;

        this.generateIndex();
    }

    private generateIndex() {
        this.searchIndex = [];

        this.searchIndex.push(...this.ancestries.flatMap(ancestry => [
            new SearchIndexItem(
                ancestry.name,
                '/ancestries/' + slugify(ancestry.name),
                'SRD 1.0 - Ancestry',
                ancestry.description,
            ),
            ...ancestry.features.map((feature) => new SearchIndexItem(
                feature.name,
                '/ancestries/' + slugify(ancestry.name) + '#feature-' + slugify(feature.name),
                'SRD 1.0 - Ancestry: ' + ancestry.name,
                feature.description,
            )),
        ]));

        this.searchIndex.push(...this.communities.flatMap(community => [
            new SearchIndexItem(
                community.name,
                '/communities/' + slugify(community.name),
                'SRD 1.0 - Community',
                community.description,
            ),
            ...community.features.map((feature) => new SearchIndexItem(
                feature.name,
                '/communities/' + slugify(community.name) + '#feature-' + slugify(feature.name),
                'SRD 1.0 - Community: ' + community.name,
                feature.description,
            ))
        ]));

        this.searchIndex.push(...this.classes.flatMap(klass => [
            {
                name: klass.name,
                path: '/classes/' + slugify(klass.name),
                description: klass.description,
                source: 'SRD 1.0 - Class'
            },
            ...klass.hopeFeatures.map((feature) => ({
                name: feature.name,
                path: '/classes/' + slugify(klass.name) + '#feature-' + slugify(feature.name),
                description: feature.description,
                source: 'SRD 1.0 - Class: ' + klass.name + ' - Hope Feature'
            })),
            ...klass.classFeatures.map((feature) => ({
                name: feature.name,
                path: '/classes/' + slugify(klass.name) + '#feature-' + slugify(feature.name),
                description: feature.description,
                source: 'SRD 1.0 - Class: ' + klass.name + ' - Class Feature'
            })),
            ...klass.subclasses.flatMap(subclass => [
                {
                    name: subclass.name,
                    path: '/classes/' + slugify(klass.name) + '/subclasses/' + slugify(subclass.name),
                    description: subclass.description,
                    source: 'SRD 1.0 - Class: ' + klass.name + ' - Subclass'
                },
                ...subclass.features.foundation.map((feature) => ({
                    name: feature.name,
                    path: '/classes/' + slugify(klass.name) + '/subclasses/' + slugify(subclass.name) + '#feature-' + slugify(feature.name),
                    description: feature.description,
                    source: 'SRD 1.0 - Class: ' + klass.name + ' - Subclass: ' + subclass.name + ' - Foundation Feature'
                })),
                ...subclass.features.specialization.map((feature) => ({
                    name: feature.name,
                    path: '/classes/' + slugify(klass.name) + '/subclasses/' + slugify(subclass.name) + '#feature-' + slugify(feature.name),
                    description: feature.description,
                    source: 'SRD 1.0 - Class: ' + klass.name + ' - Subclass: ' + subclass.name + ' - Specialization Feature'
                })),
                ...subclass.features.mastery.map((feature) => ({
                    name: feature.name,
                    path: '/classes/' + slugify(klass.name) + '/subclasses/' + slugify(subclass.name) + '#feature-' + slugify(feature.name),
                    description: feature.description,
                    source: 'SRD 1.0 - Class: ' + klass.name + ' - Subclass: ' + subclass.name + ' - Mastery Feature'
                })),
            ]),
            ...(klass.beastformOptions ?? [])
                .flatMap((beastForms) => beastForms.map((beastForm) => ({
                    name: beastForm.category,
                    path: `/classes/${slugify(klass.name)}#beast-form-${slugify(beastForm.category)}`,
                    source: `SRD 1.0 - Class: ${klass.name} - Beastform`,
                })))
        ]));

        this.searchIndex.push(...this.domains.flatMap(domain => [
            {
                name: domain.name,
                path: '/domains/' + slugify(domain.name),
                description: domain.description,
                source: 'SRD 1.0 - Domain'
            },
            ...domain.cards.map((card) => ({
                name: card.name,
                path: '/domains/' + slugify(domain.name) + '#card-' + slugify(card.name),
                description: `Level ${card.level} ${card.type}`,
                source: 'SRD 1.0 - Domain: ' + domain.name
            }))
        ]));

        this.searchIndex.push(...this.equipments.map(equipment => ({
            name: equipment.name,
            path: '/equipments/' + slugify(equipment.type) + '#equipment-' + slugify(equipment.name),
            description: `Tier ${equipment.tier} ${equipment.type}`,
            source: 'SRD 1.0 - Equipment'
        })));

        this.searchIndex.push(...this.loots.map(loot => ({
            name: loot.name,
            path: '/loots/' + slugify(loot.type) + '#loot-' + slugify(loot.name),
            description: loot.description,
            source: 'SRD 1.0 - Loot: ' + loot.type
        })));

        this.searchIndex.push(...this.adversaries.flatMap(adversary => [
            {
                name: adversary.name,
                path: '/adversaries#adversary-' + slugify(adversary.name),
                description: `Tier ${adversary.tier} ${adversary.type}: ${adversary.description}`,
                source: 'SRD 1.0 - Adversary'
            },
            ...adversary.features.map((feature) => ({
                name: `${feature.name}${feature.value ? ` (${feature.value})` : ''}`,
                path: '/adversaries#adversary-' + slugify(adversary.name),
                description: `${feature.type} ${feature.description}`,
                source: 'SRD 1.0 - Adversary: ' + adversary.name
            }))
        ]));

        this.searchIndex.push(...this.environments.flatMap(environment => [
            {
                name: environment.name,
                path: '/environments#environment-' + slugify(environment.name),
                description: `Tier ${environment.tier} ${environment.type}: ${environment.description}`,
                source: 'SRD 1.0 - Environment'
            },
            ...environment.features.map((feature) => ({
                name: feature.name,
                path: '/environments#environment-' + slugify(environment.name),
                description: `${feature.type}: ${feature.description}`,
                source: 'SRD 1.0 - Environment: ' + environment.name
            }))
        ]));
    }
}