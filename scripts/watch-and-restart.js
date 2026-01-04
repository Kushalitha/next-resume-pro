/**
* Next Resume Pro v1.0.0
* Author: Kushalitha Maduranga
* Year: 2026
*
* License:
* - Code (TypeScript, JavaScript, build scripts): MIT License
* - UI / Design (CSS, layout, visual components): CC BY 4.0
* 	Attribution Required
*
* Repository:
* https://github.com/Kushalitha
*/

const { spawn } = require('child_process');
const chokidar = require('chokidar');
const path = require('path');
const { main: clean } = require('./clean');

const watchPaths = ['app', 'components', 'lib', 'content', 'scripts', 'next.config.js'];
let child = null;
let restarting = false;
let debounceTimer = null;

function startDev() {
  if (child) return;
  console.log('[watch] Starting Next dev server...');
  child = spawn('npm', ['run', 'dev:inner'], { stdio: 'inherit', shell: true });
  child.on('exit', (code, signal) => {
    console.log('[watch] Dev server exited', { code, signal });
    child = null;
    if (!restarting) {
      // Do nothing — user probably stopped it manually
    }
  });
}

function stopDev() {
  if (!child) return Promise.resolve();
  return new Promise((resolve) => {
    console.log('[watch] Stopping dev server...');
    restarting = true;
    child.on('exit', () => {
      restarting = false;
      resolve();
    });
    child.kill();
    // Fallback: resolve if child doesn't exit quickly
    setTimeout(() => resolve(), 3000);
  });
}

async function runCheckChunks() {
  return new Promise((resolve) => {
    const { spawn } = require('child_process');
    const chk = spawn('node', ['scripts/check-chunks.js'], { stdio: 'inherit', shell: true });
    chk.on('exit', (code) => {
      resolve(code === 0);
    });
    chk.on('error', () => resolve(false));
  });
}

async function restartAndClean() {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    console.log('[watch] Change detected — preparing restart');
    await stopDev();

    // Run chunk sanity check; if it fails, clean then start
    const ok = await runCheckChunks();
    if (!ok) {
      console.warn('[watch] Chunk integrity check failed — cleaning .next before restart');
      clean();
    } else {
      console.log('[watch] Chunk check passed; performing clean (fast) and restart');
      clean();
    }

    startDev();
  }, 400);
}

async function init() {
  // Run an initial chunk integrity check and clean if needed
  const ok = await runCheckChunks();
  if (!ok) {
    console.warn('[watch] Initial chunk check failed — cleaning .next before starting dev');
    clean();
  }

  startDev();

  const watcher = chokidar.watch(watchPaths, {
    ignored: /(^|[\\/])\.git|node_modules|\.next|logs/, // ignore these
    ignoreInitial: true,
    persistent: true,
  });

  watcher.on('add', restartAndClean);
  watcher.on('change', restartAndClean);
  watcher.on('unlink', restartAndClean);

  console.log('[watch] Watching for file changes in:', watchPaths.join(', '));
}

if (require.main === module) init();

module.exports = { init };
