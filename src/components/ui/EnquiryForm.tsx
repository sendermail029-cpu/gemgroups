'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Phone,
  Mail,
  Home,
  MessageSquare,
  Send,
  CheckCircle,
  ChevronDown,
} from 'lucide-react'
import { projects } from '@/data/projects'

interface EnquiryFormProps {
  defaultProject?: string
  compact?: boolean
}

export default function EnquiryForm({ defaultProject = '', compact = false }: EnquiryFormProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    project: defaultProject,
    plotSize: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successNote, setSuccessNote] = useState('')

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
          source: compact ? 'compact-enquiry-form' : 'enquiry-form',
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit enquiry')
      }

      if (result.warning) {
        setSuccessNote(result.warning)
      }
      setSubmitted(true)
    } catch (err) {
      console.error('Enquiry submit failed:', err)
      setError(err instanceof Error ? err.message : 'Unable to submit right now. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-sm bg-white p-8 text-center"
      >
        <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
        <h3 className="font-heading text-xl font-bold text-dark mb-2">Enquiry Received!</h3>
        <p className="font-body text-sm text-mid-gray">
          Thank you for your interest. Our team will contact you within 2 hours.
        </p>
        {successNote ? (
          <p className="mt-3 font-body text-xs leading-6 text-amber-600">{successNote}</p>
        ) : null}
      </motion.div>
    )
  }

  const labelClassName =
    'mb-2 flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.18em] text-mid-gray'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className={labelClassName}>
            <User size={14} />
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-luxury h-12 px-4 placeholder:text-mid-gray/75 sm:h-14"
          />
        </div>
        <div>
          <label className={labelClassName}>
            <Phone size={14} />
            Mobile Number
          </label>
          <input
            type="tel"
            placeholder="Enter your mobile number"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="input-luxury h-12 px-4 placeholder:text-mid-gray/75 sm:h-14"
          />
        </div>
      </div>

      {!compact && (
        <div>
          <label className={labelClassName}>
            <Mail size={14} />
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-luxury h-12 px-4 placeholder:text-mid-gray/75 sm:h-14"
          />
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="relative">
          <label className={labelClassName}>
            <Home size={14} />
            Select Project
          </label>
          <div className="pointer-events-none absolute bottom-0 right-0 flex h-12 items-center pr-4 sm:h-14">
            <ChevronDown size={16} className="text-mid-gray/70" />
          </div>
          <select
            value={form.project}
            onChange={(e) => setForm({ ...form, project: e.target.value })}
            className="input-luxury h-12 appearance-none px-4 pr-10 text-mid-gray sm:h-14"
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p.id} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="relative">
          <label className={labelClassName}>Plot Size Preference</label>
          <div className="pointer-events-none absolute bottom-0 right-0 flex h-12 items-center pr-4 sm:h-14">
            <ChevronDown size={16} className="text-mid-gray/70" />
          </div>
          <select
            value={form.plotSize}
            onChange={(e) => setForm({ ...form, plotSize: e.target.value })}
            className="input-luxury h-12 appearance-none px-4 pr-10 text-mid-gray sm:h-14"
          >
            <option value="">Plot Size Preference</option>
            <option value="165-200">165-200 Sq Yards</option>
            <option value="200-300">200-300 Sq Yards</option>
            <option value="300-440">300-440 Sq Yards</option>
            <option value="440+">440+ Sq Yards</option>
          </select>
        </div>
      </div>

      {!compact && (
        <div>
          <label className={labelClassName}>
            <MessageSquare size={14} />
            Message
          </label>
          <textarea
            placeholder="Your Message (optional)"
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="input-luxury min-h-[120px] resize-none px-4 py-3 placeholder:text-mid-gray/75 sm:min-h-[132px]"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-gold w-full justify-center py-5 text-base disabled:opacity-60"
      >
        {loading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        ) : (
          <>
            <Send size={15} />
            {compact ? 'Send Enquiry' : 'Submit Enquiry & Book Site Visit'}
          </>
        )}
      </button>

      <p className="text-center font-body text-xs text-mid-gray">
        Your information is secure. We respect your privacy.
      </p>

      {error ? (
        <p className="text-center font-body text-xs text-red-500">
          {error}
        </p>
      ) : null}
    </form>
  )
}
