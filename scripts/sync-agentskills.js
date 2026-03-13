#!/usr/bin/env node

/**
 * Sync skills from the Agent Skills ecosystem.
 * Fetches reference skills from github.com/anthropics/skills
 * (the official example skills for the agentskills.io open standard).
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

// Platforms that support the Agent Skills (SKILL.md) open standard
// Source: https://agentskills.io logo carousel
const AGENT_SKILL_PLATFORMS = [
  'claude-code',
  'codex-cli',
  'gemini-cli',
  'cursor',
  'copilot',
];

function fetch(url) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      headers: {
        'User-Agent': 'awesome-agent-skills-sync/1.0',
        Accept: 'application/vnd.github+json',
      },
    };

    // Use GITHUB_TOKEN if available for rate limiting
    if (process.env.GITHUB_TOKEN) {
      options.headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const req = https.get(options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetch(res.headers.location).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('timeout'));
    });
  });
}

/**
 * Parse YAML frontmatter from SKILL.md content.
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return {};

  const yaml = match[1];
  const result = {};
  for (const line of yaml.split('\n')) {
    const kv = line.match(/^(\w[\w-]*):\s*"?(.*?)"?\s*$/);
    if (kv) {
      result[kv[1]] = kv[2];
    }
  }
  return result;
}

async function fetchSkillsFromRepo(owner, repo) {
  console.log(`  Fetching skills from ${owner}/${repo}...`);
  const entries = [];

  // List directories in the skills/ folder
  let skillDirs;
  try {
    const raw = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/skills`
    );
    skillDirs = JSON.parse(raw).filter((item) => item.type === 'dir');
  } catch (err) {
    console.error(`  Failed to list skills in ${owner}/${repo}: ${err.message}`);
    return [];
  }

  console.log(`  Found ${skillDirs.length} skill directories`);

  // Fetch SKILL.md for each
  for (const dir of skillDirs) {
    try {
      const raw = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/skills/${dir.name}/SKILL.md`
      );
      const file = JSON.parse(raw);
      const content = Buffer.from(file.content, 'base64').toString('utf-8');
      const frontmatter = parseFrontmatter(content);

      const name = frontmatter.name || dir.name;
      const description = frontmatter.description || '';

      entries.push({
        id: `${owner}/${repo}/${dir.name}`,
        name,
        description: description.replace(/^["']|["']$/g, ''),
        url: `https://github.com/${owner}/${repo}/tree/main/skills/${dir.name}`,
        category: 'agent-skill',
        platforms: AGENT_SKILL_PLATFORMS,
        source: 'agentskills-io',
        section: 'Official Example Skills',
        githubOwner: owner,
        githubRepo: repo,
        stars: null, // filled in by sync-github-stars.js
        lastUpdated: new Date().toISOString(),
      });
    } catch (err) {
      console.error(`  Failed to fetch SKILL.md for ${dir.name}: ${err.message}`);
    }
  }

  return entries;
}

async function main() {
  console.log('Syncing Agent Skills (agentskills.io standard)...\n');

  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  // Fetch from the official Anthropic skills repo
  const entries = await fetchSkillsFromRepo('anthropics', 'skills');

  console.log(`\n  ${entries.length} skills synced`);

  const outputPath = path.join(DATA_DIR, 'agentskills-io.json');
  fs.writeFileSync(outputPath, JSON.stringify(entries, null, 2));
  console.log(`  Written to ${outputPath}`);

  // Summary
  const summary = {
    lastSync: new Date().toISOString(),
    source: 'agentskills-io',
    totalEntries: entries.length,
    repos: ['anthropics/skills'],
  };
  fs.writeFileSync(
    path.join(DATA_DIR, 'agentskills-io-summary.json'),
    JSON.stringify(summary, null, 2)
  );
}

main().catch((err) => {
  console.error('Agent Skills sync failed:', err);
  process.exit(1);
});
