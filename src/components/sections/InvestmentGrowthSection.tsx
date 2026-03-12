'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TrendingUp, ArrowRight } from 'lucide-react'

const growthData = [
  { year: '2019', value: 35, label: '₹8,000/sqyd' },
  { year: '2020', value: 42, label: '₹9,500/sqyd' },
  { year: '2021', value: 54, label: '₹12,500/sqyd' },
  { year: '2022', value: 68, label: '₹15,800/sqyd' },
  { year: '2023', value: 80, label: '₹18,500/sqyd' },
  { year: '2024', value: 95, label: '₹22,000/sqyd' },
]

const corridors = [
  { name: 'NH-44 Corridor (Shadnagar)', appreciation: '+185%', period: '5 Years', color: 'bg-primary' },
  { name: 'NH-65 Corridor (Sadashivpet)', appreciation: '+210%', period: '5 Years', color: 'bg-gold' },
  { name: 'ORR Micro-Markets (Avg)', appreciation: '+165%', period: '5 Years', color: 'bg-emerald-500' },
]

export default function InvestmentGrowthSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="section-pad bg-light-gray relative overflow-hidden">
      <div className="container-gem">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="section-label mb-4">Investment Performance</p>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl xl:text-5xl text-dark leading-tight mb-4">
            Your Land, <span className="text-primary">Growing Wealth</span>
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-5" />
          <p className="font-body text-mid-gray text-base max-w-xl mx-auto">
            GEM Group project locations have consistently delivered among the highest land appreciation
            rates in the Hyderabad region.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="overflow-hidden rounded-sm bg-white p-5 shadow-card sm:p-8"
          >
            <div className="mb-5 flex items-start gap-2 sm:mb-6 sm:items-center">
              <TrendingUp size={18} className="mt-0.5 shrink-0 text-primary sm:mt-0" />
              <span className="font-heading text-base font-semibold leading-snug text-dark sm:text-sm">
                NH-44 Corridor Land Price Growth
              </span>
            </div>

            {/* Mobile chart */}
            <div className="sm:hidden">
              <div className="-mx-1 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex min-w-[31rem] items-end gap-3 px-1">
                  {growthData.map((d, i) => (
                    <div key={d.year} className="flex min-w-[4.6rem] flex-1 flex-col items-center gap-2">
                      <div className="rounded-md bg-dark px-2 py-1 text-[11px] font-heading font-semibold text-white">
                        {d.label}
                      </div>
                      <div className="flex h-32 w-full items-end">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={inView ? { height: `${d.value}%` } : { height: 0 }}
                          transition={{ duration: 0.8, delay: 0.4 + i * 0.08, ease: 'easeOut' }}
                          className="w-full rounded-sm"
                          style={{
                            background: i === growthData.length - 1
                              ? 'linear-gradient(180deg, #C9A227, #E4B84A)'
                              : 'linear-gradient(180deg, #1F6FB2, #144A7A)',
                          }}
                        />
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${d.value}%`,
                            background: i === growthData.length - 1 ? '#C9A227' : '#1F6FB2',
                          }}
                        />
                      </div>
                      <span className="font-body text-xs text-mid-gray">{d.year}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-2 font-body text-[11px] text-mid-gray">Swipe the chart to view all years.</p>
            </div>

            {/* Desktop / tablet chart */}
            <div className="hidden items-end gap-4 sm:flex">
              {growthData.map((d, i) => (
                <div key={d.year} className="flex flex-1 flex-col items-center gap-2">
                  <div className="font-heading text-xs font-bold text-primary opacity-0 group-hover:opacity-100">
                    {d.label}
                  </div>
                  <div className="flex h-36 w-full items-end">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={inView ? { height: `${d.value}%` } : { height: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
                      className="group relative w-full cursor-pointer rounded-sm"
                      style={{
                        background: i === growthData.length - 1
                          ? 'linear-gradient(180deg, #C9A227, #E4B84A)'
                          : 'linear-gradient(180deg, #1F6FB2, #144A7A)',
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-dark px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 sm:block">
                        {d.label}
                      </div>
                    </motion.div>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${d.value}%`,
                        background: i === growthData.length - 1 ? '#C9A227' : '#1F6FB2',
                      }}
                    />
                  </div>
                  <span className="font-body text-xs text-mid-gray">{d.year}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-body text-xs leading-relaxed text-mid-gray">Source: Market Research Data</span>
              <div className="flex items-center gap-1.5 text-emerald-600">
                <TrendingUp size={12} />
                <span className="font-heading font-semibold text-xs">+185% in 5 years</span>
              </div>
            </div>
          </motion.div>

          {/* Corridors + Stats */}
            <div className="space-y-5 sm:space-y-6">
            {/* Big stat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative overflow-hidden rounded-sm bg-primary p-5 text-white sm:p-8"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-16 -translate-y-16" />
              <div className="relative">
                <div className="mb-2 font-heading text-5xl font-black leading-none text-gold sm:text-6xl">3X</div>
                <div className="mb-2 font-heading text-base font-semibold text-white sm:text-lg">Average Return in 5 Years</div>
                <p className="font-body text-sm leading-6 text-white/70">
                  Investors who purchased plots in GEM Group corridors in 2019 have seen 3X growth in land value by 2024.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <ArrowRight size={14} className="text-gold" />
                  <span className="text-gold text-xs font-semibold">Early-mover plots still available</span>
                </div>
              </div>
            </motion.div>

            {/* Corridors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="rounded-sm bg-white p-5 shadow-card sm:p-6"
            >
              <h4 className="mb-5 font-heading text-lg font-semibold text-dark sm:text-sm">Appreciation by Corridor</h4>
              <div className="space-y-5 sm:space-y-4">
                {corridors.map((c, i) => (
                  <div key={c.name}>
                    <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-body text-base leading-snug text-dark sm:text-sm">{c.name}</span>
                      <span className="font-heading text-sm font-bold text-emerald-600">{c.appreciation}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${[75, 90, 65][i]}%` } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                        className={`h-full ${c.color} rounded-full`}
                      />
                    </div>
                    <div className="mt-1 text-sm text-mid-gray sm:text-xs">{c.period}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
