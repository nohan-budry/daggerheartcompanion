<script lang="ts">
    // @ts-ignore
    import searchIndex from "virtual:dh-search-index";
    import {base} from "$app/paths";

    let {
        isOpen = false,
        close,
        navigate,
    } = $props();

    $effect(() => {
        if (isOpen) {
            searchInputElement.focus();
            searchInputElement.select()
        }
    })

    let searchInputElement: HTMLInputElement;
    let searchInput = $state('');
    let searchResults = $derived(
        searchInput.length
            ? searchIndex.filter((item) => item.name.toLowerCase().includes(searchInput.toLowerCase()))
            : [],
    )

    function onClose() {
        close();
    }

    function onNavigate(path: string) {
        navigate(base + path);
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            close();
        }
    }
</script>

<svelte:window on:keydown={handleKeydown}/>

{#if isOpen}
    <div class="background" onclick={onClose}>
        <div class="container py-4 flex flex-col gap-4 overflow-scroll" onclick={(e) => e.stopPropagation()}>
            <div class="mx-4 bg-blue-50">
                <input type="text" placeholder="Search..."
                       bind:value={searchInput} bind:this={searchInputElement}
                       class="w-full px-4 py-4 focus:outline-1 focus:outline-blue-100 ">
            </div>
            {#each searchResults as result, index}
                {#if index > 0}
                    <hr class="-my-4 text-gray-400">
                {/if}
                <div class="px-8 py-4 hover:bg-blue-200 cursor-pointer" onclick={() => onNavigate(result.path)}>
                    <div class="flex gap-2 justify-between">
                        <div class="font-semibold">{result.name}</div>
                        <div class="text-sm">Source: {result.source}</div>
                    </div>
                    <div class="text-sm italic">{result.description}</div>
                </div>
            {/each}
        </div>
    </div>
{/if}

<style lang="postcss">
    @reference "tailwindcss";

    .background {
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
        background-color: rgba(100, 100, 100, 0.3);
        @apply w-screen h-screen fixed top-0 left-0 p-32;
    }

    .container {
        @apply w-full min-h-64 max-h-full;
        @apply bg-white shadow-2xl;
    }
</style>