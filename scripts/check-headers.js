#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Header to look for
const HEADER_SNIPPET = 'Next Resume Pro v2.0.0';

function walk(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      if (name === 'node_modules' || name === '.git' || name === '.next') continue;
      out.push(...walk(p));
    } else if (stat.isFile()) {
      out.push(p);
    }
  }
  return out;
}

try {
  let files = [];
  try {
    const out = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' }).trim();
    if (out) files = out.split('\n').filter(Boolean);
  } catch (_) {
    // git not available or not a repo — fall back to scanning all .ts/.tsx files
    files = walk(process.cwd()).map((p) => path.relative(process.cwd(), p));
  }

  files = files.filter((f) => f.endsWith('.ts') || f.endsWith('.tsx'));
  const failures = [];

  for (const file of files) {
    const p = path.resolve(process.cwd(), file);
    if (!fs.existsSync(p)) continue;
    const content = fs.readFileSync(p, 'utf8');
    if (!content.includes(HEADER_SNIPPET)) failures.push(file);
  }

  if (failures.length) {
    console.error('\nERROR: Missing project header in the following files:');
    failures.forEach((f) => console.error('  -', f));
    console.error('\nPlease add the standard header comment to these files before committing.');
    console.error('You can run `node scripts/check-headers.js` locally to see this check.');
    process.exit(1);
  }

  process.exit(0);
} catch (err) {
  console.error('Header check failed:', err.message || err);
  process.exit(2);
}