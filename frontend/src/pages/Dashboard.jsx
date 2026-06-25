import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import api from '../services/api'

const Dashboard = () => {
  const navigate = useNavigate()
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResumes()
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

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this resume?')) return

    try {
      await api.delete(`/resume/${id}`)
      setResumes(resumes.filter((r) => r.id !== id))
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
            <h1 className="text-4xl font-bold text-white mb-2">
              My Resumes
            </h1>
            <p className="text-muted">
              Create, edit and manage your professional resumes
            </p>
          </div>

          <button
            onClick={() => navigate('/resume/create')}
            className="gradient-primary glow px-6 py-3 rounded-2xl font-semibold"
          >
            + New Resume
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="py-20 text-center text-muted text-lg">
            Loading resumes...
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="glass rounded-3xl overflow-hidden glow hover:scale-[1.02]"
                >
                  {/* Preview */}
                  <div
                    onClick={() => navigate(`/resume/edit/${resume.id}`)}
                    className="h-48 cursor-pointer flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-blue-500/20"
                  >
                    <div className="w-24 h-32 rounded-lg bg-white shadow-xl flex items-center justify-center text-4xl">
                      📄
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-white font-semibold text-lg mb-1 truncate">
                      {resume.title}
                    </h3>

                    <p className="text-sm text-muted mb-4">
                      {resume.jobTitle || 'No job title'}
                    </p>

                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          navigate(`/resume/edit/${resume.id}`)
                        }
                        className="flex-1 py-2 rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-white/10"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(resume.id)}
                        className="flex-1 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* New Resume Card */}
              <div
                onClick={() => navigate('/resume/create')}
                className="rounded-3xl border-2 border-dashed border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10 h-[300px] cursor-pointer flex flex-col items-center justify-center gap-4"
              >
                <div className="w-16 h-16 rounded-full gradient-primary glow flex items-center justify-center text-3xl">
                  +
                </div>

                <span className="text-white font-semibold">
                  Create New Resume
                </span>
              </div>
            </div>

            {/* Premium Banner */}
            {resumes.length >= 1 && (
              <div className="mt-10 rounded-3xl p-8 glass glow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Upgrade to Premium
                    </h3>

                    <p className="text-muted">
                      Unlock unlimited resumes, premium templates, AI
                      suggestions and PDF exports.
                    </p>
                  </div>

                  <button
                    onClick={() => navigate('/pricing')}
                    className="gradient-primary px-6 py-3 rounded-2xl font-semibold glow"
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