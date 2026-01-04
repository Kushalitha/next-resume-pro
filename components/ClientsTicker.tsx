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

// Client component — uses refs and effects
'use client';
import React, { useRef, useEffect } from 'react';

export default function ClientsTicker({ clients }: { clients: { id: string; name: string; logo?: string; detail?: string; showLogo?: boolean; showName?: boolean }[] }) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Render a deterministic track and duplicate it in DOM (avoid innerHTML cloning issues)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // ensure animation starts in running state
    el.style.animationPlayState = 'running';
  }, []);

  const items = clients.map((c) => {
    const displayMode: 'logo' | 'name' = c.showLogo && c.logo ? 'logo' : c.showName ? 'name' : c.logo ? 'logo' : 'name';
    return (
      <div key={c.id} className="flex flex-col items-center gap-1 min-w-[140px] mr-4" role="listitem">
        {displayMode === 'logo' ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={c.logo ?? ''} alt={c.name} className="h-10 w-auto object-contain" />
        ) : (
          <div className="h-8 w-28 flex items-center justify-center bg-white/90 dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 text-sm font-medium rounded text-center">{c.name}</div>
        )}
        {displayMode === 'name' && c.detail ? (
          <div className="text-xs text-slate-700 dark:text-slate-300 mt-1">{c.detail}</div>
        ) : null}
      </div>
    );
  });

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="h2 mb-2 mt-2">Clients</h3>
      </div>
      <section className="w-full py-3">
        <div className="max-w-none sm:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/95 dark:bg-slate-900/85 shadow-card-md rounded-xl border border-transparent dark:border-slate-800 p-4 overflow-hidden">
          <div
            ref={ref}
            className="ticker-track animate-scroll flex gap-6 items-center whitespace-nowrap py-1"
            aria-label="Clients logos"
            role="list"
            onMouseEnter={() => { if (ref.current) ref.current.style.animationPlayState = 'paused'; ref.current?.setAttribute('aria-paused','true'); }}
            onMouseLeave={() => { if (ref.current) ref.current.style.animationPlayState = 'running'; ref.current?.setAttribute('aria-paused','false'); }}
            onTouchStart={() => { if (ref.current) ref.current.style.animationPlayState = 'paused'; ref.current?.setAttribute('aria-paused','true'); }}
            onTouchEnd={() => { if (ref.current) ref.current.style.animationPlayState = 'running'; ref.current?.setAttribute('aria-paused','false'); }}
          >
            {/* render items twice for infinite scroll */}
            {items}
            {items.map((child, idx) => React.cloneElement(child as any, { key: `dup-${idx}-${(child as any).key}` }))}
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
