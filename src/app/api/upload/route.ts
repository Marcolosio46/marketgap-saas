import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const leadId = formData.get('lead_id') as string

    if (!file || !leadId) {
      return NextResponse.json({ error: 'Missing file or lead_id' }, { status: 400 })
    }

    // Read CSV file
    const csvText = await file.text()
    const lines = csvText.trim().split('\n')
    
    if (lines.length < 2) {
      return NextResponse.json({ error: 'Invalid CSV file' }, { status: 400 })
    }

    // Parse CSV header
    const headers = lines[0].split(',').map(h => h.trim())
    const spendIndex = headers.findIndex(h => h.toLowerCase().includes('spend'))
    const salesIndex = headers.findIndex(h => h.toLowerCase().includes('sales'))

    // Calculate metrics from CSV data
    let totalSpend = 0
    let totalSales = 0
    const products = []

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim())
      
      if (values.length > Math.max(spendIndex, salesIndex)) {
        const spend = parseFloat(values[spendIndex] || 0)
        const sales = parseFloat(values[salesIndex] || 0)
        
        if (!isNaN(spend) && !isNaN(sales)) {
          totalSpend += spend
          totalSales += sales
          products.push({ spend, sales, profit: sales - spend })
        }
      }
    }

    // Calculate ACOS and other metrics
    const acos = totalSpend > 0 ? (totalSpend / totalSales * 100).toFixed(1) : '0'
    const wastedProducts = products.filter(p => p.profit < 0).sort((a, b) => a.profit - b.profit)
    const wastedSpend = wastedProducts.reduce((sum, p) => sum + Math.abs(p.profit), 0)
    const roi = totalSpend > 0 ? ((totalSales - totalSpend) / totalSpend * 100).toFixed(1) : '0'

    // Store report data
    const reportData = {
      total_spend: totalSpend.toFixed(2),
      total_sales: totalSales.toFixed(2),
      acos: acos,
      wasted_spend: wastedSpend.toFixed(2),
      roi: roi,
      products: products,
      wasted_products: wastedProducts.slice(0, 10),
    }

    // Generate a report ID
    const report_id = Math.random().toString(36).substring(7)

    // Store in session/memory (in production, use database)
    // For now, we'll pass data via URL params
    const encodedData = Buffer.from(JSON.stringify(reportData)).toString('base64')

    return NextResponse.json({ 
      report_id, 
      data: reportData,
      message: 'Report generated' 
    }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}

