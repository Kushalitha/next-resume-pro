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

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-md" role="status" aria-live="polite" aria-label="Loading">
      <div className="flex flex-col items-center gap-3 px-4 py-6 text-center">
        <div className="inline-flex items-center gap-3" aria-hidden="true">
          <span className="dot" />
          <span className="dot delay-200" />
          <span className="dot delay-400" />
        </div>

        <div className="text-sm text-slate-700 dark:text-slate-200">Preparing your experience…</div>
      </div>
    </div>
  );
}
