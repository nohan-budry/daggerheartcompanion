<script>
  let {data} = $props();
  let {reusables, consumables} = data;

  let selectedCategoryIndex = $state(0);
  let selectedCategory = $derived([reusables, consumables][selectedCategoryIndex]);
</script>

<div class="flex flex-col gap-4">
    <h1>Loots</h1>

    <div class="flex gap-x-4">
        <button class="border px-2 py-1 cursor-pointer" class:active={selectedCategoryIndex === 0}
                onclick={() => selectedCategoryIndex = 0}>
            Reusable Items
        </button>
        <button class="border px-2 py-1 cursor-pointer" class:active={selectedCategoryIndex === 1}
                onclick={() => selectedCategoryIndex = 1}>
            Consumable Items
        </button>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {#each selectedCategory as loot}
            <div class="flex flex-col gap-2 border p-2 w-full">
                <h2>
                    <span>{loot.name}</span>
                    <span class="italic font-normal">- {loot.roll}</span>
                </h2>
                <div>
                    <span class="italic">{loot.description}</span>
                </div>
            </div>
        {/each}
    </div>
</div>

<style lang="postcss">
    @reference "tailwindcss";

    h1 {
        @apply text-2xl font-semibold;
    }

    h2 {
        @apply text-xl font-semibold;
    }

    .cursor-pointer {
        cursor: pointer;
    }

    .active {
        @apply bg-blue-200;
    }
</style>