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

"use client"

import React, { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

function ImgWithFallback({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [errored, setErrored] = useState(false)
  const srcToUse = errored ? '/portfolio/placeholder.svg' : src

  // Parent is relative with fixed height; use absolute to fill the container
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={srcToUse}
        alt={alt}
        className={`${className ?? ''} absolute inset-0 w-full h-full`}
        onError={() => setErrored(true)}
        loading="lazy"
      />
    </>
  )
}

export default function Gallery({ images, altPrefix }: { images: string[]; altPrefix?: string }) {
  const [open, setOpen] = useState<number | null>(null)
  const modalRef = React.useRef<HTMLDivElement | null>(null)
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null)
  const lastFocused = React.useRef<HTMLElement | null>(null)
  const prevOverflow = React.useRef<string | null>(null)



  // Touch/swipe support for mobile gallery
  const touchStartX = React.useRef<number | null>(null)
  const touchCurrentX = React.useRef<number | null>(null)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchCurrentX.current = e.touches[0].clientX
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchCurrentX.current = e.touches[0].clientX
  }, []);

  const handleTouchEnd = useCallback(() => {
    const start = touchStartX.current
    const end = touchCurrentX.current
    if (start === null || end === null) return
    const delta = end - start
    const threshold = 50 // px
    if (delta > threshold) {
      // swipe right -> previous
      setOpen((i) => (i === null ? null : Math.max(0, i - 1)))
    } else if (delta < -threshold) {
      // swipe left -> next
      setOpen((i) => (i === null ? null : Math.min(images.length - 1, i + 1)))
    }

    // reset refs
    touchStartX.current = null
    touchCurrentX.current = null
  }, [images.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (open === null) return
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowLeft') setOpen((i) => (i === null ? null : Math.max(0, i - 1)))
      if (e.key === 'ArrowRight') setOpen((i) => (i === null ? null : Math.min(images.length - 1, i + 1)))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, images.length])

  useEffect(() => {
    if (open !== null) {
      // Save last focused element and move focus to close button for keyboard users
      lastFocused.current = document.activeElement as HTMLElement | null
      prevOverflow.current = document.body.style.overflow
      // focus the close button if available
      if (closeBtnRef.current) closeBtnRef.current.focus()
      else if (modalRef.current) modalRef.current.focus()
      // prevent background scroll and horizontal scroll on mobile
      document.body.style.overflow = 'hidden'
      document.body.style.overflowX = 'hidden'
    } else {
      // restore
      if (lastFocused.current) lastFocused.current.focus()
      document.body.style.overflow = prevOverflow.current ?? ''
      document.body.style.overflowX = ''
    }

    // ensure we restore overflow on unmount too
    return () => {
      document.body.style.overflow = prevOverflow.current ?? ''
      document.body.style.overflowX = ''
    }
  }, [open])

  if (!images || images.length === 0) return null

  const onModalKeyDown = (e: React.KeyboardEvent) => {
    // Basic focus trap: keep focus within the modal when Tab/Shift+Tab is used
    if (e.key !== 'Tab') return
    const modal = modalRef.current
    if (!modal) return
    const focusable = modal.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  // Modal markup rendered into body to avoid ancestor stacking/overflow clipping
  const modal = (
    <div onClick={(e) => { if (e.currentTarget === e.target) setOpen(null) }} className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 p-4 sm:p-0" role="dialog" aria-modal="true" aria-label={`${altPrefix ?? 'Gallery'} dialog`}>
      <div ref={modalRef} tabIndex={-1} onKeyDown={onModalKeyDown} className="relative w-full max-w-[95vw] sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl">
        {/* Use neutral slate tones so the modal works well in both light and dark themes */}
        <div className="bg-slate-50 dark:bg-slate-900/80 rounded-lg shadow-lg overflow-hidden relative max-h-[96vh]">
          <button ref={closeBtnRef} aria-label="Close" onClick={() => setOpen(null)} className="cursor-pointer absolute right-3 top-3 z-50 text-slate-900 bg-white/90 dark:text-slate-100 dark:bg-slate-800/80 text-sm p-3 sm:p-2 rounded-full hover:bg-white/95 dark:hover:bg-slate-700/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 dark:focus-visible:ring-white" title="Close">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <button aria-label="Previous" onClick={() => setOpen((i) => (i === null ? null : Math.max(0, i - 1)))} className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 z-50 text-slate-900 dark:text-slate-100 text-3xl md:text-2xl bg-white/90 dark:bg-slate-800/80 hover:bg-white/95 dark:hover:bg-slate-700/70 p-3 sm:p-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 dark:focus-visible:ring-white" title="Previous">‹</button>

          <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} className="relative w-full max-w-full h-[60vh] md:h-[72vh] lg:h-[80vh] xl:h-[84vh] sm:aspect-4/3 bg-slate-100 dark:bg-slate-900/70 flex items-center justify-center border-2 border-slate-200 dark:border-slate-700 rounded-md shadow-sm overflow-hidden mx-auto">
            <ImgWithFallback src={images[open ?? 0]} alt={`${altPrefix ?? 'Image'} ${open !== null ? open + 1 : 1}`} className="object-contain w-auto max-w-full max-h-full" />
          </div>

            <button aria-label="Next" onClick={() => setOpen((i) => (i === null ? null : Math.min(images.length - 1, i + 1)))} className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 z-50 text-slate-900 dark:text-slate-100 text-3xl md:text-2xl bg-white/90 dark:bg-slate-800/80 hover:bg-white/95 dark:hover:bg-slate-700/70 p-3 sm:p-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 dark:focus-visible:ring-white" title="Next">›</button>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((src, i) => (
          <button key={src} onClick={() => setOpen(i)} className="cursor-pointer rounded overflow-hidden focus:outline-none shadow-sm hover:shadow-md transition-transform transform hover:scale-[1.02] border-2 border-slate-200 dark:border-slate-700">
            <div className="relative w-full h-36 sm:h-28 lg:h-36 overflow-hidden rounded">
              <ImgWithFallback src={src} alt={`${altPrefix ?? 'Image'} ${i + 1}`} className="object-cover rounded" />
            </div>
          </button>
        ))}
      </div>

      {/* render modal into body to avoid stacking/overflow problems */}
      {open !== null && typeof document !== 'undefined' ? createPortal(modal, document.body) : null}
    </div>
  )
}