import { NextResponse } from 'next/server'
import { readLeads } from '@/lib/leads'

function escapeCsv(value: unknown) {
  const text = value == null ? '' : String(value)
  const escaped = text.replace(/"/g, '""')
  return `"${escaped}"`
}

export async function GET() {
  const leads = await readLeads()

  const headers = [
    'id',
    'name',
    'phone',
    'email',
    'project',
    'plotSize',
    'message',
    'source',
    'createdAt',
    'status',
  ]

  const rows = leads.map((lead) =>
    [
      lead.id,
      lead.name,
      lead.phone,
      lead.email,
      lead.project,
      lead.plotSize,
      lead.message,
      lead.source,
      lead.createdAt,
      lead.status,
    ]
      .map(escapeCsv)
      .join(',')
  )

  const csv = [headers.join(','), ...rows].join('\n')

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="gem-group-leads.csv"`,
      'Cache-Control': 'no-store',
    },
  })
}
