'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AlertCircle, CheckCircle2, Mail, MessageCircle, TableProperties } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Lead } from '@/types'

interface LeadsDashboardProps {
  leads: Lead[]
  integrations: {
    email: boolean
    whatsapp: boolean
    googleSheets: boolean
  }
  vercelRuntime: boolean
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

export default function LeadsDashboard({
  leads,
  integrations,
  vercelRuntime,
}: LeadsDashboardProps) {
  const [dateFilter, setDateFilter] = useState<'all' | 'last7' | 'month' | 'custom'>('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const now = new Date()
  const filteredLeads = leads.filter((lead) => {
    if (!lead.createdAt || dateFilter === 'all') {
      return true
    }

    const createdAt = new Date(lead.createdAt)
    if (Number.isNaN(createdAt.getTime())) {
      return false
    }

    if (dateFilter === 'last7') {
      const sevenDaysAgo = new Date(now)
      sevenDaysAgo.setDate(now.getDate() - 7)
      sevenDaysAgo.setHours(0, 0, 0, 0)
      return createdAt >= sevenDaysAgo
    }

    if (dateFilter === 'month') {
      return (
        createdAt.getFullYear() === now.getFullYear() &&
        createdAt.getMonth() === now.getMonth()
      )
    }

    if (dateFilter === 'custom') {
      const start = startDate ? new Date(`${startDate}T00:00:00`) : null
      const end = endDate ? new Date(`${endDate}T23:59:59.999`) : null

      if (start && createdAt < start) {
        return false
      }

      if (end && createdAt > end) {
        return false
      }
    }

    return true
  })

  const total = filteredLeads.length
  const newCount = filteredLeads.filter((lead) => lead.status === 'new').length
  const totalLeads = leads.length
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
              {vercelRuntime
                ? 'Production uses external lead delivery. This page is a working snapshot filtered from the current lead source.'
                : 'Review leads captured from the website forms. Local saving works even if email, WhatsApp, or Google Sheets are not configured yet.'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:w-[22rem]">
            <div className="rounded-[22px] border border-[#eadfca] bg-white px-5 py-5">
              <div className="font-heading text-3xl font-extrabold text-primary-deep">{total}</div>
              <div className="mt-2 font-body text-xs uppercase tracking-[0.18em] text-slate-500">
                Filtered leads
              </div>
            </div>
            <div className="rounded-[22px] border border-[#eadfca] bg-white px-5 py-5">
              <div className="font-heading text-3xl font-extrabold text-gold">{newCount}</div>
              <div className="mt-2 font-body text-xs uppercase tracking-[0.18em] text-slate-500">
                New status
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[28px] border border-[#eadfca] bg-white p-6 shadow-card sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold text-dark">Integrations</h2>
              <p className="mt-2 font-body text-sm leading-6 text-mid-gray">
                Configured channels: {configuredCount} of 3.{' '}
                {vercelRuntime
                  ? 'On Vercel, a form succeeds only when at least one configured delivery channel accepts the lead.'
                  : 'If any are not configured, leads still save in this dashboard and in the local JSON file.'}
              </p>
              <p className="mt-2 font-body text-sm leading-6 text-mid-gray">
                Showing {total} of {totalLeads} leads.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-4 py-2 text-sm font-body text-primary-deep">
                <CheckCircle2 size={16} />
                {vercelRuntime ? 'External delivery mode active' : 'Local lead storage active'}
              </div>
              <Link
                href="/api/leads/export"
                className="inline-flex items-center justify-center rounded-full bg-gold px-5 py-2.5 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90"
              >
                Download Leads CSV
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <IntegrationBadge label="Email" active={integrations.email} icon={Mail} />
            <IntegrationBadge label="WhatsApp" active={integrations.whatsapp} icon={MessageCircle} />
            <IntegrationBadge label="Google Sheets" active={integrations.googleSheets} icon={TableProperties} />
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[28px] border border-[#eadfca] bg-white shadow-card">
          <div className="border-b border-[#f0e7d7] bg-[#fcfaf6] px-6 py-5 sm:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="font-heading text-xl font-bold text-dark">Date filters</h2>
                <p className="mt-1 font-body text-sm text-mid-gray">
                  Filter leads by recent activity or a custom date range.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Leads' },
                  { id: 'last7', label: 'Last 7 Days' },
                  { id: 'month', label: 'This Month' },
                  { id: 'custom', label: 'Custom Range' },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setDateFilter(filter.id as 'all' | 'last7' | 'month' | 'custom')}
                    className={`rounded-full px-4 py-2 text-sm font-heading font-semibold uppercase tracking-[0.12em] transition-colors ${
                      dateFilter === filter.id
                        ? 'bg-primary text-white'
                        : 'bg-white text-primary-deep ring-1 ring-[#eadfca] hover:bg-primary/5'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {dateFilter === 'custom' ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:max-w-xl">
                <label className="font-body text-sm text-dark">
                  <span className="mb-2 block">Start date</span>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    className="w-full rounded-2xl border border-[#eadfca] bg-white px-4 py-3 text-sm text-dark outline-none transition-colors focus:border-primary"
                  />
                </label>
                <label className="font-body text-sm text-dark">
                  <span className="mb-2 block">End date</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                    className="w-full rounded-2xl border border-[#eadfca] bg-white px-4 py-3 text-sm text-dark outline-none transition-colors focus:border-primary"
                  />
                </label>
              </div>
            ) : null}
          </div>

          {leads.length === 0 ? (
            <div className="px-6 py-12 text-center sm:px-8">
              <h2 className="font-heading text-xl font-bold text-dark">No leads yet</h2>
              <p className="mt-2 font-body text-sm text-mid-gray">
                Submit a form on the website and it will appear here.
              </p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="px-6 py-12 text-center sm:px-8">
              <AlertCircle size={36} className="mx-auto text-amber-500" />
              <h2 className="mt-4 font-heading text-xl font-bold text-dark">No leads in this range</h2>
              <p className="mt-2 font-body text-sm text-mid-gray">
                Try a different filter or widen the custom date range.
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
                {filteredLeads.map((lead) => (
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
