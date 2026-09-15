'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

/**
 * Header with mega-menu — design.md §4, §5.1
 * Categories shown with thumbnails, phone number + "Request Bulk Quote" CTA visible without scrolling
 */

interface Category {
  id: string
  name: string
  slug: string
  heroImage?: { url: string; alt: string }
}

interface HeaderProps {
  categories: Category[]
  phone?: string
  whatsapp?: string
}

export default function Header({ categories, phone = '+91-9876543210', whatsapp = '919876543210' }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-brand-deep text-base-white shadow-modal">
      {/* Top bar — phone + CTA */}
      <div className="bg-ink-900/30">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-2 text-sm">
          <a href={`tel:${phone}`} className="flex items-center gap-2 transition-colors hover:text-brand-accent">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            {phone}
          </a>
          <div className="flex items-center gap-4">
            <span className="hidden text-brand-sky/80 sm:inline">Rajkot, Gujarat</span>
            <a
              href={`https://wa.me/${whatsapp}?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20your%20products.`}
              className="rounded-sm bg-brand-primary px-4 py-1.5 font-medium transition-colors hover:bg-brand-mid"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-base-white text-brand-deep font-bold text-lg">
            OP
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight leading-tight">OM POLYPLAST</div>
            <div className="h-0.5 w-full bg-brand-accent mt-0.5" />
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link href="/" className="font-medium transition-colors hover:text-brand-accent">Home</Link>
          
          {/* Products mega-menu trigger */}
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button className="flex items-center gap-1 font-medium transition-colors hover:text-brand-accent">
              Products
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"/></svg>
            </button>

            {/* Mega-menu dropdown */}
            {productsOpen && (
              <div className="absolute left-1/2 top-full mt-2 w-[600px] -translate-x-1/2 rounded-md bg-base-white p-6 text-ink-900 shadow-modal"
                style={{ transition: 'var(--transition-drawer)' }}
              >
                <div className="mb-3 text-sm font-medium text-ink-600">Product Categories</div>
                <div className="grid grid-cols-2 gap-4">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products/${cat.slug}`}
                      className="group flex items-center gap-3 rounded-md p-3 transition-colors hover:bg-base-mist"
                    >
                      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-base-mist">
                        {cat.heroImage ? (
                          <Image src={cat.heroImage.url} alt={cat.heroImage.alt || cat.name} fill className="object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-2xl">📦</div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium group-hover:text-brand-primary">{cat.name}</div>
                        <div className="text-sm text-ink-600">View products →</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/about" className="font-medium transition-colors hover:text-brand-accent">About</Link>
          <Link href="/contact" className="font-medium transition-colors hover:text-brand-accent">Contact</Link>
        </div>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden rounded-sm bg-brand-accent px-6 py-2.5 font-semibold text-ink-900 transition-colors hover:bg-brand-sky lg:block"
        >
          Request Bulk Quote
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-brand-primary/30 bg-brand-deep px-6 pb-6 lg:hidden" style={{ transition: 'var(--transition-drawer)' }}>
          <div className="flex flex-col gap-1 py-4">
            <Link href="/" className="rounded-sm px-4 py-3 font-medium hover:bg-brand-primary/20" onClick={() => setMenuOpen(false)}>Home</Link>
            <div className="px-4 py-2 text-sm text-brand-sky/70">Products</div>
            {categories.map((cat) => (
              <Link key={cat.id} href={`/products/${cat.slug}`} className="rounded-sm px-8 py-2 hover:bg-brand-primary/20" onClick={() => setMenuOpen(false)}>
                {cat.name}
              </Link>
            ))}
            <Link href="/about" className="rounded-sm px-4 py-3 font-medium hover:bg-brand-primary/20" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/contact" className="rounded-sm px-4 py-3 font-medium hover:bg-brand-primary/20" onClick={() => setMenuOpen(false)}>Contact</Link>
          </div>
          <a href={`tel:${phone}`} className="block rounded-sm bg-brand-primary px-4 py-3 text-center font-semibold">
            📞 Call: {phone}
          </a>
        </div>
      )}
    </header>
  )
}
