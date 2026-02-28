#!/usr/bin/env node

/**
 * Sync entries from GitHub awesome-lists.
 * Parses structured markdown from popular awesome-* repos and normalizes to JSON.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

// Awesome lists to sync from
const SOURCES = [
  {
    id: 'punkpeye-awesome-mcp-servers',
    owner: 'punkpeye',
    repo: 'awesome-mcp-servers',
    file: 'README.md',
    category: 'mcp-server',
    platforms: ['claude-code', 'codex-cli', 'cursor', 'windsurf', 'gemini-cli'],
  },
  {
    id: 'composio-awesome-claude-skills',
    owner: 'ComposioHQ',
    repo: 'awesome-claude-skills',
    file: 'README.md',
    category: 'agent-skill',
    platforms: ['claude-code'],
  },
  {
    id: 'voltagent-awesome-agent-skills',
    owner: 'VoltAgent',
    repo: 'awesome-agent-skills',
    file: 'README.md',
    category: 'agent-skill',
    platforms: ['claude-code', 'codex-cli', 'gemini-cli', 'cursor'],
  },
  {
    id: 'patrickjs-awesome-cursorrules',
    owner: 'PatrickJS',
    repo: 'awesome-cursorrules',
    file: 'README.md',
    category: 'cursor-rule',
    platforms: ['cursor'],
  },
  {
    id: 'hesreallyhim-awesome-claude-code',
    owner: 'hesreallyhim',
    repo: 'awesome-claude-code',
    file: 'README.md',
    category: 'agent-skill',
    platforms: ['claude-code'],
  },
  {
    id: 'appcypher-awesome-mcp-servers',
    owner: 'appcypher',
    repo: 'awesome-mcp-servers',
    file: 'README.md',
    category: 'mcp-server',
    platforms: ['claude-code', 'codex-cli', 'cursor', 'windsurf', 'gemini-cli'],
  },
  {
    id: 'voltagent-awesome-openclaw-skills',
    owner: 'VoltAgent',
    repo: 'awesome-openclaw-skills',
    file: 'README.md',
    category: 'openclaw-skill',
    platforms: ['openclaw'],
  },
  {
    id: 'antigravity-awesome-skills',
    owner: 'sickn33',
    repo: 'antigravity-awesome-skills',
    file: 'README.md',
    category: 'agent-skill',
    platforms: ['claude-code', 'codex-cli', 'antigravity', 'cursor'],
  },
  {
    id: 'github-awesome-copilot',
    owner: 'github',
    repo: 'awesome-copilot',
    file: 'README.md',
    category: 'copilot-extension',
    platforms: ['copilot'],
  },
  {
    id: 'awesome-gemini-cli',
    owner: 'Piebald-AI',
    repo: 'awesome-gemini-cli',
    file: 'README.md',
    category: 'gemini-extension',
    platforms: ['gemini-cli'],
  },
];

function fetch(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'awesome-agent-skills-sync/1.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetch(res.headers.location).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

/**
 * Parse markdown list entries from an awesome-list README.
 * Looks for patterns like:
 *   - [Name](url) - Description
 *   - [Name](url): Description
 *   * [Name](url) - Description
 */
function parseMarkdownEntries(markdown, source) {
  const entries = [];
  const lines = markdown.split('\n');
  let currentSection = '';

  // Pattern: - [Name](url) - Description  OR  - [Name](url): Description
  const entryPattern = /^[\s]*[-*]\s+\[([^\]]+)\]\(([^)]+)\)\s*[-:–]?\s*(.*)/;
  // Section headers
  const sectionPattern = /^#{1,4}\s+(.+)/;

  for (const line of lines) {
    const sectionMatch = line.match(sectionPattern);
    if (sectionMatch) {
      currentSection = sectionMatch[1].trim().replace(/[*_`]/g, '');
      continue;
    }

    const entryMatch = line.match(entryPattern);
    if (entryMatch) {
      const [, name, url, description] = entryMatch;

      // Skip non-repo links (images, badges, etc)
      if (url.startsWith('#') || url.includes('img.shields.io') || url.includes('badge')) continue;

      // Extract GitHub owner/repo if it's a GitHub URL
      const ghMatch = url.match(/github\.com\/([^/]+)\/([^/]+)/);
      const owner = ghMatch ? ghMatch[1] : null;
      const repo = ghMatch ? ghMatch[2].replace(/[#?].*/, '') : null;

      const id = owner && repo
        ? `${owner}/${repo}`.toLowerCase()
        : url.replace(/https?:\/\//, '').replace(/[/#?].*/, '');

      entries.push({
        id,
        name: name.trim(),
        description: description.trim().replace(/!\[.*?\]\(.*?\)/g, '').trim(),
        url: url.trim(),
        category: source.category,
        platforms: source.platforms,
        source: source.id,
        section: currentSection,
        githubOwner: owner,
        githubRepo: repo,
        stars: null,  // filled in by sync-github-stars.js
        lastUpdated: new Date().toISOString(),
      });
    }
  }

  return entries;
}

async function syncSource(source) {
  const rawUrl = `https://raw.githubusercontent.com/${source.owner}/${source.repo}/main/${source.file}`;
  const altUrl = `https://raw.githubusercontent.com/${source.owner}/${source.repo}/master/${source.file}`;

  let markdown;
  try {
    markdown = await fetch(rawUrl);
  } catch {
    try {
      markdown = await fetch(altUrl);
    } catch (err) {
      console.error(`  Failed to fetch ${source.id}: ${err.message}`);
      return [];
    }
  }

  const entries = parseMarkdownEntries(markdown, source);
  console.log(`  ${source.id}: ${entries.length} entries parsed`);
  return entries;
}

async function main() {
  console.log('Syncing awesome lists...\n');

  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  const allEntries = [];

  for (const source of SOURCES) {
    const entries = await syncSource(source);
    allEntries.push(...entries);
  }

  // Deduplicate by id (prefer first occurrence)
  const seen = new Set();
  const deduped = [];
  for (const entry of allEntries) {
    if (!seen.has(entry.id)) {
      seen.add(entry.id);
      deduped.push(entry);
    }
  }

  console.log(`\nTotal: ${allEntries.length} raw, ${deduped.length} after dedup`);

  // Write output
  const outputPath = path.join(DATA_DIR, 'awesome-lists.json');
  fs.writeFileSync(outputPath, JSON.stringify(deduped, null, 2));
  console.log(`Written to ${outputPath}`);

  // Write summary
  const summary = {
    lastSync: new Date().toISOString(),
    sources: SOURCES.map(s => s.id),
    totalEntries: deduped.length,
    byCategory: {},
    bySource: {},
  };
  for (const entry of deduped) {
    summary.byCategory[entry.category] = (summary.byCategory[entry.category] || 0) + 1;
    summary.bySource[entry.source] = (summary.bySource[entry.source] || 0) + 1;
  }
  fs.writeFileSync(path.join(DATA_DIR, 'awesome-lists-summary.json'), JSON.stringify(summary, null, 2));
}

main().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
