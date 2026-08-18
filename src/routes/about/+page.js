// src/routes/about/+page.js
export async function load() {
    // Import the specific markdown file directly
    const post = await import('$lib/content/about/about.md');

    return {
        content: post.default, // The compiled Markdown component
        meta: post.metadata    // Any frontmatter variables
    };
}