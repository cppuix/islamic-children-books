<!-- src/routes/applets/+page.svelte -->

<script>
    import { essays } from "$lib/data/essays.js";
</script>

<h2 class="page-title">Essays</h2>

<ul>
{#each essays as essay}
    <li>
        <a href="{essay.link}">{essay.title}</a>
        <p class="lead">{essay.lead}</p>
    </li>
{/each}
</ul>

<style>
    a
    {
        text-decoration: underline;
    }

    .lead
    {
        color: var(--ink-faded);
        font-size: 0.8em;
    }
</style>