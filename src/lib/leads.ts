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

type RawLead = Lead | Record<string, unknown>

export function isVercelRuntime() {
  return Boolean(process.env.VERCEL)
}

function clean(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim()
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value).trim()
  }

  return ''
}

function getLeadsFilePath() {
  if (isVercelRuntime()) {
    return join('/tmp', 'gem-group-projects', 'leads.json')
  }

  return join(process.cwd(), 'data', 'leads.json')
}

function normalizeLead(input: RawLead): Lead {
  const record = input as Record<string, unknown>

  return {
    id: clean(record.id) || undefined,
    name: clean(record.name),
    phone: clean(record.phone),
    email: clean(record.email) || null,
    project: clean(record.project) || null,
    plotSize: clean(record.plotSize) || null,
    message: clean(record.message) || null,
    source: clean(record.source) || 'website',
    createdAt: clean(record.createdAt) || undefined,
    status: clean(record.status) || 'new',
  }
}

function sortLeads(leads: Lead[]) {
  return [...leads].sort((a, b) => {
    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0
    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0
    return bTime - aTime
  })
}

async function readSheetLeads(): Promise<Lead[]> {
  const url = process.env.LEADS_GOOGLE_SHEETS_WEBHOOK_URL
  if (!url) {
    return []
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      return []
    }

    const data: unknown = await response.json()
    const parsed = data as { leads?: RawLead[]; rows?: RawLead[] } | RawLead[]
    const rows: RawLead[] = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed?.leads)
        ? parsed.leads
        : Array.isArray(parsed?.rows)
          ? parsed.rows
          : []

    return sortLeads(
      rows
        .map((row: RawLead) => normalizeLead(row))
        .filter((lead: Lead) => lead.name && lead.phone)
    )
  } catch {
    return []
  }
}

export async function readLeads(): Promise<Lead[]> {
  try {
    const data = await readFile(getLeadsFilePath(), 'utf-8')
    const parsed = JSON.parse(data)
    const leads = Array.isArray(parsed) ? parsed.map((lead) => normalizeLead(lead)) : []

    if (leads.length > 0) {
      return sortLeads(leads)
    }
  } catch {
    // Fall through to external lead source if available.
  }

  if (isVercelRuntime()) {
    return readSheetLeads()
  }

  return []
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

  const deliveries = await notifyLeadChannels(lead)

  if (!isVercelRuntime()) {
    const leads = await readLeads()
    leads.unshift(lead)
    await saveLeads(leads)
  }

  return { lead, deliveries }
}

export function getConfiguredDeliveryChannels() {
  return [
    { channel: 'email' as const, url: process.env.LEADS_EMAIL_WEBHOOK_URL },
    { channel: 'whatsapp' as const, url: process.env.LEADS_WHATSAPP_WEBHOOK_URL },
    { channel: 'google-sheets' as const, url: process.env.LEADS_GOOGLE_SHEETS_WEBHOOK_URL },
  ].filter((item) => item.url)
}

function getSheetPayload(lead: Lead) {
  return {
    id: lead.id,
    name: lead.name,
    phone: lead.phone,
    email: lead.email ?? '',
    project: lead.project ?? '',
    plotSize: lead.plotSize ?? '',
    message: lead.message ?? '',
    source: lead.source ?? 'website',
    createdAt: lead.createdAt,
    status: lead.status,
    channel: 'google-sheets',
  }
}

async function parseResponseDetail(response: Response) {
  const contentType = response.headers.get('content-type') || ''

  try {
    if (contentType.includes('application/json')) {
      const data = await response.json()
      if (typeof data?.message === 'string' && data.message.trim()) {
        return data.message.trim()
      }
      if (typeof data?.error === 'string' && data.error.trim()) {
        return data.error.trim()
      }
    } else {
      const text = await response.text()
      if (text.trim()) {
        return text.trim().slice(0, 300)
      }
    }
  } catch {
    return ''
  }

  return ''
}

async function deliverLead(channel: DeliveryResult['channel'], url: string, lead: Lead): Promise<DeliveryResult> {
  const isGoogleSheets = channel === 'google-sheets'
  const sheetPayload = getSheetPayload(lead)

  const requests = isGoogleSheets
    ? [
        {
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...sheetPayload,
            lead,
          }),
        },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
          body: new URLSearchParams(
            Object.entries(sheetPayload).reduce<Record<string, string>>((acc, [key, value]) => {
              acc[key] = value ?? ''
              return acc
            }, {})
          ).toString(),
        },
      ]
    : [
        {
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            channel,
            lead,
          }),
        },
      ]

  let lastFailure = `${channel} delivery failed.`

  for (const request of requests) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: request.headers,
        body: request.body,
        cache: 'no-store',
      })

      if (response.ok) {
        return {
          channel,
          ok: true,
          detail: `${channel} delivery succeeded.`,
        }
      }

      const responseDetail = await parseResponseDetail(response)
      lastFailure = responseDetail
        ? `${channel} delivery failed with status ${response.status}: ${responseDetail}`
        : `${channel} delivery failed with status ${response.status}.`
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'Unknown delivery error.'
      lastFailure = `${channel} delivery failed: ${detail}`
    }
  }

  return {
    channel,
    ok: false,
    detail: lastFailure,
  }
}

async function notifyLeadChannels(lead: Lead): Promise<DeliveryResult[]> {
  const active = getConfiguredDeliveryChannels()
  if (!active.length) {
    return []
  }

  const results = await Promise.all(
    active.map(({ channel, url }) => deliverLead(channel, url as string, lead))
  )

  return results
}
