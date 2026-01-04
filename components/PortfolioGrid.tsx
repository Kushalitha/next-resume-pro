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

"use client";

import React, { useMemo, useState, useEffect } from 'react';
import PortfolioCard from './PortfolioCard';
import { Sliders, X } from 'lucide-react';
import type { PortfolioItem } from '../content/portfolio/index';

export default function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  const [active, setActive] = useState<string>('All');
  const [query, setQuery] = useState<string>('');
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(items.map((i) => i.category)));
    return ['All', ...cats];
  }, [items]);

  const visible = useMemo(() => {
    // filter by category
    const catFiltered = active === 'All' ? items : items.filter((i) => i.category === active);
    if (!query) return catFiltered;
    const q = query.toLowerCase();
    return catFiltered.filter((i) => (
      (i.title || '').toLowerCase().includes(q) ||
      (i.subtitle || '').toLowerCase().includes(q) ||
      (i.category || '').toLowerCase().includes(q) ||
      (i.tags || []).join(' ').toLowerCase().includes(q)
    ));
  }, [active, items, query]);

  // Pagination helpers: split into two pages when there are more than 12 visible items
  const needsSplit = visible.length > 12;
  const totalPages = needsSplit ? 2 : 1;
  const pageSize = needsSplit ? Math.ceil(visible.length / 2) : (visible.length || 1);



  // close mobile dropdown on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenFilters(false);
    };
    if (openFilters) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openFilters]);

  return (
    <div className="max-w-none sm:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Filters and search sit above the card on mobile (full width) */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <nav className="hidden md:flex gap-3 w-auto overflow-auto" role="tablist" aria-label="Portfolio filters">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={active === cat}
              onClick={() => { setActive(cat); setPage(1); }}
              className={`text-sm px-3 py-1 rounded-md font-medium ${active === cat ? 'text-[color:rgb(var(--accent))]' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Search input (visible on mobile and desktop); filter icon triggers mobile dropdown */}
        <div className="ml-auto w-full sm:w-56 relative">
          <label htmlFor="portfolio-search" className="sr-only">Search projects</label>
          <div className="flex items-center gap-2">
            <input
              id="portfolio-search"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search projects"
              className="w-full text-sm p-2 rounded-md border bg-white/80 dark:bg-slate-900/70"
            />

            <button
              type="button"
              className="p-2 rounded md:hidden"
              onClick={() => setOpenFilters((s) => !s)}
              aria-label="Open filters"
            >
              <Sliders className="h-5 w-5 text-slate-500" />
            </button>

            {/* mobile dropdown */}
            {openFilters && (
              <div className="absolute left-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded shadow-md md:hidden z-50">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => { setActive(cat); setOpenFilters(false); setPage(1); }} className={`w-full text-left px-3 py-2 text-sm ${active === cat ? 'bg-[color:rgb(var(--accent))]/10 text-[color:rgb(var(--accent))]' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* previously used mobile modal removed — replaced by inline dropdown anchored to the search input */}

      {/* Mobile: full-width single column cards; Tablet and Desktop unchanged */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(() => {
          const safePage = Math.min(Math.max(1, page), totalPages);
          const start = (safePage - 1) * pageSize;
          const end = start + pageSize;
          const paged = visible.slice(start, end);
          return paged.map((it) => (
            <div className="w-full" key={it.id}>
              <PortfolioCard item={it} />
            </div>
          ));
        })()}
      </div>

      {/* Pagination controls (only if we split into pages) */}
      {visible.length > 12 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 rounded-md bg-white/90 dark:bg-slate-800/70"
            aria-label="Previous page"
            disabled={Math.min(Math.max(1, page), totalPages) === 1}
          >
            Prev
          </button>
          <div className="flex items-center gap-2">
            {[1, 2].map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 rounded-md ${Math.min(Math.max(1, page), totalPages) === p ? 'bg-[color:rgb(var(--accent))] text-white' : 'bg-white/90 dark:bg-slate-800/70'}`}
                aria-current={Math.min(Math.max(1, page), totalPages) === p ? 'true' : undefined}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(2, p + 1))}
            className="px-3 py-1 rounded-md bg-white/90 dark:bg-slate-800/70"
            aria-label="Next page"
            disabled={Math.min(Math.max(1, page), totalPages) === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
