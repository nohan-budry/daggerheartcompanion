<script>
  import {base} from "$app/paths";
  import {page} from "$app/state";

  let {children} = $props();
</script>

<div class="flex flex-col gap-4">
    <h1>Loots</h1>

    <div class="flex gap-x-4">
        <a class="border px-2 py-1" href={base + '/loots/reusables'}
           class:active={page.url.pathname.endsWith('/reusables')}>
            Reusable Items
        </a>
        <a class="border px-2 py-1" href={base + '/loots/consumables'}
           class:active={page.url.pathname.endsWith('/consumables')}>
            Consumable Items
        </a>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {@render children()}
    </div>
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