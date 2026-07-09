import { useState } from 'react'
import { StyledInput } from '../StyledInputs'
import api from '../../../services/api'

const PersonalStep = ({ data, onChange }) => {
  const [uploading, setUploading] = useState(false)

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await api.post('/user/upload-photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      onChange('profilePhoto', res.data.profilePicture)
    } catch (err) {
      alert('Failed to upload photo')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">

      {/* Profile Photo */}
      <div>
        <label className="block text-xs mb-2" style={{ color: '#94A3B8' }}>Profile Photo</label>
        <div className="flex items-center gap-4">
          {/* Preview */}
          <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            {data.profilePhoto ? (
              <img src={data.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold" style={{ background: 'linear-gradient(135deg,#7C3AED,#2563EB)', color: 'white' }}>
                {data.fullName?.charAt(0)?.toUpperCase() || 'R'}
              </div>
            )}
          </div>

          {/* Upload button */}
          <div className="flex flex-col gap-2 flex-1">
            <label
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all"
              style={{
                background: 'linear-gradient(135deg,#7C3AED,#2563EB)',
                color: 'white',
                cursor: uploading ? 'not-allowed' : 'pointer',
                opacity: uploading ? 0.7 : 1
              }}
            >
              {uploading ? '⏳ Uploading...' : '📷 Upload from Device'}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
            {data.profilePhoto && (
              <button
                onClick={() => onChange('profilePhoto', '')}
                className="text-xs py-1.5 rounded-xl transition-all"
                style={{ color: '#f87171', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', cursor: 'pointer' }}
              >
                🗑 Remove Photo
              </button>
            )}
            <p className="text-xs" style={{ color: '#4B5563' }}>
              JPG, PNG or WEBP • Max 5MB
            </p>
          </div>
        </div>
      </div>

      {/* Resume Title */}
      <StyledInput
        label="Resume Title"
        value={data.title}
        onChange={e => onChange('title', e.target.value)}
        placeholder="e.g. Java Developer Resume — TCS Application"
      />

      {/* Full Name + Job Title */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StyledInput
          label="Full Name"
          value={data.fullName}
          onChange={e => onChange('fullName', e.target.value)}
          placeholder="e.g. Rahul Rawat"
        />
        <StyledInput
          label="Job Title"
          value={data.jobTitle}
          onChange={e => onChange('jobTitle', e.target.value)}
          placeholder="e.g. Java Full Stack Developer"
        />
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StyledInput
          label="Email Address"
          type="email"
          value={data.email}
          onChange={e => onChange('email', e.target.value)}
          placeholder="e.g. rahul@gmail.com"
        />
        <StyledInput
          label="Phone Number"
          value={data.phone}
          onChange={e => onChange('phone', e.target.value)}
          placeholder="e.g. +91 98765 43210"
        />
      </div>

      {/* Address */}
      <StyledInput
        label="Current Location"
        value={data.address}
        onChange={e => onChange('address', e.target.value)}
        placeholder="e.g. Bhopal, Madhya Pradesh, India"
      />

      {/* LinkedIn + GitHub */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StyledInput
          label="LinkedIn Profile"
          value={data.linkedin}
          onChange={e => onChange('linkedin', e.target.value)}
          placeholder="e.g. linkedin.com/in/rahul-rawat"
        />
        <StyledInput
          label="GitHub Profile"
          value={data.github}
          onChange={e => onChange('github', e.target.value)}
          placeholder="e.g. github.com/rahulrawat4821"
        />
      </div>

      {/* ✅ Fixed Website field */}
      <StyledInput
        label="Portfolio / Website (optional)"
        value={data.website || ''}
        onChange={e => onChange('website', e.target.value)}
        placeholder="e.g. rahulrawat.dev"
      />

    </div>
  )
}

export default PersonalStep