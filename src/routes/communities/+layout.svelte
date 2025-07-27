<script lang="ts">
    import {page} from "$app/state";
    import {base} from "$app/paths";
    import {slugify} from "$lib/utils/slugify";

    let {children, data} = $props();
    let {communities} = data;

    function communityUrl(name: string): string {
        return base + '/communities/' + slugify(name);
    }
</script>

<div>
    <h1 class="mb-4 text-2xl font-semibold">Communities</h1>

    <nav class="flex flex-row flex-wrap gap-2">
        {#each communities as community}
            <a class="border px-2 py-1 border-b-black"
               class:active={page.url.pathname === communityUrl(community.name)}
               href={communityUrl(community.name)} data-sveltekit-noscroll>
                {community.name}
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
