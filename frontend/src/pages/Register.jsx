import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await api.post('/auth/register', formData)
      navigate('/verify-otp', {
        state: { email: formData.email },
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#060816]">
      {/* Glow */}
      <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-purple-600 opacity-20 blur-[150px]" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-600 opacity-20 blur-[150px]" />

      <div className="relative z-10 min-h-screen flex">
        {/* Left */}
        <div className="hidden md:flex w-1/2 px-16 flex-col justify-center">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl gradient-primary glow flex items-center justify-center">
              <span className="font-bold text-xl text-white">R</span>
            </div>
            <span className="text-xl font-bold text-white">
              Resume Builder
            </span>
          </div>

          <h1 className="text-5xl font-bold leading-tight text-white mb-5">
            Start Building
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              For Free.
            </span>
          </h1>

          <p className="text-muted text-lg mb-10 max-w-lg">
            Join thousands of job seekers creating stunning resumes and
            improving their chances of getting hired.
          </p>

          <div className="space-y-4">
            {[
              'Free to get started',
              'OTP email verification',
              'Secure JWT authentication',
            ].map((item) => (
              <div
                key={item}
                className="glass rounded-2xl px-5 py-4 flex items-center gap-3"
              >
                <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
                  ✓
                </div>
                <span className="text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6">
          <div className="glass glow rounded-3xl p-8 md:p-10 w-full max-w-md">
            <h2 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h2>
            <p className="text-muted mb-8">
              Start building your resume today
            </p>

            {error && (
              <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-muted mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Rahul Rawat"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-muted mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="rahul@gmail.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-muted mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl gradient-primary text-white font-semibold glow disabled:opacity-60"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-sm text-muted mt-6">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-purple-400 font-semibold hover:text-purple-300"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register