#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function existsBin(bin) {
  const p = path.join(process.cwd(), 'node_modules', '.bin', bin + (process.platform === 'win32' ? '.cmd' : ''));
  return fs.existsSync(p);
}

const need = ['eslint', 'tsc'];
const missing = need.filter((b) => !existsBin(b));
if (missing.length === 0) process.exit(0);

console.error('\n\nERROR: Missing local development binaries: ' + missing.join(', '));
console.error('Run `npm ci` to install development dependencies (recommended) or `npm install` to install incrementally.');
console.error('\nIf `npm ci` fails due to peer dependency issues, try `npm install --legacy-peer-deps` as a fallback.');
console.error('\nDo NOT accept interactive prompts that install unrelated packages from npx (e.g. `tsc` package).\n');
process.exit(1);
