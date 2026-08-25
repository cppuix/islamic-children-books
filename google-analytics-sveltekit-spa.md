# Why Google Analytics Only Shows Your Root Page in a SvelteKit SPA (And How to Fix It)

**TL;DR:** If you drop the standard gtag snippet into your SvelteKit root layout, GA will only ever record the first page you land on. Every client-side navigation is invisible. The fix is to fire a manual `page_view` event on every route change with `afterNavigate`, and disable GA's automatic pageview so you don't double-count.

---

## The symptom

You add Google Analytics to a SvelteKit site. The data comes in — sessions, users, events — but under **Reports → Engagement → Pages** you only ever see one row: the root page (`/`). You click around, read a dozen essays, and nothing else appears. Days later, still just `/`.

This is not a data-propagation delay. This is a real bug, and it's specific to how single-page apps (SPAs) navigate.

## Why it happens

Here's the standard gtag snippet almost everyone copies into their `<svelte:head>` (or `<head>` anywhere):

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag("js", new Date());
    gtag("config", "G-XXXXXXXXXX");
</script>
```

The `gtag("config", ...)` call automatically fires a `page_view` event. But it does so **once, on full page load**.

The problem: a SvelteKit site (like any SPA) does **not** reload the page when you navigate. Clicking from `/` to `/essays/my-post` only swaps the rendered components in the DOM. The browser never makes a new top-level request, so the `config` call doesn't run again — and GA never learns you visited anything but `/`.

That's the whole mystery. Your data is fine; there just aren't any pageview events to show.

### Why this is extra sneaky with SvelteKit

SvelteKit blurs the line between static and dynamic. Your site might be fully prerendered at build time (each route gets its own HTML file), which makes it *feel* like separate pages with real loads. But once it hydrates, navigation is client-side, and the prerendered pages never trigger a fresh `config`. So the analytics gap exists even on a "static" SvelteKit site.

## The fix

Two changes, both in your root layout (`src/routes/+layout.svelte`):

### 1. Disable GA's automatic pageview

```html
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag("js", new Date());
    gtag("config", "G-XXXXXXXXXX", { send_page_view: false });
</script>
```

You now own pageview reporting, so you don't get a duplicate event on the initial load.

### 2. Send a pageview on every navigation

Use `afterNavigate` from `$app/navigation`. When it's used in a root layout, it fires on the **initial load and every subsequent client-side navigation** — exactly what you need.

```svelte
<script>
    import { page } from "$app/state";
    import { afterNavigate } from "$app/navigation";

    afterNavigate(() => {
        gtag("event", "page_view", {
            page_path: page.url.pathname + page.url.search,
            page_title: document.title,
            page_location: page.url.href
        });
    });
</script>
```

That's it. Now every route shows up as its own page in GA.

> **Gotcha: the `afterNavigate` argument changed between SvelteKit versions.**
>
> A lot of older blog posts and docs examples show `afterNavigate(({ url }) => ...)` — destructuring `url` straight off the navigation object. In newer SvelteKit versions that top-level `url` no longer exists. The callback receives a `Navigation` object with `from` and `to` targets (each with their own `.url`), and no plain `url` property. Destructure `url` and every navigation throws `TypeError: can't access property "pathname", url is undefined`.
>
> The version-proof approach is to skip the navigation argument entirely and read the URL from the reactive `page` store (`$app/state`). `page.url` is always defined and already reflects the current route by the time `afterNavigate` runs.

### Bonus: don't forget per-page titles

While you're in there: a SvelteKit site that only sets `<title>` in the root layout shows the *same browser tab title on every page* — and GA records that stale `document.title` with each pageview. Give each page a real title from its `load` data and render it reactively:

```svelte
<script>
    import { page } from "$app/state";

    let pageTitle = $derived(
        page.data?.title ? `${page.data.title} — My Site` : "My Site"
    );
</script>

<svelte:head>
    <title>{pageTitle}</title>
</svelte:head>
```

## A note on AI assistants

It's worth saying out loud: **no AI assistant is going to catch this reliably by reasoning about it from scratch.** We asked Claude about this exact bug before looking at the codebase, and it confidently gave the wrong answer — because the fix depends entirely on your project's concrete details:

- Are you actually an SPA, or server-rendered?
- Is the gtag snippet in a root layout that persists across navigation?
- Does your `afterNavigate` handler exist and actually push a `page_view`?
- Are titles set per-page or globally?

In our real codebase, the root layout even had a comment that said *"track pageview on every route change"* — but the `afterNavigate` callback only closed the mobile menu. The pageview code was never written. Only reading the actual file revealed the gap. AI reasoning gets you the *pattern*; the codebase gets you the *truth*. Always let an assistant read your actual code (or provide the real files) before trusting an answer like this.

## Checklist

- [ ] gtag config has `send_page_view: false`
- [ ] `afterNavigate` in the root layout pushes `page_view` with `page_path`, `page_title`, `page_location`
- [ ] Each page sets a distinct title (or the layout derives one from page data)
- [ ] Deployed, then waited 24–48h before checking GA (it's not instant)

---

*Have you hit this in a different framework — React Router, Vue, Next.js App Router? The core idea transfers: your framework's "navigation completed" hook is the place to fire the pageview.*
