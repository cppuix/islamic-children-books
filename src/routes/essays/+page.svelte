<!-- src/routes/applets/+page.svelte -->

<script>
    import essays from "$lib/data/essays.json";
    const contentPath = "$lib/content/";
</script>

<h2 class="page-title">Essays</h2>

<ul>
    {#each essays as essay}
        <li>
            <a href='/essays/{essay.id}'>{essay.title}</a>
            <p class="lead">{essay.lead}</p>
            <p class="date">{essay.date}</p>
            <div class="tags">
                {#each essay.tags as tag}
                <a class="tag" href="/essays?tag={tag}">{tag}</a>
                {/each}
            </div>
        </li>
    {/each}
</ul>

<style>
    li 
    {
        margin-bottom: 2rem;
    }
    a {
        text-decoration: underline;
        color: var(--leather-binding);
    }

    .lead {
        color: var(--ink-faded);
        font-size: 0.8em;
    }
    .date {
        color: var(--ribbon-red);
        font-size: 0.8em;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
    }
    .tag {
        text-decoration: none;
        padding: 6px;
        font-size: 0.4rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--paper-page);
        background-color: var(--gold-leaf);
        border-radius: 9999px;
        font-weight: bold;
    }
</style>
