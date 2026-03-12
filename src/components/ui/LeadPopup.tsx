'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, User, Home } from 'lucide-react'
import { projects } from '@/data/projects'

export default function LeadPopup() {
  const [show, setShow] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successNote, setSuccessNote] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', project: '' })

  useEffect(() => {
    const dismissed = sessionStorage.getItem('gem-popup-dismissed')
    if (!dismissed) {
      const timer = setTimeout(() => setShow(true), 8000)
      return () => clearTimeout(timer)
    }
  }, [])

  const dismiss = () => {
    setShow(false)
    sessionStorage.setItem('gem-popup-dismissed', '1')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccessNote('')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          source: 'lead-popup',
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit lead')
      }

      if (result.warning) {
        setSuccessNote(result.warning)
      }
      setSubmitted(true)
      setTimeout(dismiss, 3000)
    } catch (err) {
      console.error('Lead submit failed:', err)
      setError(err instanceof Error ? err.message : 'Unable to submit right now. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          onClick={dismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-white rounded-sm shadow-luxury max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-deep to-primary p-6 relative">
              <button onClick={dismiss} className="absolute top-4 right-4 text-white/60 hover:text-white">
                <X size={20} />
              </button>
              <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 rounded-sm px-3 py-1 mb-3">
                <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
                <span className="text-gold text-xs font-heading font-semibold tracking-widest uppercase">Limited Offer</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-1">Get Exclusive Project Details</h3>
              <p className="font-body text-white/60 text-sm">
                Book a free site visit and get special launch pricing
              </p>
            </div>

            {/* Form */}
            <div className="p-6">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-6"
                >
                  <div className="text-4xl mb-3">🎉</div>
                  <h4 className="font-heading font-bold text-lg text-dark mb-2">Thank You!</h4>
                  <p className="font-body text-sm text-mid-gray">Our team will contact you within 24 hours.</p>
                  {successNote ? (
                    <p className="mt-3 font-body text-xs leading-6 text-amber-600">{successNote}</p>
                  ) : null}
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <User
                      size={15}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mid-gray"
                    />
                    <input
                      type="text"
                      placeholder="Your Full Name *"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input-luxury"
                      style={{ paddingLeft: '3rem' }}
                    />
                  </div>
                  <div className="relative">
                    <Phone
                      size={15}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mid-gray"
                    />
                    <input
                      type="tel"
                      placeholder="Mobile Number *"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="input-luxury"
                      style={{ paddingLeft: '3rem' }}
                    />
                  </div>
                  <div className="relative">
                    <Home
                      size={15}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mid-gray"
                    />
                    <select
                      value={form.project}
                      onChange={(e) => setForm({ ...form, project: e.target.value })}
                      className="input-luxury appearance-none"
                      style={{ paddingLeft: '3rem' }}
                    >
                      <option value="">Interested Project</option>
                      {projects.map((p) => (
                        <option key={p.id} value={p.slug}>{p.name}</option>
                      ))}
                      <option value="any">Any / Not Sure</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold w-full justify-center py-4 text-sm disabled:opacity-60"
                  >
                    {loading ? 'Submitting...' : 'Book Free Site Visit'}
                  </button>
                  {error ? (
                    <p className="text-center font-body text-xs text-red-500">
                      {error}
                    </p>
                  ) : null}
                  <p className="text-xs text-mid-gray text-center font-body">
                    By submitting, you agree to be contacted by GEM Group Projects.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
