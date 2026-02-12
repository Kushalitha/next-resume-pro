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

import { NextResponse } from 'next/server';
import posts from '../../content/blog';
import { portfolio } from '../../content/portfolio';
import { site } from '../../content/site';

export async function GET() {
  const base = process.env.SITE_URL || site.url || 'https://example.com';

  // Static top-level pages
  const pages = ['/', '/about', '/resume', '/portfolio', '/blog', '/pricing', '/contact'];

  // Type for sitemap entries
  type UrlEntry = { loc: string; lastmod?: string | number | undefined };

  // Dynamic pages: blog posts (published) and portfolio entries
  const blogUrls: UrlEntry[] = posts
    .filter((p) => p.published !== false) // include published by default
    .map((p) => ({ loc: `${base}${p.href ?? `/blog/${p.slug}`}`, lastmod: p.updatedAt ?? p.date }));

  const portfolioUrls: UrlEntry[] = portfolio.map((it) => ({ loc: `${base}${it.href ?? `/portfolio/${it.id}`}`, lastmod: undefined }));

  // Compose url entries, adding <lastmod> when available
  const staticUrls: UrlEntry[] = pages.map((p) => ({ loc: `${base}${p}` }));
  const all: UrlEntry[] = [...staticUrls, ...blogUrls, ...portfolioUrls];

  const urls = all
    .map((u) => `<url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`)
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
