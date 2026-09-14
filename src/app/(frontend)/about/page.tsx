import React from 'react'
import type { Metadata } from 'next'

/**
 * About Page
 */

export const metadata: Metadata = {
  title: 'About OM Polyplast | Packaging Supplier & Distributor, Rajkot',
  description: 'GST-registered leading supplier and distributor of packaging materials based in Rajkot, Gujarat. Learn about our products and commitment to quality.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 py-12">
      {/* Hero */}
      <div className="mb-16">
        <h1 className="mb-4">About OM Polyplast</h1>
        <p className="max-w-3xl text-lg text-ink-600">
          Based in the industrial heart of Rajkot, Gujarat, OM Polyplast is a trusted leading supplier and distributor of packaging materials serving businesses across India. We offer BOPP self-adhesive tapes, masking tapes, shrink & stretch films, box strapping rolls, and shrink bags for industrial, commercial, and retail packaging needs.
        </p>
      </div>

      {/* Our Story */}
      <section className="mb-16 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-brand-deep">Our Story</h2>
          <p className="mb-4 text-ink-600 leading-relaxed">
            Founded in 2017 and led by brothers Vimal Patel, Denish Patel, and Nimish Patel, OM Polyplast was built with a clear mission: provide reliable packaging materials to businesses that depend on consistent quality for their operations. From our facility in Rajkot, we've grown by earning repeat orders through product consistency — not just promises.
          </p>
          <p className="mb-4 text-ink-600 leading-relaxed">
            Our product range covers the everyday packaging needs of industries from e-commerce fulfillment and logistics to agriculture, food processing, and retail distribution. As a leading supplier and wholesale distributor, we ensure high quality and fast lead times.
          </p>
          <p className="text-ink-600 leading-relaxed">
            We work with procurement managers, wholesale traders, and sourcing agents who need a dependable partner. That means transparent specs, realistic MOQs, and honest lead times.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex aspect-[4/3] items-center justify-center rounded-md bg-gradient-to-br from-brand-sky/30 to-brand-primary/10 text-6xl">
            🏭
          </div>
          <div className="flex aspect-[4/3] items-center justify-center rounded-md bg-gradient-to-br from-brand-sky/30 to-brand-primary/10 text-6xl">
            📦
          </div>
          <div className="flex aspect-[4/3] items-center justify-center rounded-md bg-gradient-to-br from-brand-sky/30 to-brand-primary/10 text-6xl">
            🤝
          </div>
          <div className="flex aspect-[4/3] items-center justify-center rounded-md bg-gradient-to-br from-brand-sky/30 to-brand-primary/10 text-6xl">
            🚛
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-brand-deep">Our Products & Capabilities</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {capabilities.map((cap, i) => (
            <div key={i} className="rounded-md border border-border-subtle bg-base-white p-6 shadow-card">
              <div className="mb-4 text-4xl">{cap.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-ink-900">{cap.title}</h3>
              <p className="text-sm text-ink-600 leading-relaxed">{cap.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications & Trust */}
      <section className="mb-16 rounded-md bg-brand-deep p-8 md:p-12">
        <h2 className="mb-6 text-center text-base-white">Certifications & Compliance</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {certifications.map((cert, i) => (
            <div key={i} className="rounded-md bg-brand-primary/10 p-6 text-center">
              <div className="mb-3 text-3xl">{cert.icon}</div>
              <h3 className="mb-1 font-semibold text-base-white">{cert.title}</h3>
              <p className="text-sm text-brand-sky/80">{cert.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Location */}
      <section>
        <h2 className="mb-6 text-brand-deep">Contact Us</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-4 space-y-3 text-ink-600">
              <p className="flex items-start gap-2">
                <span className="mt-1">📍</span>
                Rajkot, Gujarat — 360004
              </p>
              <p className="flex items-start gap-2">
                <span className="mt-1">📞</span>
                +91 00000 00000
              </p>
              <p className="flex items-start gap-2">
                <span className="mt-1">✉️</span>
                sales@ompolyplast.com
              </p>
              <p className="flex items-start gap-2">
                <span className="mt-1">🕐</span>
                Monday – Saturday: 9:00 AM – 6:00 PM
              </p>
            </div>
            <p className="text-sm text-ink-600">
              We're located in Rajkot, easily accessible from the Rajkot–Ahmedabad highway.
            </p>
          </div>
          <div className="h-64 overflow-hidden rounded-md border border-border-subtle lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118149.68121002128!2d70.73812!3d22.30396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98ac71cdf0f%3A0x76dd15cfbe93ad3a!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '256px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="OM Polyplast — Rajkot, Gujarat"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

const capabilities = [
  { icon: '🎞️', title: 'Tapes', description: 'BOPP self-adhesive tapes and paper masking tapes for industrial and general applications.' },
  { icon: '🔄', title: 'Shrink & Stretch Films', description: 'Polyolefin, LDPE, PVC, and PE stretch and shrink films for wrapping and protection.' },
  { icon: '📦', title: 'Strapping & Bags', description: 'PP box strapping rolls and POF shrink bags for custom product packaging and bundling.' },
]

const certifications = [
  { icon: '🏛️', title: 'GST Registered', description: 'Fully GST-compliant for seamless B2B transactions and input tax credit claims.' },
  { icon: '📋', title: 'Udyam/MSME Registered', description: 'Recognized as a registered MSME under the Government of India.' },
  { icon: '✅', title: 'Trusted Supplier', description: 'Providing reliable, high-quality packaging materials since 2017.' },
]
