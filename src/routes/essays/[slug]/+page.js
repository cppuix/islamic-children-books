// src/routes/essays/[slug]/+page.js
import { error } from '@sveltejs/kit';
import essaysData from '$lib/data/essays.json';

// 1. Tell SvelteKit exactly which slugs exist so it can prerender them
export function entries() {
    return essaysData.map(essay => ({
        slug: essay.id
    }));
}

// 2. Your existing load function remains exactly the same
export async function load({ params }) {
    try {
        // Dynamic import based on the URL parameter (e.g. "veggies")
        const post = await import(`$lib/content/essays/${params.slug}.md`);
        return {
            content: post.default, // The compiled Svelte component
            meta: post.metadata,   // The YAML frontmatter
            title: post.metadata?.title || 'Essay' // Used for the browser tab title
        };
    } catch (e) {
        error(404, `Could not find essay "${params.slug}"`);
    }
}