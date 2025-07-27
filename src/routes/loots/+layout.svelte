<script>
  import {base} from "$app/paths";
  import {page} from "$app/state";

  let {children} = $props();
</script>

<div class="flex flex-col gap-4">
    <h1>Loots</h1>
    <p>Loot comprises any consumables or reusable items the party acquires.</p>

    <div class="flex gap-x-4">
        <a class="border px-2 py-1" href={base + '/loots/reusables'} data-sveltekit-noscroll
           class:active={page.url.pathname.endsWith('/reusables')}>
            Reusable Items
        </a>
        <a class="border px-2 py-1" href={base + '/loots/consumables'} data-sveltekit-noscroll
           class:active={page.url.pathname.endsWith('/consumables')}>
            Consumable Items
        </a>
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