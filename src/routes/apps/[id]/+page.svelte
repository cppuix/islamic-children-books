<script>
    let { data } = $props();
</script>

<a href="/apps" class="back-link">← All apps</a>

<article class="app-page">
    <div class="app-header">
        <img class="app-thumb" src={data.app.thumbnail} alt={data.app.title} loading="lazy" />
        <div class="app-heading">
            <h1>{data.app.title}</h1>
            <p class="subtitle">{data.app.subtitle}</p>
            {#if data.app.pricing}
                <p class="pricing">{data.app.pricing}</p>
            {/if}
        </div>
    </div>

    <div class="tags">
        {#each data.app.tags as tag}
            <span class="tag">{tag}</span>
        {/each}
    </div>

    {#if data.content}
        <div class="body">
            <data.content />
        </div>
    {:else}
        <p class="desc">{data.app.description}</p>
    {/if}

    <a class="cta" href={data.app.link} target="_blank" rel="noopener">Open app</a>
</article>

<style>
    .back-link {
        display: inline-block;
        margin-bottom: 1.5rem;
        color: var(--ink-faded);
        text-decoration: none;
    }
    .back-link:hover {
        color: var(--leather-binding);
    }

    .app-page {
        max-width: 70ch;
        margin: 0 auto;
    }

    .app-header {
        display: flex;
        gap: 1.5rem;
        align-items: flex-start;
        flex-wrap: wrap;
    }
    .app-thumb {
        width: 220px;
        max-width: 40%;
        border-radius: 6px;
        border: 1px solid rgb(from var(--gold-leaf) r g b / 40%);
    }
    .app-heading {
        flex: 1;
        min-width: 220px;
    }
    h1 {
        color: var(--leather-binding);
        margin: 0 0 0.25rem;
    }
    .subtitle {
        font-style: italic;
        color: var(--ink-faded);
        margin: 0 0 0.5rem;
    }
    .pricing {
        font-family: 'FiraCode';
        font-size: 0.75rem;
        color: var(--gold-leaf);
        margin: 0;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5em;
        margin: 1.25rem 0;
    }
    .tag {
        padding: 4px 10px;
        font-size: 0.62rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--paper-page);
        background-color: var(--gold-leaf);
        border-radius: 9999px;
        font-weight: bold;
    }

    .body :global(h2) {
        font-family: "Cinzel";
        color: var(--leather-binding);
        margin-top: 2rem;
        font-size: 1.25rem;
    }
    .body :global(p) {
        line-height: 1.75;
    }
    .body :global(ul) {
        line-height: 1.75;
        padding-left: 1.25rem;
    }
    .body :global(li) {
        margin-bottom: 0.4rem;
    }

    .desc {
        line-height: 1.75;
    }

    .cta {
        display: inline-block;
        margin-top: 2rem;
        padding: 0.7rem 1.6rem;
        background-color: var(--leather-binding);
        color: var(--paper-page);
        text-decoration: none;
        border-radius: 4px;
        font-weight: bold;
        transition: background-color 0.2s;
    }
    .cta:hover {
        background-color: var(--ink-green);
    }
</style>
