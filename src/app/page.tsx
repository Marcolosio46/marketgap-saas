'use client'

import { useState } from 'react'

const BLOCKED_DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com', 'protonmail.com', 'icloud.com']

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company_name: '' })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const validateEmail = (email: string) => {
    const domain = email.split('@')[1]
    return BLOCKED_DOMAINS.includes(domain) ? 'Please use your company email address' : null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    const emailError = validateEmail(formData.email)
    if (emailError) {
      setError(emailError)
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error || 'Failed to submit')

      setSuccess(true)
      setTimeout(() => {
        window.location.href = `/upload?lead_id=${data.lead_id}`
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: '#09090b', color: '#ffffff', minHeight: '100vh', fontFamily: 'system-ui' }}>
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 24px', background: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '56px', fontWeight: 700, lineHeight: 1.2, marginBottom: '24px' }}>
                Discover Your <span style={{ color: '#10b981' }}>Wasted</span> Ad Budget
              </h1>
              <p style={{ fontSize: '18px', color: '#a1a1aa', marginBottom: '32px' }}>
                Get a free Amazon PPC audit and see exactly how much money you're losing on inefficient campaigns.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ fontSize: '32px', fontWeight: 700, color: '#10b981', marginBottom: '8px' }}>$2.4M</div>
                  <div style={{ fontSize: '13px', color: '#a1a1aa' }}>Wasted Annually</div>
                </div>
                <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ fontSize: '32px', fontWeight: 700, color: '#10b981', marginBottom: '8px' }}>47%</div>
                  <div style={{ fontSize: '13px', color: '#a1a1aa' }}>Avg Optimization</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Identify money-losing products', 'Optimize your bid strategy', 'Get actionable insights'].map((benefit) => (
                  <div key={benefit} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px' }}>
                    <div style={{ width: '20px', height: '20px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#09090b', fontWeight: 'bold' }}>✓</div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '16px', padding: '40px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Get Your Free Audit</h2>
              <p style={{ color: '#a1a1aa', marginBottom: '32px', fontSize: '14px' }}>Takes 2 minutes. No credit card required.</p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Full Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" style={{ width: '100%', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid #3f3f46', borderRadius: '8px', color: '#ffffff', fontSize: '14px' }} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Company Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="you@company.com" style={{ width: '100%', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid #3f3f46', borderRadius: '8px', color: '#ffffff', fontSize: '14px' }} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Phone Number</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+1 (555) 000-0000" style={{ width: '100%', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid #3f3f46', borderRadius: '8px', color: '#ffffff', fontSize: '14px' }} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Company Name</label>
                  <input type="text" value={formData.company_name} onChange={(e) => setFormData({ ...formData, company_name: e.target.value })} placeholder="Your Company" style={{ width: '100%', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid #3f3f46', borderRadius: '8px', color: '#ffffff', fontSize: '14px' }} required />
                </div>

                {error && <div style={{ padding: '12px', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: '8px', color: '#f43f5e', fontSize: '14px' }}>⚠️ {error}</div>}
                {success && <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', color: '#10b981', fontSize: '14px' }}>✓ Redirecting...</div>}

                <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px 24px', background: loading ? 'rgba(16, 185, 129, 0.5)' : '#10b981', color: '#09090b', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                  {loading ? 'Processing...' : 'Get Free Audit →'}
                </button>
              </form>

              <p style={{ fontSize: '12px', color: '#52525b', textAlign: 'center', marginTop: '16px' }}>We respect your privacy. Your data will be deleted after 30 days.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
