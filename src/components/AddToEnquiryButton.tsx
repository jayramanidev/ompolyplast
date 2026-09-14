'use client'

import React from 'react'
import { useEnquiryTray } from './EnquiryTrayContext'

interface AddToEnquiryButtonProps {
  productId: string
  productName: string
  productSlug: string
  categorySlug: string
  thumbnail?: string
  inStock?: boolean
}

export default function AddToEnquiryButton({
  productId, productName, productSlug, categorySlug, thumbnail, inStock = true,
}: AddToEnquiryButtonProps) {
  const { addItem, isInTray, removeItem } = useEnquiryTray()
  const inTray = isInTray(productId)

  return (
    <button
      onClick={() =>
        inTray
          ? removeItem(productId)
          : addItem({ productId, productName, productSlug, categorySlug, thumbnail })
      }
      disabled={!inStock}
      className={`flex flex-1 items-center justify-center gap-2 rounded-sm px-6 py-3 font-semibold transition-colors ${
        inTray
          ? 'bg-brand-accent text-ink-900 hover:bg-brand-accent/80'
          : inStock
          ? 'bg-brand-primary text-base-white hover:bg-brand-mid'
          : 'cursor-not-allowed bg-border-subtle text-ink-600'
      }`}
    >
      {inTray ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Added to Enquiry
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          Add to Enquiry
        </>
      )}
    </button>
  )
}
