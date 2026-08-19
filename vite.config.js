import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel'; // Updated
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { svelteSitemap } from 'svelte-sitemap/vite';

export default defineConfig({
    plugins: [
        sveltekit({
            compilerOptions: {
                runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
                warningFilter: (warning) => warning.code !== 'script_context_deprecated'
            },
            adapter: adapter(),
            preprocess: [mdsvex({ extensions: ['.svx', '.md'] })],
            extensions: ['.svelte', '.svx', '.md'],
        }),
        svelteSitemap({ 
            domain: 'https://islamic-children-books.vercel.app/',
            outDir: '.vercel/output/static' // Points sitemap to Vercel output
        })
    ]
});