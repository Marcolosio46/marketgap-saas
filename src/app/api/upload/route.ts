import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const leadId = formData.get('lead_id') as string

    if (!file || !leadId) {
      return NextResponse.json({ error: 'Missing file or lead_id' }, { status: 400 })
    }

    // Generate a fake report ID for now
    const report_id = Math.random().toString(36).substring(7)

    return NextResponse.json({ report_id, message: 'Report generated' }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
