<script lang="ts">
    import {page} from "$app/state";

    let {children, data} = $props();
    let {classesData} = data;

    function classUrl(name: string): string {
        return '/classes/' + name.toLowerCase().replace(/\s/g, '-');
    }
</script>

<div class="content">
    <nav>
        <ul>
            {#each classesData as classData}
                <li>
                    <a class:selected={page.url.pathname === classUrl(classData.name)}
                       href={classUrl(classData.name)}>
                        {classData.name}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
    <main>
        {@render children()}
    </main>
</div>

<style lang="scss">
  .content {
    width: 80%;
    margin: auto;

    display: flex;
    gap: 2rem;
  }

  nav {
    flex: 1;

    ul {
      padding: 0;

      li {
        list-style: none;
        border-bottom: 1px solid black;

        a {
          display: block;
          width: 100%;
          height: 100%;
          padding: 0.5rem;

          color: black;
          text-decoration: none;
        }

        a:hover, a:focus {
          background-color: var(--color-primary);
        }

        a.selected {
          background-color: var(--color-primary);
        }
      }
    }
  }

  main {
    flex: 3;
  }
</style>
