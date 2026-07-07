import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import api from '../services/api'

const FREE_LIMIT = 5  // ✅ only once, outside component

const Dashboard = () => {
  const navigate = useNavigate()
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [limitError, setLimitError] = useState('')

  useEffect(() => {
    fetchResumes()
    fetchProfile()
  }, [])

  const fetchResumes = async () => {
    try {
      const res = await api.get('/resume')
      setResumes(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchProfile = async () => {
    try {
      const res = await api.get('/user/profile')
      setProfile(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  // ✅ inside component
  const handleNewResume = () => {
    if (profile?.plan === 'FREE' && profile?.resumesCreated >= FREE_LIMIT) {
      setLimitError(`Free plan allows only ${FREE_LIMIT} resumes total. Upgrade to Premium!`)
      return
    }
    navigate('/resume/create')
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this resume?')) return
    try {
      await api.delete(`/resume/${id}`)
      setResumes(resumes.filter((r) => r.id !== id))
      setLimitError('')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <DashboardLayout>
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Resumes</h1>
            <p className="text-muted">Create, edit and manage your professional resumes</p>
          </div>
          <button
            onClick={handleNewResume}
            className="gradient-primary glow px-6 py-3 rounded-2xl font-semibold"
          >
            + New Resume
          </button>
        </div>

        {/* Limit Error */}
        {limitError && (
          <div
            className="mb-6 px-5 py-4 rounded-2xl flex items-center justify-between gap-4"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🔒</span>
              <p className="text-sm font-medium" style={{ color: '#f87171' }}>{limitError}</p>
            </div>
            <button
              onClick={() => navigate('/pricing')}
              className="text-xs px-4 py-2 rounded-xl font-semibold whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg,#7C3AED,#2563EB)', color: 'white' }}
            >
              Upgrade Now
            </button>
          </div>
        )}

        {/* Free Plan Progress */}
        {profile?.plan === 'FREE' && (
          <div
            className="mb-6 px-5 py-4 rounded-2xl"
            style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">Free Plan Usage</span>
              <span className="text-xs" style={{ color: '#a78bfa' }}>
                {profile?.resumesCreated} / {FREE_LIMIT} resumes used
              </span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.min((profile?.resumesCreated / FREE_LIMIT) * 100, 100)}%`,
                  background: profile?.resumesCreated >= FREE_LIMIT
                    ? 'linear-gradient(90deg,#ef4444,#f87171)'
                    : 'linear-gradient(90deg,#7C3AED,#2563EB)'
                }}
              />
            </div>
            {profile?.resumesCreated >= FREE_LIMIT && (
              <p className="text-xs mt-2" style={{ color: '#f87171' }}>
                🔒 You've used all 5 free resumes. Upgrade to create more!
              </p>
            )}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="py-20 text-center text-muted text-lg">Loading resumes...</div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="glass rounded-3xl overflow-hidden hover:scale-[1.02]"
                  style={{ transition: 'all 0.2s' }}
                >
                  <div
                    onClick={() => navigate(`/resume/edit/${resume.id}`)}
                    className="h-48 cursor-pointer flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(37,99,235,0.2))' }}
                  >
                    <div className="w-24 h-32 rounded-lg bg-white shadow-xl flex items-center justify-center text-4xl">
                      📄
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-white font-semibold text-lg mb-1 truncate">{resume.title}</h3>
                    <p className="text-sm text-muted mb-4">{resume.jobTitle || 'No job title'}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate(`/resume/edit/${resume.id}`)}
                        className="flex-1 py-2 rounded-xl text-sm transition-all"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#7C3AED'; e.currentTarget.style.color = '#a78bfa' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#94A3B8' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(resume.id)}
                        className="flex-1 py-2 rounded-xl text-sm transition-all"
                        style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Card */}
              <div
                onClick={handleNewResume}
                className="rounded-3xl h-[300px] cursor-pointer flex flex-col items-center justify-center gap-4 transition-all"
                style={{ border: '2px dashed rgba(124,58,237,0.3)', background: 'rgba(124,58,237,0.05)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(124,58,237,0.05)'}
              >
                <div className="w-16 h-16 rounded-full gradient-primary glow flex items-center justify-center text-3xl">+</div>
                <span className="text-white font-semibold">Create New Resume</span>
                {profile?.plan === 'FREE' && profile?.resumesCreated >= FREE_LIMIT && (
                  <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
                    🔒 Upgrade Required
                  </span>
                )}
              </div>
            </div>

            {/* Upgrade Banner */}
            {profile?.plan === 'FREE' && (
              <div className="mt-10 rounded-3xl p-8 glass">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">🚀 Upgrade to Premium</h3>
                    <p className="text-muted">Unlimited resumes, premium themes, PDF exports and more!</p>
                  </div>
                  <button
                    onClick={() => navigate('/pricing')}
                    className="gradient-primary px-6 py-3 rounded-2xl font-semibold glow whitespace-nowrap"
                  >
                    Upgrade Now
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Dashboard