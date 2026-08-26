<script>
    import books from "$lib/data/books.json";
</script>

<h2 class="page-title">Booklets</h2>

<div class="books-inventory">
    {#each books as book}
        <a class="book-card" href="/booklets/{book.id}">
            <div class="cover-frame">
                <img src={book.thumbnail} alt={book.title} class="cover-img" loading="lazy" />
            </div>
            <div class="titles-container">
                <h3 class="book-title">{book.title}</h3>
                <p class="book-subtitle">{book.subtitle}</p>
            </div>
            <p class="book-description">{book.description}</p>

            <div class="book-tags">
                {#each book.tags as tag}
                    <span class="book-tag">{tag}</span>
                {/each}
            </div>
        </a>
    {/each}
</div>

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
        text-decoration: none; color: inherit;
        transition: border-color 0.2s ease, transform 0.2s ease;
    }
    .book-card:hover { border-color: var(--gold-leaf); transform: translateY(-2px); }
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
</style>