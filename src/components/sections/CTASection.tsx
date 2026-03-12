'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Download, Phone } from 'lucide-react'
import { displayPhoneNumber, getWhatsAppLink, phoneNumber } from '@/lib/utils'

export default function CTASection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section ref={ref} className="relative overflow-hidden py-20 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-deep via-primary to-primary-deep" />
        {/* Geometric elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gold/10 rounded-full -translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full" />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255,255,255,0.1) 80px, rgba(255,255,255,0.1) 81px),
            repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(255,255,255,0.1) 80px, rgba(255,255,255,0.1) 81px)`
        }} />
      </div>

      <div className="container-gem relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-gold/30 rounded-sm px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-gold text-xs font-heading font-semibold tracking-widest uppercase">
              Limited Plots Available
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl lg:text-5xl xl:text-6xl text-white leading-tight mb-5">
            Secure Your Future
            <br />
            <span className="text-gradient-gold">Investment Today</span>
          </h2>

          <p className="font-body text-white/70 text-base lg:text-lg mb-10 leading-relaxed">
            Join hundreds of smart investors who have already secured their plots in Hyderabad&apos;s
            fastest-growing highway corridors. Don&apos;t miss this opportunity.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href={getWhatsAppLink('Hello, I would like to book a site visit with GEM Group Projects.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold group text-base px-10 py-5"
            >
              <Phone size={18} />
              Book Site Visit
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/brochures/sree-laxmi-balaji.pdf"
              download
              className="btn-outline group text-base px-10 py-5"
            >
              <Download size={18} />
              Download Brochure
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-8 text-white/50 text-xs font-body">
            {['DTCP Approved', 'RERA Compliant', 'Clear Title', 'Bank Loans Available'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-16 grid sm:grid-cols-3 gap-px bg-white/10 rounded-sm overflow-hidden"
        >
          {[
            { icon: Phone, label: 'Call Us', value: displayPhoneNumber, href: `tel:${phoneNumber}` },
            { icon: Phone, label: 'WhatsApp', value: displayPhoneNumber, href: getWhatsAppLink() },
            { icon: Phone, label: 'Email Us', value: 'info@gemgroupprojects.com', href: 'mailto:info@gemgroupprojects.com' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors p-5"
            >
              <item.icon size={16} className="text-gold shrink-0" />
              <div>
                <div className="font-body text-white/50 text-xs">{item.label}</div>
                <div className="font-heading font-semibold text-white text-sm">{item.value}</div>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
