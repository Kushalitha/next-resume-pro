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

type TimelineItem =
  | {
      title?: string;
      role?: string;
      company: string;
      from?: string;
      to?: string;
      start?: string;
      end?: string;
      details?: string[] | string;
      desc?: string;
    }
  | {
      title?: string;
      company: string;
      from?: string;
      to?: string;
      details?: string[] | string;
      desc?: string;
    };

export default function Timeline({ items }: { items?: TimelineItem[] }) {
  const defaultItems: TimelineItem[] = [
    { title: 'Senior Developer', company: 'Acme Inc', from: '2022', to: 'Present', desc: 'Building great products.' },
    { title: 'Mid-level Developer', company: 'Widget Co', from: '2019', to: '2022', desc: 'Worked on core platform.' }
  ];

  const list = items ?? defaultItems;

  return (
    <div className="space-y-6">
      {list.map((it, idx) => {
        const title = (it as any).title ?? (it as any).role ?? '';
        const from = (it as any).from ?? (it as any).start ?? '';
        const to = (it as any).to ?? (it as any).end ?? '';

        return (
          <div key={idx} className="flex gap-4 transition-transform hover:-translate-y-1">
            <div className="w-12 flex-shrink-0 flex items-center justify-center">
              <div className="h-10 w-10 rounded-full bg-brand-500 text-white flex items-center justify-center">{(title || it.company).charAt(0)}</div>
            </div>
            <div>
              <div className="text-sm font-semibold">{title || ''} {title ? '—' : ''} {it.company}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{from} {from ? '—' : ''} {to}</div>
              {(it as any).desc && <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{(it as any).desc}</p>}
              {it.details && Array.isArray(it.details) && (
                <ul className="mt-2 list-disc list-inside text-sm text-slate-600 dark:text-slate-300">
                  {it.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
