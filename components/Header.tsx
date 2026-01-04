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

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname() ?? '/';
  const [open, setOpen] = useState(false);
  const base = 'text-sm transition-all duration-150 hover:text-accent-600/90 hover:underline-offset-4';
  const activeClass = 'text-accent-600/90 font-semibold';

  return (
    <header className="w-full sticky top-0 z-40 backdrop-blur-sm bg-[color:var(--surface)]/80 dark:bg-[color:var(--surface)]/80 border-b border-slate-100/50 dark:border-slate-800/60 shadow-sm dark:shadow transition-shadow" role="banner">
      <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-extrabold text-base md:text-lg tracking-tight" aria-label="Home">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-indigo-600">Next Resume Pro</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4" role="navigation" aria-label="Primary">
          <Link href="/" className={`${base} ${pathname === '/' ? activeClass : ''}`} aria-current={pathname === '/' ? 'page' : undefined}>
            Home
          </Link>
          <Link href="/about" className={`${base} ${pathname.startsWith('/about') ? activeClass : ''}`} aria-current={pathname.startsWith('/about') ? 'page' : undefined}>
            About
          </Link>
          <Link href="/resume" className={`${base} ${pathname.startsWith('/resume') ? activeClass : ''}`} aria-current={pathname.startsWith('/resume') ? 'page' : undefined}>
            Resume
          </Link>
          <Link href="/portfolio" className={`${base} ${pathname.startsWith('/portfolio') ? activeClass : ''}`} aria-current={pathname.startsWith('/portfolio') ? 'page' : undefined}>
            Portfolio
          </Link>
          <Link href="/blog" className={`${base} ${pathname.startsWith('/blog') ? activeClass : ''}`} aria-current={pathname.startsWith('/blog') ? 'page' : undefined}>
            Blog
          </Link>
          <Link href="/contact" className={`${base} ${pathname.startsWith('/contact') ? activeClass : ''}`} aria-current={pathname.startsWith('/contact') ? 'page' : undefined}>
            Contact
          </Link>

          <ThemeToggle />
        </nav>

        {/* Mobile controls: theme toggle + menu button */}
        <div className="md:hidden flex items-center gap-2">
          <div className="block md:hidden">
            <ThemeToggle />
          </div>
          <button aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)} className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu panel */}
        {open && (
          <div 
            className="absolute right-4 top-16 z-50 bg-[color:var(--surface)] dark:bg-[color:var(--surface)]/90 border border-slate-100 dark:border-slate-800 rounded-lg shadow-lg p-4 md:hidden"
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            <nav className="flex flex-col gap-2" role="navigation" aria-label="Mobile menu">
              <Link href="/" onClick={() => setOpen(false)} className={`${base} ${pathname === '/' ? activeClass : ''}`} aria-current={pathname === '/' ? 'page' : undefined}>Home</Link>
              <Link href="/about" onClick={() => setOpen(false)} className={`${base} ${pathname.startsWith('/about') ? activeClass : ''}`} aria-current={pathname.startsWith('/about') ? 'page' : undefined}>About</Link>
              <Link href="/resume" onClick={() => setOpen(false)} className={`${base} ${pathname.startsWith('/resume') ? activeClass : ''}`} aria-current={pathname.startsWith('/resume') ? 'page' : undefined}>Resume</Link>
              <Link href="/portfolio" onClick={() => setOpen(false)} className={`${base} ${pathname.startsWith('/portfolio') ? activeClass : ''}`} aria-current={pathname.startsWith('/portfolio') ? 'page' : undefined}>Portfolio</Link>
              <Link href="/blog" onClick={() => setOpen(false)} className={`${base} ${pathname.startsWith('/blog') ? activeClass : ''}`} aria-current={pathname.startsWith('/blog') ? 'page' : undefined}>Blog</Link>
              <Link href="/contact" onClick={() => setOpen(false)} className={`${base} ${pathname.startsWith('/contact') ? activeClass : ''}`} aria-current={pathname.startsWith('/contact') ? 'page' : undefined}>Contact</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
