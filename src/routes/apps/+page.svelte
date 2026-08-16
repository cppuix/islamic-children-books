<!-- src/routes/applets/+page.svelte -->

<script>
    import { apps } from "$lib/data/apps.js";
</script>



<h2 class="page-title">Apps</h2>

<div class="apps-inventory">
    {#each apps as app}
        <div class="app-card">
            <div class="cover-frame">
                <img src={app.thumbnail} alt={app.title} class="cover-img" />
            </div>
            <div class="titles-container">
                <h3 class="app-title">{app.title}</h3>
                <p class="app-subtitle">{app.subtitle}</p>
            </div>
            <!--<p class="app-category">{app.category}</p>!-->
            <p class="app-description">{app.description}</p>
            <a
                target="_blank"
                class="app-link read-btn"
                href={app.link}
                aria-label="app-link">Visit</a
            >
            <p class="price">{app.pricing}</p>
            <div class="app-tags">
                {#each app.tags as tag}
                    <p class="app-tag">{tag}</p>
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

    .apps-inventory {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        justify-content: space-between;
        gap: 1rem;
        color: #1c3a2e; /* green-black ink */
    }
    .app-card {
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

    .app-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
    }
    .app-tag {
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

    .app-subtitle {
        font-style: italic;
        color: var(--ink-faded);
        font-size: 0.9rem;
        text-align: center;
    }

    .app-description {
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

    .price
    {
        text-align: center;
        font-family: 'FiraCode';
        font-size: 0.68rem;
    }
</style>
