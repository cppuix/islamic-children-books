<script>
    import { page } from '$app/state';

    let { data } = $props();
    const essays = $derived(data.essays);
    const searchIndex = $derived(data.searchIndex);

    let selectedTag = $derived(page.url.searchParams.get('tag'));
    let searchQuery = $state("");

    let filteredEssays = $derived.by(() => {
        let result = essays;

        if (selectedTag) {
            result = result.filter(essay => essay.tags?.includes(selectedTag));
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            const matchingSlugs = searchIndex
                // Added .toLowerCase() here as a safe guard
                .filter(item => item.searchText.toLowerCase().includes(query))
                .map(item => item.slug);
            result = result.filter(essay => matchingSlugs.includes(essay.id));
        }

        return result;
    });
</script>

<h2 class="page-title">Essays</h2>

<input 
    bind:value={searchQuery} 
    placeholder="Search essays..." 
    aria-label="Search essays" 
/>

{#if selectedTag}
    <p>Filtering by tag: <strong>{selectedTag}</strong> <a href="/essays">Clear</a></p>
{/if}
<hr>

{#if filteredEssays.length === 0}
    <p class="empty-state">No essays found matching your criteria.</p>
{:else}
    <ul>
        {#each filteredEssays as essay}
            <li>
                <a href="/essays/{essay.id}">{essay.title}</a>
                <p class="lead">{essay.lead}</p>
                <p class="date">{new Date(essay.date).toLocaleDateString()}</p>
                <div class="tags">
                    {#each essay.tags as tag}
                        <a class="tag" href="/essays?tag={tag}">{tag}</a>
                    {/each}
                </div>
            </li>
        {/each}
    </ul>
{/if}

<style>
    li {
        margin-bottom: 2rem;
        overflow-wrap: break-word;
        word-break: break-word;
    }
    a {
        text-decoration: underline;
        color: var(--leather-binding);
    }
    .lead {
        color: var(--ink-faded);
        font-size: 0.8em;
        overflow-wrap: break-word;
        word-break: break-word;
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

    input
    {
        font-family: 'Playpen Sans Arabic';
        width: 100%;
        padding: 0.5rem;
        background-color: var(--paper-cover);
        border: 1px solid rgba(from var(--gold-shine) r g b / 50%);
        border-radius: 5px;
        box-shadow: 1px 1px 4px rgba(from var(--gold-leaf) r g b / 50%) inset;
    }
    input:focus {
        outline: 2px solid var(--gold-shine);
        outline-offset: 2px;
    }

    .empty-state {
    color: var(--ink-faded);
    font-style: italic;
    text-align: center;
    margin-top: 2rem;
}
</style>
