<script lang="ts">
    import type {PageProps} from './$types';
    import {slugify} from '$lib/utils/slugify';

    let {data}: PageProps = $props();
    let {community} = $derived(data);
</script>

<div class="flex flex-col gap-4">
    <p class="description">{community.description}</p>

    <p class="description">{community.adjectives}</p>

    <h2>Hope Features</h2>

    {#each community.features as feature}
        <p id={`feature-${slugify(feature.name)}`}>
            <span class="font-semibold">{feature.name}:</span>
            <span class="description">{feature.description}</span>
        </p>
    {/each}
</div>

<style lang="postcss">
    @reference "tailwindcss";

    .description {
        @apply text-black italic;
    }

    h2 {
        @apply text-xl font-semibold;
    }
</style>