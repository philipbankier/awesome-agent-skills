#!/usr/bin/env node

/**
 * Run all sync scripts in sequence.
 */

const { execSync } = require('child_process');
const path = require('path');

const scripts = [
  'sync-awesome-lists.js',
  'sync-mcp-registry.js',
  'sync-github-stars.js',
];

console.log('=== Awesome Agent Skills: Full Sync ===\n');
console.log(`Started: ${new Date().toISOString()}\n`);

for (const script of scripts) {
  const scriptPath = path.join(__dirname, script);
  console.log(`\n--- Running ${script} ---\n`);
  try {
    execSync(`node ${scriptPath}`, { stdio: 'inherit', timeout: 300000 });
  } catch (err) {
    console.error(`\n${script} failed: ${err.message}`);
    // Continue with next script
  }
}

console.log(`\n\n=== Sync complete: ${new Date().toISOString()} ===`);
