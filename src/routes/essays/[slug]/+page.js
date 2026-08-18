// src/routes/essays/[slug]/+page.js
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    try {
        // Dynamic import based on the URL parameter (e.g. "veggies")
        const post = await import(`$lib/content/essays/${params.slug}.md`);
        return {
            content: post.default, // The compiled Svelte component
            meta: post.metadata    // The YAML frontmatter
        };
    } catch (e) {
        error(404, `Could not find essay "${params.slug}"`);
    }
}