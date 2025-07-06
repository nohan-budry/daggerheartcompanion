<script lang="ts">
    import '$lib/assets/css/main.css';
    import dhCompatibleSVG from '$lib/assets/images/dh-compatible.svg'
    import {page} from "$app/state";
    import {base} from "$app/paths";

    let {children} = $props();

    let navLinks = [
        {path: `${base}/`, name: 'Home'},
        {path: `${base}/ancestries`, name: 'Ancestries'},
        {path: `${base}/communities`, name: 'Communities'},
        {path: `${base}/classes`, name: 'Classes'},
    ];

    function isCurrentPage(path: string): boolean {
        if (path === base + '/') {
            return page.url.pathname === path;
        }

        return !!page.url.pathname.startsWith(path);
    }
</script>

<div class="min-h-screen -mb-4 pb-8">
    <nav class="bg-blue-100">
        <div class="w-app p-4 flex flex-wrap gap-4">
            {#each navLinks as navLink}
                <a class="px-4 py-2 hover:text-blue-400"
                   class:active={isCurrentPage(navLink.path)} href={navLink.path}>
                    {navLink.name}
                </a>
            {/each}
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
</footer>

<style lang="postcss">
    @reference "tailwindcss";

    .active {
        @apply text-blue-400 border-b border-b-blue-400;
    }
</style>