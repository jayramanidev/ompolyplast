'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useEnquiryTray } from './EnquiryTrayContext'
import { ShoppingBag, Check } from 'lucide-react'

/**
 * Product Card — Responsive for 2-column mobile grid and 3-column desktop grid.
 * Shows: thumbnail, name, 2-3 key specs, "Add to Enquiry" + "View Details"
 * Touch targets >= 44px, compact layout on mobile.
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
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-border-subtle bg-base-white shadow-card transition-shadow hover:shadow-modal sm:rounded-md">
      {/* Badge */}
      {!inStock && (
        <span className="absolute right-2 top-2 z-10 rounded-sm bg-error px-1.5 py-0.5 text-[10px] font-medium text-base-white sm:right-3 sm:top-3 sm:px-2 sm:text-xs">
          Out of Stock
        </span>
      )}
      {featured && inStock && (
        <span className="absolute left-2 top-2 z-10 rounded-sm bg-brand-sky px-1.5 py-0.5 text-[10px] font-medium text-brand-deep sm:left-3 sm:top-3 sm:px-2 sm:text-xs">
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
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <Image 
            src={`https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80`}
            alt={name} 
            fill 
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80" 
          />
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-3 md:p-4">
        <Link href={`/products/${categorySlug}/${slug}`}>
          <h3 className="mb-0.5 text-sm font-semibold text-ink-900 transition-colors group-hover:text-brand-primary line-clamp-2 sm:text-base sm:mb-1">
            {name}
          </h3>
        </Link>
        <p className="mb-2 line-clamp-2 text-xs text-ink-600 sm:mb-3 sm:text-sm">{shortDescription}</p>

        {/* Key specs — compact on mobile */}
        {keySpecs.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1 sm:mb-3 sm:gap-1.5 md:mb-4">
            {keySpecs.map((spec, i) => (
              <span key={i} className="inline-flex items-center gap-0.5 rounded-sm bg-base-mist px-1.5 py-0.5 font-mono text-[10px] text-ink-600 sm:px-2 sm:text-xs sm:gap-1">
                {spec.value}
              </span>
            ))}
          </div>
        )}

        {/* Actions — stacked on very small screens, side-by-side on sm+ */}
        <div className="mt-auto flex flex-col gap-1.5 sm:flex-row sm:gap-2">
          <Link
            href={`/products/${categorySlug}/${slug}`}
            className="flex min-h-[40px] flex-1 items-center justify-center rounded-sm border border-brand-primary px-2 py-2 text-center text-xs font-medium text-brand-primary transition-colors active:bg-brand-primary/10 hover:bg-brand-primary hover:text-base-white sm:min-h-[44px] sm:px-3 sm:text-sm"
          >
            View Details
          </Link>
          <button
            onClick={() => inTray ? removeItem(id) : addItem({ productId: id, productName: name, productSlug: slug, categorySlug, thumbnail })}
            disabled={!inStock}
            className={`flex min-h-[40px] flex-1 items-center justify-center gap-1 rounded-sm px-2 py-2 text-center text-xs font-medium transition-colors active:scale-[0.98] sm:min-h-[44px] sm:px-3 sm:text-sm sm:gap-1.5 ${
              inTray
                ? 'bg-brand-accent text-ink-900 hover:bg-brand-accent/80'
                : inStock
                ? 'bg-brand-primary text-base-white hover:bg-brand-mid'
                : 'cursor-not-allowed bg-border-subtle text-ink-600'
            }`}
          >
            {inTray ? (
              <>
                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">In Enquiry</span>
                <span className="sm:hidden">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Add to Enquiry</span>
                <span className="sm:hidden">Enquire</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
