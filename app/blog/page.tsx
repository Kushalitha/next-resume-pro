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

import dynamic from 'next/dynamic'
import type { BlogPost } from '../../content/blog/types'
import posts from '../../content/blog/index'
import { site } from '../../content/site'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Blog - ${site.name}`,
  description: site.description || 'Articles about web development, photography, and technology.',
  openGraph: {
    title: `Blog - ${site.name}`,
    description: site.description || 'Articles about web development, photography, and technology.',
    type: 'website',
  },
};

const BlogGrid = dynamic(() => import('../../components/BlogGrid'), { ssr: false })

export default function Blog() {
  const sorted: BlogPost[] = posts.slice().sort((a, b) => +new Date(b.date) - +new Date(a.date))

  return (
    <section className="max-w-none sm:max-w-6xl mx-auto px-1 sm:px-1 lg:px-1">
      <div>
        <h1 className="h1 mb-2">Blog</h1>
        <div className="w-10 h-1 rounded bg-[color:rgb(var(--accent))] mb-4" />
        <p className="text-slate-600 dark:text-slate-300">{site.description}</p>
      </div>

      <div className="mt-8">
        <div className="bg-[color:var(--muted)]/80 dark:bg-[color:var(--surface)]/70 rounded-xl py-6 px-0 overflow-hidden">
          {/* client component handles pagination and two-column layout */}
          <BlogGrid posts={sorted} pageSize={15} />
        </div>
      </div>
    </section>
  )
}
