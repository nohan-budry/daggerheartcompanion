<script lang="ts">
    import {slugify} from "$lib/utils/slugify";
    import {page} from "$app/state";

    let {slug} = page.params;
    let {data} = $props();
    let {equipments} = $derived(data);

    function id(equipment: Equipment) {
        return `equipment-${slugify(equipment.name)}`;
    }
</script>

{#each [0, 1, 2, 3] as tier}
    <h2>Tier {tier + 1}</h2>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {#each equipments[tier] as equipment}
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
{/each}

<style lang="postcss">
    @reference "tailwindcss";

    h3 {
        @apply text-xl font-semibold;
    }
</style>