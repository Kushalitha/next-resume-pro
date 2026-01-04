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

import React from 'react';
import UICard from './ui/card';
import UIPrimaryButton from './ui/button';
import type { Project } from '../types';

export default function ProjectCard({ repo, onOpen }: { repo: Project; onOpen?: (r: Project) => void }) {
  const displayName = 'name' in repo ? repo.name : (repo.title || 'Untitled');
  const url = 'html_url' in repo ? repo.html_url : (repo.href || repo.liveUrl || repo.repoUrl);
  const stars = repo.stargazers_count || 0;
  
  return (
    <UICard className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => onOpen && onOpen(repo)}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-accent-500 to-indigo-500 mt-1" />
          <h3 className="font-semibold">{displayName}</h3>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">{repo.language}</div>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-3">{repo.description}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-3"><span>⭐</span><span>{stars}</span></div>
        <div>
          {url && <a className="text-accent-600 dark:text-accent-300 mr-3" href={url} target="_blank" rel="noopener noreferrer">View</a>}
          <UIPrimaryButton onClick={() => onOpen && onOpen(repo)} aria-label={`Open ${displayName} details`} className="text-sm px-3 py-1">
            Preview
          </UIPrimaryButton>
        </div>
      </div>
    </UICard>
  );
}
