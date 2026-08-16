<!-- src/routes/booklets/+page.svelte -->

<script>
    import { books } from "$lib/data/books.js";
</script>



<h2 class="page-title">Booklets</h2>

<div class="books-inventory">
    {#each books as book}
        <div class="book-card">
            <div class="cover-frame">
                <img src={book.thumbnail} alt={book.title} class="cover-img" />
            </div>
            <div class="titles-container">
                <h3 class="book-title">{book.title}</h3>
                <p class="book-subtitle">{book.subtitle}</p>
            </div>
            <!--<p class="book-category">{book.category}</p>!-->
            <p class="book-description">{book.description}</p>
            <a
                target="_blank"
                class="book-link read-btn"
                href={book.link}
                aria-label="book-link">Read</a
            >
            <div class="book-tags">
                {#each book.tags as tag}
                    <p class="book-tag">{tag}</p>
                {/each}
            </div>
        </div>
    {/each}
</div>

<style>
    .titles-container
    {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .page-title {
    }

    .page-subtitle {
        font-size: 0.68rem;
    }

    .books-inventory {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        justify-content: space-between;
        gap: 1rem;
        color: #1c3a2e; /* green-black ink */
    }
    .book-card {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 15px;
        border-radius: 10px;
        border: 1px solid rgb(from var(--gold-leaf) r g b / 50%);
        background-color: rgb(from var(--paper-page) r g b / 10%);
        box-shadow: 0 5px 20px rgba(185, 138, 46, 0.2);
    }

    .cover-frame {
        width: 100%;
        aspect-ratio: 4 / 3;

        overflow: hidden;
        border-radius: 4px;
        margin-bottom: 1rem;
        box-shadow: inset 0 0 12px 4px rgba(0, 0, 0, 0.05);

    }

    .cover-img {
        filter: blur(0.2px);
        mask-image: linear-gradient(
                to right,
                transparent,
                black 4%,
                black 96%,
                transparent
            ),
            linear-gradient(
                to bottom,
                transparent,
                black 4%,
                black 96%,
                transparent
            );
        mask-composite: intersect;
        width: 100%;
        height: 100%;
        object-fit: fill; /* Still crucial: fills the box without stretching */
        object-position: center;
    }

    .book-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
    }
    .book-tag {
        padding: 6px;
        font-size: 0.6rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--paper-page);
        background-color: var(--gold-leaf);
        border-radius: 9999px;
        font-weight: bold;
    }

    h3 {
        text-align: center;
        margin: 0;
        color: var(--leather-binding);
    }

    .book-subtitle {
        font-style: italic;
        color: var(--ink-faded);
        font-size: 0.9rem;
        text-align: center;
    }

    .book-description {
        font-size: 0.95rem;
        color: var(--ink-black);
        
        text-align: left;
        flex-grow: 1; /* Pushes the button to the bottom */
    }

    .read-btn {
        align-self: flex-start;
        padding: 0.5rem 1rem;
        background-color: var(--leather-binding);
        color: var(--paper-page);
        text-decoration: none;
        border-radius: 4px;
        font-size: 0.9rem;
        width: 100%;
        text-align: center;
        transition: background-color 0.2s;
        box-sizing: border-box;
    }

    .read-btn:hover {
        background-color: var(--ink-green);
    }
</style>
