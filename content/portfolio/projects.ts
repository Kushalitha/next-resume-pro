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

/**
 * Featured projects used by the Portfolio pages and project detail routes.
 * This file contains mock/demo data — replace with your real project metadata.
 */

export const projects = [
  {
    id: 'portrait-series',
    title: 'Portrait Series — Aotearoa Faces',
    category: 'Photography',
    short: 'A curated portrait series highlighting local creatives across New Zealand.',
    cover: '/portfolio/portrait-series-1.jpg',
    tags: ['Portrait', 'Editorial'],
    href: '/portfolio/portrait-series',
    liveUrl: 'https://demo.example.com/portrait-series',
    details: 'Gallery site with client proofing and downloadable high-res images.',
    gallery: [
      '/portfolio/photo-1.jpg',
      '/portfolio/photo-2.jpg',
      '/portfolio/photo-3.jpg'
    ]
  },
  {
    id: 'landscape-book',
    title: 'Landscape Book — South Island',
    category: 'Photography',
    short: 'An ongoing landscape collection focusing on remote locations and light.',
    cover: '/portfolio/landscape-book.jpg',
    tags: ['Landscape', 'Fine Art'],
    href: '/portfolio/landscape-book',
    liveUrl: 'https://demo.example.com/landscape-book',
    details: 'Print-ready layouts and a companion website for buyers.',
    gallery: [
      '/portfolio/photo-1.jpg',
      '/portfolio/photo-2.jpg'
    ]
  },
  {
    id: 'studio-portfolio',
    title: 'Studio Portfolio Template',
    category: 'Web Development',
    short: 'A Next.js + Tailwind template for creatives with integrated galleries.',
    cover: '/portfolio/studio-portfolio.jpg',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    href: 'https://github.com/kushalitha/studio-portfolio',
    repoUrl: 'https://github.com/kushalitha/studio-portfolio',
    details: 'Open-source template showcasing photography with CMS-ready hooks.',
    gallery: [
      '/portfolio/photo-1.jpg',
      '/portfolio/photo-2.jpg'
    ]
  },
  {
    id: 'client-gallery',
    title: 'Client Gallery Platform',
    category: 'Web Development',
    short: 'Custom gallery and delivery platform for client proofing and downloads.',
    cover: '/portfolio/client-gallery.jpg',
    tags: ['React', 'Next.js'],
    href: '/portfolio/client-gallery',
    liveUrl: 'https://demo.example.com/client-gallery',
    repoUrl: 'https://github.com/kushalitha/client-gallery',
    details: 'Secure client galleries with access codes and image download packs.',
    gallery: [
      '/portfolio/photo-1.jpg',
      '/portfolio/photo-2.jpg',
      '/portfolio/photo-3.jpg'
    ]
  },
  {
    id: 'ecommerce-studio',
    title: 'E-Commerce Studio',
    category: 'Web Development',
    short: 'A lightweight e-commerce front-end optimized for images and fast checkout.',
    cover: '/portfolio/ecommerce-studio.jpg',
    tags: ['ecommerce', 'performance'],
    href: '/portfolio/ecommerce-studio',
    repoUrl: 'https://github.com/kushalitha/ecommerce-studio',
    details: 'Headless commerce frontend with product galleries and smooth checkout flow.',
    gallery: [
      '/portfolio/photo-1.jpg',
      '/portfolio/photo-2.jpg' 
    ]
  },
  {
    id: 'branding-campaign',
    title: 'Branding Campaign — Beta Inc',
    category: 'Branding',
    short: 'Integrated campaign with photography and landing pages.',
    cover: '/portfolio/branding-campaign.jpg',
    tags: ['branding', 'photography'],
    href: '/portfolio/branding-campaign',
    liveUrl: 'https://demo.example.com/branding-campaign',
    details: 'Campaign microsite with conversion-focused design and photo galleries.',
    gallery: [
      '/portfolio/photo-1.jpg',
      '/portfolio/photo-2.jpg',
      '/portfolio/photo-3.jpg'
    ]
  },
  {
    id: 'wedding-collection',
    title: 'Wedding Collection',
    category: 'Photography',
    short: 'Selected wedding shoots with editorial editing style.',
    cover: '/portfolio/wedding-collection.jpg',
    tags: ['wedding', 'editorial'],
    href: '/portfolio/wedding-collection',
    details: 'Selected highlights from recent weddings and ceremonies.',
    gallery: [
      '/portfolio/photo-1.jpg',
      '/portfolio/photo-2.jpg',
      '/portfolio/photo-3.jpg'
    ]
  },
  {
    id: 'demo-project',
    title: 'Demo Project — Website Case Study',
    category: 'Web Design',
    short: 'A demo case study showcasing responsive layouts and accessibility-first design.',
    cover: '/portfolio/demo-project.jpg',
    tags: ['demo', 'web', 'accessibility'],
    href: '/portfolio/demo-project',
    liveUrl: 'https://demo.example.com/demo-project',
    repoUrl: 'https://github.com/kushalitha/demo-project',
    details: 'A demo site used in examples and tests that includes a small gallery and accessible UI elements.',
    gallery: [
      '/portfolio/photo-1.jpg',
      '/portfolio/photo-2.jpg',
      '/portfolio/photo-3.jpg'
    ]
  }
];
