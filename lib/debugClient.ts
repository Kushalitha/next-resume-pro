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

export async function sendDebug(level: 'debug'|'info'|'warn'|'error', message: string, meta?: any) {
  try {
    // Only send when enabled by env var at build-time
    if (process.env.NEXT_PUBLIC_DEBUG_LOG !== 'true') return;
    await fetch('/api/debug/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level, message, meta }),
    });
  } catch (err) {
    // swallow errors in client logger
     
    console.warn('sendDebug failed', err);
  }
}
