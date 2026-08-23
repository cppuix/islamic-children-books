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
    
    const { meta, body } = extractFrontmatter(content);

    // 1. Smart Fallbacks for Legacy Files
    const rawTags = meta.tags || meta.labels || [];
    const tags = Array.isArray(rawTags) ? rawTags : [rawTags];
    const link = meta.link || meta.source || '';
    
    // Helper function to completely clean the text (HTML + Markdown)
    const cleanText = (text) => text
        .replace(/<[^>]*>/g, '')       // 🧹 STRIP HTML TAGS COMPLETELY
        .replace(/[#*`_\[\]()>]/g, '') // Strip Markdown symbols
        .replace(/\s+/g, ' ')          // Normalize whitespace
        .trim();

    // 2. Auto-Generate Lead if missing
    let lead = meta.lead || '';
    if (!lead && body) {
        const cleanedBody = cleanText(body);
        lead = cleanedBody.substring(0, 150) + (cleanedBody.length > 150 ? '...' : '');
    } else if (lead) {
        lead = cleanText(lead); // Clean the lead too, just in case!
    }

    // 3. Data for the Essays Listing Page
    essaysData.push({
        id: slug,
        title: meta.title || slug,
        date: meta.date || new Date().toISOString(),
        lead: lead,
        link: link,
        tags: tags,
        featured: meta.featured === true || meta.featured === 'true'
    });

    // 4. Data for the Search Index
    const cleanContent = cleanText(body);
    searchIndex.push({
        slug,
        searchText: ((meta.title || '') + ' ' + lead + ' ' + cleanContent).toLowerCase()
    });
});

// Sort essays by date descending
essaysData.sort((a, b) => new Date(b.date) - new Date(a.date));

// Write JSON files
fs.writeFileSync(path.join(outputDir, 'essays.json'), JSON.stringify(essaysData, null, 2));
fs.writeFileSync(path.join(outputDir, 'search-index.json'), JSON.stringify(searchIndex, null, 2));

console.log(`✅ Built essays.json (${essaysData.length} entries)`);
console.log(`✅ Built search-index.json (${searchIndex.length} entries)`);


/**
 * Robust YAML frontmatter parser (Zero dependencies)
 */
function extractFrontmatter(content) {
    const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!match) return { meta: {}, body: content };

    const lines = match[1].split('\n');
    const meta = {};
    let currentKey = null;
    let currentValue = [];

    const saveCurrent = () => {
        if (currentKey && !Array.isArray(meta[currentKey])) {
            let val = currentValue.join('\n').trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                val = val.slice(1, -1);
            }
            val = val.replace(/^(\||>)[+-]?\s*/, '');
            val = val.replace(/\s+/g, ' ').trim();
            meta[currentKey] = val;
        }
    };

    for (const line of lines) {
        const keyMatch = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)/);
        
        if (keyMatch && !line.startsWith(' ') && !line.startsWith('\t')) {
            saveCurrent();
            currentKey = keyMatch[1];
            let rawVal = keyMatch[2].trim();
            
            if (rawVal.startsWith('[') && rawVal.endsWith(']')) {
                meta[currentKey] = rawVal.slice(1, -1).split(',').map(t => t.trim().replace(/^["']|["']$/g, ''));
                currentKey = null; 
            } 
            else if (rawVal === '' || /^(\||>)[+-]?$/.test(rawVal)) {
                currentValue = [rawVal]; 
            } 
            else {
                currentValue = [rawVal];
            }
        } else if (line.match(/^\s+-\s+/)) {
            if (currentKey && !Array.isArray(meta[currentKey])) meta[currentKey] = [];
            if (currentKey) {
                const item = line.trim().replace(/^-\s+/, '').replace(/^["']|["']$/g, '');
                meta[currentKey].push(item);
            }
            currentValue = []; 
        } else {
            if (currentKey) currentValue.push(line);
        }
    }
    saveCurrent();

    const body = content.slice(match[0].length).trim();
    return { meta, body };
}