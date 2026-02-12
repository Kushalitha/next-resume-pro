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

import { Github, Instagram, Facebook } from 'lucide-react';
import XBrand from './icons/XBrand';
import { site } from '../content/site';

export default function Footer() {
  const encodedPrefix = 'TWFkZSB3aXRoIA==';
  const decode = (s: string) => (typeof window !== 'undefined' && typeof window.atob === 'function' ? window.atob(s) : Buffer.from(s, 'base64').toString('utf8'));
  const prefix = decode(encodedPrefix);
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-100 dark:border-slate-800 py-6 mt-1">
      <div className="max-w-none sm:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row items-center sm:justify-between gap-3">
        <div className="order-2 sm:order-1 text-center sm:text-left">
          © {year} Next Resume Pro — {prefix}<span className="heart-pop text-rose-700 inline-block mx-1" aria-hidden="true">❤︎</span> by <a href={site.social.github ?? '#'} target="_blank" rel="noopener noreferrer" className="underline font-semibold">Kushalitha Maduranga</a>.
        </div>

        <div className="flex items-center gap-3 order-1 sm:order-2">
          {site.social.github && (
            <a href={site.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
              <Github className="h-5 w-5" />
            </a>
          )}
          {(site.social.x || site.social.twitter) && (
            <a href={site.social.x ?? site.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="X" className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
              <XBrand className="h-5 w-5" />
            </a>
          )}
          {site.social.facebook && (
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
              <Facebook className="h-5 w-5" />
            </a>
          )}
          {site.social.instagram && (
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
              <Instagram className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
