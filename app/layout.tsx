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

import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackgroundAnimation from '../components/BackgroundAnimation';
import ThemeProviderClient from '../components/ThemeProviderClient';
import PageTransition from '../components/PageTransition';
import ErrorMonitorClient from '../components/ErrorMonitorClient';
import { site } from '../content/site';
import type { Metadata } from 'next';
// PrismJS theme for code blocks
import 'prismjs/themes/prism-tomorrow.css'

export const metadata: Metadata = {
  title: {
    default: `${site.name} - ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: ['portfolio', 'resume', 'web development', 'photography', 'Next.js'],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: site.name,
    title: `${site.name} - ${site.role}`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    site: site.social.x || site.social.twitter,
    creator: site.social.x || site.social.twitter,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['600','700','800'], variable: '--font-poppins' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        {/* Inline theme init to avoid flash of incorrect theme before hydration */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();` }} />
      </head>
      <body className={`${inter.className} ${poppins.variable} min-h-screen antialiased`}>
        <ThemeProviderClient>
          <a href="#content" className="skip-link sr-only">Skip to content</a>
          {/* Error monitor (client) — captures runtime errors and unhandled rejections */}
          <ErrorMonitorClient />
          <div className="min-h-screen flex flex-col relative">
            <BackgroundAnimation />
            <Header />
            <main id="content" className="w-full max-w-none sm:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-8">
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg pt-6 pb-12 px-6 md:pt-6 md:pb-10 md:px-10" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                <PageTransition>{children}</PageTransition>
              </div>
            </main>
            <Footer />
          </div>
        </ThemeProviderClient>
      </body>
    </html>
  );
}
