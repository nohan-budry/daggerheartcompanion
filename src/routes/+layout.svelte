<script lang="ts">
    import '$lib/assets/css/main.scss';
    import dhCompatibleSVG from '$lib/assets/images/dh-compatible.svg'
    import {page} from "$app/state";
    import {base} from "$app/paths";

    let {children} = $props();

    let navLinks = [
        {path: `${base}/`, name: 'Home'},
        {path: `${base}/classes`, name: 'Classes'},
    ];

    function isCurrentPage(path: string): boolean {
        if (path === base + '/') {
            return page.url.pathname === path;
        }

        return !!page.url.pathname.startsWith(base + path);
    }
</script>

<div class="content">
    <nav>
        {#each navLinks as navLink}
            <a class:active={isCurrentPage(navLink.path)} href={navLink.path}>
                {navLink.name}
            </a>
        {/each}
    </nav>

    <div class="page">
        {@render children()}
    </div>
</div>

<footer>
    <div>
        This product includes materials from the Daggerheart System Reference Document 1.0,
        © Critical Role, LLC. under the terms of the Darrington Press Community Gaming (DPCGL) License.
        More information can be found at <a href="https://www.daggerheart.com">https://www.daggerheart.com</a>.
        There are no previous modifications by others.
    </div>
    <img src="{dhCompatibleSVG}" alt="Daggerheart Compatible"/>
</footer>

<style lang="scss">
  @use "sass:color";

  .content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    min-height: 100vh;
    padding-bottom: 3rem;
    margin-bottom: -1rem;

    nav {
      position: sticky;
      top: 0;
      left: 0;

      display: flex;
      gap: 2rem;

      padding: 2rem var(--side-spacing-size);
      background-color: var(--color-primary);

      a {
        text-decoration: none;
        color: color.adjust(black, $lightness: 35%, $space: hsl);
        text-transform: uppercase;
        padding: 0.5rem 1rem;

        &:hover, &:focus, &.active {
          color: black;
          border-bottom: 1px solid black;
        }
      }
    }

    .page {
      flex: 1;
    }
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: start;
    padding: 2rem var(--side-spacing-size);
    background-color: var(--color-primary);
    gap: 4rem;

    img {
      max-width: 300px;
    }
  }
</style>