import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company_name } = body

    if (!name || !email || !phone || !company_name) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Generate a fake lead ID for now (will use Supabase later)
    const lead_id = Math.random().toString(36).substring(7)

    return NextResponse.json({ lead_id, message: 'Lead created' }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 })
  }
}
