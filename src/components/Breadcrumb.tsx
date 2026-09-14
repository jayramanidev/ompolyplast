import React from 'react'
import Link from 'next/link'

/**
 * Breadcrumb — design.md §4
 * Also feeds BreadcrumbList JSON-LD schema
 */

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-600">
        <li>
          <Link href="/" className="transition-colors hover:text-brand-primary">Home</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-brand-primary">{item.label}</Link>
            ) : (
              <span className="font-medium text-ink-900">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
