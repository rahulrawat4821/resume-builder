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

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#060816] flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute top-20 left-20 w-80 h-80 rounded-full bg-purple-600 opacity-20 blur-[150px]" />
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-blue-600 opacity-20 blur-[150px]" />

      <div className="relative z-10 glass glow rounded-3xl p-8 md:p-10 w-full max-w-md">
        <div className="w-20 h-20 mx-auto rounded-3xl gradient-primary glow flex items-center justify-center text-3xl mb-5">
          📧
        </div>

        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Verify Email
        </h2>

        <p className="text-center text-muted mb-6">
          We sent a 6-digit code to
        </p>

        <p className="text-center text-purple-400 font-semibold mb-8 break-all">
          {email}
        </p>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-300 text-sm text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-muted mb-2">
              Enter OTP
            </label>

            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              maxLength={6}
              required
              className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-center text-2xl font-bold tracking-[0.4em] text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl gradient-primary text-white font-semibold glow disabled:opacity-60"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <p className="text-center text-sm text-muted mt-6">
          Didn’t receive OTP?{' '}
          <span className="text-purple-400 font-semibold cursor-pointer hover:text-purple-300">
            Resend
          </span>
        </p>
      </div>
    </div>
  )
}

export default VerifyOtp