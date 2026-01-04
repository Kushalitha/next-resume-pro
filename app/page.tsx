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

import Link from 'next/link';
import { hero } from '../content/hero';
import { testimonials } from '../content/testimonials';
import UIPrimaryButton from '../components/ui/button';
import UISecondaryButton from '../components/ui/secondary-button';
import UICard from '../components/ui/card';

import HeroAnimatedSection from '../components/HeroAnimatedSection';
import TypedText from '../components/TypedText';
import { Github, Instagram, Facebook } from 'lucide-react';
import { site } from '../content/site';

export default function Home() {
  return (
    <section>
      <HeroAnimatedSection className="relative rounded-3xl py-4 md:py-4" style={{ background: 'linear-gradient(180deg, rgba(124,58,237,0.06), rgba(14,165,233,0.02))' }}>
        <span className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10" />
        <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start sm:items-start">
            <div className="pt-4 md:pt-6 pb-6 md:pb-8">
              <h1 className="h1 mb-1 md:mb-3.5 pb-1 md:pb-1 leading-[1.18] md:leading-[1.18] text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-indigo-600">{hero.name}</h1>
              <div className="h2 mt-1 text-slate-700 dark:text-slate-200">{hero.role} • {hero.location}</div>
              <TypedText texts={hero.taglines} speed={60} backspaceSpeed={50} pause={1200} className="mt-3 text-lg text-slate-600 dark:text-slate-300 max-w-xl" />

              <div className="mt-6 flex items-center gap-3">
                <UIPrimaryButton href="/contact">{hero.ctas[0].label}</UIPrimaryButton>
                <UISecondaryButton href="/portfolio">View portfolio</UISecondaryButton>
              </div>

            </div>
            <div className="flex items-start justify-center pt-4 md:pt-6">
              <div className="w-full max-w-sm">
                <UICard>
                  <div className="text-sm text-slate-500">Featured Project</div>
                  <h3 className="mt-2 font-semibold text-lg">{hero.featured.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{hero.featured.description}</p>
                  <div className="mt-4 flex gap-2">
                    <UISecondaryButton href="https://next-resume-pro-demo.vercel.app/" target="_blank" rel="noopener noreferrer">Live</UISecondaryButton>
                    <UISecondaryButton href="https://github.com/Kushalitha/next-resume-pro" target="_blank" rel="noopener noreferrer">Code</UISecondaryButton>
                  </div>
                </UICard>

                <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 w-full">
                  {hero.features.map((f) => (
                    <div key={f.title} className="bg-white/60 dark:bg-slate-800/60 rounded-lg p-3 text-center shadow-sm">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">{f.title}</div>
                      <div className="text-xs text-slate-500">{f.value}</div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </HeroAnimatedSection>

      <div className="mt-8 animate-fade-in">
        <div className="max-w-none sm:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <UICard>
              <h3 className="font-semibold">Resume</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">Professional timeline and skill indicators.</p>
            </UICard>
            <UICard>
              <h3 className="font-semibold">Portfolio</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">Filterable projects and GitHub highlights.</p>
            </UICard>
            <UICard>
              <h3 className="font-semibold">Blog</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">MDX-ready posts with SEO optimized layout.</p>
            </UICard>
          </div>
        </div>
      </div>

      <section className="max-w-6xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
        <h3 className="text-lg font-semibold mb-4">What clients say</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {testimonials.slice(0, 2).map((t) => (
            <UICard key={t.id}>
              <div className="font-semibold">{t.name}</div>
              <div className="text-xs text-slate-500">{t.role}</div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{t.quote}</p>
            </UICard>
          ))}
        </div>
      </section>
    </section>
  );
}
