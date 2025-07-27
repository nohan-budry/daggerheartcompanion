<script lang="ts">
    import {page} from "$app/state";
    import {base} from "$app/paths";
    import {slugify} from "$lib/utils/slugify";

    let {children, data} = $props();
    let categories = [...new Set(data.equipments.map(equipment => equipment.type))];
</script>

<div class="flex flex-col gap-4">
    <h1>Equipments</h1>

    <p class="description">
        Players can choose one Tier 1 primary weapon, secondary weapon and armor during character creation.<br/>
        All magic weapons require a Spellcast trait.
    </p>

    <div class="flex gap-x-4">
        {#each categories as category}
            <a class="border px-2 py-1"
               class:active={page.url.pathname.includes(slugify(category))}
               href={`${base}/equipments/${slugify(category)}`} data-sveltekit-noscroll>
                {category}
            </a>
        {/each}
    </div>

    {@render children()}
</div>

<style lang="postcss">
    @reference "tailwindcss";

    h1 {
        @apply text-2xl font-semibold;
    }

    .active {
        @apply bg-blue-200;
    }

    a {
        @apply hover:bg-blue-200 focus:bg-blue-200 focus:border-blue-400;
    }
</style>