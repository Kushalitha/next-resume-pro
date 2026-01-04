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

import React from 'react';

export default function SkillBar({ label, percent }: { label: string; percent: number }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-slate-500">{percent}%</div>
      </div>
      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent-500 to-indigo-500"
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
} 
