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
        className="flex w-full items-center justify-between py-6 text-left focus:outline-none group"
      >
        <span className="text-xl font-semibold text-ink-900 transition-colors group-hover:text-brand-primary">{faq.question}</span>
        <div className={cn(
          "ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-base-mist transition-transform duration-300",
          isOpen ? "rotate-180 bg-brand-primary text-base-white" : "text-brand-primary group-hover:bg-brand-primary/10"
        )}>
          <ChevronDown className="h-5 w-5" />
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
            <p className="pb-6 text-lg text-ink-600 font-light leading-relaxed">
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
    <div className="relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-2xl shadow-2xl border border-base-white/10 ml-auto xl:-mr-12">
      <AnimatePresence initial={false}>
        <MotionImage
          key={currentIndex}
          src={heroImages[currentIndex]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 object-cover"
          fill
          alt="OM Polyplast Packaging Solutions"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-deep/60 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 z-20">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              idx === currentIndex ? "w-8 bg-brand-accent" : "w-2 bg-base-white/50 hover:bg-base-white"
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
      <section className="relative min-h-[90vh] flex flex-col justify-center bg-brand-deep text-base-white overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-brand-primary/30 blur-[120px]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-accent/20 blur-[100px]"
          />
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        <div className="relative mx-auto w-full max-w-[1440px] px-6 py-24 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <motion.div variants={stagger as any} initial="hidden" animate="visible" className="max-w-2xl">
              <motion.div variants={fadeInUp as any} className="mb-6 inline-flex items-center gap-2 rounded-full border border-base-white/10 bg-base-white/5 px-4 py-2 text-sm font-medium backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                </span>
                <span className="text-brand-sky">Rajkot, Gujarat — Serving Businesses Across India</span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="mb-6 text-[3rem] leading-[1.1] tracking-tight md:text-[4.5rem] lg:text-[5.5rem] font-bold text-base-white">
                Industrial Packaging <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sky to-brand-accent">
                  Engineered to Protect.
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="mb-10 text-lg md:text-xl text-brand-sky/70 font-light leading-relaxed">
                We manufacture premium BOPP tapes, stretch films, and bulk poly bags. Factory-direct pricing with uncompromising quality control.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href="/contact" className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-brand-accent px-8 py-4 text-lg font-semibold text-ink-900 transition-transform hover:scale-105 active:scale-95">
                  <span className="relative z-10">Request Bulk Quote</span>
                  <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0" />
                </Link>
                <Link href="/products/tapes" className="group inline-flex items-center justify-center gap-2 rounded-full border border-base-white/20 bg-transparent px-8 py-4 text-lg font-medium text-base-white backdrop-blur-md transition-all hover:bg-base-white/10">
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
      <section className="border-b border-border-subtle bg-base-white py-12 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4 divide-x-0 md:divide-x divide-border-subtle"
          >
            {[
              { value: stats.yearsInBusiness || '10+', label: 'Years of Excellence' },
              { value: stats.productsManufactured || '200+', label: 'SKUs Manufactured' },
              { value: stats.clientsServed || '500+', label: 'B2B Clients' },
              { value: stats.dispatchTime || '48h', label: 'Standard Dispatch' },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center text-center px-4">
                <span className="text-5xl md:text-7xl font-bold tracking-tighter text-brand-deep font-mono">
                  {stat.value}
                </span>
                <span className="mt-2 text-sm md:text-base font-medium text-ink-600 uppercase tracking-widest">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. PRODUCT RANGE (Bento Box) */}
      <section className="bg-base-mist py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="mb-16 md:flex md:items-end md:justify-between"
          >
            <div className="max-w-2xl">
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold tracking-tight text-ink-900 mb-6">
                Engineered for <br className="hidden md:block"/> Every Industry.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-ink-600 font-light">
                Our in-house manufacturing capabilities cover a broad spectrum of industrial requirements.
              </motion.p>
            </div>
            <motion.div variants={fadeInUp} className="mt-8 md:mt-0">
              <Link href="/products" className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:text-brand-deep transition-colors">
                View All Categories <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]"
          >
            {categories.slice(0, 5).map((cat: any, i: number) => {
              // Create bento layout: first item spans 2 cols, 2 rows. Others are 1x1.
              const isLarge = i === 0
              const thumb = cat.heroImage?.url
              
              return (
                <motion.div key={cat.id} variants={fadeInUp} className={cn(
                  "group relative overflow-hidden rounded-2xl bg-base-white shadow-sm border border-border-subtle transition-all hover:shadow-xl",
                  isLarge ? "md:col-span-2 md:row-span-2" : ""
                )}>
                  <Link href={`/products/${cat.slug}`} className="absolute inset-0 z-10" aria-label={`View ${cat.name} category`} />
                  
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-base-mist overflow-hidden">
                    {thumb ? (
                      <Image src={thumb} alt={cat.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full bg-brand-sky/20 flex items-center justify-center">
                         <Package className="h-24 w-24 text-brand-primary/20" />
                      </div>
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/20 to-transparent opacity-80" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end">
                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                      <h3 className={cn("font-bold text-base-white mb-2", isLarge ? "text-4xl" : "text-2xl")}>
                        {cat.name}
                      </h3>
                      <p className="text-base-white/80 line-clamp-2 mb-4 max-w-md">
                        {cat.shortDescription || 'Explore our comprehensive range of high-quality packaging materials.'}
                      </p>
                    </div>
                    {/* Hover Arrow */}
                    <div className="absolute bottom-8 right-8 opacity-0 transform translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                      <div className="bg-brand-accent text-ink-900 p-3 rounded-full">
                        <ArrowRight className="h-5 w-5" />
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
      <section className="bg-base-white py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="mb-16 text-center">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold tracking-tight text-ink-900 mb-6">
              The OM Polyplast Advantage
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Factory />, title: 'In-House Mfg', desc: 'End-to-end production control with zero middleman markup.' },
              { icon: <ShieldCheck />, title: 'Quality Assured', desc: 'Strict lab testing for adhesion, micron thickness, and tensile strength.' },
              { icon: <Anchor />, title: 'Custom Specs', desc: 'Any width, length, or micron thickness manufactured to your needs.' },
              { icon: <Truck />, title: 'Fast Dispatch', desc: 'Optimized supply chain for 48-hour dispatch on standard items.' },
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeInUp} className="group p-8 rounded-2xl bg-base-mist border border-border-subtle transition-all hover:bg-brand-deep hover:text-base-white">
                <div className="mb-6 inline-flex p-4 rounded-xl bg-base-white text-brand-primary shadow-sm transition-colors group-hover:bg-brand-accent group-hover:text-ink-900">
                  {React.cloneElement(feature.icon as React.ReactElement<any>, { className: 'h-8 w-8' })}
                </div>
                <h3 className="text-xl font-bold mb-3 text-ink-900 group-hover:text-base-white transition-colors">{feature.title}</h3>
                <p className="text-ink-600 font-light leading-relaxed group-hover:text-brand-sky/80 transition-colors">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS (Clean Grid) */}
      {featuredProducts?.length > 0 && (
        <section className="bg-base-mist py-24 md:py-32">
          <div className="mx-auto max-w-[1280px] px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="mb-16">
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold tracking-tight text-ink-900">
                Featured Selection
              </motion.h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product: any) => {
                const catSlug = typeof product.category === 'object' ? product.category.slug : 'products'
                const thumb = typeof product.images?.[0] === 'object' ? product.images[0]?.url : undefined
                
                return (
                  <motion.div key={product.id} variants={fadeInUp}>
                    <Link href={`/products/${catSlug}/${product.slug}`} className="group block">
                      <div className="relative aspect-square overflow-hidden rounded-xl bg-base-white border border-border-subtle mb-4">
                        {thumb ? (
                          <Image src={thumb} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-base-mist">
                            <Package className="h-12 w-12 text-ink-600/30" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-brand-deep/0 transition-colors duration-300 group-hover:bg-brand-deep/5" />
                      </div>
                      <h3 className="font-semibold text-lg text-ink-900 group-hover:text-brand-primary transition-colors">{product.name}</h3>
                      <p className="text-sm text-ink-600 mt-1 line-clamp-1">{product.shortDescription}</p>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* 5.5 FAQ SECTION */}
      <section className="bg-base-white py-24 md:py-32">
        <div className="mx-auto max-w-[1024px] px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger as any} className="mb-16 text-center">
            <motion.h2 variants={fadeInUp as any} className="text-3xl md:text-5xl font-bold tracking-tight text-ink-900 mb-6">
              Frequently Asked Questions
            </motion.h2>
            <motion.p variants={fadeInUp as any} className="text-lg text-ink-600 font-light max-w-2xl mx-auto">
              Everything you need to know about our packaging products and supply chain process.
            </motion.p>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger as any}>
            <FAQList />
          </motion.div>
        </div>
      </section>


      {/* 6. CTA BANNER (Footer Pre-amble) */}
      <section className="relative overflow-hidden bg-brand-deep py-24 md:py-32">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-50%] right-[-10%] w-[800px] h-[800px] rounded-full bg-brand-primary/20 blur-[150px]" />
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 mix-blend-overlay" />
        </div>
        <div className="relative mx-auto max-w-[1280px] px-6 text-center z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="max-w-4xl mx-auto">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold tracking-tight text-base-white mb-6">
              Ready to Upgrade Your Packaging Supply Chain?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-brand-sky/80 font-light mb-10">
              Get factory-direct pricing, consistent quality, and reliable dispatch times.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/contact" className="inline-flex items-center justify-center gap-3 rounded-full bg-brand-accent px-10 py-5 text-lg font-semibold text-ink-900 transition-transform hover:scale-105 hover:bg-base-white">
                Contact Our Sales Team <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
