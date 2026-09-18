'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, ShieldCheck, Truck, Factory, ArrowRight, TrendingUp, Anchor, CheckCircle, ChevronDown } from 'lucide-react'

const MotionImage = motion.create(Image)
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs))
}

const faqs = [
  {
    question: "What is your minimum order quantity (MOQ)?",
    answer: "Our MOQ varies by product. For standard BOPP tapes and stretch films, we accommodate orders starting from 10 cartons. For custom printed tapes or specific gauge films, the MOQ is slightly higher. Contact our sales team for exact requirements."
  },
  {
    question: "Do you offer custom printing on BOPP Tapes?",
    answer: "Yes, we specialize in custom printed BOPP tapes. You can print your company logo, handling instructions, or brand messaging in up to 3 colors for enhanced brand visibility."
  },
  {
    question: "How fast can you dispatch bulk orders?",
    answer: "We guarantee a 48-hour dispatch time for standard, in-stock packaging products. Custom orders generally take 7-10 business days for the initial production run."
  },
  {
    question: "Are your shrink bags suitable for food packaging?",
    answer: "Yes, we manufacture food-grade POF (Polyolefin) shrink bags that are FDA-approved, highly durable, and perfect for retail food packaging, offering excellent clarity and a strong seal."
  }
]

const FAQItem = ({ faq, index, isOpen, toggleOpen }: { faq: any, index: number, isOpen: boolean, toggleOpen: () => void }) => {
  return (
    <motion.div 
      variants={fadeInUp as any}
      className="border-b border-border-subtle"
    >
      <button 
        onClick={toggleOpen}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-4 text-left focus:outline-none group sm:py-5 md:py-6"
      >
        <span className="text-base font-semibold text-ink-900 transition-colors group-hover:text-brand-primary sm:text-lg md:text-xl pr-4">{faq.question}</span>
        <div className={cn(
          "ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-base-mist transition-transform duration-300 sm:h-10 sm:w-10",
          isOpen ? "rotate-180 bg-brand-primary text-base-white" : "text-brand-primary group-hover:bg-brand-primary/10"
        )}>
          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-ink-600 font-light leading-relaxed sm:pb-6 sm:text-base md:text-lg">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const FAQList = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  return (
    <div className="flex flex-col">
      {faqs.map((faq, idx) => (
        <FAQItem 
          key={idx} 
          faq={faq} 
          index={idx} 
          isOpen={openIndex === idx} 
          toggleOpen={() => setOpenIndex(openIndex === idx ? null : idx)} 
        />
      ))}
    </div>
  )
}

const fadeInUp: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const stagger: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const heroImages = [
  "/images/hero-packaging.jpg",
  "/images/category-tapes.jpg",
  "/images/category-stretch-films.jpg",
  "/images/category-bags.jpg"
]

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-2xl border border-base-white/10 sm:rounded-2xl lg:max-w-2xl lg:ml-auto xl:-mr-12">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={heroImages[currentIndex]}
            className="object-cover"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={currentIndex === 0}
            alt="OM Polyplast Packaging Solutions"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-deep/60 via-transparent to-transparent pointer-events-none" />
      {/* Compact carousel dots on mobile */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-20 sm:bottom-6 sm:gap-3 md:bottom-10 md:gap-4">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300 sm:h-3 md:h-4",
              idx === currentIndex
                ? "w-6 bg-brand-accent shadow-[0_0_10px_rgba(255,215,0,0.5)] sm:w-8 md:w-12"
                : "w-2 bg-base-white/60 hover:bg-base-white hover:scale-110 sm:w-3 md:w-4"
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default function HomeView({ categories, featuredProducts, stats }: any) {
  return (
    <div className="bg-base-white selection:bg-brand-accent selection:text-ink-900 overflow-hidden">
      {/* 1. HERO SECTION (Dark, Immersive, Glassmorphism, Split Layout) */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-brand-deep text-base-white overflow-hidden sm:min-h-[80vh] lg:min-h-[90vh]">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-[-10%] right-[-15%] w-[300px] h-[300px] rounded-full bg-brand-primary/30 blur-[80px] sm:w-[400px] sm:h-[400px] sm:blur-[100px] lg:w-[600px] lg:h-[600px] lg:blur-[120px] lg:right-[-5%]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            className="absolute bottom-[-10%] left-[-15%] w-[250px] h-[250px] rounded-full bg-brand-accent/20 blur-[60px] sm:w-[350px] sm:h-[350px] sm:blur-[80px] lg:w-[500px] lg:h-[500px] lg:blur-[100px] lg:left-[-10%]"
          />
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        <div className="relative mx-auto w-full max-w-[1440px] px-4 py-12 z-10 sm:px-6 sm:py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 gap-8 items-center sm:gap-10 lg:grid-cols-2 lg:gap-8">
            
            {/* Left Content */}
            <motion.div variants={stagger as any} initial="hidden" animate="visible" className="max-w-2xl">
              <motion.div variants={fadeInUp as any} className="mb-4 inline-flex items-center gap-2 rounded-full border border-base-white/10 bg-base-white/5 px-3 py-1.5 text-xs font-medium backdrop-blur-md sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                </span>
                <span className="text-brand-sky">Rajkot, Gujarat — Serving Businesses Across India</span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="mb-4 text-3xl leading-[1.1] tracking-tight font-bold text-base-white sm:text-4xl sm:mb-6 md:text-5xl lg:text-[5.5rem]">
                Industrial Packaging <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sky to-brand-accent">
                  Engineered to Protect.
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="mb-6 text-base text-brand-sky/70 font-light leading-relaxed sm:mb-8 sm:text-lg md:text-xl md:mb-10">
                We manufacture premium BOPP tapes, stretch films, and bulk poly bags. Factory-direct pricing with uncompromising quality control.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Link href="/contact" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-accent px-6 py-3.5 text-base font-semibold text-ink-900 transition-transform active:scale-[0.98] hover:scale-105 sm:gap-3 sm:px-8 sm:py-4 sm:text-lg">
                  <span className="relative z-10">Request Bulk Quote</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0" />
                </Link>
                <Link href="/products/tapes" className="group inline-flex items-center justify-center gap-2 rounded-full border border-base-white/20 bg-transparent px-6 py-3.5 text-base font-medium text-base-white backdrop-blur-md transition-all active:scale-[0.98] hover:bg-base-white/10 sm:px-8 sm:py-4 sm:text-lg">
                  Explore Catalog
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Content - Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="w-full relative z-20"
            >
              <HeroCarousel />
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* 2. STATS BAR (Massive Typography) */}
      <section className="border-b border-border-subtle bg-base-white py-8 sm:py-12 md:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 md:gap-4 divide-x-0 md:divide-x divide-border-subtle"
          >
            {[
              { value: stats.yearsInBusiness || '10+', label: 'Years of Excellence' },
              { value: stats.productsManufactured || '200+', label: 'SKUs Manufactured' },
              { value: stats.clientsServed || '500+', label: 'B2B Clients' },
              { value: stats.dispatchTime || '48h', label: 'Standard Dispatch' },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center text-center px-2 sm:px-4">
                <span className="text-3xl font-bold tracking-tighter text-brand-deep font-mono sm:text-4xl md:text-6xl lg:text-7xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-xs font-medium text-ink-600 sm:mt-2 sm:text-sm md:text-base">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. PRODUCT RANGE (Bento Box) */}
      <section className="bg-base-mist py-14 sm:py-20 md:py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="mb-8 sm:mb-12 md:mb-16 md:flex md:items-end md:justify-between"
          >
            <div className="max-w-2xl">
              <motion.h2 variants={fadeInUp} className="text-2xl font-bold tracking-tight text-ink-900 mb-3 sm:text-3xl sm:mb-4 md:text-5xl md:mb-6 lg:text-6xl">
                Engineered for <br className="hidden md:block"/> Every Industry.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-base text-ink-600 font-light sm:text-lg md:text-xl">
                Our in-house manufacturing capabilities cover a broad spectrum of industrial requirements.
              </motion.p>
            </div>
            <motion.div variants={fadeInUp} className="mt-4 sm:mt-6 md:mt-0">
              <Link href="/products" className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:text-brand-deep transition-colors text-sm sm:text-base">
                View All Categories <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
          >
            {categories.slice(0, 6).map((cat: any, i: number) => {
              const thumb = cat.heroImage?.url
              
              return (
                <motion.div key={cat.id} variants={fadeInUp} className={cn(
                  "group relative overflow-hidden rounded-xl bg-base-white shadow-sm border border-border-subtle transition-all hover:shadow-xl aspect-[4/3] sm:rounded-2xl"
                )}>
                  <Link href={`/products/${cat.slug}`} className="absolute inset-0 z-10" aria-label={`View ${cat.name} category`} />
                  
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-base-mist overflow-hidden">
                    {thumb ? (
                      <Image 
                        src={thumb} 
                        alt={cat.name} 
                        fill 
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        priority={i < 3}
                        className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                    ) : (
                      <Image 
                        src={`https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80`}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        priority={i < 3}
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                      />
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/20 to-transparent opacity-80" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col justify-end sm:p-6 md:p-8">
                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                      <h3 className="font-bold text-base-white mb-1 text-lg sm:text-xl sm:mb-2 md:text-2xl">
                        {cat.name}
                      </h3>
                      <p className="text-base-white/80 line-clamp-2 text-sm max-w-md sm:text-base sm:mb-4">
                        {cat.shortDescription || 'Explore our comprehensive range of high-quality packaging materials.'}
                      </p>
                    </div>
                    {/* Mobile: always-visible explore affordance; Desktop: hover arrow */}
                    <div className="flex items-center gap-1.5 text-brand-accent text-xs font-semibold mt-2 sm:text-sm lg:absolute lg:bottom-8 lg:right-8 lg:mt-0 lg:opacity-0 lg:transform lg:translate-x-4 lg:transition-all lg:duration-500 lg:group-hover:opacity-100 lg:group-hover:translate-x-0">
                      <span className="lg:hidden">Explore Category</span>
                      <div className="bg-brand-accent text-ink-900 p-1.5 rounded-full sm:p-2 lg:p-3">
                        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. WHY BUY FROM US (Minimalist Cards) */}
      <section className="bg-base-white py-14 sm:py-20 md:py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="mb-8 text-center sm:mb-12 md:mb-16">
            <motion.h2 variants={fadeInUp} className="text-2xl font-bold tracking-tight text-ink-900 mb-3 sm:text-3xl sm:mb-4 md:text-4xl md:mb-6 lg:text-5xl">
              The OM Polyplast Advantage
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:grid-cols-4 lg:gap-6">
            {[
              { icon: <Factory />, title: 'In-House Mfg', desc: 'End-to-end production control with zero middleman markup.' },
              { icon: <ShieldCheck />, title: 'Quality Assured', desc: 'Strict lab testing for adhesion, micron thickness, and tensile strength.' },
              { icon: <Anchor />, title: 'Custom Specs', desc: 'Any width, length, or micron thickness manufactured to your needs.' },
              { icon: <Truck />, title: 'Fast Dispatch', desc: 'Optimized supply chain for 48-hour dispatch on standard items.' },
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeInUp} className="group p-4 rounded-xl bg-base-mist border border-border-subtle transition-all hover:bg-brand-deep hover:text-base-white sm:p-6 md:p-8 sm:rounded-2xl">
                <div className="mb-3 inline-flex p-2.5 rounded-lg bg-base-white text-brand-primary shadow-sm transition-colors group-hover:bg-brand-accent group-hover:text-ink-900 sm:mb-4 sm:p-3 md:mb-6 md:p-4 md:rounded-xl">
                  {React.cloneElement(feature.icon as React.ReactElement<any>, { className: 'h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8' })}
                </div>
                <h3 className="text-sm font-bold mb-1 text-ink-900 group-hover:text-base-white transition-colors sm:text-base sm:mb-2 md:text-xl md:mb-3">{feature.title}</h3>
                <p className="text-xs text-ink-600 font-light leading-relaxed group-hover:text-brand-sky/80 transition-colors sm:text-sm md:text-base">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS (Clean Grid — 2-col mobile, 4-col desktop) */}
      {featuredProducts?.length > 0 && (
        <section className="bg-base-mist py-14 sm:py-20 md:py-24 lg:py-32">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="mb-8 sm:mb-12 md:mb-16">
              <motion.h2 variants={fadeInUp} className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl md:text-4xl lg:text-5xl">
                Featured Selection
              </motion.h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-8">
              {featuredProducts.map((product: any) => {
                const catSlug = typeof product.category === 'object' ? product.category.slug : 'products'
                const thumb = typeof product.images?.[0] === 'object' ? product.images[0]?.url : undefined
                
                return (
                  <motion.div key={product.id} variants={fadeInUp}>
                    <Link href={`/products/${catSlug}/${product.slug}`} className="group block">
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-base-white border border-border-subtle mb-2 sm:rounded-xl sm:mb-3 md:mb-4">
                        {thumb ? (
                          <Image 
                            src={thumb} 
                            alt={product.name} 
                            fill 
                            sizes="(max-width: 640px) 50vw, (max-width: 1200px) 50vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105" 
                          />
                        ) : (
                          <Image 
                            src={`https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80`}
                            alt={product.name} 
                            fill 
                            sizes="(max-width: 640px) 50vw, (max-width: 1200px) 50vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80" 
                          />
                        )}
                        <div className="absolute inset-0 bg-brand-deep/0 transition-colors duration-300 group-hover:bg-brand-deep/5" />
                      </div>
                      <h3 className="font-semibold text-sm text-ink-900 group-hover:text-brand-primary transition-colors sm:text-base lg:text-lg">{product.name}</h3>
                      <p className="text-xs text-ink-600 mt-0.5 line-clamp-1 sm:text-sm sm:mt-1">{product.shortDescription}</p>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* 5.5 FAQ SECTION */}
      <section className="bg-base-white py-14 sm:py-20 md:py-24 lg:py-32">
        <div className="mx-auto max-w-[1024px] px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger as any} className="mb-8 text-center sm:mb-12 md:mb-16">
            <motion.h2 variants={fadeInUp as any} className="text-2xl font-bold tracking-tight text-ink-900 mb-3 sm:text-3xl sm:mb-4 md:text-4xl md:mb-6 lg:text-5xl">
              Frequently Asked Questions
            </motion.h2>
            <motion.p variants={fadeInUp as any} className="text-sm text-ink-600 font-light max-w-2xl mx-auto sm:text-base md:text-lg">
              Everything you need to know about our packaging products and supply chain process.
            </motion.p>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger as any}>
            <FAQList />
          </motion.div>
        </div>
      </section>


      {/* 6. CTA BANNER (Footer Pre-amble) */}
      <section className="relative overflow-hidden bg-brand-deep py-14 sm:py-20 md:py-24 lg:py-32">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] rounded-full bg-brand-primary/20 blur-[100px] sm:w-[600px] sm:h-[600px] sm:blur-[120px] lg:w-[800px] lg:h-[800px] lg:blur-[150px]" />
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 mix-blend-overlay" />
        </div>
        <div className="relative mx-auto max-w-[1280px] px-4 text-center z-10 sm:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="max-w-4xl mx-auto">
            <motion.h2 variants={fadeInUp} className="text-2xl font-bold tracking-tight text-base-white mb-4 sm:text-3xl sm:mb-5 md:text-5xl md:mb-6 lg:text-6xl">
              Ready to Upgrade Your Packaging Supply Chain?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-base text-brand-sky/80 font-light mb-6 sm:text-lg sm:mb-8 md:text-xl md:mb-10">
              Get factory-direct pricing, consistent quality, and reliable dispatch times.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-8 py-4 text-base font-semibold text-ink-900 transition-transform active:scale-[0.98] hover:scale-105 hover:bg-base-white sm:gap-3 sm:px-10 sm:py-5 sm:text-lg">
                Contact Our Sales Team <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
