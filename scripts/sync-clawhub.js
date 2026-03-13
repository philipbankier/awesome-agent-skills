#!/usr/bin/env node

/**
 * Sync skills from ClawHub (OpenClaw skill registry).
 * Converts the scraped all_skills.json into the site's data format.
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const SOURCE_FILE = path.join(process.env.HOME, 'TinkerLab', 'clawhub-skills', 'all_skills.json');

function main() {
  console.log('Syncing ClawHub skills...\n');

  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  if (!fs.existsSync(SOURCE_FILE)) {
    console.error(`  Source file not found: ${SOURCE_FILE}`);
    console.error('  Run the ClawHub scraper first to generate all_skills.json');
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf-8'));
  const skills = Array.isArray(raw) ? raw : Object.values(raw);
  console.log(`  Loaded ${skills.length} skills from source file`);

  const entries = [];
  const seen = new Set();

  for (const skill of skills) {
    const slug = skill.slug;
    if (!slug) continue;
    if (seen.has(slug)) continue;
    seen.add(slug);

    const name = skill.displayName || slug;
    const description = skill.summary || '';
    const stats = skill.stats || {};
    const tags = skill.tags || {};

    entries.push({
      id: `clawhub/${slug}`,
      name,
      description,
      url: `https://clawhub.ai/skills/${slug}`,
      category: 'openclaw-skill',
      platforms: ['openclaw'],
      source: 'clawhub',
      githubOwner: null,
      githubRepo: null,
      stars: typeof stats.stars === 'number' ? stats.stars : null,
      downloads: typeof stats.downloads === 'number' ? stats.downloads : null,
      version: (tags.latest) || null,
      lastUpdated: skill.updatedAt
        ? new Date(skill.updatedAt).toISOString()
        : new Date().toISOString(),
    });
  }

  console.log(`  ${entries.length} skills after dedup`);

  // Sort by stars descending (most popular first)
  entries.sort((a, b) => (b.stars || 0) - (a.stars || 0));

  const outputPath = path.join(DATA_DIR, 'clawhub-skills.json');
  fs.writeFileSync(outputPath, JSON.stringify(entries, null, 2));
  console.log(`  Written to ${outputPath}`);

  // Summary
  const summary = {
    lastSync: new Date().toISOString(),
    source: 'clawhub',
    totalEntries: entries.length,
    withStars: entries.filter(e => e.stars && e.stars > 0).length,
    totalStars: entries.reduce((sum, e) => sum + (e.stars || 0), 0),
    totalDownloads: entries.reduce((sum, e) => sum + (e.downloads || 0), 0),
  };
  fs.writeFileSync(path.join(DATA_DIR, 'clawhub-skills-summary.json'), JSON.stringify(summary, null, 2));
  console.log(`  Summary: ${summary.totalEntries} skills, ${summary.totalStars} total stars, ${summary.totalDownloads} total downloads`);
}

main();
