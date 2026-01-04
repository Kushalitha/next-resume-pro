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
import { getLatestDump } from '../../../../lib/logger';
import fs from 'fs/promises';
import path from 'path';

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
    const latest = await getLatestDump();
    if (!latest) return NextResponse.json({ ok: false, error: 'no-dump-found' }, { status: 404 });

    const data = await fs.readFile(latest);
    const filename = path.basename(latest);
    return new NextResponse(data, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
