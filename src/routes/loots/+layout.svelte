<script>
  import {base} from "$app/paths";
  import {page} from "$app/state";
  import {slugify} from "$lib/utils/slugify.js";

  let {children, data} = $props();
  let categories = $derived([...new Set(data.loots.map(loot => loot.type))]);
</script>

<div class="flex flex-col gap-4">
    <h1>Loots</h1>
    <p>Loot comprises any consumables or reusable items the party acquires.</p>

    <p>Reusable Items can be used until sold, discarded, or lost.</p>
    <p>
        Consumables are loot that can only be used once.
        You can hold up to five of each consumable at a time.
        Using a consumable doesn’t require a roll unless required
        by the GM or the demands of the fiction.
    </p>
    <p>
        To generate a random item, choose a rarity, roll the designated dice,
        and match the total to the item in the table:
    </p>
    <ul class="list-disc list-inside pl-4">
        <li> Common: 1d12 or 2d12</li>
        <li> Rare: 3d12 or 4d12</li>
        <li> Uncommon: 2d12 or 3d12</li>
        <li> Legendary: 4d12 or 5d12</li>
    </ul>

    <div class="flex gap-x-4">
        {#each categories as category}
            <a class="border px-2 py-1" href={`${base}/loots/${slugify(category)}`} data-sveltekit-noscroll
               class:active={page.url.pathname.includes(`${slugify(category)}`)}>
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