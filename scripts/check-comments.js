// Scans project files under app, components, lib, content for unmatched /* or */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const scanDirs = ['app', 'components', 'lib', 'content', 'pages'];
const exts = ['.ts','.tsx','.js','.jsx','.css','.scss','.mjs'];

function walkDirSync(dir) {
  const results = [];
  let list = [];
  try { list = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return results; }
  for (const entry of list) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDirSync(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

function checkFile(file) {
  const ext = path.extname(file);
  if (!exts.includes(ext)) return null;
  let src;
  try { src = fs.readFileSync(file, 'utf8'); } catch (e) { return null; }
  const open = (src.match(/\/\*/g) || []).length;
  const close = (src.match(/\*\//g) || []).length;
  if (open !== close) return { file, open, close };
  return null;
}

function main() {
  const problems = [];
  for (const dir of scanDirs) {
    const p = path.join(root, dir);
    if (!fs.existsSync(p)) continue;
    const files = walkDirSync(p);
    for (const f of files) {
      const res = checkFile(f);
      if (res) problems.push(res);
    }
  }
  if (problems.length === 0) {
    console.log('✅ No unmatched /* or */ occurrences found in source files.');
    return 0;
  }
  console.error('⚠️ Found files with unmatched comment markers:');
  for (const p of problems) {
    console.error(`${p.file} — /*:${p.open}  */:${p.close}`);
  }
  return 1;
}

process.exitCode = main();
