import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { buildProductSchema, buildBreadcrumbSchema, buildFAQSchema } from '@/lib/schema'
import Breadcrumb from '@/components/Breadcrumb'
import SpecTable from '@/components/SpecTable'
import ProductCard from '@/components/ProductCard'
import AddToEnquiryButton from '@/components/AddToEnquiryButton'

/**
 * Product Detail Page — design.md §5.3
 */

interface PageProps {
  params: Promise<{ category: string; product: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: catSlug, product: prodSlug } = await params
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'products',
      where: { slug: { equals: prodSlug } },
      limit: 1,
      depth: 1,
    })
    const product = result.docs[0]
    if (!product) return {}

    const keySpec = product.specs?.[0]?.value || ''
    return {
      title: product.seo?.metaTitle || `${product.name}${keySpec ? ` — ${keySpec}` : ''} | OM Polyplast`,
      description: product.seo?.metaDescription || product.shortDescription,
    }
  } catch {
    return {}
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { category: catSlug, product: prodSlug } = await params

  let product: any = null
  let category: any = null
  let relatedProducts: any[] = []

  try {
    const payload = await getPayloadClient()

    const prodResult = await payload.find({
      collection: 'products',
      where: { slug: { equals: prodSlug } },
      limit: 1,
      depth: 2,
    })
    product = prodResult.docs[0]
    if (!product) notFound()

    category = typeof product.category === 'object' ? product.category : null

    // Get related products (same category)
    if (category) {
      const relResult = await payload.find({
        collection: 'products',
        where: {
          category: { equals: category.id },
          id: { not_equals: product.id },
        },
        limit: 4,
        depth: 1,
      })
      relatedProducts = relResult.docs
    }
  } catch {
    notFound()
  }

  if (!product) notFound()

  const catName = category?.name || 'Products'
  const productSchema = buildProductSchema(product, catSlug)
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: catName, url: `/products/${catSlug}` },
    { name: product.name, url: `/products/${catSlug}/${prodSlug}` },
  ])
  const faqSchema = product.faqs?.length > 0 ? buildFAQSchema(product.faqs) : null

  const whatsappMessage = `Hi, I'm interested in ${product.name}. Can you share pricing and availability?`
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <div className="mx-auto max-w-[1280px] px-6 py-8">
        <Breadcrumb items={[
          { label: catName, href: `/products/${catSlug}` },
          { label: product.name },
        ]} />

        {/* Product main section */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Gallery — left/top on mobile */}
          <div>
            <div className="aspect-square overflow-hidden rounded-md border border-border-subtle bg-base-mist">
              {product.images?.[0] && typeof product.images[0] === 'object' ? (
                <img
                  src={product.images[0].url}
                  alt={product.images[0].alt || product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-8xl text-brand-primary/20">📦</div>
              )}
            </div>
            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {product.images.slice(0, 5).map((img: any, i: number) => (
                  <div key={i} className="h-16 w-16 flex-shrink-0 overflow-hidden rounded border border-border-subtle bg-base-mist">
                    {typeof img === 'object' && (
                      <img src={img.url} alt={img.alt || `${product.name} ${i + 1}`} className="h-full w-full object-cover" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product info — right/below on mobile */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              {product.inStock ? (
                <span className="rounded-sm bg-success/10 px-2 py-0.5 text-xs font-medium text-success">In Stock</span>
              ) : (
                <span className="rounded-sm bg-error/10 px-2 py-0.5 text-xs font-medium text-error">Out of Stock</span>
              )}
              {product.sku && (
                <span className="font-mono text-xs text-ink-600">SKU: {product.sku}</span>
              )}
            </div>

            <h1 className="mb-4 text-3xl md:text-4xl">{product.name}</h1>
            <p className="mb-6 text-lg text-ink-600">{product.shortDescription}</p>

            {/* Key specs summary */}
            {product.specs?.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {product.specs.slice(0, 4).map((spec: any, i: number) => (
                  <span key={i} className="inline-flex items-center gap-1.5 rounded-sm border border-border-subtle bg-base-mist px-3 py-1.5 text-sm">
                    <span className="font-medium text-ink-600">{spec.label}:</span>
                    <span className="font-mono text-ink-900">{spec.value}</span>
                  </span>
                ))}
              </div>
            )}

            {product.moq && (
              <div className="mb-6 rounded-md border border-border-subtle bg-base-mist p-4">
                <span className="text-sm font-medium text-ink-600">Minimum Order:</span>
                <span className="ml-2 font-mono font-medium text-ink-900">{product.moq}</span>
              </div>
            )}

            {/* Action buttons */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row">
              <AddToEnquiryButton
                productId={product.id}
                productName={product.name}
                productSlug={product.slug}
                categorySlug={catSlug}
                thumbnail={typeof product.images?.[0] === 'object' ? product.images[0]?.url : undefined}
                inStock={product.inStock}
              />
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-sm border-2 border-[#25D366] px-6 py-3 font-semibold text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Enquire via WhatsApp
              </a>
            </div>

            {/* Spec sheet download */}
            {product.specSheetPdf && typeof product.specSheetPdf === 'object' && (
              <a
                href={product.specSheetPdf.url}
                download
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:text-brand-mid"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download Spec Sheet (PDF)
              </a>
            )}
          </div>
        </div>

        {/* Full Spec Table */}
        {product.specs?.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4">Specifications</h2>
            <SpecTable specs={product.specs} />
          </section>
        )}

        {/* Applications */}
        {product.applications?.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4">Applications</h2>
            <div className="flex flex-wrap gap-2">
              {product.applications.map((app: any, i: number) => (
                <span key={i} className="rounded-sm bg-brand-sky px-4 py-2 text-sm font-medium text-brand-deep">
                  {app.industry}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* FAQs — P1 */}
        {product.faqs?.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {product.faqs.map((faq: any, i: number) => (
                <details key={i} className="rounded-md border border-border-subtle">
                  <summary className="cursor-pointer px-4 py-3 font-medium text-ink-900 hover:bg-base-mist">
                    {faq.question}
                  </summary>
                  <p className="border-t border-border-subtle px-4 py-3 text-sm text-ink-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6">Related Products</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((rp: any) => {
                const thumb = typeof rp.images?.[0] === 'object' ? rp.images[0]?.url : undefined
                return (
                  <ProductCard
                    key={rp.id}
                    id={rp.id}
                    name={rp.name}
                    slug={rp.slug}
                    categorySlug={catSlug}
                    shortDescription={rp.shortDescription}
                    thumbnail={thumb}
                    specs={rp.specs}
                    inStock={rp.inStock}
                  />
                )
              })}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
