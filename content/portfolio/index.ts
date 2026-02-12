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

export type PortfolioItem = {
  id: string
  title: string
  subtitle?: string
  category: 'Web design' | 'Applications' | 'Web development' | string
  image?: string
  cover?: string
  short?: string
  details?: string
  href?: string
  liveUrl?: string
  repoUrl?: string
  gallery?: string[]
  tags?: string[]
  featured?: boolean
}

export const portfolio: PortfolioItem[] = [
  {
    id: 'finance',
    title: 'Finance',
    subtitle: 'Web development',
    category: 'Web development',
    image: '/portfolio/finance.svg',
    cover: '/portfolio/finance-cover.jpg',
    details: 'A finance dashboard with live charts, user permissions and reporting. Built for performance and accessibility.',
    gallery: [
      '/portfolio/photo-1.jpg',
      '/portfolio/photo-2.jpg',
      '/portfolio/photo-3.jpg'
    ]
  },
  {
    id: 'orizon',
    title: 'Orizon',
    subtitle: 'Web development',
    category: 'Web development',
    image: '/portfolio/orizon.svg',
    cover: '/portfolio/orizon-cover.jpg',
    details: 'Design system and marketing site for Orizon. Focused on responsive layouts and conversion optimization.',
    gallery: [
      '/portfolio/photo-1.jpg',
      '/portfolio/photo-2.jpg'  
    ]
  },
  {
    id: 'fundo',
    title: 'Fundo',
    subtitle: 'Web design',
    category: 'Web design',
    image: '/portfolio/fundo.svg',
    cover: '/portfolio/fundo-cover.jpg',
    details: 'Branding-led landing pages with a modular component library for rapid campaign launches.',
    gallery: [
      '/portfolio/photo-1.jpg',
      '/portfolio/photo-2.jpg'
    ]
  },
  {
    id: 'brawlhalla',
    title: 'Brawlhalla',
    subtitle: 'Applications',
    category: 'Applications',
    image: '/portfolio/brawlhalla.svg',
    cover: '/portfolio/brawlhalla-cover.jpg',
    details: 'Cross-platform companion app integrating gameplay stats and leaderboards with performant visuals.',
    gallery: [
      '/portfolio/photo-1.jpg',
      '/portfolio/photo-2.jpg'
    ]
  },
  {
    id: 'dsm',
    title: 'DSM.',
    subtitle: 'Web design',
    category: 'Web design',
    image: '/portfolio/dsm.svg',
    cover: '/portfolio/dsm-cover.jpg',
    details: 'Editorial site with typographic focus and accessible content layouts.',
    gallery: [
      '/portfolio/photo-1.jpg',
      '/portfolio/photo-2.jpg'
    ]
  },
  {
    id: 'metaspark',
    title: 'MetaSpark',
    subtitle: 'Web design',
    category: 'Web design',
    image: '/portfolio/metaspark.svg',
    cover: '/portfolio/metaspark-cover.jpg',
    details: 'Product marketing pages and animation system for MetaSpark launches.',
    gallery: [
      '/portfolio/photo-1.jpg',
      '/portfolio/photo-2.jpg'
    ],
    featured: true
  },
  {
    id: 'summary',
    title: 'Summary',
    subtitle: 'Web development',
    category: 'Web development',
    image: '/portfolio/summary.svg',
    cover: '/portfolio/summary-cover.jpg',
    details: 'An interactive summary tool for enterprise reporting and dashboards.',
    gallery: [
      '/portfolio/photo-1.jpg',
    ]
  },
  {
    id: 'task-manager',
    title: 'Task Manager',
    subtitle: 'Applications',
    category: 'Applications',
    image: '/portfolio/task-manager.svg',
    cover: '/portfolio/task-manager-cover.jpg',
    details: 'Lightweight task management app focused on collaboration and offline-first sync.',
    gallery: [
      '/portfolio/photo-1.jpg',
      '/portfolio/photo-2.jpg'
    ],
    featured: true
  },
  {
    id: 'arrival',
    title: 'Arrival',
    subtitle: 'Web development',
    category: 'Web development',
    image: '/portfolio/arrival.svg',
    cover: '/portfolio/arrival-cover.jpg',
    details: 'Experimental landing experience with immersive visuals and micro-interactions.',
    gallery: [
      '/portfolio/photo-1.jpg',
      '/portfolio/photo-2.jpg'
    ],
    featured: true
  },
]
