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

type Service = { id: string; title: string; icon?: string; desc?: string };

export default function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <section className="w-full py-2">
      <div className="max-w-none sm:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="h2 mb-3">Services</h3>
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {services.map((s) => (
            <div key={s.id} className="text-center px-2 py-2" role="listitem">
              <div className="text-5xl mb-2" aria-hidden>
                {s.icon}
              </div>
              <h4 className="font-semibold text-lg mb-1">{s.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
