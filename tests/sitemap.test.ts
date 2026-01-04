import { describe, expect, it } from 'vitest'
import { GET } from '../app/sitemap.xml/route'
import posts from '../content/blog'
import { portfolio } from '../content/portfolio'

describe('sitemap.xml route', () => {
  it('returns XML containing blog and portfolio entries', async () => {
    const res: any = await GET()
    // NextResponse behaves like a Fetch Response
    const contentType = res.headers?.get('Content-Type') || res.headers?.get?.('content-type')
    expect(contentType).toMatch(/xml/)

    const text = await res.text()
    expect(text).toContain('<urlset')
    // ensure there is at least one blog post entry
    expect(text).toContain('/blog/')
    expect(text).toContain(posts[0].slug)
    // ensure portfolio entry exists
    expect(text).toContain('/portfolio/')
    expect(text).toContain(`/portfolio/${portfolio[0].id}`)
  })
})
