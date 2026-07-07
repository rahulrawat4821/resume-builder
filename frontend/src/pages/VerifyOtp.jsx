import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import api from '../services/api'

const VerifyOtp = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || ''
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const startCountdown = () => {
    setCountdown(30)
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(timer); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.post('/auth/verify-otp', { email, otp })
      setSuccess('Email verified successfully!')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResending(true)
    setError('')
    setSuccess('')
    try {
      await api.post('/auth/resend-otp', { email })
      setSuccess('OTP resent! Check your email.')
      startCountdown()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: '#060816' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #7C3AED, #2563EB)' }} />

      <div className="w-full max-w-md mx-auto px-6">
        <div className="rounded-2xl p-10" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(18px)' }}>

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl"
              style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}>
              📧
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Verify your email</h2>
            <p className="text-sm" style={{ color: '#4B5563' }}>
              We sent a 6-digit OTP to{' '}
              <span className="font-medium" style={{ color: '#a78bfa' }}>{email}</span>
            </p>
          </div>

          {error && (
            <div className="px-4 py-3 rounded-xl mb-5 text-sm text-center"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
              {error}
            </div>
          )}
          {success && (
            <div className="px-4 py-3 rounded-xl mb-5 text-sm text-center"
              style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80' }}>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs mb-2" style={{ color: '#94A3B8' }}>Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                placeholder="• • • • • •"
                maxLength={6}
                required
                className="w-full px-4 py-4 rounded-xl text-center text-xl font-bold text-white outline-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', letterSpacing: '0.5em' }}
                onFocus={e => e.target.style.borderColor = '#7C3AED'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg,#7C3AED,#2563EB)', color: 'white' }}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>

          <div className="text-center mt-5">
            {countdown > 0 ? (
              <p className="text-xs" style={{ color: '#4B5563' }}>
                Resend OTP in <span style={{ color: '#a78bfa' }}>{countdown}s</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={resending}
                className="text-xs font-medium disabled:opacity-60"
                style={{ color: '#a78bfa' }}
              >
                {resending ? 'Sending...' : "Didn't receive OTP? Resend"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyOtp