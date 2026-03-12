import { NextRequest, NextResponse } from 'next/server'
import { createLead, readLeads, validateLeadInput } from '@/lib/leads'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validation = validateLeadInput(body)

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    const { lead, deliveries } = await createLead(body)
    console.log('New lead captured:', lead)

    const deliveryFailures = deliveries.filter((item) => !item.ok)

    return NextResponse.json({
      success: true,
      message:
        deliveryFailures.length > 0
          ? 'Lead saved, but one or more external deliveries failed.'
          : 'Thank you! Our team will contact you within 2 hours.',
      leadId: lead.id,
      deliveries,
      warning:
        deliveryFailures.length > 0
          ? deliveryFailures.map((item) => item.detail).join(' ')
          : null,
    })
  } catch (error) {
    console.error('Lead capture error:', error)
    const detail = error instanceof Error ? error.message : 'Unknown server error.'
    return NextResponse.json({ error: `Failed to capture lead. ${detail}` }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  // Admin-only endpoint in production should be protected
  try {
    const leads = await readLeads()
    return NextResponse.json({ leads, total: leads.length })
  } catch {
    return NextResponse.json({ leads: [], total: 0 })
  }
}
