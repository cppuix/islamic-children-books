<script>
	import favicon from "$lib/assets/favicon.svg";
	import "../app.css";

	import { page } from "$app/state";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav id="mainNav">
	<img id="nav-logo" src="/images/logo.png" alt="logo">

	<a href="/" class="nav-link" class:active={page.url.pathname === "/"}>
		Home</a
	>
	<a
		href="/booklets"
		class="nav-link"
		class:active={page.url.pathname === "/booklets"}
	>
		Booklets</a
	>
	<a
		href="/apps"
		class="nav-link"
		class:active={page.url.pathname === "/apps"}
	>
		Apps</a
	>
	<a
		href="/essays"
		class="nav-link"
		class:active={page.url.pathname === "/essays"}
	>
		Essays</a
	>
	<a
		href="/about"
		class="nav-link"
		class:active={page.url.pathname === "/about"}
	>
		About</a
	>
</nav>

<main>
	{@render children()}
</main>

<a href="#top" id="totopbutton">▲</a>
<a href="#footer" id="tobottombutton">▼</a>
<footer id="footer">
	<div class="divider"></div>
	<p>Personal use is permitted. For distribution, contact us: <a href="mailto:alqaddaaree@gmail.com">alqaddaaree@gmail.com</a></p>
</footer>

<style>
	#mainNav {
		display: flex;
		justify-content: flex-end;
	}

	#nav-logo
	{
		width: auto;
		height: 3.5rem;
		margin-right: auto;
		margin-left: 1rem;
		margin-top: 0.5rem;
	}

	.nav-link {
		padding: 20px;
	}
	.nav-link.active {
		border-bottom: 1px solid var(--gold-leaf);
	}

	main {
		flex: 1;
		display: flow-root;
		margin: 2rem;
		margin-top: 0;
	}

	footer {
		text-align: center;
		font-size: 0.68em;
	}

	#totopbutton
	{
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

	#tobottombutton
	{
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
	
</style>
