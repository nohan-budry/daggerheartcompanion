<script lang="ts">
    import {page} from "$app/state";
    import {base} from "$app/paths";

    let {children, data} = $props();
    let {classesData} = data;

    function classUrl(name: string): string {
        return base + '/classes/' + name.toLowerCase().replace(/\s/g, '-');
    }
</script>

<div>
    <h1 class="mb-4 text-2xl font-semibold">Classes</h1>

    <nav class="flex flex-row flex-wrap gap-2">
        {#each classesData as classData}
            <a class="border px-2 py-1 border-b-black"
               class:active={page.url.pathname === classUrl(classData.name)}
               href={classUrl(classData.name)}>
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
</style>
