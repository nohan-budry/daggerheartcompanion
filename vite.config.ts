import {sveltekit} from '@sveltejs/kit/vite';
import {defineConfig, type PluginOption} from 'vite';
import tailwindcss from "@tailwindcss/vite";
import type {Adversary} from "$lib/models/Adversary";
import type Loot from "$lib/models/Loot";
import type Equipment from "$lib/models/Equipment";
import type Domain from "$lib/models/Domain";
import type {ClassData} from "$lib/models/ClassData";
import type Community from "$lib/models/Community";
import type Ancestry from "$lib/models/Ancestry";

function slugify(str: string): string {
    return str.toLowerCase().replace(/\s/g, '-');
}

async function generateIndex() {
    console.log('Generating search index...');

    let ancestries = await import('./src/lib/data/ancestries.json') as Ancestry[];
    let communities = await import('./src/lib/data/communities.json') as Community[];
    let classes = await import('./src/lib/data/classes.json') as ClassData[];
    let domains = await import('./src/lib/data/domains.json') as Domain[];
    let equipments = await import('./src/lib/data/equipments.json') as Equipment[];
    let reusableLoots = await import('./src/lib/data/loots/reusables.json') as Loot[];
    let consumableLoots = await import('./src/lib/data/loots/consumables.json') as Loot[];
    let adversaries = await import('./src/lib/data/adversaries.json') as Adversary[];


    let searchIndex: { name: string, path: string, description: string, source: string }[] = [];

    searchIndex.push(...ancestries.flatMap(ancestry => [
        {
            name: ancestry.name,
            path: '/ancestries/' + slugify(ancestry.name),
            description: ancestry.description,
            source: 'SRD 1.0 - Ancestry'
        },
        ...ancestry.features.map((feature) => ({
            name: feature.name,
            path: '/ancestries/' + slugify(ancestry.name) + '#feature-' + slugify(feature.name),
            description: feature.description,
            source: 'SRD 1.0 - Ancestry: ' + ancestry.name
        })),
    ]));

    searchIndex.push(...communities.flatMap(community => [
        {
            name: community.name,
            path: '/communities/' + slugify(community.name),
            description: community.description,
            source: 'SRD 1.0 - Community'
        },
        ...community.features.map((feature) => ({
            name: feature.name,
            path: '/communities/' + slugify(community.name) + '#feature-' + slugify(feature.name),
            description: feature.description,
            source: 'SRD 1.0 - Community: ' + community.name
        }))
    ]));

    searchIndex.push(...classes.flatMap(klass => [
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
                path: '/classes/' + slugify(klass.name) + '/' + slugify(subclass.name),
                description: subclass.description,
                source: 'SRD 1.0 - Class: ' + klass.name + ' - Subclass'
            },
            ...subclass.features.foundation.map((feature) => ({
                name: feature.name,
                path: '/classes/' + slugify(klass.name) + '/' + slugify(subclass.name) + '#feature-' + slugify(feature.name),
                description: feature.description,
                source: 'SRD 1.0 - Class: ' + klass.name + ' - Subclass: ' + subclass.name + ' - Foundation Feature'
            })),
            ...subclass.features.specialization.map((feature) => ({
                name: feature.name,
                path: '/classes/' + slugify(klass.name) + '/' + slugify(subclass.name) + '#feature-' + slugify(feature.name),
                description: feature.description,
                source: 'SRD 1.0 - Class: ' + klass.name + ' - Subclass: ' + subclass.name + ' - Specialization Feature'
            })),
            ...subclass.features.mastery.map((feature) => ({
                name: feature.name,
                path: '/classes/' + slugify(klass.name) + '/' + slugify(subclass.name) + '#feature-' + slugify(feature.name),
                description: feature.description,
                source: 'SRD 1.0 - Class: ' + klass.name + ' - Subclass: ' + subclass.name + ' - Mastery Feature'
            })),
        ])
    ]));

    searchIndex.push(...domains.flatMap(domain => [
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

    searchIndex.push(...equipments.map(equipment => ({
        name: equipment.name,
        path: '/equipment/' + slugify(equipment.type) + '#equipment-' + slugify(equipment.name),
        description: `Tier ${equipment.tier} ${equipment.type}`,
        source: 'SRD 1.0 - Equipment'
    })));

    searchIndex.push(...reusableLoots.map(loot => ({
        name: loot.name,
        path: '/loots/' + slugify(loot.type) + '#loot-' + slugify(loot.name),
        description: loot.description,
        source: 'SRD 1.0 - Loot: ' + loot.type
    })));

    searchIndex.push(...consumableLoots.map(loot => ({
        name: loot.name,
        path: '/loots/' + slugify(loot.type) + '#loot-' + slugify(loot.name),
        description: loot.description,
        source: 'SRD 1.0 - Loot: ' + loot.type
    })));

    searchIndex.push(...adversaries.flatMap(adversary => [
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

    return searchIndex;
}

function searchIndexGenerator(): PluginOption {
    return {
        name: 'dh-search-index-generator',
        resolveId(id) {
            if (id === 'virtual:dh-search-index') return id;
        },
        async load(id) {
            if (id === 'virtual:dh-search-index') {
                return `export default ${JSON.stringify(await generateIndex())};`;
            }
        }
    };
}


export default defineConfig({
    plugins: [searchIndexGenerator(), tailwindcss(), sveltekit()]
});
