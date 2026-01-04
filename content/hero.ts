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

import { site } from './site';

export const hero = {
  name: site.name,
  role: site.role,
  location: site.location,
  tagline: 'Capturing stories through light — crafting elegant web experiences.',
  taglines: [
    'Capturing stories through light',
    'Crafting elegant web experiences',
    'Designing accessible, performant websites'
  ],
  ctas: [
    { label: 'Contact', href: '/contact' },
    { label: 'View portfolio', href: '/portfolio' }
  ],
  features: [
    { title: '8+ yrs', value: 'Experience' },
    { title: 'Remote', value: 'Worldwide' },
    { title: 'Open Source', value: 'Contributor' },
    { title: 'NZ', value: 'Auckland' }
  ],
  featured: {
    title: 'Next Resume Pro',
    description: 'A lightweight, accessible resume builder used by thousands.'
  }
};
