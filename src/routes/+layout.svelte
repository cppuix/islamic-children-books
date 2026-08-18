<script>
	import "../app.css";

	import { page } from "$app/state";
	import WaxSeal from "$lib/components/WaxSeal.svelte";
	let { children } = $props();

	let isOpen = $state(false);

	function setIsOpen() {
		console.log("before", isOpen);
		isOpen = !isOpen;
		console.log("after", isOpen);
	}

	const siteTitle = "Islamic Children's Books & Tarbiyah";
	const siteDescription =
		"A quiet library of booklets, offline learning tools, and reflections—nurturing faith and intellect in harmony with the fiṭrah.";
	const siteUrl = "https://islamic-children-books.vercel.app/"; // Replace with your actual domain
	const ogImage = `${siteUrl}/images/og-image.png`; // 1200x630px social preview image
</script>

<svelte:head>
	<!-- Google tag (gtag.js) -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-VKKGB5SWTL"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());
	
	  gtag('config', 'G-VKKGB5SWTL');
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


<nav id="mainNav">
	<WaxSeal size="4rem" aria-label="Home" />

	<button id="burger-button" onclick={setIsOpen}>☰</button>
	<div id="nav-links" class:open={isOpen}>
		<a href="/" class="nav-link" class:active={page.url.pathname === "/"}>Home</a>
		<a href="/booklets" class="nav-link" class:active={page.url.pathname === "/booklets"}>Booklets</a>
		<a href="/apps" class="nav-link" class:active={page.url.pathname === "/apps"}>Apps</a>
		<a href="/essays" class="nav-link" class:active={page.url.pathname === "/essays"}>Essays</a>
		<a href="/about" class="nav-link" class:active={page.url.pathname === "/about"}>About</a>
	</div>
</nav>

<main>
	{@render children()}
</main>

<a href="#top" id="totopbutton">▲</a>
<a href="#footer" id="tobottombutton">▼</a>
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

	#nav-logo {
		width: auto;
		height: 3.5rem;
		margin-right: auto;
		margin-left: 1rem;
		margin-top: 0.5rem;
	}

	#burger-button {
		background: none;
		border: none;
		font-size: 1.8rem;
		color: var(--ink-black);
		cursor: pointer;
	}

	#nav-links {
		display: none;
		flex-direction: column;
		width: 100%;
		text-align: center;
	}
	#nav-links.open {
		display: flex;
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
	}

	@media (min-width: 768px) {
		#nav-links {
			display: flex;
			flex-direction: row;
			width: auto;
		}
		#burger-button {
			display: none;
		}
	}
</style>
