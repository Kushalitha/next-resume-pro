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

'use client'

import React, { useEffect, useRef } from 'react'
import Prism from 'prismjs' 
// Import commonly used languages
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup' // html/xml
import 'prismjs/components/prism-json'

type Props = {
  html: string
}

export default function PostContentClient({ html }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    // Ensure code blocks have a language class for Prism to highlight
    const codes = Array.from(root.querySelectorAll('pre code')) as HTMLElement[]
    codes.forEach((el) => {
      const preEl = el.parentElement as HTMLElement | null
      if (preEl) preEl.style.position = 'relative'

      const hasLang = Array.from(el.classList).some((c) => c.startsWith('language-'))
      if (!hasLang) {
        const text = (el.textContent || '').trim()
        const isJSON = text.startsWith('{') || text.startsWith('[')
        const isHTML = text.startsWith('<')
        if (isJSON) el.classList.add('language-json')
        else if (isHTML) el.classList.add('language-markup')
        else if (/^\s*(#|\/\!|sudo|node)/.test(text)) el.classList.add('language-bash')
        else if (/=>|function|\bconst\b|\blet\b|\bvar\b|\bclass\b/.test(text)) el.classList.add('language-javascript')
        else el.classList.add('language-bash')
      }

      // Add copy button if not already present
      if (preEl && !preEl.querySelector('.copy-code-btn')) {
        const btn = document.createElement('button')
        btn.className = 'copy-code-btn absolute right-2 top-2 bg-white/90 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 text-xs px-2 py-1 rounded border'
        btn.type = 'button'
        btn.setAttribute('aria-label', 'Copy code')
        btn.textContent = 'Copy'
        btn.onclick = async () => {
          try {
            await navigator.clipboard.writeText(el.textContent || '')
            const original = btn.textContent
            btn.textContent = 'Copied'
            setTimeout(() => { btn.textContent = original }, 1500)
          } catch (e) {
            btn.textContent = 'Error'
            setTimeout(() => { btn.textContent = 'Copy' }, 1500)
          }
        }
        preEl.appendChild(btn)
      }
    })

    // Highlight only inside this root
    Prism.highlightAllUnder(root)
  }, [html])

  return (
    <div ref={ref} className="prose lg:prose-xl dark:prose-invert max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: html }} />
  )
}
