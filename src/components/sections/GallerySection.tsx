'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

const galleryImages = [
  { src: '/images/about.png', alt: 'Aerial township view', category: 'aerial' },
  { src: '/images/a (1).jpeg', alt: 'Clubhouse', category: 'amenities' },
  { src:'/images/a (2).jpeg', alt: 'Swimming pool', category: 'amenities' },
  { src: '/images/a (3).webp', alt: 'Wide roads', category: 'infrastructure' },
  { src: '/images/a.png', alt: 'Premium plots', category: 'plots' },
  { src: '/images/a (4).jpeg', alt: 'Green landscaping', category: 'landscape' },
  { src: '/images/a (4).webp', alt: 'Entrance', category: 'infrastructure' },
  { src: '/images/gal1.png', alt: 'Parks', category: 'landscape' },
  { src: '/images/gal4.jpg', alt: 'Investment land', category: 'plots' },
 
]

const categories = ['all', 'aerial', 'amenities', 'infrastructure', 'plots', 'landscape']

export default function GallerySection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory)

  const openLightbox = (idx: number) => setLightboxIndex(idx)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => setLightboxIndex((prev) => prev !== null ? (prev - 1 + filtered.length) % filtered.length : null)
  const nextImage = () => setLightboxIndex((prev) => prev !== null ? (prev + 1) % filtered.length : null)

  return (
    <section ref={ref} className="section-pad bg-dark relative overflow-hidden">
      <div className="container-gem">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p className="section-label mb-4">Visual Tour</p>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl xl:text-5xl text-white leading-tight mb-4">
            Project <span className="text-gradient-gold">Gallery</span>
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-6" />
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-sm text-xs font-heading font-semibold uppercase tracking-widest transition-all ${
                activeCategory === cat
                  ? 'bg-gold text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3"
        >
          <AnimatePresence>
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="masonry-item break-inside-avoid group cursor-pointer relative overflow-hidden rounded-sm"
                onClick={() => openLightbox(i)}
              >
                <div className={`relative ${i % 5 === 0 ? 'aspect-square' : i % 3 === 0 ? 'aspect-video' : 'aspect-[4/3]'}`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary-deep/0 group-hover:bg-primary-deep/50 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 p-2 rounded-full"
            >
              <X size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 p-3 rounded-full"
            >
              <ChevronLeft size={24} />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-4xl h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 p-3 rounded-full"
            >
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm font-body">
              {lightboxIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
