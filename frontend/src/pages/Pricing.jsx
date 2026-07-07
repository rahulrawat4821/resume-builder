import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import api from '../services/api'

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

const Pricing = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    setLoading(true)
    try {
      // Step 1 — Load Razorpay script
      const loaded = await loadRazorpayScript()
      if (!loaded) {
        alert('Failed to load Razorpay. Check your internet connection.')
        setLoading(false)
        return
      }

      // Step 2 — Create order from backend
      const res = await api.post('/payment/create-order')
      const { orderId, amount, currency, keyId } = res.data

      // Step 3 — Open Razorpay checkout
      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: 'Resume Builder',
        description: 'Premium Plan - 1 Month',
        order_id: orderId,
        handler: async (response) => {
          try {
            await api.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
            alert('🎉 Payment successful! You are now Premium!')
            navigate('/dashboard')
          } catch (err) {
            alert('Payment verification failed!')
          }
        },
        prefill: {
          name: 'Rahul Rawat',
          email: 'rahul@gmail.com',
        },
        theme: { color: '#7C3AED' },
        modal: { ondismiss: () => setLoading(false) }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()

    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Payment failed!')
      setLoading(false)
    }
  }

  const freeFeatures = [
    { text: '5 resumes total', ok: true },
    { text: '3 themes', ok: true },
    { text: 'PDF download', ok: true },
    { text: 'Unlimited resumes', ok: false },
    { text: 'Profile photo', ok: false },
    { text: 'Priority support', ok: false },
  ]

  const premiumFeatures = [
    { text: 'Unlimited resumes', ok: true },
    { text: 'All themes', ok: true },
    { text: 'PDF download', ok: true },
    { text: 'Profile photo upload', ok: true },
    { text: 'Custom sections', ok: true },
    { text: 'Priority support', ok: true },
  ]

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">Choose your plan</h1>
          <p style={{ color: '#4B5563' }}>Upgrade to unlock all features</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free Plan */}
          <div className="rounded-2xl p-8 glass">
            <h2 className="text-lg font-bold text-white mb-1">Free</h2>
            <div className="text-4xl font-bold text-white mb-1">₹0</div>
            <p className="text-sm mb-6" style={{ color: '#4B5563' }}>Forever free</p>
            <div className="flex flex-col gap-3 mb-8">
              {freeFeatures.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span style={{ color: f.ok ? '#4ADE80' : '#374151' }}>{f.ok ? '✓' : '✕'}</span>
                  <span style={{ color: f.ok ? '#94a3b8' : '#374151' }}>{f.text}</span>
                </div>
              ))}
            </div>
            <button
              className="w-full py-3 rounded-xl text-sm font-medium"
              style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#4B5563', background: 'transparent' }}
            >
              Current plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="rounded-2xl p-8 relative" style={{ background: 'rgba(124,58,237,0.1)', border: '2px solid #7C3AED' }}>
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-4 py-1 rounded-full font-medium"
              style={{ background: 'linear-gradient(135deg,#7C3AED,#2563EB)', color: 'white' }}
            >
              Most Popular
            </div>
            <h2 className="text-lg font-bold text-white mb-1">Premium</h2>
            <div className="text-4xl font-bold text-white mb-1">₹199</div>
            <p className="text-sm mb-6" style={{ color: '#4B5563' }}>per month</p>
            <div className="flex flex-col gap-3 mb-8">
              {premiumFeatures.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span style={{ color: '#4ADE80' }}>✓</span>
                  <span style={{ color: '#94a3b8' }}>{f.text}</span>
                </div>
              ))}
            </div>
            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg,#7C3AED,#2563EB)', color: 'white' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              {loading ? '⏳ Processing...' : '🚀 Upgrade Now — ₹199/month'}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Pricing