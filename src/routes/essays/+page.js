// src/routes/essays/+page.js
export async function load() {
    const files = import.meta.glob('$lib/content/essays/*.md', { eager: true });
    const essays = Object.entries(files).map(([path, file]) => {
        const slug = path.split('/').pop().replace('.md', '');
        return {
            slug,
            ...file.metadata
        };
    });
    

    // Sort by date descending
    essays.sort((a, b) => new Date(b.date) - new Date(a.date));

    return { essays };
}