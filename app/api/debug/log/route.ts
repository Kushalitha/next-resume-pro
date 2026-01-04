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

import { NextResponse } from 'next/server';
import { log, readLastLines } from '../../../../lib/logger';
import { checkRateLimit } from '../../../../lib/rateLimiter';

function getClientKey(req: Request) {
  const forwarded = req.headers.get('x-forwarded-for') || '';
  const ip = forwarded.split(',')[0].trim() || req.headers.get('host') || 'unknown';
  return ip;
}

export async function POST(req: Request) {
  // Only allow logging when DEBUG_LOG is enabled
  if (process.env.DEBUG_LOG !== 'true') return NextResponse.json({ ok: false, error: 'logging-disabled' }, { status: 403 });

  // Simple rate limit per IP (protect against spam) - uses Redis when configured
  const key = getClientKey(req);
  const rl = await checkRateLimit(`debug-log:${key}`, 120, 60_000);
  if (!rl.allowed) return NextResponse.json({ ok: false, error: 'rate-limited' }, { status: 429 });

  // If a write-secret is configured, require it
  const secret = process.env.DEBUG_WRITE_SECRET;
  if (secret && req.headers.get('x-debug-secret') !== secret) {
    return NextResponse.json({ ok: false, error: 'invalid-secret' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { level = 'debug', message = '', meta } = body || {};
    await log(level, message, meta);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

export async function GET(req: Request) {
  if (process.env.DEBUG_ALLOW_READ !== 'true') {
    return NextResponse.json({ ok: false, error: 'read-not-allowed' }, { status: 403 });
  }

  // optional read secret
  const readSecret = process.env.DEBUG_READ_SECRET;
  if (readSecret && req.headers.get('x-debug-secret') !== readSecret) {
    return NextResponse.json({ ok: false, error: 'invalid-secret' }, { status: 403 });
  }

  try {
    const url = new URL(req.url);
    const chars = Number(url.searchParams.get('chars') || '2000');
    const content = await readLastLines(chars);
    return new NextResponse(content, { status: 200 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
