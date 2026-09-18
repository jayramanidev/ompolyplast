import React from 'react'
import type { Metadata } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})
import { getPayloadClient } from '@/lib/payload'
import { buildOrganizationSchema } from '@/lib/schema'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFAB from '@/components/WhatsAppFAB'
import EnquiryTray from '@/components/EnquiryTray'
import MobileBottomBar from '@/components/MobileBottomBar'
import { EnquiryTrayProvider } from '@/components/EnquiryTrayContext'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'OM Polyplast | Packaging Tapes, Stretch Films & Bags — Rajkot',
    template: '%s | OM Polyplast',
  },
  description: 'Manufacturer of BOPP tape, stretch film, and woven/poly bags in Rajkot, Gujarat. Request a bulk quote — we respond within 24 business hours.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'OM Polyplast',
  },
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  // Fetch categories for header mega-menu
  let categories: any[] = []
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'categories',
      sort: 'order',
      limit: 20,
    })
    categories = result.docs.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      heroImage: cat.heroImage ? { url: cat.heroImage.url, alt: cat.heroImage.alt || cat.name } : undefined,
    }))
  } catch {
    // DB not ready yet — use empty categories
  }

  // Fetch site settings
  let siteSettings: any = {}
  try {
    const payload = await getPayloadClient()
    siteSettings = await payload.findGlobal({ slug: 'site-settings' })
  } catch {
    // defaults
  }

  const orgSchema = buildOrganizationSchema()

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className={`min-h-screen bg-base-white text-ink-900 font-sans antialiased ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
        <EnquiryTrayProvider>
          <Header
            categories={categories}
            phone={siteSettings?.contact?.phone}
            whatsapp={siteSettings?.contact?.whatsapp}
          />
          <main className="mobile-bottom-spacer">{children}</main>
          <Footer
            phone={siteSettings?.contact?.phone}
            email={siteSettings?.contact?.email}
            address={siteSettings?.contact?.address}
            whatsapp={siteSettings?.contact?.whatsapp}
            gst={siteSettings?.contact?.gst}
            mapEmbedUrl={siteSettings?.contact?.mapEmbedUrl}
          />
          <WhatsAppFAB phone={siteSettings?.contact?.whatsapp} />
          <EnquiryTray />
          <MobileBottomBar
            phone={siteSettings?.contact?.phone}
            whatsapp={siteSettings?.contact?.whatsapp}
          />
        </EnquiryTrayProvider>
      </body>
    </html>
  )
}
