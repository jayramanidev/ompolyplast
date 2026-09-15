'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useEnquiryTray } from './EnquiryTrayContext'

/**
 * Product Card — design.md §4
 * Shows: thumbnail, name, 2-3 key specs, "Add to Enquiry" + "View Details"
 */

interface ProductCardProps {
  id: string
  name: string
  slug: string
  categorySlug: string
  shortDescription: string
  thumbnail?: string
  thumbnailAlt?: string
  specs?: Array<{ label: string; value: string }>
  inStock?: boolean
  featured?: boolean
}

export default function ProductCard({
  id, name, slug, categorySlug, shortDescription,
  thumbnail, thumbnailAlt, specs = [], inStock = true, featured = false,
}: ProductCardProps) {
  const { addItem, isInTray, removeItem } = useEnquiryTray()
  const inTray = isInTray(id)

  const keySpecs = specs.slice(0, 3)

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-md border border-border-subtle bg-base-white shadow-card transition-shadow hover:shadow-modal">
      {/* Badge */}
      {!inStock && (
        <span className="absolute right-3 top-3 z-10 rounded-sm bg-error px-2 py-0.5 text-xs font-medium text-base-white">
          Out of Stock
        </span>
      )}
      {featured && inStock && (
        <span className="absolute left-3 top-3 z-10 rounded-sm bg-brand-sky px-2 py-0.5 text-xs font-medium text-brand-deep">
          Featured
        </span>
      )}

      {/* Image */}
      <Link href={`/products/${categorySlug}/${slug}`} className="block aspect-[4/3] overflow-hidden bg-base-mist relative">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={thumbnailAlt || name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-5xl text-brand-primary/20">
            📦
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/products/${categorySlug}/${slug}`}>
          <h3 className="mb-1 text-base font-semibold text-ink-900 transition-colors group-hover:text-brand-primary">
            {name}
          </h3>
        </Link>
        <p className="mb-3 line-clamp-2 text-sm text-ink-600">{shortDescription}</p>

        {/* Key specs */}
        {keySpecs.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {keySpecs.map((spec, i) => (
              <span key={i} className="inline-flex items-center gap-1 rounded-sm bg-base-mist px-2 py-0.5 font-mono text-xs text-ink-600">
                {spec.value}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto flex gap-2">
          <Link
            href={`/products/${categorySlug}/${slug}`}
            className="flex-1 rounded-sm border border-brand-primary px-3 py-2 text-center text-sm font-medium text-brand-primary transition-colors hover:bg-brand-primary hover:text-base-white"
          >
            View Details
          </Link>
          <button
            onClick={() => inTray ? removeItem(id) : addItem({ productId: id, productName: name, productSlug: slug, categorySlug, thumbnail })}
            disabled={!inStock}
            className={`flex-1 rounded-sm px-3 py-2 text-center text-sm font-medium transition-colors ${
              inTray
                ? 'bg-brand-accent text-ink-900 hover:bg-brand-accent/80'
                : inStock
                ? 'bg-brand-primary text-base-white hover:bg-brand-mid'
                : 'cursor-not-allowed bg-border-subtle text-ink-600'
            }`}
          >
            {inTray ? '✓ In Enquiry' : 'Add to Enquiry'}
          </button>
        </div>
      </div>
    </div>
  )
}
