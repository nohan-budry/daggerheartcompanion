<script lang="ts">
    import {page} from "$app/state";
    import {base} from "$app/paths";
    import {slugify} from "$lib/utils/slugify";

    let {children, data} = $props();
    let {ancestries} = data;

    function ancestryUrl(name: string): string {
        return base + '/ancestries/' + slugify(name);
    }
</script>

<div>
    <h1 class="mb-4 text-2xl font-semibold">Ancestries</h1>

    <p class="mb-4">
        Ancestries represent your character’s lineage, which affects
        their physical appearance and access to certain special
        abilities.
    </p>

    <nav class="flex flex-row flex-wrap gap-2">
        {#each ancestries as ancestry}
            <a class="border px-2 py-1 border-b-black cu"
               class:active={page.url.pathname === ancestryUrl(ancestry.name)}
               href={ancestryUrl(ancestry.name)} data-sveltekit-noscroll>
                {ancestry.name}
            </a>
        {/each}
    </nav>

    <main class="mt-4">
        {@render children()}
    </main>
</div>

<style lang="postcss">
    @reference "tailwindcss";

    .active {
        @apply bg-blue-200;
    }

    a {
        @apply hover:bg-blue-200 focus:bg-blue-200 focus:border-blue-400;
    }
</style>
