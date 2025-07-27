<script lang="ts">
    import {page} from "$app/state";
    import {base} from "$app/paths";
    import {slugify} from "$lib/utils/slugify";

    let {children, data} = $props();
    let {classesData} = $derived(data);

    function classUrl(name: string): string {
        return base + '/classes/' + slugify(name);
    }
</script>

<div>
    <h1 class="mb-4 text-2xl font-semibold">Classes</h1>

    <p class="mb-4">
        A class is a role-based archetype that determines a PC's features and abilities.
    </p>

    <nav class="flex flex-row flex-wrap gap-2">
        {#each classesData as classData}
            <a class="border px-2 py-1 border-b-black"
               class:active={page.params.slug === slugify(classData.name)}
               href={classUrl(classData.name)} data-sveltekit-noscroll>
                {classData.name}
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
