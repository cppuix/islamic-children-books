// src/routes/apps/[id]/+page.js
import { error } from '@sveltejs/kit';
import apps from '$lib/data/apps.json';

// Tell SvelteKit exactly which app ids exist so they can be prerendered
export function entries() {
    return apps.map((app) => ({ id: app.id }));
}

export async function load({ params }) {
    const app = apps.find((a) => a.id === params.id);
    if (!app) error(404, `Could not find app "${params.id}"`);

    // Optional rich markdown body; fall back to the JSON description if absent
    let content = null;
    let meta = {};
    try {
        const post = await import(`$lib/content/apps/${params.id}.md`);
        content = post.default;
        meta = post.metadata ?? {};
    } catch {
        // no markdown body for this app yet
    }

    return {
        app,
        content,
        meta,
        title: meta.title || app.title
    };
}
