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

import Image from 'next/image';
import { about, services, clients } from '../../content/about';
import ServicesGrid from '../../components/ServicesGrid';
import ClientsTicker from '../../components/ClientsTicker';
import { site } from '../../content/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `About - ${site.name}`,
  description: about.summary || 'Learn more about my background, services, and experience.',
  openGraph: {
    title: `About - ${site.name}`,
    description: about.summary || 'Learn more about my background, services, and experience.',
    type: 'website',
  },
};

export default function About() {
  return (
    <section className="max-w-none sm:max-w-6xl mx-auto px-1 sm:px-1 lg:px-1">
      <div>
        <h1 className="h1 mb-2">{about.headline}</h1>
        <div className="w-10 h-1 rounded bg-[rgb(var(--accent))] mb-4" />
      </div>

      <div className="mt-2 md:mt-6 mb-8 sm:mb-4">
        <div className="relative">
          <div className="sm:w-1/2 sm:float-right sm:ml-6 mb-6">
            <div className="card no-hover p-0 overflow-hidden">
              <Image 
                src="/profile-large.jpg" 
                alt={about.photoAlt} 
                width={600}
                height={800}
                className="w-full h-56 sm:h-80 md:h-96 lg:h-115 rounded-lg object-cover" 
                priority
                unoptimized
              />
            </div>
          </div>

          <div className="text-slate-700 dark:text-slate-200">
            <p className="mb-4">{about.summary}</p>
            <ul className="list-disc pl-5 text-sm sm:text-base text-slate-600 dark:text-slate-300">
              {about.highlights.map((h) => (
                <li key={h} className="mb-2">{h}</li>
              ))}
            </ul>
          </div>

          <div className="clear-both" />
        </div>
      </div>

      {/* Services (full width) */}
      <div className="pb-6 md:pb-10">
        <ServicesGrid services={services} />
      </div>
      {/* Clients (full width ticker) */}
      <ClientsTicker clients={clients} />
    </section>
  );
}
