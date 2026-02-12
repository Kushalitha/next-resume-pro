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

import Timeline from '../../components/Timeline';
import Link from 'next/link';
import { resume } from '../../content/resume';
import SkillBar from '../../components/SkillBar';
import { site } from '../../content/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Resume - ${site.name}`,
  description: 'Professional experience, education, and technical skills with downloadable CV.',
  openGraph: {
    title: `Resume - ${site.name}`,
    description: 'Professional experience, education, and technical skills with downloadable CV.',
    type: 'profile',
  },
};

export default function Resume() {
  return (
    <section className="max-w-none sm:max-w-6xl mx-auto px-1 sm:px-1 lg:px-1">
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <div className="w-full sm:flex-1">
          <h1 className="h1 mb-2">{resume.title}</h1>
          <div className="w-10 h-1 rounded bg-[rgb(var(--accent))] mb-4" />
          <p className="text-slate-600 dark:text-slate-300 w-full max-w-none">Work experience, education, and skills with downloadable CV.</p>
        </div>

        <div className="mt-4 mb-4 sm:mt-1 sm:ml-4 sm:shrink-0 w-full sm:w-auto flex justify-center sm:justify-end">
          <Link href="/resume.pdf" className="inline-block px-4 py-2 rounded-md bg-brand-500 text-white">
            Download CV
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column: Experience & Education */}
        <div>
          <div className="card mb-6">
            <h3 className="text-lg font-semibold mb-4">Professional Experience</h3>
            <Timeline items={resume.timeline} />
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Education</h3>
            <div className="space-y-4">
              {resume.education.map((e) => (
                <div key={e.school}>
                  <div className="font-semibold">{e.degree}</div>
                  <div className="text-sm text-slate-500">{e.school} • {e.year}</div>
                  <div className="mt-2 text-sm text-slate-700 dark:text-slate-300">{e.details.join(' — ')}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Skills */}
        <div>
          <div className="card mb-6">
            <h3 className="text-lg font-semibold mb-4">Developer Skills</h3>
            <div>
              {resume.skills.developer.map((s) => (
                <SkillBar key={s.name} label={s.name} percent={s.percent} />
              ))}
            </div>
          </div>

          <div className="card mb-6">
            <h3 className="text-lg font-semibold mb-4">Design Skills</h3>
            <div>
              {resume.skills.design.map((s) => (
                <SkillBar key={s.name} label={s.name} percent={s.percent} />
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Photography Skills</h3>
            <div>
              {resume.skills.photography.map((s) => (
                <SkillBar key={s.name} label={s.name} percent={s.percent} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certificates: full width below */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Certificates</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {resume.certificates.map((c) => (
            <div key={c.title} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold">{c.title}</div>
                  <div className="text-sm text-slate-500">{c.issuer} • {c.date}</div>
                  <ul className="mt-2 text-sm text-slate-700 dark:text-slate-300 list-disc list-inside">
                    {c.details.map((d: string) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-xs text-slate-400">ID: {c.id}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
