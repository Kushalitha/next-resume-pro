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

import React from 'react';
import Link from 'next/link';

type PrimaryProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
};

export default function UIPrimaryButton({ children, className, href, ...props }: PrimaryProps) {
  const classes = `cursor-pointer inline-flex transform-gpu transition-all duration-200 ease-in-expo items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold shadow-md bg-linear-to-r from-accent-500 via-purple-500 to-indigo-500 text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(124,58,237,0.14)] ${className ?? ''}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as any)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
