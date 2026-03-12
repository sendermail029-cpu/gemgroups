'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, CheckCircle2, Mail, MessageCircle, TableProperties } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Lead } from '@/types'

interface LeadsDashboardProps {
  integrations: {
    email: boolean
    whatsapp: boolean
    googleSheets: boolean
  }
}

interface LeadsResponse {
  leads: Lead[]
  total: number
}

function getProjectLabel(project: string | null | undefined) {
  if (!project) return 'Not selected'
  return project
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function IntegrationBadge({
  label,
  active,
  icon: Icon,
}: {
  label: string
  active: boolean
  icon: typeof Mail
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${
        active
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-amber-200 bg-amber-50 text-amber-700'
      }`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full ${
          active ? 'bg-emerald-100' : 'bg-amber-100'
        }`}
      >
        <Icon size={18} />
      </div>
      <div>
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.18em]">
          {label}
        </p>
        <p className="mt-1 font-body text-sm">
          {active ? 'Connected' : 'Not configured'}
        </p>
      </div>
    </div>
  )
}

export default function LeadsDashboard({ integrations }: LeadsDashboardProps) {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadLeads() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch('/api/leads', { cache: 'no-store' })
        const result: LeadsResponse = await response.json()

        if (!response.ok) {
          throw new Error('Unable to load leads right now.')
        }

        if (active) {
          setLeads(Array.isArray(result.leads) ? result.leads : [])
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Unable to load leads right now.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadLeads()

    return () => {
      active = false
    }
  }, [])

  const total = leads.length
  const newCount = leads.filter((lead) => lead.status === 'new').length
  const configuredCount = Object.values(integrations).filter(Boolean).length

  return (
    <section className="min-h-screen bg-[#f7f4ed] pt-28 pb-14 lg:pt-32 lg:pb-20">
      <div className="container-gem">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-label mb-3">Lead Dashboard</p>
            <h1 className="font-display text-3xl leading-tight text-dark sm:text-4xl lg:text-5xl">
              Website enquiries
            </h1>
            <p className="mt-3 max-w-2xl font-body text-sm leading-7 text-mid-gray sm:text-base">
              Review leads captured from the website forms. Local lead saving works even if email,
              WhatsApp, or Google Sheets integrations are not configured.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:w-[22rem]">
            <div className="rounded-[22px] border border-[#eadfca] bg-white px-5 py-5">
              <div className="font-heading text-3xl font-extrabold text-primary-deep">{loading ? '-' : total}</div>
              <div className="mt-2 font-body text-xs uppercase tracking-[0.18em] text-slate-500">Total leads</div>
            </div>
            <div className="rounded-[22px] border border-[#eadfca] bg-white px-5 py-5">
              <div className="font-heading text-3xl font-extrabold text-gold">{loading ? '-' : newCount}</div>
              <div className="mt-2 font-body text-xs uppercase tracking-[0.18em] text-slate-500">New status</div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[28px] border border-[#eadfca] bg-white p-6 shadow-card sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold text-dark">Integrations</h2>
              <p className="mt-2 font-body text-sm leading-6 text-mid-gray">
                Configured channels: {configuredCount} of 3. If all are not configured, leads still save in this dashboard and in the local JSON file.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-4 py-2 text-sm font-body text-primary-deep">
              <CheckCircle2 size={16} />
              Local lead storage active
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <IntegrationBadge label="Email" active={integrations.email} icon={Mail} />
            <IntegrationBadge label="WhatsApp" active={integrations.whatsapp} icon={MessageCircle} />
            <IntegrationBadge label="Google Sheets" active={integrations.googleSheets} icon={TableProperties} />
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[28px] border border-[#eadfca] bg-white shadow-card">
          {loading ? (
            <div className="px-6 py-12 text-center sm:px-8">
              <p className="font-body text-sm text-mid-gray">Loading leads...</p>
            </div>
          ) : error ? (
            <div className="px-6 py-12 text-center sm:px-8">
              <AlertCircle size={36} className="mx-auto text-red-500" />
              <h2 className="mt-4 font-heading text-xl font-bold text-dark">Unable to load leads</h2>
              <p className="mt-2 font-body text-sm text-mid-gray">{error}</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="px-6 py-12 text-center sm:px-8">
              <h2 className="font-heading text-xl font-bold text-dark">No leads yet</h2>
              <p className="mt-2 font-body text-sm text-mid-gray">
                Submit a form on the website and it will appear here.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden grid-cols-[1.1fr_1fr_1fr_0.8fr_0.8fr_0.9fr] gap-4 border-b border-[#f0e7d7] bg-[#fcfaf6] px-6 py-4 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-slate-500 lg:grid">
                <div>Name</div>
                <div>Contact</div>
                <div>Project</div>
                <div>Source</div>
                <div>Status</div>
                <div>Created</div>
              </div>
              <div className="divide-y divide-[#f0e7d7]">
                {leads.map((lead) => (
                  <div key={lead.id || `${lead.phone}-${lead.createdAt || 'lead'}`} className="px-6 py-5 sm:px-8">
                    <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr_1fr_0.8fr_0.8fr_0.9fr] lg:items-start lg:gap-4">
                      <div>
                        <div className="font-heading text-lg font-bold text-dark">{lead.name}</div>
                        {lead.message ? (
                          <p className="mt-2 font-body text-sm leading-6 text-mid-gray">{lead.message}</p>
                        ) : null}
                      </div>
                      <div className="font-body text-sm leading-6 text-dark">
                        <div>{lead.phone}</div>
                        {lead.email ? <div className="text-mid-gray">{lead.email}</div> : null}
                        {lead.plotSize ? <div className="text-mid-gray">Plot: {lead.plotSize}</div> : null}
                      </div>
                      <div className="font-body text-sm leading-6 text-dark">{getProjectLabel(lead.project)}</div>
                      <div className="font-body break-words text-sm leading-6 text-dark">{lead.source || 'website'}</div>
                      <div>
                        <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-heading font-semibold uppercase tracking-[0.14em] text-primary">
                          {lead.status || 'new'}
                        </span>
                      </div>
                      <div className="font-body text-sm leading-6 text-dark">
                        {lead.createdAt ? formatDate(lead.createdAt) : '-'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
