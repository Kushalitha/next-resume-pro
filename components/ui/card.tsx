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

"use client";

import React from 'react';

type UICardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  role?: string;
};

export default function UICard({ children, className = '', onClick, role }: UICardProps) {
  const handleKey = (e: React.KeyboardEvent) => {
    if (!onClick) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`bg-white/95 dark:bg-slate-900/85 shadow-card-md rounded-xl border border-transparent dark:border-slate-800 p-6 transition-transform duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(124,58,237,0.12)] ${className}`}
      tabIndex={0}
      role={role ?? (onClick ? 'button' : undefined)}
      onClick={onClick}
      onKeyDown={handleKey}
      aria-pressed={onClick ? false : undefined}
    >
      {children}
    </div>
  );
}
