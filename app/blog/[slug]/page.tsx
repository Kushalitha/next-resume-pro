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

import { notFound } from 'next/navigation'
import posts from '../../../content/blog'
import sanitizeHtml from '../../../lib/sanitizeHtml'
import PostContentClient from '../../../components/PostContentClient'
import Image from 'next/image'
import Link from 'next/link'
import { site } from '../../../content/site'

interface Params {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}

  const base = process.env.SITE_URL || site.url || 'https://example.com'
  const url = `${base}${post.href ?? `/blog/${post.slug}`}`
  // Strip HTML tags repeatedly to prevent incomplete multi-character sanitization
  let rawDescription = post.seo?.description ?? post.summary ?? ''
  let previous
  do {
    previous = rawDescription
    rawDescription = rawDescription.replace(/<[^>]+>/g, '')
  } while (rawDescription !== previous)
  const description = rawDescription.slice(0, 160)

  return {
    title: post.seo?.title ?? post.title,
    description,
    openGraph: {
      title: post.seo?.title ?? post.title,
      description,
      url,
      type: 'article',
      images: post.featuredImage ? [{ url: `${base}${post.featuredImage}`, alt: post.title }] : [],
      publishedTime: post.date,
      authors: [post.author]
    },
    twitter: {
      card: post.featuredImage ? 'summary_large_image' : 'summary',
      creator: site.social.twitter || site.social.x || undefined
    },
    alternates: {
      canonical: url
    }
  }
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params

  const post = posts.find((p) => p.slug === slug)
  if (!post) return notFound()

  const base = process.env.SITE_URL || site.url || 'https://example.com'
  const url = `${base}${post.href ?? `/blog/${post.slug}`}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seo?.description ?? '',
    image: post.featuredImage ? `${base}${post.featuredImage}` : undefined,
    author: { '@type': 'Person', name: post.author || site.name },
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url }
  } as const;

  return (
    <main className="container">
      <article className="prose lg:prose-xl dark:prose-invert max-w-3xl mx-auto">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <h1 className="h1 mb-2">{post.title}</h1>
        <p className="text-sm text-muted">By <Link href="/about"><strong className="underline">{post.author}</strong></Link> • {new Date(post.date).toLocaleDateString()} • {post.readingTime}</p>

        <div className="mt-3 mb-4 flex flex-wrap gap-2">
          {post.categories?.map((c) => (
            <Link key={`cat-${c}`} href={`/blog?category=${encodeURIComponent(c)}`} className="inline-block text-xs px-2 py-1 rounded bg-(--muted)/60">{c}</Link>
          ))}
          {post.tags?.map((t) => (
            <Link key={`tag-${t}`} href={`/blog?tag=${encodeURIComponent(t)}`} className="inline-block text-xs px-2 py-1 rounded bg-(--accent)/10 text-accent">{t}</Link>
          ))}
        </div>

        {post.featuredImage ? (
          <div className="my-6 rounded-md overflow-hidden">
            <Image src={post.featuredImage} alt={post.title} width={1200} height={600} className="w-full h-auto object-cover" priority />
          </div>
        ) : null}

        {/* render post body in a client component for syntax highlighting */}
        <div className="mt-6">
          <PostContentClient html={sanitizeHtml(post.summary)} />
        </div>

        {/* Previous / Next links */}
        <div className="mt-8 flex items-center justify-between">
          {(() => {
            const sorted = posts.slice().sort((a, b) => +new Date(b.date) - +new Date(a.date))
            const idx = sorted.findIndex((x) => x.slug === post.slug)
            const prev = idx > 0 ? sorted[idx - 1] : null
            const next = idx < sorted.length - 1 ? sorted[idx + 1] : null
            return (
              <>
                {prev ? (
                  <Link href={prev.href ?? `/blog/${prev.slug}`} className="text-sm text-slate-700 dark:text-slate-300 hover:text-accent flex items-center gap-2">
                    <span aria-hidden>←</span>
                    <div>
                      <div className="text-xs text-slate-500">Previous</div>
                      <div className="font-semibold">{prev.title}</div>
                    </div>
                  </Link>
                ) : <div />}

                {next ? (
                  <Link href={next.href ?? `/blog/${next.slug}`} className="text-sm text-slate-700 dark:text-slate-300 hover:text-accent flex items-center gap-2 ml-auto">
                    <div className="text-right">
                      <div className="text-xs text-slate-500">Next</div>
                      <div className="font-semibold">{next.title}</div>
                    </div>
                    <span aria-hidden>→</span>
                  </Link>
                ) : <div />}
              </>
            )
          })()}
        </div>
      </article>
    </main>
  )
}
