<script>
    let { data } = $props();

    // ✅ FIXED: Wrapped inside a closure via $derived.by()
    let formattedDate = $derived.by(() => {
        if (!data?.meta?.date) return '';

        const date = new Date(data.meta.date);
        
        const hijri = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC'
        }).format(date);

        const gregorian = new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC'
        }).format(date);

        return `${hijri} | ${gregorian}`;
    });
</script>

<a href="/essays">Return</a>
<article class="blog-container">
    <!-- 1. Frontmatter title -->
    {#if data?.meta}
    <h2>{data.meta.title}</h2>
    <p class="date">{formattedDate}</p>
    <div class="tags">
        {#each data.meta.labels as label}
        <a class="tag" href="/essays?tag={label}">{label}</a>
        {/each}
    </div>

    <data.content />
{/if}
</article>

<style>

    .blog-container
    {
        margin-top: 1rem;
        margin-inline: auto;
        padding: 20px;
        padding-top: 1px;
        max-width: 75ch; /* comfortable reading length */
        border-radius: 10px;
        box-shadow:
            -2px -2px 16px rgb(from var(--gold-leaf) r g b / 10%),
            2px 2px 16px rgb(from var(--gold-leaf) r g b / 10%);
        /* Break long words/URLs so nothing overflows the card */
        overflow-wrap: break-word;
        word-break: break-word;
        min-width: 0;
    }

    /* Keep markdown content readable and inside the card */
    .blog-container :is(p, li, blockquote) {
        line-height: 1.7;
    }

    .blog-container img {
        max-width: 100%;
        height: auto;
    }

    .blog-container pre {
        max-width: 100%;
        overflow-x: auto;
    }

    a {
        text-decoration: underline;
        color: var(--leather-binding);
    }

    @media (max-width: 640px) {
        .blog-container {
            padding: 12px;
        }
    }

    .date {
        color: var(--ink-green);
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
