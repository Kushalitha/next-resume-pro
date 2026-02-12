/**
 * Next Resume Pro v2.0.0
 * Author: Kushalitha Maduranga
 * GitHub: https://github.com/Kushalitha
 * License: MIT — Please credit if modified or redistributed
 * Year: 2026
 */

import ContactForm from '../../components/ContactForm';
import { site } from '../../content/site';
import { contact } from '../../content/contact';
import { Github, Instagram, Facebook } from 'lucide-react';
import XBrand from '../../components/icons/XBrand';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Contact - ${site.name}`,
  description: contact.contactBlurb || 'Get in touch with me for inquiries, collaborations, or questions.',
  openGraph: {
    title: `Contact - ${site.name}`,
    description: contact.contactBlurb || 'Get in touch with me for inquiries, collaborations, or questions.',
    type: 'website',
  },
};

export default function Contact() {
  return (
    <section className="max-w-none sm:max-w-6xl mx-auto px-1 sm:px-1 lg:px-1">
      <div>
        <h1 className="h1 mb-2">Contact</h1>
        <div className="w-10 h-1 rounded bg-[rgb(var(--accent))] mb-4" />
        <p className="text-slate-600 dark:text-slate-300 mb-6">{contact.contactBlurb}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Map & details */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <iframe
              title="Map"
              className="w-full h-72 border-0"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(contact.mapLocation)}&z=13&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="card">
            <h3 className="font-semibold">Get in touch</h3>
            <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
              <div className="font-semibold">{site.name}</div>
              <div className="mt-1">{site.role}</div>
              <div className="mt-1">{site.location}</div>
              <div className="mt-1">{site.email}</div>

              <div className="mt-4 flex items-center gap-3">
                {site.social.github && (
                  <a href={site.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {(site.social.x || site.social.twitter) && (
                  <a href={site.social.x ?? site.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="X" className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
                    <XBrand className="h-5 w-5" />
                  </a>
                )}
                {site.social.facebook && (
                  <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
                {site.social.instagram && (
                  <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact form */}
        <div>
          <div className="card">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
