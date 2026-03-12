'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const reasons = [
  {
    number: '01',
    icon: '✅',
    title: 'DTCP Approved',
    desc: 'All GEM Group developments carry DTCP (Directorate of Town & Country Planning) approval — ensuring legal compliance and safe investment.',
    color: 'bg-blue-50 border-blue-100',
    accent: 'text-primary',
  },
  {
    number: '02',
    icon: '📋',
    title: 'RERA Compliant',
    desc: 'Fully registered under Telangana RERA for complete buyer protection, transparent pricing, and timely delivery.',
    color: 'bg-amber-50 border-amber-100',
    accent: 'text-gold',
  },
  {
    number: '03',
    icon: '📍',
    title: 'Prime Locations',
    desc: 'Every project is strategically located along high-growth highway corridors with proven appreciation track records.',
    color: 'bg-emerald-50 border-emerald-100',
    accent: 'text-emerald-600',
  },
  {
    number: '04',
    icon: '🛣️',
    title: 'Highway Connectivity',
    desc: 'Direct access to NH-44 & NH-65 national highways, ORR, and proposed Regional Ring Road.',
    color: 'bg-purple-50 border-purple-100',
    accent: 'text-purple-600',
  },
  {
    number: '05',
    icon: '🏦',
    title: 'Bank Loan Facility',
    desc: 'Tie-ups with leading nationalized and private banks to make your investment financially accessible.',
    color: 'bg-sky-50 border-sky-100',
    accent: 'text-sky-600',
  },
  {
    number: '06',
    icon: '📈',
    title: 'High Appreciation',
    desc: '15–25% year-on-year capital appreciation witnessed in all our project corridors over the past 5 years.',
    color: 'bg-rose-50 border-rose-100',
    accent: 'text-rose-600',
  },
]

export default function WhyInvestSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="section-pad bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full -translate-x-48 translate-y-48" />

      <div className="container-gem relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-14"
        >
          <p className="section-label mb-4">Why Choose GEM</p>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl xl:text-5xl text-dark leading-tight mb-4 gold-line">
            Why Invest With <span className="text-primary">GEM Group?</span>
          </h2>
          <p className="font-body text-mid-gray text-base leading-relaxed">
            Every project delivers on six foundational promises that protect and grow your investment.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group relative p-7 rounded-sm border ${reason.color} hover:-translate-y-2 transition-all duration-400 hover:shadow-card-hover`}
            >
              {/* Number watermark */}
              <div className="absolute top-4 right-5 font-heading font-black text-5xl text-gray-100 select-none">
                {reason.number}
              </div>

              {/* Icon */}
              <div className="text-3xl mb-5">{reason.icon}</div>

              {/* Title */}
              <h3 className={`font-heading font-bold text-lg text-dark mb-3 group-hover:${reason.accent} transition-colors`}>
                {reason.title}
              </h3>

              {/* Desc */}
              <p className="font-body text-sm text-mid-gray leading-relaxed">{reason.desc}</p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
