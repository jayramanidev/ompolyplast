/**
 * JSON-LD Schema builders per content-strategy.md §5
 */

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'OM Polyplast',
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
    '@id': process.env.NEXT_PUBLIC_SITE_URL,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    telephone: '+91-9876543210',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Industrial Area',
      addressLocality: 'Rajkot',
      addressRegion: 'Gujarat',
      postalCode: '360001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '22.3039',
      longitude: '70.8022',
    },
    sameAs: [],
  }
}

export function buildProductSchema(product: any, categorySlug: string) {
  const imageUrl = typeof product.images?.[0] === 'object'
    ? `${process.env.NEXT_PUBLIC_SITE_URL}${product.images[0].url}`
    : ''

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: imageUrl,
    description: product.shortDescription,
    sku: product.sku || undefined,
    brand: {
      '@type': 'Brand',
      name: 'OM Polyplast',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${categorySlug}/${product.slug}`,
    },
  }
}

export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${process.env.NEXT_PUBLIC_SITE_URL}${item.url}`,
    })),
  }
}

export function buildFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  if (!faqs || faqs.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
