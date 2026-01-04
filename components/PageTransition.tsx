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

import { ReactNode, useEffect, useState } from 'react';

export default function PageTransition({ children }: { children: ReactNode }) {
  // Keep content visible by default to avoid cases where effect doesn't run
  // and the page appears blank. Use a gentle fade-in animation instead.
  return <div className="animate-fade-in">{children}</div>;
}
