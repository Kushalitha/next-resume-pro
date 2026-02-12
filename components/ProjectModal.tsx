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

'use client';

import React, { useCallback } from 'react';
import type { Project } from '../types';

export default function ProjectModal({ repo, onClose }: { repo: Project | null; onClose: () => void }) {
  if (!repo) return null;
  
  const displayName = 'name' in repo ? repo.name : (repo.title || 'Untitled');
  const url = 'html_url' in repo ? repo.html_url : (repo.href || repo.liveUrl || repo.repoUrl);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />
      <div role="dialog" aria-modal="true" aria-label={`Project details: ${displayName}`} className="bg-white dark:bg-slate-800 rounded-lg p-6 z-10 max-w-2xl w-full transform transition-all duration-150 scale-100">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">{displayName}</h3>
          <button onClick={onClose} className="cursor-pointer text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300" aria-label="Close project modal">
            Close
          </button>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">{repo.description}</p>
        <div className="mt-4 text-sm text-slate-500">Language: {repo.language || '—'}</div>
        {url && (
          <div className="mt-4">
            <a className="text-brand-500" href={url} target="_blank" rel="noopener noreferrer">Open Project</a>
          </div>
        )}
      </div>
    </div>
  );
}
