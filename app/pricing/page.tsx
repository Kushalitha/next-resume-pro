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

import { pricing as pricingData } from '../../content/pricing';
import { site } from '../../content/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Pricing - ${site.name}`,
  description: 'View pricing packages for photography sessions and web development services.',
  openGraph: {
    title: `Pricing - ${site.name}`,
    description: 'View pricing packages for photography sessions and web development services.',
    type: 'website',
  },
};

export default function Pricing() {
  return (
    <section className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Pricing</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {pricingData.map((p) => (
          <div key={p.id} className="card">
            <div className="text-lg font-semibold">{p.name}</div>
            <div className="text-2xl font-bold my-2">{p.price}</div>
            <ul className="text-sm text-slate-600 dark:text-slate-300 list-disc list-inside">
              {p.features.map((f: string) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="mt-4">
              <button className="inline-block px-4 py-2 bg-brand-500 text-white rounded-md">{p.cta}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
