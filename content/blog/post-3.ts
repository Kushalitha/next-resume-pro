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

import type { BlogPost } from './types'

export const post3: BlogPost = {
  id: 'deploying-with-confidence',
  title: 'Deploying with Confidence',
  slug: 'deploying-with-confidence',
  summary: `<h4>Build safety</h4><p>Checks and runtime monitoring reduce regressions. I show scripts and small CI steps to catch issues early.</p><pre><code>node scripts/check-chunks.js</code></pre><ul><li>Chunk validation</li><li>Runtime error POSTs</li><li>Prebuild guards</li></ul>`,
  author: 'Kushalitha Maduranga',
  categories: ['devtools', 'ci'],
  tags: ['ci', 'monitoring', 'build checks'],
  date: '2025-09-30',
  readingTime: '5 min read',
  featuredImage: '/blog/deploy.svg',
  published: true,
  seo: {
    title: 'Deploying with Confidence',
    description: 'Build-time checks, chunk validation, and runtime monitoring techniques.'
  },
  href: '/blog/deploying-with-confidence'
}

export default post3
