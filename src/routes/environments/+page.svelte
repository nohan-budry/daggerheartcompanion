<script lang="ts">
    import {slugify} from "$lib/utils/slugify";

    let {data} = $props();
    let {environments} = data;

    let tiers = [
        environments.filter(({tier}) => tier === 1),
        environments.filter(({tier}) => tier === 2),
        environments.filter(({tier}) => tier === 3),
        environments.filter(({tier}) => tier === 4),
    ];

    function bonus(value: number): string {
        return (value >= 0 ? '+' : '') + value;
    }
</script>

<div class="flex flex-col gap-4">
    <h1>Adversaries</h1>

    {#each tiers as tier, index}
        <h2>Tier {index + 1}</h2>

        <div class="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
            {#each tier as environment}
                <div id={'environment-' + slugify(environment.name)}
                     class="flex flex-col gap-2 border p-2 w-full">
                    <h3>
                        <span>{environment.name}</span>
                    </h3>

                    <div>
                        <span class="italic">{environment.description}</span>
                    </div>

                    <div>
                        <span class="font-semibold">Type:</span>
                        <span class="italic">{environment.type}</span>
                    </div>

                    <div>
                        <span class="font-semibold">Impulses:</span>
                        <span class="italic">{environment.impulses.join(', ')}</span>
                    </div>

                    <div>
                        <span class="font-semibold">Difficulty:</span>
                        <span class="italic">{environment.difficulty}</span>
                    </div>

                    <div>
                        <span class="font-semibold">Potential Adversaries:</span>
                        <span class="italic">{environment.adversaries}</span>
                    </div>

                    <h4>Features</h4>

                    {#each environment.features as feature}
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

    h4 {
        @apply text-xl;
    }
</style>