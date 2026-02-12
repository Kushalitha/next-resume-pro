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

export const about = {
  headline: 'About Kushalitha',
  summary: `Kushalitha Maduranga is a Professional Photographer and Web Developer based in New Zealand. With a background in visual storytelling and UX-focused frontend engineering, Kushalitha blends a photographer's eye for composition with modern frontend technologies to build beautiful, accessible websites and photographic experiences.

Kushalitha works closely with clients to translate photographic style into cohesive web experiences — from image optimization and galleries to accessible layouts that maintain visual impact on every device. Practical experience across both creative and technical domains helps ensure projects are delivered on time, on brand, and with long-term maintainability in mind.`,
  photoAlt: 'Placement profile photo',
  highlights: [
    '10+ years of experience in photography (portrait & landscape)',
    'Frontend web development with React, Next.js and TypeScript',
    'Specialises in visual-driven portfolio websites and client galleries',
    'Accessible, responsive, and performance-minded web experiences',
    'Works closely with clients to craft tailored portfolio experiences',
    'Experience with image optimization and delivery pipelines'
  ]
};

export const services = [
  { id: 'design', title: 'Web Design', icon: '🌐', desc: 'Responsive, accessible designs with a focus on clarity and user flows.' },
  { id: 'photography', title: 'Photography', icon: '📸', desc: 'High-quality visuals and editorial work for web and print.' },
  { id: 'creativity', title: 'Creativity', icon: '💡', desc: 'Concept ideation, branding, and UX that delight.' },
  { id: 'advertising', title: 'Advertising', icon: '📣', desc: 'Campaigns, messaging, and growth-focused creative.' },
];

export const clients = [
  // Example: showLogo true will show logo; showName true will show text name; if both omitted, logo wins when present
  { id: 'alpha', name: 'Alpha Co', logo: '/clients/alpha.png', detail: 'Product design & engineering', showLogo: true, showName: false },
  { id: 'beta', name: 'Beta Inc', logo: '/clients/beta.png', detail: 'Branding & campaigns', showLogo: false, showName: true },
  { id: 'gamma', name: 'Gamma LLC', logo: '/clients/gamma.png', detail: 'Visuals & content', showLogo: true, showName: false },
  { id: 'delta', name: 'Delta Studio', logo: '/clients/delta.png', detail: 'UX & prototyping', showLogo: false, showName: true },
];
