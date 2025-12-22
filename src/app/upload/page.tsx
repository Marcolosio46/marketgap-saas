'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function UploadContent() {
  const searchParams = useSearchParams()
  const leadId = searchParams.get('lead_id')

  return (
    <div style={{ background: '#09090b', color: '#ffffff', minHeight: '100vh', padding: '60px 24px', fontFamily: 'system-ui' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 700, marginBottom: '12px' }}>Upload Your Amazon Ads Data</h1>
        <p style={{ fontSize: '16px', color: '#a1a1aa', marginBottom: '40px' }}>Export your campaign performance report from Amazon Ads Manager</p>

        <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>How to export your data:</h3>
          <ol style={{ listStyle: 'none', paddingLeft: 0 }}>
            {['Go to Amazon Ads Manager', 'Navigate to Campaigns → Performance', 'Click "Download" and select CSV format', 'Upload the file below'].map((step, i) => (
              <li key={i} style={{ marginBottom: '12px', fontSize: '14px', color: '#a1a1aa', display: 'flex', gap: '12px' }}>
                <span style={{ width: '24px', height: '24px', background: '#10b981', color: '#09090b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px', flexShrink: 0 }}>{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div style={{ border: '2px dashed #3f3f46', borderRadius: '12px', padding: '60px 40px', textAlign: 'center', background: 'rgba(16, 185, 129, 0.02)' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Drag and drop your CSV file</h3>
          <p style={{ color: '#a1a1aa', marginBottom: '16px' }}>or</p>
          <button style={{ padding: '10px 20px', background: '#10b981', color: '#09090b', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Browse Files</button>
        </div>

        <p style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '24px', textAlign: 'center' }}>Lead ID: {leadId}</p>
      </div>
    </div>
  )
}

export default function UploadPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#09090b' }} />}>
      <UploadContent />
    </Suspense>
  )
}
