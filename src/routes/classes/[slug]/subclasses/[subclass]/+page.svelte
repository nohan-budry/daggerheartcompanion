<script>
    import {slugify} from "$lib/utils/slugify.js";

    let {data} = $props();
    let {subclass} = $derived(data);
</script>

<p>{subclass.description}</p>

{#if subclass.spellcastTrait}
    <p>
        <span class="font-semibold">Spellcast:</span>
        <span class="description">{subclass.spellcastTrait}</span>
    </p>
{/if}

<h2>Foundation Features</h2>
{#each subclass.features.foundation as feature}
    <p id={`feature-${slugify(feature.name)}`}>
        <span class="font-semibold">{feature.name}:</span>
        <span class="description">{feature.description}</span>
    </p>
{/each}

<h2>Specialization Features</h2>
{#each subclass.features.specialization as feature}
    <p id={`feature-${slugify(feature.name)}`}>
        <span class="font-semibold">{feature.name}:</span>
        <span class="description">{feature.description}</span>
    </p>
{/each}

<h2>Mastery Features</h2>
{#each subclass.features.mastery as feature}
    <p id={`feature-${slugify(feature.name)}`}>
        <span class="font-semibold">{feature.name}:</span>
        <span class="description">{feature.description}</span>
    </p>
{/each}

<style lang="postcss">
    @reference "tailwindcss";

    h2 {
        @apply text-xl font-semibold;
    }
</style>