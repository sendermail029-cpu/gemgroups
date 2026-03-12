'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const metrics = [
  {
    value: '46+',
    label: 'Acres',
    detail: 'Master-planned plotted community footprint',
  },
  {
    value: '578+',
    label: 'Plots',
    detail: 'Well-laid investment-ready plot inventory',
  },
  {
    value: '2',
    label: 'Projects',
    detail: 'Flagship developments across NH-44 and NH-65',
  },
]

export default function HeroMetricsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section ref={ref} className="bg-[#f6f7f9] py-8 sm:py-10">
      <div className="container-gem">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid gap-4 md:grid-cols-3"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="rounded-[28px] border border-slate-200 bg-white px-5 py-6 text-left shadow-[0_18px_40px_rgba(15,23,42,0.06)] sm:px-6"
            >
              <div className="text-[2.3rem] font-heading font-extrabold leading-none tracking-[-0.04em] text-[#0b3155] sm:text-[2.75rem]">
                {metric.value}
              </div>
              <div className="mt-2 text-sm font-heading font-bold uppercase tracking-[0.22em] text-gold">
                {metric.label}
              </div>
              <p className="mt-3 max-w-xs font-body text-sm leading-6 text-slate-600">
                {metric.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
