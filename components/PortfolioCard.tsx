/**
* Next Resume Pro v2.0.0
* Author: Kushalitha Maduranga
* Year: 2026
*
* License:
* - Code (TypeScript, JavaScript, build scripts): MIT License
* - UI / Design (CSS, layout, visual components): CC BY 4.0
* Attribution Required
*
* Repository:
* https://github.com/Kushalitha
*/

"use client";

import React from 'react';
import UICard from './ui/card';

import type { PortfolioItem } from '../content/portfolio/index';

import Link from 'next/link'

const PortfolioCard = React.memo(function PortfolioCard({ item }: { item: PortfolioItem }) {
  const href = item.href ?? `/portfolio/${item.id}`

  return (
    <Link href={href} className="block">
      <UICard className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="w-full h-32 bg-linear-to-br from-slate-800/10 to-slate-400/6 dark:from-slate-700/30 dark:to-slate-800/40 rounded-md overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image ?? '/profile.jpg'} alt={item.title} className="w-full h-full object-cover" />
        </div>

        <div className="p-4 pt-3">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">{item.subtitle}</div>
          <h4 className="font-semibold text-lg text-slate-900 dark:text-slate-100">{item.title}</h4>
          <div className="mt-3 text-xs text-slate-600 dark:text-slate-300">{item.category}</div>
        </div>
      </UICard>
    </Link>
  );
});

export default PortfolioCard;
