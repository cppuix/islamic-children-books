// src/routes/essays/+page.js
import essaysData from '$lib/data/essays.json';
import searchIndex from '$lib/data/search-index.json';

// 1. Disable prerendering because this page uses dynamic query parameters
export const prerender = false;

export function load() {
    // 2. Spread into a new array to avoid mutating the cached JSON module
    const essays = [...essaysData].sort((a, b) => new Date(b.date) - new Date(a.date));

    return { 
        essays, 
        searchIndex 
    };
}