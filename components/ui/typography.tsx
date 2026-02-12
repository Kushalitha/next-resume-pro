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

import React from 'react';

export function H1({ children }: { children: React.ReactNode }) {
  return <h1 className="text-3xl font-bold">{children}</h1>;
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-semibold">{children}</h2>;
}

export function Lead({ children }: { children: React.ReactNode }) {
  return <p className="text-lg text-slate-600 dark:text-slate-300">{children}</p>;
}
