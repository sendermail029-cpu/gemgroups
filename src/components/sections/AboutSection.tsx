'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { Award, TrendingUp, Shield, ArrowRight } from 'lucide-react'

const pillars = [
  {
    icon: Award,
    title: 'Trusted Developer',
    desc: 'Years of delivering premium plotted communities with complete legal compliance.',
  },
  {
    icon: TrendingUp,
    title: 'High Growth Corridors',
    desc: 'Strategically located along NH-44 & NH-65 — Hyderabad\'s fastest appreciating zones.',
  },
  {
    icon: Shield,
    title: 'Secured Investment',
    desc: 'Every project is DTCP & RERA approved with clear titles and transparent documentation.',
  },
]

export default function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section ref={ref} className="section-pad bg-white overflow-hidden">
      <div className="container-gem">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="section-label mb-4">About GEM Group</p>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl xl:text-5xl text-dark leading-tight mb-6 gold-line">
              Building Tomorrow&apos;s
              <br />
              <span className="text-primary">Wealth Corridors</span>
            </h2>
            <p className="font-body text-mid-gray text-base leading-relaxed mb-6">
              GEM Group Projects has established itself as one of Hyderabad&apos;s most trusted names in plotted
              real estate development. With a firm commitment to transparency, quality, and investor
              protection, we deliver DTCP & RERA approved communities that generate consistent long-term appreciation.
            </p>
            <p className="font-body text-mid-gray text-base leading-relaxed mb-8">
              Our developments are strategically located along Hyderabad&apos;s high-growth highway corridors —
              NH-44 and NH-65 — where infrastructure investment and industrial expansion are driving
              unprecedented land value appreciation.
            </p>

            {/* Pillars */}
            <div className="space-y-5 mb-10">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center shrink-0">
                    <p.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-sm text-dark mb-1">{p.title}</h4>
                    <p className="font-body text-xs text-mid-gray leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/about" className="btn-outline-dark group">
              Learn About GEM
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right: Images */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main image */}
              <div className="relative h-80 lg:h-[480px] rounded-sm overflow-hidden shadow-luxury">
                <Image
                  src="/images/about.webp"
                  alt="GEM Group Township"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/30 to-transparent" />
              </div>

              {/* Accent image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-8 -left-8 w-44 h-44 lg:w-56 lg:h-56 rounded-sm overflow-hidden shadow-luxury border-4 border-white"
              >
                <Image
                  src="/images/ami3.png"
                  alt="Community Amenities"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </motion.div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -top-4 -right-4 bg-gold rounded-sm p-4 shadow-gold text-white text-center"
              >
                <div className="font-heading font-black text-2xl leading-none">15+</div>
                <div className="font-body text-xs mt-1 opacity-90">Years of<br />Excellence</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
