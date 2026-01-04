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

'use client';

import React, { useMemo, useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import type { Project } from '../types';

export default function ProjectGridClient({ repos, items }: { repos?: Project[]; items?: Project[] }) {
  const data = useMemo(() => (items && items.length > 0 ? items : repos || []), [items, repos]);

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'starred'>('all');
  const [open, setOpen] = useState<Project | null>(null);

  const languages = useMemo(() => {
    const set = new Set<string>();
    data.forEach((r) => r.language && set.add(r.language));
    return Array.from(set).filter(Boolean);
  }, [data]);

  const filtered = useMemo(() => {
    let out = data;

    // If these look like GitHub repo objects, support star filter
    if (filter === 'starred' && out && out.length > 0) {
      out = out.filter((r) => (r.stargazers_count ?? 0) > 0);
    }

    if (query && out && out.length > 0) {
      const q = query.toLowerCase();
      out = out.filter((r) => {
        // Handle both Repo and ContentProject types
        const name = ('name' in r ? r.name : '') || '';
        const title = ('title' in r ? r.title : '') || '';
        const short = ('short' in r ? r.short : '') || '';
        const category = ('category' in r ? r.category : '') || '';
        const tags = ('tags' in r ? (r.tags || []).join(' ') : '') || '';
        
        return (
          name.toLowerCase().includes(q) ||
          title.toLowerCase().includes(q) ||
          (r.description || '').toLowerCase().includes(q) ||
          short.toLowerCase().includes(q) ||
          category.toLowerCase().includes(q) ||
          tags.toLowerCase().includes(q)
        );
      });
    }

    return out;
  }, [data, filter, query]);

  // Show a helpful message or fallback when no projects are available
  if (!data || data.length === 0) {
    return (
      <div className="space-y-4">
        <div className="text-sm text-slate-500">No projects found locally — add project entries to `content/portfolio/index.ts` or configure a GitHub username to fetch repos.</div>
        <div className="card">
          <div className="font-semibold">No projects to display</div>
          <div className="text-sm text-slate-600 dark:text-slate-300 mt-2">If this persists, try adding items to `content/portfolio/index.ts` or check GitHub API availability.</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor="project-search" className="sr-only">Search projects</label>
          <input id="project-search" placeholder="Search projects" value={query} onChange={(e) => setQuery(e.target.value)} className="p-2 border rounded-md" />
          <label htmlFor="project-filter" className="sr-only">Filter</label>
          <select id="project-filter" onChange={(e) => setFilter(e.target.value as 'all' | 'starred')} value={filter} className="p-2 border rounded-md">
            <option value="all">All</option>
            <option value="starred">Starred</option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="lang-filter" className="text-sm text-slate-500">Filter by language:</label>
          <select id="lang-filter" onChange={() => {}} className="p-2 border rounded-md">
            <option>All</option>
            {languages.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((repo, idx) => (
          <ProjectCard key={repo.id || repo.name || `idx-${idx}`} repo={repo} onOpen={(r) => setOpen(r)} />
        ))}
      </div>

      <ProjectModal repo={open} onClose={() => setOpen(null)} />
    </div>
  );
}
