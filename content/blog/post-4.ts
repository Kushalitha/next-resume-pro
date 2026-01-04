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

export const post4: BlogPost = {
  id: 'seo-for-creatives',
  title: 'SEO for Creatives: Small Improvements That Matter',
  slug: 'seo-for-creatives',
  summary: '<h4>SEO for creatives</h4><p><strong>Alt text</strong> and lightweight structured data make images discoverable. <u>Small changes</u> often yield measurable results.</p><ul><li>Use descriptive alt text</li><li>Add basic schema where useful</li><li>Keep page weight low</li></ul>',
  author: 'Kushalitha Maduranga',
  categories: ['marketing', 'seo'],
  tags: ['seo', 'photography', 'accessibility'],
  date: '2025-06-10',
  readingTime: '5 min read',
  featuredImage: '/blog/seo.svg',
  published: true,
  seo: {
    title: 'SEO for Creatives',
    description: 'Simple SEO practices for photographers and creators.'
  },
  href: '/blog/seo-for-creatives'
}

export default post4
