<script lang="ts">
    import {slugify} from "$lib/utils/slugify";

    let {data} = $props();
    let {adversaries} = data;

    let tiers = [
        adversaries.filter(({tier}) => tier === 1),
        adversaries.filter(({tier}) => tier === 2),
        adversaries.filter(({tier}) => tier === 3),
        adversaries.filter(({tier}) => tier === 4),
    ];

    function bonus(value: number): string {
        return (value >= 0 ? '+' : '') + value;
    }
</script>

<div class="flex flex-col gap-4">
    <h1>Adversaries</h1>

    {#each tiers as tier, index}
        <h2>Tier {index + 1}</h2>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {#each tier as adversary}
                <div id={'adversary-' + slugify(adversary.name)}
                     class="flex flex-col gap-2 border p-2 w-full">
                    <h3>
                        <span>{adversary.name}</span>
                    </h3>

                    <div>
                        <span class="italic">{adversary.description}</span>
                    </div>

                    <div>
                        <span class="font-semibold">Type:</span>
                        <span class="italic">{adversary.type}</span>
                    </div>

                    <div>
                        <span class="font-semibold">Motives & Tactics:</span>
                        <span class="italic">{adversary.motivesAndTactics.join(', ')}</span>
                    </div>

                    <div>
                        <span class="font-semibold">Experiences:</span>
                        <span class="italic">{adversary.experiences.join(', ')}</span>
                    </div>

                    <div>
                        <span class="font-semibold">Difficulty:</span>
                        <span class="italic">{adversary.difficulty}</span>
                        |
                        <span class="font-semibold">Thresholds:</span>
                        <span class="italic">{adversary.thresholds}</span>
                    </div>

                    <div>
                        <span class="font-semibold">HP:</span>
                        <span class="italic">{adversary.hitPoints}</span>
                        |
                        <span class="font-semibold">Stress:</span>
                        <span class="italic">{adversary.stress}</span>
                    </div>

                    <div>
                        <span class="font-semibold">{adversary.attack.name}:</span>
                        <span class="italic">{bonus(adversary.attack.bonus)} {adversary.attack.range} {adversary.attack.damage}</span>
                    </div>

                    {#each adversary.features as feature}
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
</style>