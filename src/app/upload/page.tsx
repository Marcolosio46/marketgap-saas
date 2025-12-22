'use client'

import { Suspense, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

function UploadContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const leadId = searchParams.get('lead_id')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError(null)
    }
  }

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('lead_id', leadId || '')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error || 'Upload failed')

      // Redirect to report
      router.push(`/report/${data.report_id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload file')
    } finally {
      setLoading(false)
    }
  }

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
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>{file ? file.name : 'Drag and drop your CSV file'}</h3>
          <p style={{ color: '#a1a1aa', marginBottom: '16px' }}>or</p>
          <label style={{ display: 'inline-block' }}>
            <input type="file" accept=".csv" onChange={handleFileChange} style={{ display: 'none' }} />
            <span style={{ padding: '10px 20px', background: '#10b981', color: '#09090b', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'inline-block' }}>Browse Files</span>
          </label>
        </div>

        {error && <div style={{ padding: '12px', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: '8px', color: '#f43f5e', fontSize: '14px', marginTop: '16px' }}>⚠️ {error}</div>}
        {file && <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', color: '#10b981', fontSize: '14px', marginTop: '16px' }}>✓ File ready to upload</div>}

        <button onClick={handleSubmit} disabled={!file || loading} style={{ width: '100%', padding: '12px 24px', background: !file || loading ? 'rgba(16, 185, 129, 0.5)' : '#10b981', color: '#09090b', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', marginTop: '24px' }}>
          {loading ? 'Processing...' : 'Generate Audit Report'}
        </button>

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
