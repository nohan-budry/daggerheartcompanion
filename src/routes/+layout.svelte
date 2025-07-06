<script lang="ts">
    import '$lib/assets/css/main.scss';

    let { children } = $props();
</script>

<nav>
    <a href="/classes">Classes</a>
</nav>

<div>
    {@render children()}
</div>