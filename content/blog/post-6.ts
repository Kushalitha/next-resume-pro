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

export const post6: BlogPost = {
  id: 'automating-photo-workflows',
  title: 'Automating Photoworkflows with Node',
  slug: 'automating-photo-workflows',
  summary: `<h4>Automating photo workflows</h4><p>Small Node scripts can automate exports, backups, and repetitive edits—freeing hours each month. <strong>Start small</strong> and iterate.</p><pre><code>// example: rename files with exif date
node scripts/rename-by-exif.js</code></pre><ul><li>Automate exports</li><li>Safe backups</li><li>Small, testable scripts</li></ul>`,
  author: 'Kushalitha Maduranga',
  categories: ['photography', 'devtools'],
  tags: ['automation', 'nodejs', 'photos'],
  date: '2025-12-01',
  readingTime: '7 min read',
  featuredImage: '/blog/workflow.svg',
  published: true,
  seo: {
    title: 'Automating Photoworkflows',
    description: 'Automate boring parts of photo workflows with small scripts.'
  },
  href: '/blog/automating-photo-workflows'
}

export default post6
