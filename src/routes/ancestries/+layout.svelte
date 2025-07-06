<script lang="ts">
    import {page} from "$app/state";
    import {base} from "$app/paths";

    let {children, data} = $props();
    let {ancestries} = data;

    function ancestryUrl(name: string): string {
        return base + '/ancestries/' + name.toLowerCase().replace(/\s/g, '-');
    }
</script>

<div>
    <h1 class="mb-4 text-2xl font-semibold">Ancestries</h1>

    <nav class="flex flex-row flex-wrap gap-2">
        {#each ancestries as ancestry}
            <a class="border px-2 py-1 border-b-black"
               class:active={page.url.pathname === ancestryUrl(ancestry.name)}
               href={ancestryUrl(ancestry.name)}>
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
</style>
