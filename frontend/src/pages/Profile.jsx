import { useEffect, useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import api from '../services/api'

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    jobTitle: '',
    address: '',
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await api.get('/user/profile')
      setFormData({
        name: res.data.name || '',
        phone: res.data.phone || '',
        jobTitle: res.data.jobTitle || '',
        address: res.data.address || '',
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      await api.put('/user/profile', formData)
      setSuccess('Profile updated successfully!')
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Profile
          </h1>
          <p className="text-muted">
            Update your personal information
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center text-muted text-lg">
            Loading profile...
          </div>
        ) : (
          <div className="glass glow rounded-3xl p-8 md:p-10">
            {/* Top User Card */}
            <div className="flex flex-col md:flex-row md:items-center gap-5 mb-10">
              <div className="w-24 h-24 rounded-3xl gradient-primary glow flex items-center justify-center text-4xl font-bold text-white">
                {formData.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  {formData.name || 'Unknown User'}
                </h2>

                <p className="text-muted mt-1">
                  {formData.jobTitle || 'No job title'}
                </p>

                <div className="mt-3 inline-block px-4 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-sm">
                  Free Plan
                </div>
              </div>
            </div>

            {/* Alerts */}
            {success && (
              <div className="mb-5 p-4 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-300">
                {success}
              </div>
            )}

            {error && (
              <div className="mb-5 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
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
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-muted mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9999999999"
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Java Full Stack Developer"
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-muted mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Bhopal, Madhya Pradesh, India"
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full md:w-auto px-8 py-3 rounded-2xl gradient-primary glow font-semibold text-white disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Profile