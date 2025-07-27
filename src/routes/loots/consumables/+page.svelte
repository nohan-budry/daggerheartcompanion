<script lang="ts">
    import {slugify} from "$lib/utils/slugify";

    let {data} = $props();
    let {consumables} = data;
</script>

<div class="flex flex-col gap-2">
    <p>
        Consumables are loot that can only be used once.
        You can hold up to five of each consumable at a time.
        Using a consumable doesn’t require a roll unless required
        by the GM or the demands of the fiction.
    </p>
    <p>
        To generate a random consumable, choose a rarity, roll the designated dice,
        and match the total to the item in the table:
    </p>
    <ul class="list-disc list-inside pl-4">
        <li> Common: 1d12 or 2d12</li>
        <li> Rare: 3d12 or 4d12</li>
        <li> Uncommon: 2d12 or 3d12</li>
        <li> Legendary: 4d12 or 5d12</li>
    </ul>
</div>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
</div>
