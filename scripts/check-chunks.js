// Script: check-chunks.js
// Scans .next/static/chunks for JS files and attempts to compile them using vm.Script
// Reports files with syntax errors (e.g., unterminated string literals)

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const chunksDir = path.join(root, '.next', 'static', 'chunks');

function walk(dir) {
  const results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(full));
    } else if (entry.isFile() && full.endsWith('.js')) {
      results.push(full);
    }
  }
  return results;
}

function checkFile(file) {
  try {
    const src = fs.readFileSync(file, 'utf8');
    // Try compiling the script; do not execute
    new vm.Script(src, { filename: file });
    return null;
  } catch (err) {
    return err.message || String(err);
  }
}

function main() {
  if (!fs.existsSync(chunksDir)) {
    console.error('.next static chunks directory not found. Build first.');
    process.exitCode = 2;
    return;
  }

  const files = walk(chunksDir);
  console.log(`Found ${files.length} JS chunk files to check.`);
  const failures = [];

  for (const f of files) {
    const err = checkFile(f);
    if (err) {
      failures.push({ file: f, error: err });
    }
  }

  if (failures.length === 0) {
    console.log('✅ All checked chunk files compiled successfully.');
    process.exitCode = 0;
  } else {
    console.error(`⚠️ Detected ${failures.length} malformed chunk files:`);
    for (const f of failures) {
      console.error(`- ${f.file}: ${f.error}`);
    }
    process.exitCode = 1;
  }
}

main();
