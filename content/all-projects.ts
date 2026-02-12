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

/**
 * Optional static list of projects to be used instead of (or merged with) GitHub repos.
 * Each object can follow the same shape as `content/projects.ts` entries.
 *
 * Edit this file to manage the "All Projects" grid without relying on GitHub.
 */

export const allProjects = [
  {
    id: 'studio-portfolio',
    title: 'Studio Portfolio Template',
    category: 'Web Development',
    short: 'A Next.js + Tailwind template for creatives with integrated galleries.',
    cover: '/portfolio/studio-portfolio.jpg',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    href: 'https://github.com/kushalitha/studio-portfolio',
    details: 'Open-source template showcasing photography with CMS-ready hooks.'
  },
  {
    id: 'client-gallery',
    title: 'Client Gallery Platform',
    category: 'Web Development',
    short: 'Custom gallery and delivery platform for client proofing and downloads.',
    cover: '/portfolio/client-gallery.jpg',
    tags: ['React', 'Next.js'],
    href: '/portfolio/client-gallery',
    details: 'Secure client galleries with access codes and image download packs.'
  }
];
