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

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Use requestAnimationFrame to avoid setting state synchronously inside an effect
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    // mounted state is used to avoid hydration flicker; no debug logging in production
  }, [mounted, theme, systemTheme]);

  // Compute initial guess from document (set by inline script) to avoid visual delay
  const initial = (typeof window !== 'undefined' && document.documentElement.classList.contains('dark')) ? 'dark' : 'light';
  const current = mounted ? (theme === 'system' ? systemTheme : theme) : initial;

  function toggleTheme() {
    // Use the live `theme` value to avoid relying on the initial guess.
    const live = mounted ? (theme === 'system' ? systemTheme : theme) : initial;
    const next = live === 'dark' ? 'light' : 'dark';

    // If setTheme is available, use it; otherwise fallback to direct DOM/localStorage update
    if (typeof setTheme === 'function') {
      try {
        setTheme(next);
      } catch (e) {
        // swallow errors silently to not disturb UI
      }
    } else if (typeof window !== 'undefined') {
      // Best-effort fallback for early clicks (should be rare): persist preference and mutate class
      try {
        localStorage.setItem('theme', next);
        document.documentElement.classList.toggle('dark', next === 'dark');
      } catch (e) {
        // ignore
      }
    }
  }

  const disabled = !mounted;
  return (
    // Render both icons so server and client DOM match; CSS toggles visibility based on the theme
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      aria-disabled={disabled}
      title={disabled ? 'Loading theme...' : 'Toggle theme'}
      className={`p-2 rounded-md transition-colors ${disabled ? 'opacity-60 cursor-wait pointer-events-none' : 'cursor-pointer bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600'}`}
    >
      {/* Sun visible in light theme, Moon visible in dark theme (CSS-only) */}
      <Sun size={16} className="block dark:hidden" aria-hidden="true" />
      <Moon size={16} className="hidden dark:block" aria-hidden="true" />
    </button>
  );
}
