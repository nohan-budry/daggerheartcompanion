<script>
  let {data} = $props();
  let {primaryWeapons, secondaryWeapons, armors} = data;

  let selectedCategoryIndex = $state(0);
  let selectedCategory = $derived([primaryWeapons, secondaryWeapons, armors][selectedCategoryIndex]);
</script>

<div class="flex flex-col gap-4">
    <h1>Items</h1>

    <p class="description">
        Players can choose one Tier 1 primary weapon, secondary weapon and armor during character creation.<br/>
        All magic weapons require a Spellcast trait.
    </p>

    <div class="flex gap-x-4">
        <button class="border px-2 py-1 cursor-pointer" class:active={selectedCategoryIndex === 0}
                onclick={() => selectedCategoryIndex = 0}>
            Primary Weapons
        </button>
        <button class="border px-2 py-1 cursor-pointer" class:active={selectedCategoryIndex === 1}
                onclick={() => selectedCategoryIndex = 1}>
            Secondary Weapons
        </button>
        <button class="border px-2 py-1 cursor-pointer" class:active={selectedCategoryIndex === 2}
                onclick={() => selectedCategoryIndex = 2}>
            Armors
        </button>
    </div>

    {#each [1, 2, 3, 4] as tier}
        <h2>Tier {tier}</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {#each selectedCategory['tier' + tier] as item}
                <div class="flex flex-col gap-2 border p-2 w-full">
                    <h3>
                        <span>{item.name}</span>
                        {#if item.damageType}
                            <span class="italic font-normal">- {item.damageType}</span>
                        {/if}
                    </h3>
                    {#if item.burden}
                        <div>
                            <span class="font-semibold">Burden:</span>
                            <span class="italic">{item.burden}</span>
                        </div>
                    {/if}
                    {#if item.trait}
                        <div>
                            <span class="font-semibold">Attack:</span>
                            <span class="italic">{item.range} {item.trait} {item.damage} {item.damageType}</span>
                        </div>
                    {/if}
                    {#if item.thresholds}
                        <div>
                            <span class="font-semibold">Base Thresholds:</span>
                            <span class="italic">{item.thresholds}</span>
                        </div>
                    {/if}
                    {#if item.score}
                        <div>
                            <span class="font-semibold">Base Score:</span>
                            <span class="italic">{item.score}</span>
                        </div>
                    {/if}
                    {#each item.features as feature}
                        <div>
                            <span class="font-semibold">{feature.name}:</span>
                            <span class="italic">{feature.description}</span>
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    {/each}
</div>

<style lang="postcss">
    @reference "tailwindcss";

    h1 {
        @apply text-2xl font-semibold;
    }

    h2, h3 {
        @apply text-xl font-semibold;
    }

    .cursor-pointer {
        cursor: pointer;
    }

    .active {
        @apply bg-blue-200;
    }
</style>