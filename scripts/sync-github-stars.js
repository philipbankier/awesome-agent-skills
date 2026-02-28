#!/usr/bin/env node

/**
 * Enrich existing data with GitHub star counts and metadata.
 * Reads from data/*.json, updates star counts via GitHub API.
 * Respects rate limits (5000/hr authenticated, 60/hr unauthenticated).
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const BATCH_SIZE = 50;  // process in batches to avoid rate limits
const DELAY_MS = 100;   // delay between requests

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const headers = {
      'User-Agent': 'awesome-agent-skills-sync/1.0',
      'Accept': 'application/vnd.github.v3+json',
    };
    if (GITHUB_TOKEN) headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;

    const req = https.get(url, { headers }, (res) => {
      if (res.statusCode === 403) {
        const remaining = res.headers['x-ratelimit-remaining'];
        if (remaining === '0') {
          const reset = new Date(res.headers['x-ratelimit-reset'] * 1000);
          return reject(new Error(`Rate limited until ${reset.toISOString()}`));
        }
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function enrichEntry(entry) {
  if (!entry.githubOwner || !entry.githubRepo) return entry;

  try {
    const data = await fetchJSON(`https://api.github.com/repos/${entry.githubOwner}/${entry.githubRepo}`);
    entry.stars = data.stargazers_count;
    entry.forks = data.forks_count;
    entry.language = data.language;
    entry.license = data.license?.spdx_id || null;
    entry.lastPushed = data.pushed_at;
    entry.archived = data.archived;
    entry.description = entry.description || data.description || '';
    entry.topics = data.topics || [];
  } catch (err) {
    console.error(`  Failed to enrich ${entry.githubOwner}/${entry.githubRepo}: ${err.message}`);
  }

  return entry;
}

async function main() {
  console.log('Enriching with GitHub stars...\n');

  if (!GITHUB_TOKEN) {
    console.warn('Warning: No GITHUB_TOKEN set. Rate limited to 60 requests/hour.');
    console.warn('Set GITHUB_TOKEN env var for 5000 requests/hour.\n');
  }

  // Find all JSON data files
  const dataFiles = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json') && !f.includes('summary'));

  for (const file of dataFiles) {
    const filePath = path.join(DATA_DIR, file);
    const entries = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const githubEntries = entries.filter(e => e.githubOwner && e.githubRepo);
    console.log(`${file}: ${githubEntries.length}/${entries.length} entries have GitHub repos`);

    let enriched = 0;
    for (let i = 0; i < githubEntries.length; i += BATCH_SIZE) {
      const batch = githubEntries.slice(i, i + BATCH_SIZE);
      for (const entry of batch) {
        await enrichEntry(entry);
        enriched++;
        if (enriched % 10 === 0) {
          process.stdout.write(`  Enriched ${enriched}/${githubEntries.length}\r`);
        }
        await sleep(DELAY_MS);
      }
    }
    console.log(`  Enriched ${enriched}/${githubEntries.length} entries`);

    // Write back
    fs.writeFileSync(filePath, JSON.stringify(entries, null, 2));
  }

  console.log('\nDone.');
}

main().catch(err => {
  console.error('Star sync failed:', err);
  process.exit(1);
});
