<script lang="ts">
    import {slugify} from "$lib/utils/slugify";

    let {data} = $props();
    let {consumables} = data;
</script>

{#each consumables as loot}
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
