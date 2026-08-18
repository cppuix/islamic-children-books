<!-- src/routes/+page.svelte -->
<script>
    import WaxSeal from "$lib/components/WaxSeal.svelte";
    import { books } from "$lib/data/books.js";
    import { apps } from "$lib/data/apps.js";
    import { essays } from "$lib/data/essays.js";

    // Get ALL featured items (or fallback to the first item if none tagged)
    const featuredBooks = books.filter((b) => b.featured).length ? books.filter((b) => b.featured) : [books[0]];
    const featuredApps = apps.filter((a) => a.featured).length ? apps.filter((a) => a.featured) : [apps[0]];
    const featuredEssays = essays.filter((e) => e.featured).length ? essays.filter((e) => e.featured) : [essays[0]];
</script>

<main class="hero-layout">
    <aside class="seal-anchor">
        <WaxSeal size="10rem" />
    </aside>

    <article class="hero-content">
        <span class="edition-tag">ARCHIVAL COLLECTION & TARBIYAH</span>

        <h1 class="main-title">
            Islamic Children’s
            <span class="title-accent">Books</span>
        </h1>

        <p class="tagline">
            A quiet library of booklets, offline learning tools, and reflections—nurturing faith and intellect in
            harmony with the <em>fiṭrah</em>.
        </p>

        <!-- Navigation CTAs -->
        <div class="cta-group">
            <a class="cta-primary" href="/books">
                <span>Browse Booklets ({books.length})</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </a>

            <a class="cta-secondary" href="/apps">Apps ({apps.length})</a>
            <a class="cta-secondary" href="/essays">Essays ({essays.length})</a>
        </div>

        <!-- Multi-Item Spotlights Stack -->
        <div class="spotlights-stack">
            <!-- Loop through Featured Booklets -->
            {#each featuredBooks as book}
                <div class="spotlight-item">
                    <span class="spotlight-label">FEATURED BOOKLET</span>
                    <a href={book.link} target="_blank" rel="noopener" class="spotlight-text">
                        <span class="book-name">{book.title}</span>
                        <span class="dot">•</span>
                        <span class="book-meta">{book.subtitle}</span>
                        <span class="arrow">→</span>
                    </a>
                </div>
            {/each}

            <!-- Loop through Featured Apps -->
            {#each featuredApps as app}
                <div class="spotlight-item">
                    <span class="spotlight-label">LEARNING TOOL</span>
                    <a href={app.link} target="_blank" rel="noopener" class="spotlight-text">
                        <span class="book-name">{app.title}</span>
                        <span class="dot">•</span>
                        <span class="book-meta">{app.subtitle}</span>
                        <span class="arrow">→</span>
                    </a>
                </div>
            {/each}

            <!-- Loop through Featured Essays -->
            {#each featuredEssays as essay}
                <div class="spotlight-item">
                    <span class="spotlight-label">RECOMMENDED ESSAY</span>
                    <a href={essay.link} target="_blank" rel="noopener" class="spotlight-text">
                        <span class="book-name">"{essay.title}"</span>
                        <span class="dot">•</span>
                        <span class="book-meta">{essay.lead}</span>
                        <span class="arrow">→</span>
                    </a>
                </div>
            {/each}
        </div>
    </article>
</main>

<style>
    /* Layout: Centered & Unboxed */
    .hero-layout {
        width: 100%;
        max-width: 1100px;
        margin: 0 auto;
        padding: 3rem 1.5rem;

        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: flex-start;
        gap: 3rem;
        color: #0f513d;
    }

    @media (min-width: 768px) {
        .hero-layout {
            flex-direction: row;
            align-items: flex-start;
            gap: 4.5rem;
            padding: 5rem 2rem;
        }
    }

    /* Left Anchor */
    .seal-anchor {
        display: none;
        justify-content: center;
    }

    @media (min-width: 768px) {
        .seal-anchor {
            position: sticky;
            top: 5rem;
            display: flex;
            align-items: center;
            flex-shrink: 0;
        }
    }

    /* Right Content */
    .hero-content {
        max-width: 640px;
    }

    .edition-tag {
        font-family: "Cinzel", serif;
        font-size: 0.7rem;
        letter-spacing: 0.25em;
        color: #b98a2e;
        display: block;
        margin-bottom: 1rem;
    }

    .main-title {
        font-family: "Cinzel", serif;
        font-size: clamp(2.4rem, 4.5vw, 3.8rem);
        font-weight: 600;
        line-height: 1.1;
        margin: 0 0 1.25rem 0;
        color: #0d382a;
        letter-spacing: -0.01em;
    }

    .title-accent {
        color: #b98a2e;
        font-style: italic;
    }

    .tagline {
        font-family: "Playpen Sans", sans-serif;
        font-size: 1.1rem;
        line-height: 1.6;
        margin: 0 0 2rem 0;
        opacity: 0.88;
    }

    .tagline em {
        font-style: italic;
        color: #0d382a;
    }

    /* Buttons */
    .cta-group {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1.25rem;
        margin-bottom: 3.5rem;
    }

    .cta-primary {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        padding: 0.85rem 1.6rem;
        background: #0f513d;
        color: #f4ede0;
        font-family: "Cinzel", serif;
        font-size: 0.82rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        text-decoration: none;
        border-radius: 2px;
        box-shadow: 0 4px 14px rgba(15, 81, 61, 0.18);
        transition:
            transform 0.2s ease,
            background 0.2s ease;
    }

    .cta-primary:hover {
        background: #0a3a2b;
        transform: translateY(-2px);
    }

    .cta-secondary {
        color: #0f513d;
        font-family: "Cinzel", serif;
        font-size: 0.82rem;
        letter-spacing: 0.08em;
        text-decoration: none;
        opacity: 0.8;
        transition:
            opacity 0.2s ease,
            color 0.2s ease;
    }

    .cta-secondary:hover {
        opacity: 1;
        color: #b98a2e;
    }

    /* Spotlights Stack */
    .spotlights-stack {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        border-top: 1px dashed rgba(185, 138, 46, 0.3);
        padding-top: 1.75rem;
    }

    .spotlight-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .spotlight-label {
        font-family: "Cinzel", serif;
        font-size: 0.62rem;
        letter-spacing: 0.22em;
        color: #b98a2e;
    }

    .spotlight-text {
        display: inline-flex;
        align-items: baseline;
        flex-wrap: wrap;
        gap: 0.4rem 0.6rem;
        text-decoration: none;
        color: inherit;
        font-size: 0.92rem;
        transition: color 0.2s ease;
    }

    .spotlight-text:hover {
        color: #b98a2e;
    }

    .book-name {
        font-family: "Cinzel", serif;
        font-weight: 600;
    }

    .dot {
        opacity: 0.35;
    }

    .book-meta {
        font-family: "Playpen Sans", sans-serif;
        font-size: 0.85rem;
        opacity: 0.75;
    }

    .arrow {
        font-family: system-ui;
        transition: transform 0.2s ease;
        color: #b98a2e;
    }

    .spotlight-text:hover .arrow {
        transform: translateX(4px);
    }
</style>
