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

import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

/**
 * Small wrappers around framer-motion elements that respect the
 * user's `prefers-reduced-motion` setting by disabling animations
 * when reduction is requested.
 */
function withReduced<T extends keyof JSX.IntrinsicElements>(Comp: any) {
  // Avoid over-constraining motion prop types across different framer-motion versions;
  // accept any props and preserve runtime behavior while still enforcing reduced-motion.
  return function ReducedMotionWrapper(props: any) {
    const shouldReduce = useReducedMotion();
    const { initial, animate, whileInView, transition, ...rest } = props as any;

    // When reduced motion is requested, strip animation-specific props.
    const safeProps = shouldReduce
      ? rest
      : { initial, animate, whileInView, transition, ...rest };

    return <Comp {...safeProps} />;
  };
}

export const MotionDiv = withReduced<'div'>(motion.div);
export const MotionSection = withReduced<'section'>(motion.section);
export const MotionButton = withReduced<'button'>(motion.button);

export default MotionDiv;
