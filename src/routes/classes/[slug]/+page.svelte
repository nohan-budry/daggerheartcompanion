<script lang="ts">
    import type {PageProps} from './$types';
    import type {ClassData, Subclass} from "$lib/models/ClassData";
    import {untrack} from "svelte";

    let {data}: PageProps = $props();
    let {classData} = $derived(data as { classData: ClassData });

    let selectedSubclassIndex: number = $state(0)
    let selectedSubclass: Subclass = $derived(
        classData.subclasses[selectedSubclassIndex]
    );

    $effect(() => {
        classData;

        untrack(() => selectedSubclassIndex = 0);
    })
</script>

<div class="flex flex-col gap-4">
    <p class="description">{classData.description}</p>

    <div class="w-full flex flex-wrap gap-x-16 gap-y-4">
        <div>
            <div class="flex gap-x-2">
                <div class="font-semibold">Evasion:</div>
                <div class="description text-right flex-1">{classData.startingEvasion}</div>
            </div>
            <div class="flex gap-x-2">
                <div class="font-semibold">Hit Points:</div>
                <div class="description text-right flex-1">{classData.startingHitPoints}</div>
            </div>
        </div>

        <div>
            <div class="font-semibold">Domains</div>
            <div class="description">{classData.domains.join(' & ')}</div>
        </div>

        <div>
            <div class="font-semibold">Class items (choose one)</div>
            {#each classData.classItems as item}
                <div class="description">{item}</div>
            {/each}
        </div>
    </div>

    <h2>Hope Features</h2>

    {#each classData.hopeFeatures as feature}
        <p>
            <span class="font-semibold">{feature.name}:</span>
            <span class="description">{feature.description}</span>
        </p>
    {/each}

    <h2>Class Features</h2>

    {#each classData.classFeatures as feature}
        <p>
            <span class="font-semibold">{feature.name}:</span>
            <span class="description">{feature.description}</span>
        </p>
    {/each}

    <h1 class="text-2xl font-semibold">Subclasses</h1>

    <div class="flex gap-x-4">
        {#each classData.subclasses as subclass, index}
            <button class="border px-2 py-1" class:active={index === selectedSubclassIndex}
                    onclick={() => selectedSubclassIndex = index}>
                {subclass.name}
            </button>
        {/each}
    </div>

    <p>{selectedSubclass.description}</p>

    <h2>Foundation Features</h2>
    {#each selectedSubclass.features.foundation as feature}
        <p>
            <span class="font-semibold">{feature.name}:</span>
            <span class="description">{feature.description}</span>
        </p>
    {/each}

    <h2>Specialization Features</h2>
    {#each selectedSubclass.features.specialization as feature}
        <p>
            <span class="font-semibold">{feature.name}:</span>
            <span class="description">{feature.description}</span>
        </p>
    {/each}

    <h2>Mastery Features</h2>
    {#each selectedSubclass.features.mastery as feature}
        <p>
            <span class="font-semibold">{feature.name}:</span>
            <span class="description">{feature.description}</span>
        </p>
    {/each}
</div>

<style lang="postcss">
    @reference "tailwindcss";

    .active {
        @apply bg-blue-200;
    }

    .description {
        @apply text-black italic;
    }

    h2 {
        @apply text-xl font-semibold;
    }
</style>