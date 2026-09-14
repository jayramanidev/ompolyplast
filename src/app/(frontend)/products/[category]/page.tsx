import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { buildBreadcrumbSchema } from '@/lib/schema'
import Breadcrumb from '@/components/Breadcrumb'
import ProductCard from '@/components/ProductCard'

/**
 * Category Listing Page — design.md §5.2
 * Filter rail + product grid, unique intro per category, pagination
 */

interface PageProps {
  params: Promise<{ category: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'categories',
      where: { slug: { equals: categorySlug } },
      limit: 1,
    })
    const cat = result.docs[0]
    if (!cat) return {}

    return {
      title: cat.seo?.metaTitle || `${cat.name} Manufacturer in Rajkot | OM Polyplast`,
      description: cat.seo?.metaDescription || `${cat.name} from OM Polyplast, Rajkot. Bulk & custom orders. Get a quote today.`,
    }
  } catch {
    return {}
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category: categorySlug } = await params
  const { page: pageParam } = await searchParams
  const currentPage = parseInt(pageParam || '1', 10)

  let category: any = null
  let products: any[] = []
  let totalPages = 1

  try {
    const payload = await getPayloadClient()

    // Get category
    const catResult = await payload.find({
      collection: 'categories',
      where: { slug: { equals: categorySlug } },
      limit: 1,
    })
    category = catResult.docs[0]
    if (!category) notFound()

    // Get products in this category
    const prodResult = await payload.find({
      collection: 'products',
      where: { category: { equals: category.id } },
      limit: 12,
      page: currentPage,
    })
    products = prodResult.docs
    totalPages = prodResult.totalPages
  } catch {
    notFound()
  }

  if (!category) notFound()

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: category.name, url: `/products/${categorySlug}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="mx-auto max-w-[1280px] px-6 py-8">
        <Breadcrumb items={[{ label: category.name }]} />

        {/* Category header */}
        <div className="mb-8">
          <h1 className="mb-3">{category.name}</h1>
          {category.shortDescription && (
            <p className="max-w-3xl text-lg text-ink-600">{category.shortDescription}</p>
          )}
        </div>

        {/* Product grid */}
        {products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product: any) => {
              const thumb = typeof product.images?.[0] === 'object' ? product.images[0]?.url : undefined
              const thumbAlt = typeof product.images?.[0] === 'object' ? product.images[0]?.alt : product.name
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  categorySlug={categorySlug}
                  shortDescription={product.shortDescription}
                  thumbnail={thumb}
                  thumbnailAlt={thumbAlt}
                  specs={product.specs}
                  inStock={product.inStock}
                  featured={product.featured}
                />
              )
            })}
          </div>
        ) : (
          <div className="rounded-md border border-border-subtle bg-base-mist p-12 text-center">
            <p className="mb-4 text-lg text-ink-600">No products found in this category yet.</p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi%2C%20I%27m%20looking%20for%20${encodeURIComponent(category.name)}`}
              className="inline-block rounded-sm bg-brand-primary px-6 py-2.5 font-medium text-base-white hover:bg-brand-mid"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask on WhatsApp →
            </a>
          </div>
        )}

        {/* Pagination — design.md §5.2 recommends numbered pagination for crawlability */}
        {totalPages > 1 && (
          <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={`/products/${categorySlug}?page=${p}`}
                className={`flex h-10 w-10 items-center justify-center rounded-sm text-sm font-medium transition-colors ${
                  p === currentPage
                    ? 'bg-brand-primary text-base-white'
                    : 'border border-border-subtle text-ink-600 hover:bg-base-mist'
                }`}
              >
                {p}
              </a>
            ))}
          </nav>
        )}
      </div>
    </>
  )
}
