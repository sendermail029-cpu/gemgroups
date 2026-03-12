'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const amenities = [
  { icon: '🏛️', title: 'Grand Clubhouse', desc: 'Premium community spaces for recreation, events & fitness' },
  { icon: '🏊', title: 'Swimming Pool', desc: 'Olympic-size heated pool with children\'s splash zone' },
  { icon: '🌳', title: 'Landscaped Parks', desc: 'Lush green parks, walking trails & meditation zones' },
  { icon: '🛣️', title: 'Wide Roads', desc: '30–60 ft asphalted internal roads for easy mobility' },
  { icon: '🛡️', title: '24/7 Security', desc: 'Multi-layer perimeter security with CCTV surveillance' },
  { icon: '⚡', title: 'Underground Utilities', desc: 'Underground electricity, water & drainage infrastructure' },
  { icon: '🧒', title: 'Children Play Area', desc: 'Safe & modern play equipment for children' },
  { icon: '💧', title: 'Water Supply', desc: 'Continuous overhead tank-based water supply system' },
]

export default function AmenitiesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="section-pad bg-primary-deep relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 41px),
            repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 41px)`
        }} className="w-full h-full" />
      </div>

      <div className="container-gem relative">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="section-label text-gold mb-4">World-Class Infrastructure</p>
            <h2 className="mb-6 font-heading text-3xl font-bold leading-tight text-white lg:text-4xl xl:text-5xl">
              Luxury <span className="text-gradient-gold">Amenities</span>
              <br />Await You
            </h2>
            <p className="mb-8 font-body text-base leading-relaxed text-white/70 sm:mb-10">
              Every GEM Group community is built with a comprehensive amenity package that elevates daily living
              and adds lasting value to your investment.
            </p>

            {/* Amenities grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {amenities.map((amenity, i) => (
                <motion.div
                  key={amenity.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="group flex min-h-[9.5rem] items-start gap-3 rounded-sm border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10 sm:min-h-[11rem]"
                >
                  <span className="shrink-0 text-2xl">{amenity.icon}</span>
                  <div className="min-w-0">
                    <h4 className="mb-1 font-heading text-xl font-semibold leading-snug text-white sm:text-sm">{amenity.title}</h4>
                    <p className="font-body text-sm leading-7 text-white/60 sm:text-xs sm:leading-relaxed">{amenity.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Image collage */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-56 rounded-sm overflow-hidden">
                  <Image
                    src="/images/ami3.jfif"
                    alt="Clubhouse"
                    fill className="object-cover"
                    sizes="300px"
                  />
                </div>
                <div className="relative h-36 rounded-sm overflow-hidden">
                  <Image
                    src="/images/villa.jpg"
                    alt="Pool"
                    fill className="object-cover"
                    sizes="300px"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="relative h-36 rounded-sm overflow-hidden">
                  <Image
                    src="/images/ami2.jfif"
                    alt="Park"
                    fill className="object-cover"
                    sizes="300px"
                  />
                </div>
                <div className="relative h-56 rounded-sm overflow-hidden">
                  <Image
                    src="/images/gemm.jpg"
                    alt="Roads"
                    fill className="object-cover"
                    sizes="300px"
                  />
                </div>
              </div>
            </div>

            {/* Gold accent bar */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-24 bg-gold rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
