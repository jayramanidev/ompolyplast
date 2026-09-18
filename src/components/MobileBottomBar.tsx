'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEnquiryTray } from './EnquiryTrayContext'
import { Home, Package, Phone, MessageCircle, ShoppingBag } from 'lucide-react'

/**
 * MobileBottomBar — Sticky bottom navigation dock (mobile only)
 * Provides 1-thumb access to core actions: Home, Products, Call, WhatsApp, Enquiry
 * Hidden on lg+ screens where the desktop layout provides these affordances.
 */

interface MobileBottomBarProps {
  phone?: string
  whatsapp?: string
}

export default function MobileBottomBar({
  phone = '+91-9876543210',
  whatsapp = '919876543210',
}: MobileBottomBarProps) {
  const pathname = usePathname()
  const { itemCount, setIsOpen } = useEnquiryTray()

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
      type: 'link' as const,
    },
    {
      label: 'Products',
      href: '/products/tapes',
      icon: Package,
      isActive: pathname.startsWith('/products'),
      type: 'link' as const,
    },
    {
      label: 'Call',
      href: `tel:${phone}`,
      icon: Phone,
      isActive: false,
      type: 'external' as const,
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi, I'd like to enquire about your products.")}`,
      icon: MessageCircle,
      isActive: false,
      type: 'external' as const,
    },
    {
      label: 'Enquiry',
      href: '#',
      icon: ShoppingBag,
      isActive: false,
      type: 'action' as const,
    },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-brand-primary/20 bg-brand-deep/95 text-base-white lg:hidden"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        paddingBottom: 'max(0.25rem, env(safe-area-inset-bottom))',
      }}
      aria-label="Mobile navigation"
    >
      <div className="flex items-stretch justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isEnquiry = item.type === 'action'

          // Enquiry tray trigger
          if (isEnquiry) {
            return (
              <button
                key={item.label}
                onClick={() => setIsOpen(true)}
                className="relative flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 py-2 text-brand-sky/70 transition-colors active:bg-brand-primary/20"
                aria-label={`Open enquiry tray (${itemCount} items)`}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-accent px-1 text-[10px] font-bold text-ink-900">
                      {itemCount > 9 ? '9+' : itemCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            )
          }

          // External links (tel:, wa.me)
          if (item.type === 'external') {
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.label === 'WhatsApp' ? '_blank' : undefined}
                rel={item.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                className={`flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-colors active:bg-brand-primary/20 ${
                  item.label === 'WhatsApp' ? 'text-[#25D366]' : 'text-brand-sky/70'
                }`}
                aria-label={item.label}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </a>
            )
          }

          // Internal nav links
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-colors active:bg-brand-primary/20 ${
                item.isActive
                  ? 'text-brand-accent'
                  : 'text-brand-sky/70'
              }`}
              aria-label={item.label}
              aria-current={item.isActive ? 'page' : undefined}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
