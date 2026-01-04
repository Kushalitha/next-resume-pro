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

import type { Repo } from '../types';
import { log } from './logger';

const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

export async function fetchGitHubRepos(username: string): Promise<Repo[]> {
  if (!username) return [];
  const cacheKey = `gh:${username}`;
  const g = globalThis as unknown as { __gh_cache?: Map<string, { ts: number; data: Repo[] }> };
  if (!g.__gh_cache) g.__gh_cache = new Map();
  const cached = g.__gh_cache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data;

  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers });
    if (!res.ok) {
      // Log a warning (if debug logging enabled) and return an empty list as a graceful fallback
      await log('warn', 'GitHub API non-OK response', { status: res.status, username });
      return [];
    }

    const json = await res.json() as unknown;
    if (!Array.isArray(json)) return [];

    const repos: Repo[] = (json as Record<string, unknown>[]).map((r) => ({
      id: Number((r as any).id),
      name: String(r.name ?? ''),
      html_url: String(r.html_url ?? ''),
      description: typeof r.description === 'string' ? r.description : '',
      stargazers_count: Number(r.stargazers_count ?? 0) || 0,
      language: typeof r.language === 'string' ? r.language : undefined
    }));

    g.__gh_cache.set(cacheKey, { ts: Date.now(), data: repos });
    return repos;
  } catch (err: unknown) {
    // Best-effort: don't throw from this helper during build. Log error if debug enabled and return empty.
    await log('error', 'GitHub fetch failed', { username, error: String(err) });
    return [];
  }
}
