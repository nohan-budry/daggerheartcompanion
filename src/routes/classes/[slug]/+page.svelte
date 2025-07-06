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

<h1>{classData.name}</h1>

<p>{classData.description}</p>

<div class="class-details">
    <div class="base-traits">
        <div>Evasion:</div>
        <div>{classData.startingEvasion}</div>
        <div>Hit Points:</div>
        <div>{classData.startingHitPoints}</div>
    </div>

    <div>
        <div><b>Domains</b></div>
        <div>{classData.domains.join(' & ')}</div>
    </div>

    <div>
        <div><b>Class items (choose one)</b></div>
        {#each classData.classItems as item}
            <div>{item}</div>
        {/each}
    </div>
</div>

<div class="class-features">
    <h2>Hope Features</h2>
    {#each classData.hopeFeatures as feature}
        <p><b>{feature.name}:</b> {feature.description}</p>
    {/each}

    <h2>Class Features</h2>
    {#each classData.classFeatures as feature}
        <p><b>{feature.name}:</b> {feature.description}</p>
    {/each}
</div>

<div class="subclasses">
    <div class="subclass-tabs">
        <h2>Subclasses</h2>
        {#each classData.subclasses as subclass, index}
            <div class="subclass-tab" class:selected={index === selectedSubclassIndex}
                 on:click={() => selectedSubclassIndex = index}>
                {subclass.name}
            </div>
        {/each}
    </div>

    <div class="selected-subclass">
<!--        <h2>{selectedSubclass.name}</h2>-->
        <p>{selectedSubclass.description}</p>

        <h3>Foundation Features</h3>
        {#each selectedSubclass.features.foundation as feature}
            <p><b>{feature.name}:</b> {feature.description}</p>
        {/each}

        <h3>Specialization Features</h3>
        {#each selectedSubclass.features.specialization as feature}
            <p><b>{feature.name}:</b> {feature.description}</p>
        {/each}

        <h3>Mastery Features</h3>
        {#each selectedSubclass.features.mastery as feature}
            <p><b>{feature.name}:</b> {feature.description}</p>
        {/each}
    </div>
</div>

<style lang="scss">

  .class-details {
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    .base-traits {
      display: grid;
      grid-template-columns: auto auto;
      grid-template-rows: min-content min-content;
      grid-column-gap: 1rem;
      grid-row-gap: 0;

      div:nth-child(2n+1) {
        font-weight: bold;
      }

      div:nth-child(2n) {
        text-align: right;
      }
    }
  }

  .subclasses {
    .subclass-tabs {
      display: flex;
      align-items: center;
      gap: 2rem;

      .subclass-tab {
        padding: 0.2rem 1rem;
        border-bottom: 1px solid black;
        cursor: pointer;

        &:hover, &:focus, &.selected {
          background-color: var(--color-primary);
        }
      }
    }
  }
</style>