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

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
      <div className="max-w-3xl mx-auto p-8 transition-transform duration-350">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-10 text-center">
            <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-brand-50 dark:bg-slate-700 mx-auto mb-6">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M11 15h2v2h-2z" fill="#6366F1" />
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM11 6h2v6h-2z" fill="#6366F1" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold mb-2">Page not found</h1>
            <p className="text-slate-600 dark:text-slate-300 mb-6">Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved or removed.</p>

            <div className="flex items-center justify-center gap-4">
              <Link href="/" className="inline-block px-6 py-3 rounded-md bg-brand-500 text-white shadow hover:brightness-95">Return home</Link>
              <Link href="/contact" className="inline-block px-6 py-3 rounded-md border border-slate-200 dark:border-slate-700">Contact us</Link>
            </div>

            <div className="mt-8 text-sm text-slate-500">If you believe this is an error, please get in touch.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
