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

import React, { useMemo, useState, useEffect } from 'react'
import type { BlogPost } from '../content/blog/types' 
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import sanitizeHtml from '../lib/sanitizeHtml'
import Image from 'next/image'

type Props = {
  posts: BlogPost[]
  pageSize?: number
}

export default function BlogGrid({ posts, pageSize = 15 }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const publishedAll = useMemo(() => posts.filter((p) => p.published !== false), [posts])

  const allCategories = useMemo(() => {
    const s = new Set<string>()
    publishedAll.forEach((p) => p.categories?.forEach((c) => s.add(c)))
    return Array.from(s).sort()
  }, [publishedAll])

  const allTags = useMemo(() => {
    const s = new Set<string>()
    publishedAll.forEach((p) => p.tags?.forEach((t) => s.add(t)))
    return Array.from(s).sort()
  }, [publishedAll])

  const [category, setCategory] = useState<string | null>(searchParams?.get('category') || null)
  const [tag, setTag] = useState<string | null>(searchParams?.get('tag') || null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const qCat = searchParams?.get('category')
    const qTag = searchParams?.get('tag')
    if (qCat !== category) setCategory(qCat)
    if (qTag !== tag) setTag(qTag)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const published = useMemo(() => publishedAll.filter((p) => {
    if (category && !(p.categories || []).includes(category)) return false
    if (tag && !(p.tags || []).includes(tag)) return false
    return true
  }), [publishedAll, category, tag])

  const totalPages = Math.max(1, Math.ceil(published.length / pageSize))
  const start = (page - 1) * pageSize
  const pageItems = published.slice(start, start + pageSize)

  function updateQuery(newCat: string | null, newTag: string | null) {
    const params = new URLSearchParams()
    if (newCat) params.set('category', newCat)
    if (newTag) params.set('tag', newTag)
    const qs = params.toString()
    router.push(`/blog${qs ? `?${qs}` : ''}`)
    setPage(1)
  }

  return (
    <div>
    

      <div className="grid gap-6 sm:gap-8 sm:grid-cols-2">
        {pageItems.map((p) => (
          <article key={p.id} className="group rounded-lg bg-card p-4 hover:shadow-lg transition-shadow min-w-0 overflow-hidden">
            {p.featuredImage ? (
              <div className="mb-4 overflow-hidden rounded-md relative h-32 sm:h-44">
                <Image src={p.featuredImage} alt={p.title} fill className="object-cover" />
              </div>
            ) : null}

            <h3 className="text-lg font-semibold mb-1">
              <Link href={p.href ?? `/blog/${p.slug}`}>{p.title}</Link>
            </h3>

            <div className="text-sm text-muted mb-2">
              <span className="mr-2">By <Link href="/about"><strong className="underline">{p.author}</strong></Link></span>
              {p.readingTime ? <span className="mx-2">•</span> : null}
              {p.readingTime ? <span>{p.readingTime}</span> : null}
            </div>

            {/* summary contains HTML; rendered as HTML intentionally (sanitized) and clamped visually to 3 lines */}
            <div className="prose max-w-none text-sm text-muted" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: sanitizeHtml(p.summary) }} />

            <div className="mt-3 flex flex-wrap gap-2">
              {p.categories?.map((c) => (
                <button key={`cat-${c}`} onClick={() => updateQuery(c, null)} className="inline-block text-xs px-2 py-1 rounded bg-[color:var(--muted)]/60">{c}</button>
              ))}

              {p.tags?.map((t) => (
                <button key={`tag-${t}`} onClick={() => updateQuery(null, t)} className="inline-block text-xs px-2 py-1 rounded bg-[color:var(--accent)]/10 text-accent">{t}</button>
              ))}
            </div>

            <div className="mt-4">
              <Link href={p.href ?? `/blog/${p.slug}`} className="text-accent hover:underline">
                Read
              </Link>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="mt-6 flex items-center justify-center space-x-3">
          <button
            className="px-3 py-1 rounded border" 
            onClick={() => setPage((s) => Math.max(1, s - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="px-3 py-1">Page {page} of {totalPages}</span>
          <button
            className="px-3 py-1 rounded border"
            onClick={() => setPage((s) => Math.min(totalPages, s + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </nav>
      )}
    </div>
  )
}
