/**
* Next Resume Pro v2.0.0
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

/*
 * Lightweight client-side error monitor to capture runtime errors and promise rejections.
 * If debug endpoints are enabled (NEXT_PUBLIC_DEBUG_LOG), it will POST errors to /api/debug/log
 * so you have server-side traceability when things go wrong.
 */

'use client';

import { useEffect } from 'react';

export default function ErrorMonitorClient() {
  useEffect(() => {
    function send(payload: any) {
      if (!process.env.NEXT_PUBLIC_DEBUG_LOG) return;
      try {
        navigator.sendBeacon?.('/api/debug/log', JSON.stringify(payload)) ||
          fetch('/api/debug/log', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } });
      } catch (e) {
        // ignore
      }
    }

    function tryReloadForChunkError(message?: string) {
      if (!message) return;
      const re = /Loading chunk|ChunkLoadError|Cannot find module for page|Failed to fetch/i;
      if (re.test(message)) {
        try {
          const key = 'next:chunk-reload';
          const last = Number(sessionStorage.getItem(key) || '0');
          const now = Date.now();
          if (!last || now - last > 60_000) {
            sessionStorage.setItem(key, String(now));
            console.info('[monitor] detected chunk load error — reloading the page to recover');
            window.location.reload();
          }
        } catch (err) {
          // ignore
        }
      }
    }

    function onError(e: ErrorEvent) {
      const payload = { kind: 'error', message: e.message, filename: e.filename, lineno: e.lineno, colno: e.colno, stack: (e.error && e.error.stack) || null, userAgent: navigator.userAgent };
      console.error('[monitor] runtime error:', payload.message, payload.filename, payload.lineno, payload.colno);
      send(payload);
      tryReloadForChunkError(payload.message || (e.error && e.error.message));
    }

    function onRejection(e: PromiseRejectionEvent) {
      const payload = { kind: 'unhandledrejection', message: e.reason && e.reason.message ? e.reason.message : String(e.reason), stack: e.reason && e.reason.stack ? e.reason.stack : null, userAgent: navigator.userAgent };
      console.error('[monitor] unhandled rejection:', payload.message);
      send(payload);
      tryReloadForChunkError(payload.message || (e.reason && (e.reason.message || String(e.reason))));
    }

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);

    // Dev-only: fetch the app layout chunk and compile it client-side to detect syntax issues
    if (process.env.NODE_ENV !== 'production') {
      (async () => {
        try {
          const url = '/_next/static/chunks/app/layout.js';
          const r = await fetch(url, { cache: 'no-store' });
          if (!r.ok) return;
          const src = await r.text();
          try {
            // Try compiling; will throw SyntaxError for unterminated comment/literal
            new Function(src);
          } catch (err: any) {
            const payload = { kind: 'chunk-syntax', file: url, message: err.message, stack: err.stack, snippet: src.slice(0, 2000), userAgent: navigator.userAgent };
            console.error('[monitor] chunk syntax error detected:', payload.message);
            send(payload);
          }
        } catch (e) {
          // ignore network errors
        }
      })();
    }

    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
    };
  }, []);

  return null;
}
