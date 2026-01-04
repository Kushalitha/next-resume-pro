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

import fs from 'fs/promises';
import path from 'path';

const LOG_DIR = process.env.DEBUG_LOG_DIR || path.join(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'debug.log');
const MAX_BYTES = Number(process.env.DEBUG_MAX_BYTES) || 5 * 1024 * 1024; // 5MB

async function ensureDir() {
  await fs.mkdir(LOG_DIR, { recursive: true });
}

const DEFAULT_REDACT_KEYS = [
  'authorization','auth','password','pwd','pass','token','access_token','refresh_token',
  'cookie','set-cookie','email','ssn','ssn_last4','ssn4','social','secret','api_key','apikey',
  'secret_key','private_key','privatekey','credit_card','card_number','cardnumber','cc-number',
  'cvv','cvc','card_cvv','exp_month','exp_year','iban','bank_account','routing_number','acct','account_number',
  'dob','birthdate','phone','phone_number','address','zipcode','zip','postal_code','message','body','request_body','raw_body',
  'payload','session','session_id','csrf','csrf_token'
];

function redact(obj: unknown, keysToRedact = DEFAULT_REDACT_KEYS) : unknown {
  if (!obj || typeof obj !== 'object') return obj;
  try {
    const out: Record<string, unknown> = Array.isArray(obj) ? [] as unknown as Record<string, unknown> : {} as Record<string, unknown>;
    const src = obj as Record<string, unknown>;
    for (const k of Object.keys(src)) {
      const v = src[k];
      const keyLower = k.toLowerCase();
      if (keysToRedact.some((x) => x === keyLower || keyLower.includes(x))) {
        (out as Record<string, unknown>)[k] = 'REDACTED';
        continue;
      }

      if (typeof v === 'string') {
        // Avoid writing huge blobs (request bodies, base64, etc.)
        if (v.length > 2000) {
          (out as Record<string, unknown>)[k] = '[REDACTED_LONG]';
          continue;
        }
        (out as Record<string, unknown>)[k] = v;
        continue;
      }

      if (v && typeof v === 'object') (out as Record<string, unknown>)[k] = redact(v, keysToRedact);
      else (out as Record<string, unknown>)[k] = v;
    }
    return out;
  } catch (_e) {
    return obj;
  }
}

async function rotateIfNeeded() {
  try {
    const stat = await fs.stat(LOG_FILE);
    if (stat.size > MAX_BYTES) {
      const ts = new Date().toISOString().replace(/[:.]/g, '-');
      const target = path.join(LOG_DIR, `debug-${ts}.log`);
      await fs.rename(LOG_FILE, target);
    }
  } catch (err: unknown) {
    const code = (err as { code?: string })?.code;
    if (code !== 'ENOENT') {
      console.error('logger.rotate error', err);
    }
  }
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export async function log(level: LogLevel, message: string, meta?: unknown) {
  if (process.env.DEBUG_LOG !== 'true') return;
  try {
    await ensureDir();
    const safeMeta = redact(meta || {});
    const payload = { time: new Date().toISOString(), level, message, meta: safeMeta };
    const line = JSON.stringify(payload) + '\n';
    await fs.appendFile(LOG_FILE, line, 'utf8');
    // ensure log file is private where possible
    try { await fs.chmod(LOG_FILE, 0o600); } catch (_e) { /* ignore on unsupported platforms */ }
    await rotateIfNeeded();

    // auto-dump on errors if enabled
    if (level === 'error' && process.env.DEBUG_AUTO_DUMP === 'true') {
      try {
        await dumpErrorDump(message, safeMeta);
      } catch (err: unknown) {
        // don't let dump failures break logging
        console.error('logger.dumpErrorDump error', err);
      }
    }
  } catch (err: unknown) {
    // Don't throw from logger
    console.error('logger error', err);
  }
}

export async function readLastLines(n = 2000) {
  try {
    const content = await fs.readFile(LOG_FILE, 'utf8');
    if (!content) return '';
    // return last n characters (simple approach)
    return content.slice(-n);
  } catch (err: unknown) {
    const code = (err as { code?: string })?.code;
    if (code === 'ENOENT') return '';
    throw err;
  }
}

export async function clearLogs() {
  try {
    await fs.unlink(LOG_FILE);
  } catch (err: unknown) {
    const code = (err as { code?: string })?.code;
    if (code !== 'ENOENT') throw err;
  }
}

export async function dumpErrorDump(message?: string, meta?: unknown) {
  try {
    await ensureDir();
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    const dumpFile = path.join(LOG_DIR, `debug-error-${ts}.log`);

    const headerLines = [
      `=== DEBUG DUMP ${new Date().toISOString()} ===`,
      `NODE_ENV: ${process.env.NODE_ENV || ''}`,
      `PID: ${process.pid}`,
      `ARGS: ${process.argv.join(' ')}`,
      ''
    ].join('\n');

    const tail = await readLastLines(32 * 1024);
    const safeMeta = redact(meta || {});
    const body = [
      headerLines,
      'Error message:',
      message || '',
      '',
      'Meta:',
      JSON.stringify(safeMeta, null, 2),
      '',
      '--- Last log tail ---',
      tail || ''
    ].join('\n');

    await fs.writeFile(dumpFile, body, { encoding: 'utf8', mode: 0o600 });
    try { await fs.chmod(dumpFile, 0o600); } catch (_e) { /* ignore */ }
    return dumpFile;
  } catch (err: unknown) {
    console.error('dumpErrorDump error', err);
    return undefined;
  }
}

export async function getLatestDump() {
  try {
    const items = await fs.readdir(LOG_DIR);
    const dumps = items.filter((f) => f.startsWith('debug-error-'));
    if (!dumps.length) return null;
    dumps.sort();
    return path.join(LOG_DIR, dumps[dumps.length - 1]);
  } catch (err: unknown) {
    const code = (err as { code?: string })?.code;
    if (code === 'ENOENT') return null;
    throw err;
  }
}

let _uncaughtInstalled = false;

export function initUncaughtCapture() {
  if (_uncaughtInstalled) return;
  if (process.env.DEBUG_CAPTURE_UNCAUGHT !== 'true') return;
  _uncaughtInstalled = true;

  // Handle uncaught exceptions
  process.on('uncaughtException', async (err: unknown) => {
    try {
      const msg = (err as Error)?.message ?? String(err);
      const stack = (err as Error)?.stack;
      await log('error', 'uncaughtException', { message: msg, stack });
    } catch (e: unknown) {
      // best-effort: don't crash
      console.error('uncaughtException logging failed', e);
    }
    // don't exit; it's up to the runtime/consumer to decide
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', async (reason: unknown) => {
    try {
      const payload = typeof reason === 'object' && reason !== null ? { message: (reason as { message?: string }).message, stack: (reason as { stack?: string }).stack } : { reason };
      await log('error', 'unhandledRejection', payload);
    } catch (e: unknown) {
      console.error('unhandledRejection logging failed', e);
    }
  });
}

// Auto-init if the env var is set and module is loaded
try {
  initUncaughtCapture();
} catch (err) {
  // swallow
}

// Enforce safe defaults in production: debug flags must be disabled
if (process.env.NODE_ENV === 'production') {
  if (process.env.DEBUG_ALLOW_READ === 'true' || process.env.DEBUG_LOG === 'true') {
    console.error('FATAL: DEBUG_ALLOW_READ and DEBUG_LOG must be false in production. Please disable debug flags before deploying to production.');
    throw new Error('Debug flags are not allowed in production. Set DEBUG_ALLOW_READ=false and DEBUG_LOG=false.');
  }
}

