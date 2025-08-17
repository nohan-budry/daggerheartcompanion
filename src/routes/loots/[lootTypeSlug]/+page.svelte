<script lang="ts">
    import {slugify} from "$lib/utils/slugify";

    let {data} = $props();
    let loots = $derived(data.loots);
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    {#each loots as loot}
        <div class="flex flex-col gap-2 border p-2 w-full" id={`loot-${slugify(loot.name)}`}>
            <h2 class="font-semibold">
                <span>{loot.name}</span>
                <span class="italic font-normal">- {loot.roll}</span>
            </h2>
            <div>
                <span class="italic">{loot.description}</span>
            </div>
        </div>
    {/each}
</div>