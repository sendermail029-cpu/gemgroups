'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Clock3, Landmark, MapPin, Route } from 'lucide-react'

const locationPoints = [
  '45 mins from Financial District',
  '2 mins from Bangalore Highway (NH-44)',
  '2 km from Shadnagar Bus Station',
  'Adjacent to Shadnagar Market Yard',
  'Within Shadnagar Municipal Limits',
  'Near Regional Ring Road (RRR)',
  '12 km to Amazon Fulfillment Center',
  'Close to RGIA and upcoming metro access at Shamshabad',
]

const highlights = [
  {
    icon: Route,
    label: 'Road Access',
    value: 'Direct corridor connectivity from NH-44 and ORR catchment',
  },
  {
    icon: Clock3,
    label: 'Travel Advantage',
    value: 'Quick reach to airport, industrial belt, and Hyderabad expansion zones',
  },
  {
    icon: Landmark,
    label: 'Growth Drivers',
    value: 'Regional Ring Road, logistics, data centers, and future suburban demand',
  },
]

export default function LocationSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section ref={ref} className="bg-[#f7f4ee] py-14 sm:py-16 lg:py-24">
      <div className="container-gem">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="section-label mb-3">Project Location</p>
          <h2 className="font-heading text-3xl font-bold leading-tight text-dark sm:text-4xl lg:text-5xl">
            Shadnagar, positioned for tomorrow&apos;s growth
          </h2>
          <p className="mt-4 font-body text-sm leading-7 text-mid-gray sm:text-base">
            A more premium location story, built around connectivity, industrial momentum, and
            land appreciation potential instead of a plain list beside a map.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="rounded-[26px] bg-white p-5 shadow-card sm:p-7 lg:p-8"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MapPin size={18} />
              </div>
              <div>
                <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                  Why This Location Works
                </p>
                <h3 className="mt-1 font-heading text-2xl font-bold text-dark sm:text-3xl">
                  Connected to growth, surrounded by opportunity
                </h3>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {locationPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-light-gray/70 px-4 py-4"
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <ArrowRight size={14} />
                  </div>
                  <p className="font-body text-sm leading-6 text-dark sm:text-base">{point}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-primary/10 bg-primary-deep px-4 py-4 text-white"
                >
                  <div className="flex items-center gap-2">
                    <item.icon size={16} className="text-gold" />
                    <p className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                      {item.label}
                    </p>
                  </div>
                  <p className="mt-2 font-body text-sm leading-6 text-white/78">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="self-start rounded-[26px] bg-white p-4 shadow-card sm:p-5 lg:sticky lg:top-28"
          >
            <div className="mb-4 flex flex-col gap-3 border-b border-gray-100 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                  Shadnagar Growth Map
                </p>
                <h3 className="mt-1 font-heading text-2xl font-bold text-dark sm:text-3xl">
                  Corridor view around the project
                </h3>
              </div>
              <div className="rounded-full bg-primary/8 px-4 py-2 font-body text-xs text-primary sm:text-sm">
                Regional ring road + airport influence zone
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[20px] border border-gray-100 bg-[#faf8f3]">
              <div className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-4 py-2 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-dark shadow-sm">
                Location Overview
              </div>
              <div className="relative px-3 pb-3 pt-16 sm:px-4 sm:pb-4 sm:pt-20">
                <Image
                  src="/images/location.webp"
                  alt="Project location map"
                  width={1800}
                  height={1200}
                  className="h-auto w-full rounded-[14px] object-contain"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
