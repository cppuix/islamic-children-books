<!-- src/routes/about/+page.svelte -->
<script>
    import FontResizer from "$lib/components/FontResizer.svelte";
    let { data } = $props();
</script>

<article class="blog-container">
    {#if data?.meta?.title}
        <h1>{data.meta.title}</h1>
    {/if}

    <!-- Renders the Markdown content body -->
    <data.content />
</article>

<style>
    .blog-container {
        margin-top: 1rem;
        padding: 20px;
        padding-top: 1px;
        border-radius: 10px;
        box-shadow:
            -2px -2px 16px rgb(from var(--gold-leaf) r g b / 10%),
            2px 2px 16px rgb(from var(--gold-leaf) r g b / 10%);

        line-height: 2;
    }
</style>
