<script>
    let { data } = $props();
    let { book } = $derived(data);

    let isIframeLoaded = $state(false);

    const getFileId = (url) => url.match(/id=([^&]+)/)?.[1];
    const getPreviewUrl = (url) => {
        const id = getFileId(url);
        return id ? `https://drive.google.com/file/d/${id}/preview` : '';
    };
</script>

<a href="/booklets" class="back-link">← All booklets</a>

<article class="book-page">
    <div class="book-header">
        <img class="cover" src={book.thumbnail} alt={book.title} loading="lazy" />
        <div class="book-heading">
            <h1>{book.title}</h1>
            <p class="subtitle">{book.subtitle}</p>
            {#if book.category}
                <p class="category">{book.category}</p>
            {/if}
        </div>
    </div>

    <p class="desc">{book.description}</p>

    <div class="tags">
        {#each book.tags as tag}
            <span class="tag">{tag}</span>
        {/each}
    </div>

    <div class="actions">
        <a class="btn-primary" href={book.link} target="_blank" rel="noopener">Download PDF</a>
    </div>

    <section class="reader">
        <h2>Read online</h2>
        {#if !isIframeLoaded}
            <p class="loading">Opening booklet…</p>
        {/if}
        <iframe
            class="pdf-frame"
            class:loaded={isIframeLoaded}
            src={getPreviewUrl(book.link)}
            title="PDF Viewer: {book.title}"
            frameborder="0"
            allow="autoplay"
            onload={() => (isIframeLoaded = true)}
        ></iframe>
    </section>
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

    .book-page {
        max-width: 72ch;
        margin: 0 auto;
    }

    .book-header {
        display: flex;
        gap: 1.5rem;
        align-items: flex-start;
        flex-wrap: wrap;
    }
    .cover {
        width: 220px;
        max-width: 40%;
        border-radius: 6px;
        border: 1px solid rgb(from var(--gold-leaf) r g b / 40%);
    }
    .book-heading {
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
    .category {
        font-family: "Cinzel";
        font-size: 0.75rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--gold-leaf);
        margin: 0;
    }

    .desc {
        line-height: 1.75;
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

    .actions {
        margin: 1.5rem 0;
    }
    .btn-primary {
        display: inline-block;
        padding: 0.7rem 1.6rem;
        background-color: var(--leather-binding);
        color: var(--paper-page);
        text-decoration: none;
        border-radius: 4px;
        font-weight: bold;
        transition: background-color 0.2s;
    }
    .btn-primary:hover {
        background-color: var(--ink-green);
    }

    .reader {
        margin-top: 2rem;
    }
    .reader h2 {
        font-family: "Cinzel";
        color: var(--leather-binding);
        font-size: 1.25rem;
    }
    .loading {
        color: var(--ink-faded);
        font-style: italic;
    }
    .pdf-frame {
        width: 100%;
        height: 70vh;
        border: 1px solid rgb(from var(--gold-leaf) r g b / 40%);
        border-radius: 6px;
        opacity: 0;
        transition: opacity 0.4s ease;
    }
    .pdf-frame.loaded {
        opacity: 1;
    }
</style>
