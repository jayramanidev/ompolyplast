import React from 'react'
import Link from 'next/link'

/**
 * Footer — design.md §5.1
 * Full sitemap, address + embedded map, GST number, social links, certifications
 */

interface FooterProps {
  phone?: string
  email?: string
  address?: string
  whatsapp?: string
  gst?: string
  mapEmbedUrl?: string
}

export default function Footer({
  phone = '+91-9876543210',
  email = 'info@ompolyplast.com',
  address = 'Industrial Area, Rajkot, Gujarat — 360001',
  whatsapp = '919876543210',
  gst = '24XXXXX0000X1ZX',
  mapEmbedUrl,
}: FooterProps) {
  return (
    <footer className="bg-brand-deep text-base-white">
      {/* Main footer */}
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand column */}
        <div>
          <div className="mb-4">
            <div className="text-xl font-bold tracking-tight">OM POLYPLAST</div>
            <div className="mt-1 h-0.5 w-24 bg-brand-accent" />
          </div>
          <p className="mb-6 text-sm leading-relaxed text-brand-sky">
            Manufacturer of BOPP tapes, stretch films, woven/poly bags, and packaging materials in Rajkot, Gujarat. Serving businesses across India.
          </p>
          <div className="flex gap-3">
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-primary/20 transition-colors hover:bg-brand-primary/40" aria-label="WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href={`tel:${phone}`} className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-primary/20 transition-colors hover:bg-brand-primary/40" aria-label="Phone">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            </a>
            <a href={`mailto:${email}`} className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-primary/20 transition-colors hover:bg-brand-primary/40" aria-label="Email">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-accent">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/" className="text-brand-sky transition-colors hover:text-base-white">Home</Link></li>
            <li><Link href="/products/tapes" className="text-brand-sky transition-colors hover:text-base-white">Tapes</Link></li>
            <li><Link href="/products/stretch-films" className="text-brand-sky transition-colors hover:text-base-white">Stretch Films</Link></li>
            <li><Link href="/products/bags" className="text-brand-sky transition-colors hover:text-base-white">Woven & Poly Bags</Link></li>
            <li><Link href="/products/other-packaging" className="text-brand-sky transition-colors hover:text-base-white">Other Packaging</Link></li>
            <li><Link href="/about" className="text-brand-sky transition-colors hover:text-base-white">About Us</Link></li>
            <li><Link href="/contact" className="text-brand-sky transition-colors hover:text-base-white">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-accent">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0 text-brand-accent"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span className="text-brand-sky">{address}</span>
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-brand-accent"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              <a href={`tel:${phone}`} className="text-brand-sky hover:text-base-white">{phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-brand-accent"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a href={`mailto:${email}`} className="text-brand-sky hover:text-base-white">{email}</a>
            </li>
          </ul>
        </div>

        {/* Map */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-accent">Find Us</h3>
          <div className="h-40 overflow-hidden rounded-md bg-brand-primary/10">
            {mapEmbedUrl ? (
              <iframe src={mapEmbedUrl} width="100%" height="160" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="OM Polyplast Location" />
            ) : (
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118149.68121002128!2d70.73812!3d22.30396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98ac71cdf0f%3A0x76dd15cfbe93ad3a!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin" width="100%" height="160" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="OM Polyplast Location — Rajkot, Gujarat" />
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-primary/20">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-brand-sky sm:flex-row">
          <span>© {new Date().getFullYear()} OM Polyplast. All rights reserved.</span>
          <span>GST: {gst} · Rajkot, Gujarat, India</span>
        </div>
      </div>
    </footer>
  )
}
