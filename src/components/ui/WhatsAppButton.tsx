'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Phone } from 'lucide-react'
import { getWhatsAppLink, getProjectWhatsAppLink } from '@/lib/utils'

const quickMessages = [
  { label: 'Sree Laxmi Balaji', msg: getProjectWhatsAppLink('Sree Laxmi Balaji Township') },
  { label: 'Infiniti Counti', msg: getProjectWhatsAppLink('Infiniti Counti') },
  { label: 'Book Site Visit', msg: getWhatsAppLink('Hello, I would like to book a site visit.') },
  { label: 'General Enquiry', msg: getWhatsAppLink() },
]

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-w-[calc(100vw-1rem)] flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-2 w-[min(16rem,calc(100vw-1.5rem))] rounded-sm border border-gray-100 bg-white p-4 shadow-luxury"
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
              <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
                <MessageCircle size={14} className="text-white" />
              </div>
              <div>
                <div className="font-heading font-semibold text-xs text-dark">GEM Group</div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span className="text-xs text-mid-gray font-body">Online now</span>
                </div>
              </div>
            </div>
            <p className="font-body text-xs text-mid-gray mb-3">Hi! How can we help you today?</p>
            <div className="space-y-2">
              {quickMessages.map((m) => (
                <a
                  key={m.label}
                  href={m.msg}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full text-left px-3 py-2 bg-light-gray hover:bg-primary/10 rounded-sm text-xs font-body text-dark hover:text-primary transition-colors"
                >
                  <Phone size={10} className="text-[#25D366]" />
                  {m.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-gold transition-colors hover:bg-[#20BA5A] sm:h-14 sm:w-14"
        aria-label="WhatsApp Chat"
      >
        <motion.div
          animate={!open ? { scale: [1, 1.2, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {open ? <X size={22} /> : <MessageCircle size={22} fill="white" />}
        </motion.div>
        {/* Pulse ring */}
        {!open && (
          <motion.div
            className="absolute inset-0 rounded-full bg-[#25D366]"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </motion.button>
    </div>
  )
}
