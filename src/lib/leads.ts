import { mkdir, readFile, writeFile } from 'fs/promises'
import { dirname, join } from 'path'
import type { Lead } from '@/types'

export interface LeadInput {
  name: string
  phone: string
  email?: string
  project?: string
  plotSize?: string
  message?: string
  source?: string
}

export interface DeliveryResult {
  channel: 'email' | 'whatsapp' | 'google-sheets'
  ok: boolean
  detail: string
}

export interface CreateLeadResult {
  lead: Lead
  deliveries: DeliveryResult[]
}

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function getLeadsFilePath() {
  if (process.env.VERCEL) {
    return join('/tmp', 'gem-group-projects', 'leads.json')
  }

  return join(process.cwd(), 'data', 'leads.json')
}

export async function readLeads(): Promise<Lead[]> {
  try {
    const data = await readFile(getLeadsFilePath(), 'utf-8')
    const parsed = JSON.parse(data)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export async function saveLeads(leads: Lead[]) {
  const leadsFile = getLeadsFilePath()
  await mkdir(dirname(leadsFile), { recursive: true })
  await writeFile(leadsFile, JSON.stringify(leads, null, 2))
}

export function validateLeadInput(input: LeadInput) {
  const name = clean(input.name)
  const phone = clean(input.phone)
  const email = clean(input.email)

  if (!name) {
    return { ok: false as const, error: 'Please enter your full name.' }
  }

  if (!phone) {
    return { ok: false as const, error: 'Please enter your mobile number.' }
  }

  if (!/^[+\d\s()-]{10,20}$/.test(phone)) {
    return { ok: false as const, error: 'Please enter a valid mobile number.' }
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false as const, error: 'Please enter a valid email address.' }
  }

  return { ok: true as const }
}

export async function createLead(input: LeadInput): Promise<CreateLeadResult> {
  const lead: Lead = {
    id: `lead-${Date.now()}`,
    name: clean(input.name),
    phone: clean(input.phone),
    email: clean(input.email) || null,
    project: clean(input.project) || null,
    plotSize: clean(input.plotSize) || null,
    message: clean(input.message) || null,
    source: clean(input.source) || 'website',
    createdAt: new Date().toISOString(),
    status: 'new',
  }

  const leads = await readLeads()
  leads.unshift(lead)
  await saveLeads(leads)

  const deliveries = await notifyLeadChannels(lead)
  return { lead, deliveries }
}

async function notifyLeadChannels(lead: Lead): Promise<DeliveryResult[]> {
  const integrations: Array<{ channel: DeliveryResult['channel']; url?: string }> = [
    { channel: 'email', url: process.env.LEADS_EMAIL_WEBHOOK_URL },
    { channel: 'whatsapp', url: process.env.LEADS_WHATSAPP_WEBHOOK_URL },
    { channel: 'google-sheets', url: process.env.LEADS_GOOGLE_SHEETS_WEBHOOK_URL },
  ]

  const active = integrations.filter((item) => item.url)
  if (!active.length) {
    return []
  }

  const results = await Promise.all(
    active.map(async ({ channel, url }) => {
      try {
        const response = await fetch(url as string, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            channel,
            lead,
          }),
          cache: 'no-store',
        })

        if (!response.ok) {
          return {
            channel,
            ok: false,
            detail: `${channel} delivery failed with status ${response.status}.`,
          } satisfies DeliveryResult
        }

        return {
          channel,
          ok: true,
          detail: `${channel} delivery succeeded.`,
        } satisfies DeliveryResult
      } catch (error) {
        const detail = error instanceof Error ? error.message : 'Unknown delivery error.'
        return {
          channel,
          ok: false,
          detail: `${channel} delivery failed: ${detail}`,
        } satisfies DeliveryResult
      }
    })
  )

  return results
}
