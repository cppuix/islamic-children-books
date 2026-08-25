<script>
    import "../app.css";

    import { page } from "$app/state";
    import WaxSeal from "$lib/components/WaxSeal.svelte";
    import { afterNavigate } from "$app/navigation";
    let { children } = $props();

    let isOpen = $state(false);

    function setIsOpen() {
        isOpen = !isOpen;
    }

    const siteTitle = "Islamic Children's Books";
    const siteDescription =
        "A quiet library of booklets, offline learning tools, and reflections—nurturing faith and intellect in harmony with the fiṭrah.";
    const siteUrl = "https://islamic-children-books.vercel.app/";
    const ogImage = `${siteUrl}/images/og-image.png`;

    // Close menu AND track pageview on every route change (including initial load)
    afterNavigate(({ to }) => {
        isOpen = false;

        if (typeof window.gtag !== "function") return;

        window.gtag("event", "page_view", {
            page_path: to?.url.pathname,
            page_location: window.location.href,
            page_title: document.title,
        });
    });
</script>

<svelte:head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-VKKGB5SWTL"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());

        // CRITICAL: disable the automatic initial page_view.
        // afterNavigate fires on first mount too, so you'd double-count
        // the root page without this flag.
        gtag("config", "G-VKKGB5SWTL", { send_page_view: false });
    </script>
    
    <!-- Basic Meta -->
    <title>{siteTitle}</title>
    <meta name="description" content={siteDescription} />
    <meta name="author" content="Islamic Children's Books" />
    <link rel="canonical" href={siteUrl} />

    <!-- Favicons / Icons -->
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="theme-color" content="#0f513d" />

    <!-- Open Graph / Facebook / WhatsApp -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={siteUrl} />
    <meta property="og:title" content={siteTitle} />
    <meta property="og:description" content={siteDescription} />
    <meta property="og:image" content={ogImage} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={siteTitle} />
    <meta name="twitter:description" content={siteDescription} />
    <meta name="twitter:image" content={ogImage} />
</svelte:head>

<nav id="mainNav" aria-label="Main Navigation">
    <WaxSeal size="4rem" aria-label="Home" />

    <button
        id="burger-button"
        onclick={setIsOpen}
        aria-expanded={isOpen}
        aria-controls="nav-container"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
    >
        <span aria-hidden="true">☰</span>
    </button>

    <div id="nav-container" class:open={isOpen}>
        <div id="nav-links">
            <a
                href="/"
                class="nav-link"
                class:active={page.url.pathname === "/"}
                aria-current={page.url.pathname === "/" ? "page" : undefined}>Home</a
            >
            <a
                href="/booklets"
                class="nav-link"
                class:active={page.url.pathname === "/booklets"}
                aria-current={page.url.pathname === "/booklets" ? "page" : undefined}>Booklets</a
            >
            <a
                href="/apps"
                class="nav-link"
                class:active={page.url.pathname === "/apps"}
                aria-current={page.url.pathname === "/apps" ? "page" : undefined}>Apps</a
            >
            <a
                href="/essays"
                class="nav-link"
                class:active={page.url.pathname === "/essays"}
                aria-current={page.url.pathname === "/essays" ? "page" : undefined}>Essays</a
            >
            <a
                href="/about"
                class="nav-link"
                class:active={page.url.pathname === "/about"}
                aria-current={page.url.pathname === "/about" ? "page" : undefined}>About</a
            >
        </div>
    </div>
</nav>

<main>
    {@render children()}
</main>

<a href="#top" id="totopbutton" aria-label="Scroll to top">
    <span aria-hidden="true">▲</span>
</a>
<a href="#footer" id="tobottombutton" aria-label="Scroll to bottom">
    <span aria-hidden="true">▼</span>
</a>

<footer id="footer">
    <div class="divider"></div>
    <p>
        Personal use is permitted. For distribution, contact us: <a href="mailto:alqaddaaree@gmail.com"
            >alqaddaaree@gmail.com</a
        >
    </p>
</footer>

<style>
    #mainNav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }

    #burger-button {
        background: none;
        border: none;
        font-size: 1.8rem;
        color: var(--ink-black);
        cursor: pointer;
    }

    /* Mobile: Full-width grid container with smooth transition */
    #nav-container {
        display: grid;
        grid-template-rows: 0fr;
        width: 100%;
        transition: grid-template-rows 0.3s ease-out;
    }

    #nav-container.open {
        grid-template-rows: 1fr;
    }

    #nav-links {
        display: flex;
        flex-direction: column;
        width: 100%;
        text-align: center;
        overflow: hidden;
    }

    .nav-link {
        padding: 20px;
    }

    .nav-link.active {
        border-bottom: 1px solid var(--gold-leaf);
        background-color: var(--gold-shine);
    }

    main {
        flex: 1;
        display: flow-root;
        margin: 2rem;
        margin-top: 0;
        margin-bottom: 0;
    }

    footer {
        text-align: center;
        font-size: 0.68em;
    }

    #totopbutton {
        position: fixed;
        bottom: 4rem;
        right: 1rem;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-color: var(--gold-leaf);
        text-align: center;
        color: var(--paper-page);
        border: 2px solid var(--gold-shine);
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
    }

    #tobottombutton {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-color: var(--gold-leaf);
        text-align: center;
        color: var(--paper-page);
        border: 2px solid var(--gold-shine);
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
    }

    /* Desktop Reset */
    @media (min-width: 768px) {
        #burger-button {
            display: none;
        }

        #nav-container {
            display: block;
            width: auto;
            grid-template-rows: none;
        }

        #nav-links {
            flex-direction: row;
            overflow: visible;
        }
    }
</style>