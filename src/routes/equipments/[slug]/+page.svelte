<script lang="ts">
    import {slugify} from "$lib/utils/slugify";
    import {page} from "$app/state";
    import type Equipment from "$lib/models/Equipment";

    let {slug} = $derived(page.params);
    let {data} = $props();
    let {equipments} = $derived(data);

    function id(equipment: Equipment) {
        return `equipment-${slugify(equipment.name)}`;
    }

    interface Filters {
        tiers: [boolean, boolean, boolean, boolean],
        damageType: string,
    }

    let filters: Filters = $state({
        tiers: [true, true, true, true],
        damageType: '',
    } as Filters);

    let ignoreDamageType: boolean = $derived(slug === 'armor' || filters.damageType === '');
    let filteredEquipments = $derived(equipments.map(
        tier => tier.filter(
            ({damageType}) => ignoreDamageType || damageType === filters.damageType
        )
    ));
</script>

<div class="flex flex-col gap-4 items-start">
    <div class="flex flex-row gap-2 items-center">
        <span>Filters</span>
        {#each [0, 1, 2, 3] as tier}
            <button class="border rounded-md px-2 py-1 cursor-pointer" class:bg-blue-200={filters.tiers[tier]}
                    onclick={() => filters.tiers[tier] = !filters.tiers[tier]}>{tier + 1}</button>
        {/each}
    </div>
    {#if slug !== 'armor'}
        <div>
            <label>Damage type</label>
            <select bind:value={filters.damageType}>
                <option value="">All</option>
                <option value="phy">Physical</option>
                <option value="mag">Magical</option>
            </select>
        </div>
    {/if}
</div>

{#each [0, 1, 2, 3] as tier}
    {#if filters.tiers[tier]}
        <h2>Tier {tier + 1}</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {#each filteredEquipments[tier] as equipment}
                <div class="flex flex-col gap-2 border p-2 w-full" id={id(equipment)}>
                    <h3>
                        <span>{equipment.name}</span>
                        {#if equipment.damageType}
                            <span class="italic font-normal">- {equipment.damageType}</span>
                        {/if}
                    </h3>
                    {#if equipment.burden}
                        <div>
                            <span class="font-semibold">Burden:</span>
                            <span class="italic">{equipment.burden}</span>
                        </div>
                    {/if}
                    {#if equipment.trait}
                        <div>
                            <span class="font-semibold">Attack:</span>
                            <span class="italic">{equipment.range} {equipment.trait} {equipment.damage} {equipment.damageType}</span>
                        </div>
                    {/if}
                    {#if equipment.thresholds}
                        <div>
                            <span class="font-semibold">Base Thresholds:</span>
                            <span class="italic">{equipment.thresholds}</span>
                        </div>
                    {/if}
                    {#if equipment.score}
                        <div>
                            <span class="font-semibold">Base Score:</span>
                            <span class="italic">{equipment.score}</span>
                        </div>
                    {/if}
                    {#each equipment.features as feature}
                        <div>
                            <span class="font-semibold">{feature.name}:</span>
                            <span class="italic">{feature.description}</span>
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    {/if}
{/each}

<style lang="postcss">
    @reference "tailwindcss";

    h2, h3 {
        @apply text-xl font-semibold;
    }
</style>