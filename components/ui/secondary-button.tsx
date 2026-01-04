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

type SecondaryProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
} & (
  | React.ButtonHTMLAttributes<HTMLButtonElement>
  | React.AnchorHTMLAttributes<HTMLAnchorElement>
);

export default function UISecondaryButton({ children, className, href, ...props }: SecondaryProps) {
  if (href) {
    return (
      <a
        href={href}
        className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium bg-surface bg-opacity-80 dark:bg-slate-700/40 dark:text-slate-100 text-[color:var(--text)] border border-slate-200 dark:border-slate-700 hover:bg-surface/95 dark:hover:bg-slate-700/60 hover:shadow-sm dark:hover:shadow-lg transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-600/30 ${className ?? ''}`}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium bg-surface bg-opacity-80 dark:bg-slate-700/40 dark:text-slate-100 text-[color:var(--text)] border border-slate-200 dark:border-slate-700 hover:bg-surface/95 dark:hover:bg-slate-700/60 hover:shadow-sm dark:hover:shadow-lg transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-600/30 ${className ?? ''}`}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
