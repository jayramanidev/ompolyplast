import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'

/**
 * Auto-generated sitemap from Products/Categories — seo-checklist.md §1
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const entries: MetadataRoute.Sitemap = []

  // Static pages
  entries.push(
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  )

  try {
    const payload = await getPayloadClient()

    // Categories
    const categories = await payload.find({ collection: 'categories', limit: 100 })
    for (const cat of categories.docs) {
      entries.push({
        url: `${baseUrl}/products/${(cat as any).slug}`,
        lastModified: new Date((cat as any).updatedAt || Date.now()),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }

    // Products
    const products = await payload.find({ collection: 'products', limit: 1000, depth: 1 })
    for (const prod of products.docs) {
      const catSlug = typeof (prod as any).category === 'object' ? (prod as any).category.slug : 'products'
      entries.push({
        url: `${baseUrl}/products/${catSlug}/${(prod as any).slug}`,
        lastModified: new Date((prod as any).updatedAt || Date.now()),
        changeFrequency: 'weekly',
        priority: 0.9,
      })
    }
  } catch {
    // DB not ready
  }

  return entries
}
