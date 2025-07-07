<script lang="ts">
    import {page} from "$app/state";
    import {base} from "$app/paths";

    let {children, data} = $props();
    let {domains} = data;

    function domainUrl(name: string): string {
        return base + '/domains/' + name.toLowerCase().replace(/\s/g, '-');
    }
</script>

<div>
    <h1 class="mb-4 text-2xl font-semibold">Domains</h1>

    <nav class="flex flex-row flex-wrap gap-2">
        {#each domains as domain}
            <a class="border px-2 py-1 border-b-black"
               class:active={page.url.pathname === domainUrl(domain.name)}
               href={domainUrl(domain.name)}>
                {domain.name}
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
