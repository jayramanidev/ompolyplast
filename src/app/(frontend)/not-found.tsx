'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

/**
 * Custom 404 page — seo-checklist.md §1
 * Offers navigation back into the catalog (not a dead end)
 */

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-deep px-6 py-24 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex max-w-lg flex-col items-center"
      >
        <div className="relative mb-8 h-48 w-48 overflow-hidden rounded-[2rem] border border-base-white/10 shadow-2xl">
          <Image 
            src="/sad-mascot.jpg" 
            alt="Sad Packaging Mascot" 
            fill 
            className="object-cover"
          />
        </div>
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-base-white md:text-6xl">
          404
        </h1>
        <h2 className="mb-4 text-2xl font-bold text-base-white">
          Page Not Found
        </h2>
        <p className="mb-8 text-lg font-light leading-relaxed text-brand-sky/70">
          The packaging solution you're looking for seems to have been misplaced in transit. Let's get you back to our product range.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link 
            href="/" 
            className="inline-flex h-12 items-center justify-center rounded-full bg-brand-accent px-8 font-semibold text-ink-900 transition-colors hover:bg-brand-accent/90"
          >
            Back to Home
          </Link>
          <Link 
            href="/contact" 
            className="inline-flex h-12 items-center justify-center rounded-full border border-base-white/20 bg-base-white/5 px-8 font-semibold text-base-white backdrop-blur-md transition-colors hover:bg-base-white/10"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
