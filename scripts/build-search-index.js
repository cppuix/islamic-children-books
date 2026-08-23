import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const essaysDir = path.join(__dirname, '../src/lib/content/essays');
const outputDir = path.join(__dirname, '../src/lib/data');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(essaysDir).filter(f => f.endsWith('.md'));

const essaysData = [];
const searchIndex = [];

files.forEach(filename => {
    const content = fs.readFileSync(path.join(essaysDir, filename), 'utf-8');
    const slug = filename.replace('.md', '');
    
    // Parse the YAML frontmatter and extract the markdown body
    const { meta, body } = extractFrontmatter(content);

    // 1. Data for the Essays Listing Page (essays.json)
    essaysData.push({
        id: slug,
        title: meta.title || slug,
        date: meta.date || new Date().toISOString(),
        lead: meta.lead || '',
        link: meta.link || '',
        tags: meta.tags || [],
        featured: meta.featured || false
    });

    // 2. Data for the Search Index (search-index.json)
    const cleanContent = body
        .replace(/[#*`_\[\]()]/g, '') // Remove markdown symbols
        .replace(/\s+/g, ' ')         // Normalize whitespace
        .trim();
        
    searchIndex.push({
        slug,
        // Include title and lead in the search text for better matching
        searchText: ((meta.title || '') + ' ' + (meta.lead || '') + ' ' + cleanContent).toLowerCase()
    });
});

// Sort essays by date descending (newest first)
essaysData.sort((a, b) => new Date(b.date) - new Date(a.date));

// Write essays.json
fs.writeFileSync(
    path.join(outputDir, 'essays.json'),
    JSON.stringify(essaysData, null, 2)
);

// Write search-index.json
fs.writeFileSync(
    path.join(outputDir, 'search-index.json'),
    JSON.stringify(searchIndex, null, 2)
);

console.log(`✅ Built essays.json (${essaysData.length} entries)`);
console.log(`✅ Built search-index.json (${searchIndex.length} entries)`);

/**
 * Zero-dependency frontmatter parser
 * Safely extracts title, date, lead, tags, etc. from YAML frontmatter.
 */
function extractFrontmatter(content) {
    const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!match) return { meta: {}, body: content };

    const yaml = match[1];
    const meta = {};

    // Simple string matches
    const titleMatch = yaml.match(/^title:\s*(.*)/m);
    if (titleMatch) meta.title = titleMatch[1].replace(/^["']|["']$/g, '').trim();

    const dateMatch = yaml.match(/^date:\s*(.*)/m);
    if (dateMatch) meta.date = dateMatch[1].trim();

    const linkMatch = yaml.match(/^link:\s*(.*)/m);
    if (linkMatch) meta.link = linkMatch[1].replace(/^["']|["']$/g, '').trim();

    const featuredMatch = yaml.match(/^featured:\s*(.*)/m);
    if (featuredMatch) meta.featured = featuredMatch[1].trim() === 'true';

    // Multiline safe regex using 's' (dotAll) flag for text blocks
    const leadMatch = yaml.match(/^lead:\s*(.*?)(?=\n[a-zA-Z_]+:|$)/s);
    if (leadMatch) meta.lead = leadMatch[1].replace(/^["']|["']$/g, '').replace(/\n\s*/g, ' ').trim();

    // Parse Tags (handles both inline arrays `[a, b]` and block arrays `- a \n - b`)
    const tagsMatch = yaml.match(/^tags:\s*(.*?)(?=\n[a-zA-Z_]+:|$)/s);
    if (tagsMatch) {
        const tagsBlock = tagsMatch[1].trim();
        if (tagsBlock.startsWith('[')) {
            meta.tags = tagsBlock.slice(1, -1).split(',').map(t => t.trim().replace(/^["']|["']$/g, ''));
        } else {
            meta.tags = tagsBlock.split('\n')
                                 .map(t => t.trim())
                                 .filter(t => t.startsWith('-'))
                                 .map(t => t.replace(/^-\s*/, '').replace(/^["']|["']$/g, ''));
        }
    } else {
        meta.tags = [];
    }

    const body = content.slice(match[0].length).trim();
    return { meta, body };
}