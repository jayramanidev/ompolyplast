import React from 'react'
import { getPayloadClient } from '@/lib/payload'
import HomeView from '@/components/HomeView'
import type { Metadata } from 'next'

/**
 * Home Page — Server Component
 * Fetches data and passes to HomeView for premium Awwwards-style UI
 */

export const metadata: Metadata = {
  title: 'OM Polyplast | Industrial Packaging Solutions',
  description: 'Manufacturer of BOPP tapes, stretch films, and poly bags in Rajkot. Premium quality for B2B bulk orders.',
}

export default async function HomePage() {
  let categories: any[] = []
  let featuredProducts: any[] = []
  let siteSettings: any = {}

  try {
    const payload = await getPayloadClient()

    const catResult = await payload.find({ collection: 'categories', sort: 'order', limit: 10 })
    categories = catResult.docs

    const prodResult = await payload.find({
      collection: 'products',
      where: { featured: { equals: true } },
      limit: 8,
    })
    featuredProducts = prodResult.docs

    siteSettings = await payload.findGlobal({ slug: 'site-settings' })
  } catch {
    // DB not ready
  }

  const stats = siteSettings?.trustBarStats || {}

  // Fallback categories if DB is empty
  const defaultCategories = [
    { id: '1', name: 'BOPP Tapes', slug: 'tapes', shortDescription: 'Self-adhesive tapes for industrial sealing.' },
    { id: '2', name: 'Masking Tapes', slug: 'masking-tapes', shortDescription: 'Paper masking tapes for painting and marking.' },
    { id: '3', name: 'Stretch Films', slug: 'stretch-films', shortDescription: 'LLDPE stretch wrapping films.' },
    { id: '4', name: 'Box Strapping', slug: 'box-strapping-rolls', shortDescription: 'PP box strapping rolls for heavy bundling.' },
    { id: '5', name: 'Shrink Bags', slug: 'shrink-bags', shortDescription: 'POF shrink bags for retail packaging.' },
  ]

  const finalCategories = categories.length > 0 ? categories : defaultCategories

  return (
    <HomeView 
      categories={finalCategories} 
      featuredProducts={featuredProducts} 
      stats={stats} 
    />
  )
}
