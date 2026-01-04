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

import type { BlogPost } from './types'

export const post2: BlogPost = {
  id: 'design-decisions-2025',
  title: 'Design Decisions for 2025',
  slug: 'design-decisions-2025',
  summary: "<h4>Design patterns</h4><p>Practical notes on <strong>color tokens</strong>, spacing scales, and accessible contrast. <u>Why it matters</u>: consistent systems speed up decisions across small projects.</p><p>Try this token example: <code>--accent: 34 197 94</code></p><ul><li>Tokens for color/space</li><li>Utility-first CSS with constraints</li></ul>",
  author: 'Kushalitha Maduranga',
  categories: ['design'],
  tags: ['design tokens', 'accessibility', 'colors'],
  date: '2025-10-15',
  readingTime: '4 min read',
  featuredImage: '/blog/design.svg',
  published: true,
  seo: {
    title: 'Design Decisions for 2025',
    description: 'Design patterns and accessibility choices used in the site.',
  },
  href: '/blog/design-decisions-2025'
}

export default post2
