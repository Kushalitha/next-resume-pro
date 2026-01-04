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

// Lazy-initializing sanitizer to avoid pulling server-only libs into the client bundle
let DOMPurify: any = null
let initTried = false

function initSanitizer() {
  if (initTried) return
  initTried = true

  try {
    // Only require server-side JSDOM when running on node (no window)
    if (typeof window === 'undefined') {
       
      const { JSDOM } = require('jsdom')
       
      const createDOMPurify = require('isomorphic-dompurify')
      if (typeof createDOMPurify === 'function') {
        DOMPurify = createDOMPurify((new JSDOM('')).window)
      } else {
        DOMPurify = createDOMPurify
      }
    } else {
      // browser: use the window to create DOMPurify if available
       
      const createDOMPurify = require('isomorphic-dompurify')
      if (typeof createDOMPurify === 'function') {
        DOMPurify = createDOMPurify((window as any))
      } else {
        DOMPurify = createDOMPurify
      }
    }
  } catch (err) {
    // Leave DOMPurify null and fallback to a minimal sanitizer
    DOMPurify = null
  }
}

export function sanitizeHtml(html: string) {
  if (!initTried) initSanitizer()

  if (!DOMPurify || typeof DOMPurify.sanitize !== 'function') {
    // Minimal fallback: remove script tags repeatedly to prevent incomplete sanitization
    // Apply regex repeatedly until no more matches to prevent attacks like <sc<script>ript>
    let sanitized = String(html)
    let previous
    do {
      previous = sanitized
      sanitized = sanitized.replace(/<script[\s\S]*?>[\s\S]*?<\/script[^>]*>/gi, '')
    } while (sanitized !== previous)
    return sanitized
  }

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'a','b','i','em','strong','u','p','h1','h2','h3','h4','h5','h6','ul','ol','li','br','hr','blockquote','pre','code','img','figure','figcaption','table','thead','tbody','tr','td','th','del','sup','sub','kbd','details','summary','span'
    ],
    ALLOWED_ATTR: ['href', 'title', 'class', 'id', 'rel', 'target', 'src', 'alt', 'width', 'height', 'loading', 'align', 'colspan', 'rowspan', 'scope']
  })
}

export default sanitizeHtml
