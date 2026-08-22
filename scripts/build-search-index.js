import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const essaysDir = path.join(__dirname, '../src/lib/content/essays');
const outputDir = path.join(__dirname, '../src/lib/data');

// Read all .md files
const files = fs.readdirSync(essaysDir).filter(f => f.endsWith('.md'));

const searchIndex = files.map(filename => {
    const content = fs.readFileSync(path.join(essaysDir, filename), 'utf-8');
    const slug = filename.replace('.md', '');
    
    // Extract title
    const titleMatch = content.match(/title:\s*(.*)/);
    const title = titleMatch ? titleMatch[1].trim() : slug;
    
    // Remove frontmatter
    const withoutFrontmatter = content.replace(/---[\s\S]*?---/, '');
    
    // Clean markdown
    const cleanContent = withoutFrontmatter
        .replace(/[#*`_\[\]()]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    
    return {
        slug,
        title,
        content: cleanContent,
        searchText: (title + ' ' + cleanContent).toLowerCase()
    };
});

// Write to JSON file
fs.writeFileSync(
    path.join(outputDir, 'search-index.json'),
    JSON.stringify(searchIndex, null, 2)
);

console.log(`✅ Search index built with ${searchIndex.length} entries`);