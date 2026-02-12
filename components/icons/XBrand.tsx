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

import * as React from 'react';

export default function XBrand({ className = 'h-5 w-5', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* X brand logo */}
      <path d="M13.8 10.5L20.7 2.3h-1.6l-6 6.8-4.8-6.8H2.2l7.2 10.5L2.2 21.7h1.6l6.4-7.2 5.1 7.2h6.1L13.8 10.5zm-2.3 2.6l-.7-1.1L4.9 3.7h2.5l4.6 6.5.7 1.1 6.2 8.7h-2.5l-4.9-6.9z"/>
    </svg>
  );
}
