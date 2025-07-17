<script lang="ts">
    import '$lib/assets/css/main.css';
    import dhCompatibleSVG from '$lib/assets/images/dh-compatible.svg'
    import {page} from "$app/state";
    import {base} from "$app/paths";
    import SearchComponent from "$lib/components/search-component/SearchComponent.svelte";

    let {children} = $props();
    let isSearchOpen = $state(false);

    let navLinks = [
        {path: `${base}/`, name: 'Home'},
        {path: `${base}/ancestries`, name: 'Ancestries'},
        {path: `${base}/communities`, name: 'Communities'},
        {path: `${base}/classes`, name: 'Classes'},
        {path: `${base}/domains`, name: 'Domains'},
        {path: `${base}/equipments`, name: 'Equipments'},
        {path: `${base}/loots`, name: 'Loots'},
        {path: `${base}/adversaries`, name: 'Adversaries'},
    ];

    function isCurrentPage(path: string): boolean {
        if (path === base + '/') {
            return page.url.pathname === path;
        }

        return !!page.url.pathname.startsWith(path);
    }

    function searchClose() {
        isSearchOpen = false;
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (!isSearchOpen) {
            if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
                event.preventDefault();
                isSearchOpen = true;
            }
        }
    }
</script>

<svelte:window onkeydown={handleKeyDown}/>

<SearchComponent isOpen={isSearchOpen} close={searchClose}/>

<div class="min-h-screen -mb-4 pb-8">
    <nav class="bg-blue-100">
        <div class="w-app p-4 flex flex-wrap gap-4">
            {#each navLinks as navLink}
                <a class="px-4 py-2 hover:text-blue-400 focus:text-blue-400"
                   class:active={isCurrentPage(navLink.path)} href={navLink.path}>
                    {navLink.name}
                </a>
            {/each}
            <button class="cursor-pointer border px-2 py-1 hover:bg-blue-200 focus:bg-blue-200" onclick={() => isSearchOpen = true}>Search</button>
        </div>
    </nav>

    <div class="p-4 w-app">
        {@render children()}
    </div>
</div>

<footer class="bg-blue-100">
    <div class="w-app flex flex-col gap-4 p-4 md:flex-row">
        <div>
            This product includes materials from the Daggerheart System Reference Document 1.0,
            © Critical Role, LLC. under the terms of the Darrington Press Community Gaming (DPCGL) License.
            More information can be found at <a class="text-blue-400" href="https://www.daggerheart.com">https://www.daggerheart.com</a>.
            There are no previous modifications by others.
        </div>
        <img class="w-64 m-auto" src="{dhCompatibleSVG}" alt="Daggerheart Compatible"/>
    </div>
    <div class="p-4 w-app feedback">
        <h1>Feedback or Bug Reports?</h1>
        <p>Found a bug or have an idea for improvement? Feel free to reach out: <a href="mailto:nohan@daggerheartcompanion.com">nohan@daggerheartcompanion.com</a></p>
    </div>
</footer>

<style lang="postcss">
    @reference "tailwindcss";

    .active {
        @apply text-blue-400 border-b border-b-blue-400;
    }

    .feedback {
        h1 {
            @apply text-xl font-semibold;
        }

        a {
            @apply text-blue-400;
        }
    }
</style>