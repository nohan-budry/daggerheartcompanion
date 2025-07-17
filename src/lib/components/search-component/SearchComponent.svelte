<script lang="ts">
    // @ts-ignore
    import searchIndex from "virtual:dh-search-index";
    import {base} from "$app/paths";

    let {
        isOpen = false,
        close
    } = $props();

    $effect(() => {
        if (isOpen) {
            searchInputElement?.focus();
            searchInputElement?.select()
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    })

    let searchInputElement: HTMLInputElement | undefined = $state();
    let searchInput = $state('');
    let searchResults = $derived(
        searchInput.length
            ? searchIndex.filter((item) => item.name.toLowerCase().includes(searchInput.toLowerCase()))
            : [],
    )

    function getFocusableElements(): HTMLElement[] {
        return [...document.querySelectorAll<HTMLElement>('#main-search .focusable').values()]
            .sort((a, b) => a.tabIndex - b.tabIndex);
    }

    function handleKeydown(event: KeyboardEvent) {
        if (isOpen) {
            if (event.key === 'Escape') {
                close();
            }

            if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
                event.preventDefault();
                searchInputElement?.focus();
                searchInputElement?.select()
            }

            if (event.key === 'Tab') {
                let focusables = getFocusableElements();
                if (focusables.length) {
                    let first = focusables[0];
                    let last = focusables[focusables.length - 1];
                    if (event.shiftKey && document.activeElement === first) {
                        event.preventDefault();
                        last.focus();
                    } else if (!event.shiftKey && document.activeElement === last) {
                        event.preventDefault();
                        first.focus();
                    }
                }
            }

            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                let focusables = getFocusableElements();
                if (focusables.length) {
                    let index = focusables.indexOf(document.activeElement as HTMLElement);
                    index += event.key === 'ArrowDown' ? 1 : -1;
                    index = Math.max(0, Math.min(index, focusables.length - 1));

                    let next = focusables[index];
                    if (next) {
                        event.preventDefault();
                        next.focus();
                    }
                }
            }
        }
    }
</script>

<svelte:window on:keydown={handleKeydown}/>

{#if isOpen}
    <div class="search-background" onclick={close} role="presentation" aria-hidden="true">
        <div id="main-search" class="search-container overflow-scroll"
             role="presentation" aria-hidden="true" aria-label="Search"
             onclick={(e) => e.stopPropagation()}>
            <div role="dialog" aria-modal="true" aria-label="Search">
                <div class="sticky top-0 left-0 p-4 bg-white">
                    <div>
                        <input type="text" placeholder="Search..."
                               bind:value={searchInput} bind:this={searchInputElement}
                               class="flex-1 focusable w-full px-4 py-4 bg-blue-100 border border-blue-100 focus:border-blue-200">
                    </div>
                </div>
                {#if searchResults.length}
                    <div>
                        {#each searchResults as result, index}
                            <hr class="text-gray-400">
                            <a class="focusable block px-8 py-4 hover:bg-blue-50 active:bg-blue-200 focus:bg-blue-200 cursor-pointer"
                               onclick={close} href={`${base}${result.path}`}>
                                <div class="flex gap-2 justify-between items-center">
                                    <div class="font-semibold">{result.name}</div>
                                    <div class="text-sm">Source: {result.source}</div>
                                </div>
                                {#if result.description}
                                    <div class="text-sm italic">{result.description}</div>
                                {/if}
                            </a>
                        {/each}
                    </div>
                {/if}
                <div class="sticky bottom-0 left-0 flex flex-row-reverse p-2 bg-white">
                    <button class="focusable hover:text-blue-400 focus:text-blue-400 focus:outline-0 cursor-pointer"
                            onclick={close}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}

<style lang="postcss">
    @reference "tailwindcss";

    .search-background {
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
        background-color: rgba(100, 100, 100, 0.3);
        @apply z-50 w-screen h-screen fixed top-0 left-0 p-4 sm:p-8 md:p-12 lg:p-16 xl:p-32 2xl:p-64;
    }

    .search-container {
        @apply w-full max-h-full;
        @apply bg-white shadow-2xl;
    }
</style>