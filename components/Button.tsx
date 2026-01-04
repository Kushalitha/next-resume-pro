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

import { ReactNode } from 'react';

export default function Button({ children, onClick, className, ariaLabel }: { children: ReactNode; onClick?: () => void; className?: string; ariaLabel?: string; }) {
  return (
    <button onClick={onClick} aria-label={ariaLabel} className={`px-4 py-2 rounded-md shadow transition-transform active:scale-95 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${className ?? ''}`}>
      {children}
    </button>
  );
}
