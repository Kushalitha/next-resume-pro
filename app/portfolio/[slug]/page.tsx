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

import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '../../../content/portfolio/projects'
import { portfolio as portfolioIndex, type PortfolioItem } from '../../../content/portfolio/index'
import Gallery from '../../../components/Gallery'

type Params = { slug: string }

// Combine the two sources (projects and the main portfolio index) to avoid "Project not found" when entries live in either file.
const combined = (() => {
  const map = new Map<string, PortfolioItem>()
  // prefer `projects` entries (more detailed) and then fill in from portfolio index
  projects.forEach((p) => map.set(p.id, p))
  portfolioIndex.forEach((p) => {
    if (!map.has(p.id)) map.set(p.id, p)
  })
  return Array.from(map.values())
})()

export async function generateStaticParams() {
  return combined.map((p) => ({ slug: p.id }))
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const project = combined.find((p) => p.id === slug)

  if (!project) {
    return (
      <section className="max-w-none sm:max-w-6xl mx-auto px-1 sm:px-1 lg:px-1 py-12">
        <h1 className="h1 mb-4">Project not found</h1>
        <p className="text-slate-600 dark:text-slate-300">We couldn&apos;t find that project. Return to the <Link href="/portfolio" className="text-accent-600 underline decoration-2 underline-offset-2 hover:decoration-accent-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-200 focus-visible:ring-offset-2" aria-label="Return to portfolio">portfolio</Link>.</p>
      </section>
    )
  }

  // Ensure the cover image exists in the public folder; fall back to the generic placeholder
  const rawCover = project.cover ?? '/portfolio/placeholder.svg'
  const publicPath = path.join(process.cwd(), 'public', rawCover.replace(/^[\//]/, ''))
  const coverToUse = fs.existsSync(publicPath) ? rawCover : '/portfolio/placeholder.svg'

  return (
    <section className="max-w-none sm:max-w-6xl mx-auto px-1 sm:px-1 lg:px-1 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="h1 mb-2">{project.title}</h1>
          <div className="w-10 h-1 rounded bg-[rgb(var(--accent))] mb-4" />
          <div className="text-sm text-slate-600 dark:text-slate-300 mb-4">{project.category} • {project.tags?.join(', ')}</div>
          <p className="text-slate-700 dark:text-slate-200 mb-6">{project.details}</p>

          <div className="flex gap-3">
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 rounded-md bg-accent-600 text-white">Live</a>
            ) : null}

            {project.repoUrl ? (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 rounded-md border border-slate-200 dark:border-slate-800 text-sm">Code</a>
            ) : null}

            {!project.liveUrl && !project.repoUrl && (
              <Link href="/portfolio" className="inline-block px-4 py-2 rounded-md border border-slate-200 dark:border-slate-800 text-sm">Back to Portfolio</Link>
            )}
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="card no-hover">
            <Image src={coverToUse} alt={project.title} width={800} height={600} className="w-full h-auto rounded-lg object-cover" />
          </div>
        </div>
      </div>

      {project.gallery && project.gallery.length > 0 && (
        <div className="mt-8">
          <h2 className="h3 mb-4">Gallery</h2>
          <Gallery images={project.gallery} altPrefix={project.title} />
        </div>
      )}
    </section>
  )
}
