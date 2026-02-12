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

export const post5: BlogPost = {
  id: 'design-systems-for-side-projects',
  title: 'Design Systems for Side Projects',
  slug: 'design-systems-for-side-projects',
  summary: `<h4>Design systems (practical)</h4><p>Design system ideas adapted for solo and side projects. <strong>Keep it pragmatic</strong>—only add complexity when it pays off.</p><pre><code>// token example
:root { --accent: 34 197 94 }</code></pre><ul><li>Component-first approach</li><li>Simple token sets</li><li>Pragmatic documentation</li></ul>`,
  author: 'Kushalitha Maduranga',
  categories: ['design', 'engineering'],
  tags: ['design systems', 'tokens', 'ui'],
  date: '2025-02-20',
  readingTime: '6 min read',
  featuredImage: '/blog/design-systems.svg',
  published: true,
  seo: {
    title: 'Design Systems for Side Projects',
    description: 'Small-scale design systems for maintainable UIs.'
  },
  href: '/blog/design-systems-for-side-projects'
}

export default post5
