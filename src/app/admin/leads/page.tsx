import type { Metadata } from 'next'
import LeadsDashboard from '@/components/admin/LeadsDashboard'
import { isVercelRuntime, readLeads } from '@/lib/leads'

export const metadata: Metadata = {
  title: 'Admin Leads | GEM Group Projects',
  description: 'View captured leads from forms submitted on the website.',
}

export default async function AdminLeadsPage() {
  const vercelRuntime = isVercelRuntime()
  const leads = await readLeads()
  const integrations = {
    email: Boolean(process.env.LEADS_EMAIL_WEBHOOK_URL),
    whatsapp: Boolean(process.env.LEADS_WHATSAPP_WEBHOOK_URL),
    googleSheets: Boolean(process.env.LEADS_GOOGLE_SHEETS_WEBHOOK_URL),
  }
  return <LeadsDashboard leads={leads} integrations={integrations} vercelRuntime={vercelRuntime} />
}
