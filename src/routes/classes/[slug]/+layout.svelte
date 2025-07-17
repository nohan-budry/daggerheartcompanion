<script lang="ts">
    import type {ClassData, Subclass} from "$lib/models/ClassData";
    import {base} from "$app/paths";
    import {slugify} from "$lib/utils/slugify";
    import {page} from "$app/state";

    let {data, children} = $props();
    let {classData} = $derived(data as { classData: ClassData });

    function traitBonuses(traits: { [k: string]: number }): string[] {
        return Object.entries(traits).map((trait) => traitBonusString(...trait));
    }

    function traitBonusString(trait: string, value: number): string {
        return `${bonusValue(value)} ${trait}`;
    }

    function bonusValue(value: number): string {
        return (value >= 0 ? '+' : '') + value;
    }

    function subclassUrl(subclass: Subclass): string {
        return `${base}/classes/${slugify(classData.name)}/subclasses/${slugify(subclass.name)}`;
    }

    function subclassIsActive(subclass: Subclass): boolean {
        return slugify(subclass.name) === page.params.subclass;
    }
</script>

<div class="flex flex-col gap-4">
    <p class="description">{classData.description}</p>

    <div class="w-full flex flex-wrap gap-x-16 gap-y-4">
        <div>
            <div class="flex gap-x-2">
                <div class="font-semibold">Evasion:</div>
                <div class="description text-right flex-1">{classData.startingEvasion}</div>
            </div>
            <div class="flex gap-x-2">
                <div class="font-semibold">Hit Points:</div>
                <div class="description text-right flex-1">{classData.startingHitPoints}</div>
            </div>
        </div>

        <div>
            <div class="font-semibold">Domains</div>
            <div class="description">{classData.domains.join(' & ')}</div>
        </div>

        <div>
            <div class="font-semibold">Class items (choose one)</div>
            {#each classData.classItems as item}
                <div class="description">{item}</div>
            {/each}
        </div>
    </div>

    <h2>Hope Features</h2>

    {#each classData.hopeFeatures as feature}
        <p id={`feature-${slugify(feature.name)}`}>
            <span class="font-semibold">{feature.name}:</span>
            <span class="description">{feature.description}</span>
        </p>
    {/each}

    <h2>Class Features</h2>

    {#each classData.classFeatures as feature}
        <p id={`feature-${slugify(feature.name)}`}>
            <span class="font-semibold">{feature.name}:</span>
            <span class="description">{feature.description}</span>
        </p>
    {/each}

    <h1>Subclasses</h1>

    <div class="flex gap-x-4">
        {#each classData.subclasses as subclass}
            <a class="border px-2 py-1" class:active={subclassIsActive(subclass)}
               href={subclassUrl(subclass)} data-sveltekit-noscroll>
                {subclass.name}
            </a>
        {/each}
    </div>

    {@render children()}

    {#if classData.beastformOptions}
        <h1>Beastform List</h1>

        {#each [1, 2, 3, 4] as tier}
            {#if !!classData.beastformOptions[tier - 1]}
                <h2>Tier {tier}</h2>

                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {#each classData.beastformOptions[tier - 1] as beastform}
                        <div class="flex flex-col gap-2 border p-2 w-full"
                             id={`beast-form-${slugify(beastform.category)}`}>
                            <h3>{beastform.category}</h3>
                            {#if beastform.examples?.length}
                                <div>
                                    <span class="font-semibold">Beast examples:</span>
                                    <span class="description">{beastform.examples.join(', ')}, etc.</span>
                                </div>
                            {/if}
                            {#if beastform.traits}
                                <div>
                                    <span class="font-semibold">Traits:</span>
                                    <span class="description">{traitBonuses(beastform.traits).join(', ')}</span>
                                </div>
                            {/if}
                            {#if beastform.evasion}
                                <div>
                                    <span class="font-semibold">Evasion:</span>
                                    <span class="description">{bonusValue(beastform.evasion)}</span>
                                </div>
                            {/if}
                            {#if beastform.attack}
                                <div>
                                    <span class="font-semibold">Attack:</span>
                                    <span class="description">
                                    {beastform.attack.range} {beastform.attack.trait} {beastform.attack.damage}
                                </span>
                                </div>
                            {/if}
                            {#each beastform.features as feature}
                                <p>
                                    <span class="font-semibold">{feature.name}:</span>
                                    <span class="description">{feature.description}</span>
                                </p>
                            {/each}
                        </div>
                    {/each}
                </div>
            {/if}
        {/each}
    {/if}

</div>

<style lang="postcss">
    @reference "tailwindcss";

    .active {
        @apply bg-blue-200;
    }

    .description {
        @apply text-black italic;
    }

    h1 {
        @apply text-2xl font-semibold;
    }

    h2, h3 {
        @apply text-xl font-semibold;
    }

    a {
        @apply hover:bg-blue-200 focus:bg-blue-200 focus:border-blue-400;
    }
</style>