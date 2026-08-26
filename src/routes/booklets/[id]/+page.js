// src/routes/booklets/[id]/+page.js
import { error } from '@sveltejs/kit';
import books from '$lib/data/books.json';

// Tell SvelteKit exactly which book ids exist so they can be prerendered
export function entries() {
    return books.map((book) => ({ id: book.id }));
}

export async function load({ params }) {
    const book = books.find((b) => b.id === params.id);
    if (!book) error(404, `Could not find booklet "${params.id}"`);

    return {
        book,
        title: book.title
    };
}
