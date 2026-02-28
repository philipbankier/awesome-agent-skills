#!/usr/bin/env node

/**
 * Sync from the official MCP Registry.
 * https://registry.modelcontextprotocol.io
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

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

async function main() {
  console.log('Syncing MCP Registry...\n');

  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  // Try the official registry API
  // The registry uses a REST API - try common endpoints
  // Official API is v0.1 — paginated, 100 per page
  const BASE_URL = 'https://registry.modelcontextprotocol.io/v0.1/servers';
  const allServers = [];
  let cursor = null;
  let page = 0;

  while (true) {
    const url = cursor ? `${BASE_URL}?limit=100&cursor=${encodeURIComponent(cursor)}` : `${BASE_URL}?limit=100`;
    let data;
    try {
      const raw = await fetch(url);
      data = JSON.parse(raw);
    } catch (err) {
      if (page === 0) {
        console.error(`  Failed to reach registry API: ${err.message}`);
        break;
      }
      break; // done paginating
    }

    const servers = data.servers || data.items || (Array.isArray(data) ? data : []);
    if (servers.length === 0) break;

    allServers.push(...servers);
    page++;
    console.log(`  Page ${page}: ${servers.length} servers (total: ${allServers.length})`);

    // Cursor is in metadata.nextCursor
    const meta = data.metadata || {};
    cursor = meta.nextCursor || data.cursor || data.next_cursor || data.nextCursor;
    if (!cursor) break;
  }

  const endpoints = []; // kept for fallback logic below
  let registryData = allServers.length > 0 ? allServers : null;

  if (!registryData) {
    console.log('  Could not reach MCP registry API. Falling back to GitHub repo parsing.');

    // Fallback: parse the registry GitHub repo
    try {
      const readmeUrl = 'https://raw.githubusercontent.com/modelcontextprotocol/registry/main/README.md';
      const readme = await fetch(readmeUrl);
      console.log(`  Fetched registry README (${readme.length} bytes)`);

      // Parse any structured data from the readme
      const entries = [];
      const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
      let match;
      while ((match = linkPattern.exec(readme)) !== null) {
        const [, name, url] = match;
        if (url.includes('github.com') && !url.includes('modelcontextprotocol')) {
          const ghMatch = url.match(/github\.com\/([^/]+)\/([^/]+)/);
          if (ghMatch) {
            entries.push({
              id: `${ghMatch[1]}/${ghMatch[2]}`.toLowerCase(),
              name: name.trim(),
              url: url.trim(),
              category: 'mcp-server',
              platforms: ['claude-code', 'codex-cli', 'cursor', 'windsurf', 'gemini-cli'],
              source: 'mcp-registry',
              githubOwner: ghMatch[1],
              githubRepo: ghMatch[2].replace(/[#?].*/, ''),
              stars: null,
              lastUpdated: new Date().toISOString(),
            });
          }
        }
      }

      console.log(`  Parsed ${entries.length} entries from registry README`);
      fs.writeFileSync(path.join(DATA_DIR, 'mcp-registry.json'), JSON.stringify(entries, null, 2));
    } catch (err) {
      console.error(`  Failed to parse registry: ${err.message}`);
    }
    return;
  }

  // Process API response — each item has { server: {...}, _meta: {...} }
  const entries = Array.isArray(registryData) ? registryData : [];

  const normalized = entries.map(item => {
    const s = item.server || item;
    const repoUrl = (s.repository && s.repository.url) || s.url || s.homepage || '';
    const ghMatch = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);

    return {
      id: s.name || (ghMatch ? `${ghMatch[1]}/${ghMatch[2]}` : repoUrl),
      name: s.name || '',
      description: s.description || '',
      url: s.websiteUrl || repoUrl,
      repoUrl,
      category: 'mcp-server',
      platforms: ['claude-code', 'codex-cli', 'cursor', 'windsurf', 'gemini-cli'],
      source: 'mcp-registry-api',
      githubOwner: ghMatch ? ghMatch[1] : null,
      githubRepo: ghMatch ? ghMatch[2].replace(/[#?].*/, '') : null,
      version: s.version || null,
      stars: null,
      lastUpdated: new Date().toISOString(),
    };
  });

  console.log(`  ${normalized.length} servers from MCP registry API`);
  fs.writeFileSync(path.join(DATA_DIR, 'mcp-registry.json'), JSON.stringify(normalized, null, 2));

  // Summary
  const summary = {
    lastSync: new Date().toISOString(),
    source: 'mcp-registry',
    totalEntries: normalized.length,
  };
  fs.writeFileSync(path.join(DATA_DIR, 'mcp-registry-summary.json'), JSON.stringify(summary, null, 2));
}

main().catch(err => {
  console.error('MCP registry sync failed:', err);
  process.exit(1);
});
