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

/* eslint-disable @next/next/no-img-element */
import React from 'react'

// Simple mock for `next/image` used in tests — intentionally renders a plain `<img>`.
// Using `<img>` here keeps tests fast and avoids needing the full Next.js image runtime.
export default function MockImage(props: any) {
  const { src, alt, width, height, className, style } = props
  return <img src={String(src)} alt={alt ?? ''} width={width} height={height} className={className} style={style} />
}
