import type { Metadata } from 'next'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { isVercelRuntime, readLeads } from '@/lib/leads'

export const metadata: Metadata = {
  title: 'Admin Leads | GEM Group Projects',
  description: 'View captured leads from forms submitted on the website.',
}

function getProjectLabel(project: string | null | undefined) {
  if (!project) return 'Not selected'
  return project
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function IntegrationCard({
  label,
  active,
}: {
  label: string
  active: boolean
}) {
  return (
    <div
      className={`rounded-2xl border px-4 py-4 ${
        active
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-amber-200 bg-amber-50 text-amber-700'
      }`}
    >
      <p className="font-heading text-xs font-semibold uppercase tracking-[0.18em]">{label}</p>
      <p className="mt-2 font-body text-sm">{active ? 'Connected' : 'Not configured'}</p>
    </div>
  )
}

export default async function AdminLeadsPage() {
  const vercelRuntime = isVercelRuntime()
  const leads = await readLeads()
  const integrations = {
    email: Boolean(process.env.LEADS_EMAIL_WEBHOOK_URL),
    whatsapp: Boolean(process.env.LEADS_WHATSAPP_WEBHOOK_URL),
    googleSheets: Boolean(process.env.LEADS_GOOGLE_SHEETS_WEBHOOK_URL),
  }
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
              {vercelRuntime
                ? 'Production uses external lead delivery. This page is only a lightweight snapshot and should not be treated as the permanent source of truth.'
                : 'Review leads captured from the website forms. Local saving works even if email, WhatsApp, or Google Sheets are not configured yet.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:w-[22rem]">
            <div className="rounded-[22px] border border-[#eadfca] bg-white px-5 py-5">
              <div className="font-heading text-3xl font-extrabold text-primary-deep">
                {leads.length}
              </div>
              <div className="mt-2 font-body text-xs uppercase tracking-[0.18em] text-slate-500">
                Total leads
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
                {vercelRuntime
                  ? 'Use Google Sheets as the permanent lead register in production.'
                  : 'Google Sheets only receives new leads after server restart and only if the Apps Script webhook deployment is working correctly.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-full bg-primary/8 px-4 py-2 text-sm font-body text-primary-deep">
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
            <IntegrationCard label="Email" active={integrations.email} />
            <IntegrationCard label="WhatsApp" active={integrations.whatsapp} />
            <IntegrationCard label="Google Sheets" active={integrations.googleSheets} />
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[28px] border border-[#eadfca] bg-white shadow-card">
          {leads.length === 0 ? (
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
                      <div className="font-body text-sm leading-6 text-dark">
                        {getProjectLabel(lead.project)}
                      </div>
                      <div className="font-body break-words text-sm leading-6 text-dark">
                        {lead.source || 'website'}
                      </div>
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
