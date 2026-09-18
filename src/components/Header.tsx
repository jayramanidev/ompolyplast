'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, Package, Users, Mail, Phone, ChevronRight } from 'lucide-react'

/**
 * Header with mega-menu (desktop) + animated slide-over drawer (mobile)
 * Mobile drawer features visual category cards with thumbnails matching PC mega-menu
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
  const pathname = usePathname()

  // Close mobile drawer on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About', icon: Users },
    { href: '/contact', label: 'Contact', icon: Mail },
  ]

  return (
    <header className="sticky top-0 z-50 bg-brand-deep text-base-white shadow-modal">
      {/* Top bar — phone + CTA (hidden on small mobile for cleanliness) */}
      <div className="bg-ink-900/30">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-1.5 text-sm sm:px-6 sm:py-2">
          <a href={`tel:${phone}`} className="flex items-center gap-1.5 transition-colors hover:text-brand-accent sm:gap-2">
            <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">{phone}</span>
            <span className="xs:hidden text-xs">Call Us</span>
          </a>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden text-brand-sky/80 sm:inline">Rajkot, Gujarat</span>
            <a
              href={`https://wa.me/${whatsapp}?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20your%20products.`}
              className="rounded-sm bg-brand-primary px-3 py-1 text-xs font-medium transition-colors hover:bg-brand-mid sm:px-4 sm:py-1.5 sm:text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-base-white text-brand-deep font-bold text-base sm:h-10 sm:w-10 sm:text-lg">
            OP
          </div>
          <div>
            <div className="text-base font-bold tracking-tight leading-tight sm:text-lg">OM POLYPLAST</div>
            <div className="h-0.5 w-full bg-brand-accent mt-0.5" />
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link href="/" className={`font-medium transition-colors hover:text-brand-accent ${pathname === '/' ? 'text-brand-accent underline underline-offset-4' : ''}`}>Home</Link>
          
          {/* Products mega-menu trigger */}
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button className={`flex items-center gap-1 font-medium transition-colors hover:text-brand-accent ${pathname.startsWith('/products') ? 'text-brand-accent underline underline-offset-4' : ''}`}>
              Products
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"/></svg>
            </button>

            {/* Mega-menu dropdown */}
            {productsOpen && (
              <div className="absolute left-1/2 top-full w-[600px] -translate-x-1/2 pt-6 -mt-2">
                <div className="rounded-md bg-base-white p-6 text-ink-900 shadow-modal"
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
                            <Image 
                              src={`https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80`}
                              alt={cat.name} 
                              fill 
                              sizes="56px"
                              className="object-cover opacity-80" 
                            />
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
              </div>
            )}
          </div>

          <Link href="/about" className={`font-medium transition-colors hover:text-brand-accent ${pathname === '/about' ? 'text-brand-accent underline underline-offset-4' : ''}`}>About</Link>
          <Link href="/contact" className={`font-medium transition-colors hover:text-brand-accent ${pathname === '/contact' ? 'text-brand-accent underline underline-offset-4' : ''}`}>Contact</Link>
        </div>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden rounded-sm bg-brand-accent px-6 py-2.5 font-semibold text-ink-900 transition-colors hover:bg-brand-sky lg:block"
        >
          Request Bulk Quote
        </Link>

        {/* Mobile menu toggle — minimum 44×44px touch target */}
        <button
          className="flex h-11 w-11 items-center justify-center rounded-md transition-colors active:bg-brand-primary/20 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* ═══════════════════════════════════════════
          MOBILE SLIDE-OVER DRAWER
         ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="drawer-backdrop fixed inset-0 z-40 bg-ink-900/50 lg:hidden"
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Drawer panel — slides in from right */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[85vw] max-w-sm flex-col bg-brand-deep shadow-modal lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between border-b border-brand-primary/20 px-5 py-4">
                <div className="text-base font-bold tracking-tight">OM POLYPLAST</div>
                <button
                  onClick={closeMenu}
                  className="flex h-10 w-10 items-center justify-center rounded-md transition-colors active:bg-brand-primary/20"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer content — scrollable */}
              <div className="flex-1 overflow-y-auto px-5 py-5">
                {/* Navigation links */}
                <div className="mb-6 space-y-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon
                    const isActive = pathname === link.href
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenu}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors active:bg-brand-primary/20 ${
                          isActive
                            ? 'bg-brand-primary/15 text-brand-accent'
                            : 'text-base-white hover:bg-brand-primary/10'
                        }`}
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        {link.label}
                      </Link>
                    )
                  })}
                </div>

                {/* Product categories — visual cards matching PC mega-menu */}
                <div className="mb-6">
                  <div className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-brand-sky/60">
                    Product Categories
                  </div>
                  <div className="space-y-2">
                    {categories.map((cat) => {
                      const isActive = pathname === `/products/${cat.slug}`
                      return (
                        <Link
                          key={cat.id}
                          href={`/products/${cat.slug}`}
                          onClick={closeMenu}
                          className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors active:bg-brand-primary/20 ${
                            isActive
                              ? 'bg-brand-primary/15 text-brand-accent'
                              : 'text-base-white hover:bg-brand-primary/10'
                          }`}
                        >
                          {/* Category thumbnail */}
                          <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-lg bg-brand-primary/20">
                            {cat.heroImage ? (
                              <Image
                                src={cat.heroImage.url}
                                alt={cat.heroImage.alt || cat.name}
                                fill
                                sizes="44px"
                                className="object-cover"
                              />
                            ) : (
                              <Image
                                src={`https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=200&q=60`}
                                alt={cat.name}
                                fill
                                sizes="44px"
                                className="object-cover opacity-70"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{cat.name}</div>
                            <div className="text-xs text-brand-sky/60">View products</div>
                          </div>
                          <ChevronRight className="h-4 w-4 flex-shrink-0 text-brand-sky/40" />
                        </Link>
                      )
                    })}
                  </div>
                </div>

                {/* Quick contact card */}
                <div className="rounded-xl border border-brand-primary/20 bg-brand-primary/10 p-4">
                  <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-sky/60">
                    Quick Contact
                  </div>
                  <div className="space-y-2">
                    <a
                      href={`tel:${phone}`}
                      className="flex items-center gap-3 rounded-lg bg-brand-primary/20 px-4 py-3 text-sm font-medium transition-colors active:bg-brand-primary/30"
                    >
                      <Phone className="h-4 w-4 text-brand-accent" />
                      <span>Call: {phone}</span>
                    </a>
                    <a
                      href={`https://wa.me/${whatsapp}?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20your%20products.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg bg-[#25D366]/15 px-4 py-3 text-sm font-medium text-[#25D366] transition-colors active:bg-[#25D366]/25"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      <span>WhatsApp Us</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Drawer footer — CTA */}
              <div className="border-t border-brand-primary/20 px-5 py-4">
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-lg bg-brand-accent px-6 py-3.5 text-base font-semibold text-ink-900 transition-transform active:scale-[0.98]"
                >
                  Request Bulk Quote
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
