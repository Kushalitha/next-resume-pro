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

"use client";

import React, { useEffect, useState, ReactNode } from 'react';
import { MotionSection } from './animations/motion-wrapper';

export default function HeroAnimatedSection({
  children,
  className,
  style
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Render a plain section on the server (or before mount) so content is visible
  if (!mounted) {
    return (
      <section className={className} style={style}>
        {children}
      </section>
    );
  }

  // After mount, render the motion-enhanced section to animate in
  return (
    <MotionSection className={className} style={style} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
      {children}
    </MotionSection>
  );
}
