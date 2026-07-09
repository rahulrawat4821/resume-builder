import { useEffect, useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import api from '../services/api'

const Profile = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', jobTitle: '', address: '' })
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => { fetchProfile() }, [])

  const fetchProfile = async () => {
    try {
      const res = await api.get('/user/profile')
      setProfile(res.data)
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
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      await api.put('/user/profile', formData)
      setSuccess('Profile updated successfully!')
      fetchProfile()
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed')
    } finally {
      setSaving(false)
    }
  }

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    setUploading(true)
    setError('')
    try {
      const formDataObj = new FormData()
      formDataObj.append('file', file)
      const res = await api.post('/user/upload-photo', formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setProfile(prev => ({ ...prev, profilePicture: res.data.profilePicture }))
      setSuccess('Profile photo updated!')
    } catch (err) {
      setError('Failed to upload photo')
    } finally {
      setUploading(false)
    }
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'white'
  }

  return (
    <DashboardLayout>
      <div className="p-8 max-w-2xl">
        <h1 className="text-2xl font-bold text-white mb-1">Profile</h1>
        <p className="text-sm mb-8" style={{ color: '#4B5563' }}>Update your personal information</p>

        {loading ? (
          <div style={{ color: '#4B5563' }}>Loading...</div>
        ) : (
          <div className="rounded-2xl p-8 glass">

            {/* Avatar Section */}
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                {profile?.profilePicture ? (
                  <img
                    src={profile.profilePicture}
                    alt="Profile"
                    className="w-20 h-20 rounded-2xl object-cover"
                    style={{ border: '2px solid rgba(124,58,237,0.5)' }}
                  />
                ) : (
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold"
                    style={{ background: 'linear-gradient(135deg,#7C3AED,#2563EB)', color: 'white' }}
                  >
                    {formData.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                )}
                {/* Upload button overlay */}
                <label
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all"
                  style={{ background: 'linear-gradient(135deg,#7C3AED,#2563EB)' }}
                  title="Upload photo"
                >
                  {uploading ? '⏳' : '📷'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <h3 className="font-semibold text-white text-lg">{formData.name || 'Your Name'}</h3>
                <p className="text-sm mb-2" style={{ color: '#4B5563' }}>{formData.jobTitle || 'No job title'}</p>
                <span
                  className="text-xs px-3 py-1 rounded-full font-medium"
                  style={profile?.plan === 'PREMIUM'
                    ? { background: 'rgba(250,204,21,0.15)', color: '#fbbf24', border: '1px solid rgba(250,204,21,0.3)' }
                    : { background: 'rgba(124,58,237,0.15)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.3)' }
                  }
                >
                  {profile?.plan === 'PREMIUM' ? '👑 Premium' : '⭐ Free Plan'}
                </span>
              </div>
            </div>

            {success && (
              <div className="px-4 py-3 rounded-xl mb-5 text-sm"
                style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80' }}>
                ✅ {success}
              </div>
            )}
            {error && (
              <div className="px-4 py-3 rounded-xl mb-5 text-sm"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
                ❌ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs mb-2" style={{ color: '#94A3B8' }}>Full name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Rahul Rawat"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#7C3AED'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
                <div>
                  <label className="block text-xs mb-2" style={{ color: '#94A3B8' }}>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9999999999"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#7C3AED'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs mb-2" style={{ color: '#94A3B8' }}>Job title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Java Full Stack Developer"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#7C3AED'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
              <div>
                <label className="block text-xs mb-2" style={{ color: '#94A3B8' }}>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Bhopal, Madhya Pradesh, India"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#7C3AED'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg,#7C3AED,#2563EB)', color: 'white' }}
              >
                {saving ? 'Saving...' : 'Save changes'}
              </button>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Profile