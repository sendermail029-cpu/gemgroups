'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react'
import { getWhatsAppLink } from '@/lib/utils'

const heroSlides = [
  {
    image: '/images/home1.webp',
    eyebrow: 'Premium Plotted Communities',
    title: 'Strategic land opportunities in Hyderabad growth corridors',
  },
  {
    image: '/images/home3.webp',
    eyebrow: 'DTCP & RERA Approved',
    title: 'Secure layouts built for long-term value and buyer confidence',
  },
  {
    image: '/images/h.png',
    eyebrow: 'Book A Site Visit',
    title: 'Explore flagship communities across NH-44 and NH-65 corridors',
  },
]

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section className="relative flex min-h-[108vh] items-center overflow-hidden bg-[#050B14] lg:min-h-[102vh]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0.35, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.2, scale: 1.02 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Image
            src={heroSlides[activeSlide].image}
            alt={heroSlides[activeSlide].title}
            fill
            priority={activeSlide === 0}
            quality={72}
            sizes="100vw"
            className="object-cover object-[72%_center] sm:object-center"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(5,11,20,0.96),rgba(10,35,61,0.82),rgba(5,11,20,0.56))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.26),transparent_28%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050B14] via-[#050B14]/70 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-4 pt-32 pb-20 sm:px-6 sm:pt-36 sm:pb-24 lg:px-10 lg:pt-40 lg:pb-28 xl:px-12">
        <div className="flex w-full justify-start">
          <div className="flex w-full max-w-[35rem] flex-col items-start text-left sm:max-w-[39rem] lg:max-w-[43rem] xl:max-w-[47rem]">
            <motion.h1
              key={`heading-${activeSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-full font-heading font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-white"
            >
              <span className="block text-[2.25rem] sm:text-[3.5rem] lg:text-[5rem]">
                <span className="sm:hidden">Gem Group</span>
                <span className="hidden sm:inline">Gem Group</span>
              </span>
              <span className="mt-1 block text-[2.25rem] text-gradient-gold sm:text-[3.5rem] lg:text-[5rem]">
                Projects
              </span>
            </motion.h1>

            <motion.p
              key={`copy-${activeSlide}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-[32rem] font-body text-base leading-8 text-white sm:text-[1.02rem] [text-shadow:0_2px_18px_rgba(0,0,0,0.4)]"
            >
              DTCP and RERA approved plotted communities crafted for confident buying in Hyderabad&apos;s fast-growing corridors.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-6 flex w-full flex-wrap justify-start gap-2.5 text-left sm:gap-3"
            >
              {[
                'Shadnagar - NH-44',
                'Sadashivpet - NH-65',
                'Approved layouts',
              ].map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/12 px-3 py-2 backdrop-blur-sm sm:px-4"
                >
                  <MapPin size={12} className="text-gold" />
                  <span className="font-body text-xs text-white sm:text-sm">{label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-8 flex w-full flex-col items-start gap-3 text-left sm:flex-row sm:flex-wrap sm:gap-4"
            >
              <Link href="/projects" className="btn-gold group w-full justify-center sm:w-auto">
                Explore Projects
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={getWhatsAppLink('Hello, I would like to book a site visit with GEM Group Projects.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline group w-full justify-center sm:w-auto"
              >
                Book Site Visit
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
