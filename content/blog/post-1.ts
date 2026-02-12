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

export const post1: BlogPost = {
  id: 'how-i-built-my-resume-site',
  title: 'How I Built My Resume Site',
  slug: 'how-i-built-my-resume-site',
  summary: '<h4>Case study</h4><p><strong>Next.js</strong> + <em>TypeScript</em> + <strong>Tailwind</strong> were used to build a fast, accessible resume site. <u>Highlights</u> include server-side rendering, compact content modules, and performance optimizations.</p><pre><code>npx create-next-app my-site --typescript</code></pre><ul><li>Static-first pages</li><li>Centralized content files</li><li>Accessible components</li></ul>',
  author: 'Kushalitha Maduranga',
  categories: ['engineering', 'project'],
  tags: ['nextjs', 'tailwind', 'typescript'],
  date: '2025-11-01',
  updatedAt: '2025-11-05',
  readingTime: '6 min read',
  featuredImage: '/blog/resume-site.svg',
  published: true,
  seo: {
    title: 'How I Built My Resume Site - Case Study',
    description: 'A short case study on building a performant resume & portfolio website using Next.js and modern tooling.',
    keywords: ['resume', 'nextjs', 'case study']
  },
  href: '/blog/how-i-built-my-resume-site'
}

export default post1
