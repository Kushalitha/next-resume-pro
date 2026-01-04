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

import { fetchGitHubRepos } from '../../lib/github';
import ProjectGridClient from '../../components/ProjectGridClient';
import { projects } from '../../content/portfolio/projects';
import PortfolioGrid from '../../components/PortfolioGrid';
import { portfolio } from '../../content/portfolio/index';
import { githubFeatured, githubUsername } from '../../content/github';
import { site } from '../../content/site';
import type { Repo } from '../../types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Portfolio - ${site.name}`,
  description: 'Browse my portfolio of projects including web development, photography work, and GitHub repositories.',
  openGraph: {
    title: `Portfolio - ${site.name}`,
    description: 'Browse my portfolio of projects including web development, photography work, and GitHub repositories.',
    type: 'website',
  },
};

export default async function Portfolio() {
  const username = process.env.GITHUB_USERNAME || githubUsername || '';
  let repos: Repo[] = [];
  try {
    repos = await fetchGitHubRepos(username);
  } catch (err) {
    console.error('Failed to fetch GitHub repos', err);
  }

  // Determine highlighted repos: prefer explicit list from `content/github.ts` if provided
  let highlighted = repos.slice(0, 6);
  if (githubFeatured && githubFeatured.length > 0) {
    const mapByName = new Map(repos.map((r) => [r.name, r]));
    highlighted = githubFeatured.map((name) => mapByName.get(name)).filter((r): r is Repo => r !== undefined).slice(0, 6);
  }

  return (
    <section className="max-w-none sm:max-w-6xl mx-auto px-1 sm:px-1 lg:px-1">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <h1 className="h1 mb-2">Portfolio</h1>
          <div className="w-10 h-1 rounded bg-[color:rgb(var(--accent))] mb-4" />
          <p className="text-slate-600 dark:text-slate-300">Filterable projects and highlighted GitHub repositories.</p>
        </div>

        <div>
          <div className="bg-[color:var(--muted)]/80 dark:bg-[color:var(--surface)]/70 rounded-xl py-6 px-0">
            {/* Portfolio grid with filters */}
            <PortfolioGrid items={portfolio} />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Featured Work</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <a key={p.id} href={p.href} className="card block">
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-slate-600 dark:text-slate-300 mt-2">{p.short}</div>
                <div className="mt-3 text-xs text-slate-500">{p.tags.join(', ')}</div>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-3">
            <h3 className="text-lg font-semibold">Highlighted GitHub Projects</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlighted.length > 0 ? highlighted.map((r) => (
              <a
                key={r.id}
                href={r.html_url ?? `https://github.com/${username}/${r.name}`}
                target="_blank"
                rel="noreferrer noopener"
                className="card block"
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold">{r.name}</h4>
                  <div className="text-xs text-slate-500">{r.language}</div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{r.description}</p>
                <div className="mt-4 text-xs text-slate-500">⭐ {r.stargazers_count}</div>
              </a>
            )) : (
              <div className="card">
                <div className="font-semibold">No GitHub projects found</div>
                <div className="text-sm text-slate-600 dark:text-slate-300 mt-2">This may be due to API rate limits or an incorrect `GITHUB_USERNAME`. Featured projects are shown above.</div>
              </div>
            )}
          </div>
        </div>


      </div>
    </section>
  );
}
