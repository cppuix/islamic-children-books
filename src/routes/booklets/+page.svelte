<script>
    import books from "$lib/data/books.json";

    let activeBook = $state(null);
    let isIframeLoaded = $state(false);

    const getFileId = (url) => url.match(/id=([^&]+)/)?.[1];
    const getPreviewUrl = (url) => {
        const id = getFileId(url);
        return id ? `https://drive.google.com/file/d/${id}/preview` : '';
    };

    const openReader = (book) => {
        isIframeLoaded = false;
        activeBook = book;
    };

    const closeReader = () => {
        activeBook = null;
        isIframeLoaded = false;
    };
</script>

<h2 class="page-title">Booklets</h2>

<div class="books-inventory">
    {#each books as book}
        <div class="book-card">
            <div class="cover-frame">
                <img src={book.thumbnail} alt={book.title} class="cover-img" loading="lazy" />
            </div>
            <div class="titles-container">
                <h3 class="book-title">{book.title}</h3>
                <p class="book-subtitle">{book.subtitle}</p>
            </div>
            <p class="book-description">{book.description}</p>
            
            <div class="action-buttons">
                <button class="btn btn-primary" onclick={() => openReader(book)}>
                    Read Online
                </button>
                <a 
                    target="_blank" 
                    class="btn btn-secondary" 
                    href={book.link}
                    aria-label="Download {book.title}"
                >
                    Download PDF
                </a>
            </div>

            <div class="book-tags">
                {#each book.tags as tag}
                    <span class="book-tag">{tag}</span>
                {/each}
            </div>
        </div>
    {/each}
</div>

<!-- Elegant PDF Reader Modal -->
{#if activeBook}
    <div 
        class="modal-backdrop" 
        onclick={(e) => e.target === e.currentTarget && closeReader()} 
        onkeydown={(e) => e.key === 'Escape' && closeReader()} 
        tabindex="-1"
        role="dialog"
        aria-modal="true"
    >
        <!-- Removed onclick completely from here! -->
        <div class="modal-content">
            <div class="modal-header">
                <div class="header-text">
                    <h3>{activeBook.title}</h3>
                    <p class="header-subtitle">{activeBook.subtitle}</p>
                </div>
                <button class="close-btn" onclick={closeReader} aria-label="Close reader">&times;</button>
            </div>
            
            <div class="modal-body">
                {#if !isIframeLoaded}
                    <div class="loading-indicator">
                        <div class="spinner"></div>
                        <p class="loading-text">Opening booklet...</p>
                    </div>
                {/if}

                <iframe 
                    src={getPreviewUrl(activeBook.link)} 
                    title="PDF Viewer: {activeBook.title}"
                    frameborder="0"
                    allow="autoplay"
                    class="pdf-frame"
                    class:loaded={isIframeLoaded}
                    onload={() => isIframeLoaded = true}
                ></iframe>
            </div>
        </div>
    </div>
{/if}

<style>
    /* --- Existing Card Styles --- */
    .titles-container { display: flex; flex-direction: column; gap: 5px; }
    .books-inventory {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        justify-content: space-between;
        gap: 1.5rem;
        color: #1c3a2e;
    }
    .book-card {
        display: flex; flex-direction: column; gap: 10px; padding: 15px;
        border-radius: 10px; border: 1px solid rgb(from var(--gold-leaf) r g b / 50%);
        background-color: rgb(from var(--paper-page) r g b / 10%);
        box-shadow: 0 5px 20px rgba(185, 138, 46, 0.2);
    }
    .cover-frame {
        width: 100%; aspect-ratio: 4 / 3; overflow: hidden; border-radius: 4px;
        box-shadow: inset 0 0 12px 4px rgba(0, 0, 0, 0.05);
    }
    .cover-img {
        filter: blur(0.2px);
        mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent),
                    linear-gradient(to bottom, transparent, black 4%, black 96%, transparent);
        mask-composite: intersect;
        width: 100%; height: 100%; object-fit: cover; object-position: center;
    }
    .book-tags { display: flex; flex-wrap: wrap; gap: 0.5em; margin-top: auto; }
    .book-tag {
        padding: 4px 8px; font-size: 0.6rem; text-transform: uppercase; letter-spacing: 1px;
        color: var(--paper-page); background-color: var(--gold-leaf);
        border-radius: 9999px; font-weight: bold;
    }
    h3.book-title { text-align: center; margin: 0; color: var(--leather-binding); font-size: 1.1rem; }
    .book-subtitle { font-style: italic; color: var(--ink-faded); font-size: 0.85rem; text-align: center; margin: 0; }
    .book-description { font-size: 0.9rem; color: var(--ink-black); text-align: left; line-height: 1.4; flex-grow: 1; }
    .action-buttons { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
    .btn {
        flex: 1; padding: 0.6rem; border-radius: 4px; font-size: 0.85rem; font-weight: bold;
        text-align: center; text-decoration: none; cursor: pointer; transition: all 0.2s ease;
        border: 1px solid transparent; font-family: inherit;
    }
    .btn-primary { background-color: var(--leather-binding); color: var(--paper-page); }
    .btn-primary:hover { background-color: var(--ink-green); }
    .btn-secondary { background-color: transparent; color: var(--leather-binding); border-color: var(--leather-binding); }
    .btn-secondary:hover { background-color: var(--leather-binding); color: var(--paper-page); }

    /* --- Modal Styles --- */
    .modal-backdrop {
        position: fixed; inset: 0;
        background-color: rgba(28, 58, 46, 0.9);
        backdrop-filter: blur(6px);
        display: flex; align-items: center; justify-content: center;
        z-index: 1000; padding: 1rem;
    }

    .modal-content {
        width: 95vw;
        max-width: 1200px;
        height: 90vh;
        display: flex; flex-direction: column;
        background-color: var(--paper-page);
        border-radius: 8px;
        border: 2px solid var(--gold-leaf);
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
        overflow: hidden;
    }

    .modal-header {
        display: flex; justify-content: space-between; align-items: center;
        padding: 1rem 1.5rem;
        background-color: var(--paper-cover);
        border-bottom: 2px solid var(--gold-leaf);
    }

    .header-text h3 { margin: 0; font-size: 1.2rem; color: var(--leather-binding); text-align: left; }
    .header-subtitle { margin: 4px 0 0 0; font-size: 0.9rem; color: var(--ink-faded); font-style: italic; }

    .close-btn {
        background: none; border: none; color: var(--leather-binding);
        font-size: 2.5rem; line-height: 1; cursor: pointer; padding: 0 0.5rem;
        transition: color 0.2s, transform 0.2s;
    }
    .close-btn:hover { color: var(--ribbon-red); transform: scale(1.1); }

    .modal-body { flex: 1; position: relative; background-color: #525659; }

    .loading-indicator {
        position: absolute; inset: 0;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        background-color: var(--paper-page); z-index: 2;
        transition: opacity 0.4s ease;
    }

    .spinner {
        width: 48px; height: 48px;
        border: 4px solid rgb(from var(--gold-leaf) r g b / 30%);
        border-top-color: var(--gold-leaf);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    .loading-text { margin-top: 1rem; color: var(--leather-binding); font-size: 0.9rem; letter-spacing: 1px; }
    @keyframes spin { to { transform: rotate(360deg); } }

    .pdf-frame { width: 100%; height: 100%; border: none; opacity: 0; transition: opacity 0.5s ease; }
    .pdf-frame.loaded { opacity: 1; }
</style>