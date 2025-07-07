<script lang="ts">
    import type {PageProps} from './$types';

    let {data}: PageProps = $props();
    let {domain} = $derived(data);
</script>

<div class="flex flex-col gap-4">
    <p class="description">{domain.description}</p>

    <h2>Cards</h2>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {#each domain.cards as card}
            <div class="flex flex-col gap-2 border p-2 w-full">
                <h3>{card.name}</h3>
                <div class="description">Level {card.level} {card.type}</div>
                <div>
                    <span class="font-semibold">Recall cost:</span>
                    <span class="description">{card.recallCost}</span>
                </div>
                {#if card.feature}
                    <div class="description">{card.feature}</div>
                {/if}
                {#each card.features as feature}
                    <div>
                        <span class="font-semibold">{feature.name}:</span>
                        <span class="description">{feature.description}</span>
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</div>

<style lang="postcss">
    @reference "tailwindcss";

    .description {
        @apply text-black italic;
    }

    h2, h3 {
        @apply text-xl font-semibold;
    }
</style>