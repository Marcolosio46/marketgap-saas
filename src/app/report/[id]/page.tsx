'use client'

import { useParams } from 'next/navigation'

export default function ReportPage() {
  const params = useParams()
  const reportId = params.id as string

  return (
    <div style={{ background: '#09090b', color: '#ffffff', minHeight: '100vh', padding: '60px 24px', fontFamily: 'system-ui' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Your Amazon PPC Audit</h1>
        <div style={{ fontSize: '13px', color: '#a1a1aa', marginBottom: '40px' }}>Generated on {new Date().toLocaleDateString()}</div>

        {/* Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
          {[
            { label: 'Total Ad Spend', value: '$12,450' },
            { label: 'Total Sales', value: '$28,900' },
            { label: 'ACOS', value: '43%' },
            { label: 'Wasted Spend', value: '$3,240' },
          ].map((metric) => (
            <div key={metric.label} style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '12px', color: '#a1a1aa', marginBottom: '8px' }}>{metric.label}</div>
              <div style={{ fontSize: '32px', fontWeight: 700, color: '#10b981' }}>{metric.value}</div>
            </div>
          ))}
        </div>

        {/* Free Section */}
        <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '12px', padding: '32px', marginBottom: '24px' }}>
          <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span>🔴</span> Top Money-Losing Products
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #27272a', fontSize: '12px', fontWeight: 700, color: '#a1a1aa' }}>Product</th>
                <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #27272a', fontSize: '12px', fontWeight: 700, color: '#a1a1aa' }}>Spend</th>
                <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #27272a', fontSize: '12px', fontWeight: 700, color: '#a1a1aa' }}>Sales</th>
                <th style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #27272a', fontSize: '12px', fontWeight: 700, color: '#a1a1aa' }}>Loss</th>
              </tr>
            </thead>
            <tbody>
              {[
                { product: 'Premium Widget Pro', spend: '$1,240', sales: '$890', loss: '-$350' },
                { product: 'Standard Widget', spend: '$890', sales: '$450', loss: '-$440' },
                { product: 'Widget Bundle', spend: '$650', sales: '$200', loss: '-$450' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #27272a' }}>
                  <td style={{ padding: '12px', fontSize: '14px' }}>{row.product}</td>
                  <td style={{ padding: '12px', fontSize: '14px' }}>{row.spend}</td>
                  <td style={{ padding: '12px', fontSize: '14px' }}>{row.sales}</td>
                  <td style={{ padding: '12px', fontSize: '14px', color: '#f43f5e' }}>{row.loss}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Locked Sections */}
        {[
          { title: 'Negative Keywords Strategy', desc: 'Unlock detailed negative keyword recommendations' },
          { title: 'Bid Optimization Plan', desc: 'Get a personalized bid strategy to maximize ROI' },
          { title: 'Campaign Restructuring Roadmap', desc: 'Discover how to restructure your campaigns' },
        ].map((section, i) => (
          <div key={i} style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '12px', padding: '32px', marginBottom: '24px' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', color: '#f43f5e' }}>
              <span style={{ width: '20px', height: '20px', background: '#f43f5e', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px' }}>🔒</span>
              {section.title}
            </div>
            <div style={{ background: 'rgba(244, 63, 94, 0.05)', border: '1px solid rgba(244, 63, 94, 0.2)', borderRadius: '8px', padding: '32px', textAlign: 'center' }}>
              <p style={{ color: '#a1a1aa', marginBottom: '16px' }}>{section.desc}</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button style={{ padding: '10px 20px', background: 'transparent', border: '1px solid #3f3f46', color: '#ffffff', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Schedule Call</button>
                <button style={{ padding: '10px 20px', background: 'transparent', border: '1px solid #3f3f46', color: '#ffffff', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Contact Us</button>
              </div>
            </div>
          </div>
        ))}

        <p style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '24px', textAlign: 'center' }}>Report ID: {reportId}</p>
      </div>
    </div>
  )
}
