import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'
import ResumePreview from '../components/resume-editor/ResumePreview'
import PersonalStep from '../components/resume-editor/steps/PersonalStep'
import SummaryStep from '../components/resume-editor/steps/SummaryStep'
import ExperienceStep from '../components/resume-editor/steps/ExperienceStep'
import EducationStep from '../components/resume-editor/steps/EducationStep'
import SkillsStep from '../components/resume-editor/steps/SkillsStep'
import ProjectsStep from '../components/resume-editor/steps/ProjectsStep'
import CertificationsStep from '../components/resume-editor/steps/CertificationsStep'

const steps = ['Personal', 'Summary', 'Experience', 'Education', 'Skills', 'Projects', 'Certifications']

const empty = {
  title: 'My Resume',
  fullName: '', email: '', phone: '', address: '',
  linkedin: '', github: '', website: '', jobTitle: '',
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
}

const ResumeEditor = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [data, setData] = useState(empty)
  const [saving, setSaving] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [theme, setTheme] = useState('classic')
  const [showThemes, setShowThemes] = useState(false)

  useEffect(() => {
    if (id) fetchResume()
  }, [id])

  const fetchResume = async () => {
    try {
      const res = await api.get(`/resume/${id}`)
      setData({ ...empty, ...res.data })
    } catch (err) {
      console.error(err)
    }
  }

  const onChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      if (id) {
        await api.put(`/resume/${id}`, data)
      } else {
        const res = await api.post('/resume', data)
        navigate(`/resume/edit/${res.data.id}`, { replace: true })
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleDownloadPDF = async () => {
    setDownloading(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default
      const element = document.getElementById('resume-preview')
      const opt = {
        margin: 0,
        filename: `${data.fullName || 'Resume'}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }
      await html2pdf().set(opt).from(element).save()
    } catch (err) {
      console.error(err)
    } finally {
      setDownloading(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 0: return <PersonalStep data={data} onChange={onChange} />
      case 1: return <SummaryStep data={data} onChange={onChange} />
      case 2: return <ExperienceStep data={data} onChange={onChange} />
      case 3: return <EducationStep data={data} onChange={onChange} />
      case 4: return <SkillsStep data={data} onChange={onChange} />
      case 5: return <ProjectsStep data={data} onChange={onChange} />
      case 6: return <CertificationsStep data={data} onChange={onChange} />
      default: return null
    }
  }

  const themes = [
    { id: 'classic', label: '🎨 Classic', color: '#7C3AED' },
    { id: 'modern', label: '✨ Modern', color: '#06B6D4' },
    { id: 'executive', label: '💼 Executive', color: '#4ADE80' },
  ]

  return (
    <div className="min-h-screen text-white" style={{ background: '#060816' }}>
      {/* Top accent */}
      <div style={{ height: '3px', background: 'linear-gradient(90deg, #7C3AED, #2563EB)', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }} />

      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-14 px-4 md:px-6 flex items-center justify-between"
        style={{ background: 'rgba(6,8,22,0.9)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(255,255,255,0.08)', marginTop: '3px' }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm px-3 py-1.5 rounded-lg transition-all"
            style={{ color: '#94A3B8', background: 'rgba(255,255,255,0.05)' }}
          >
            ← Back
          </button>
          <span className="text-white font-semibold text-sm hidden sm:block">{data.title || 'My Resume'}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile preview toggle */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="text-xs px-3 py-2 rounded-xl transition-all md:hidden"
            style={{ background: 'rgba(255,255,255,0.05)', color: '#94A3B8', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {showPreview ? '📝 Edit' : '👁 Preview'}
          </button>

          {/* Theme Selector */}
          <div className="relative">
            <button
              onClick={() => setShowThemes(!showThemes)}
              className="text-xs md:text-sm px-4 py-2 rounded-xl font-medium transition-all"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#94A3B8', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              🎨 Theme
            </button>
            {showThemes && (
              <div
                className="absolute right-0 top-11 z-50 rounded-2xl p-2 flex flex-col gap-1"
                style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', minWidth: '160px' }}
              >
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { setTheme(t.id); setShowThemes(false) }}
                    className="px-4 py-2.5 rounded-xl text-sm text-left transition-all"
                    style={theme === t.id
                      ? { background: `${t.color}22`, color: t.color, border: `1px solid ${t.color}44` }
                      : { color: '#94A3B8', background: 'transparent' }
                    }
                    onMouseEnter={e => { if (theme !== t.id) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                    onMouseLeave={e => { if (theme !== t.id) e.currentTarget.style.background = 'transparent' }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PDF Download */}
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="text-xs md:text-sm px-4 py-2 rounded-xl font-semibold transition-all disabled:opacity-60"
            style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }}
          >
            {downloading ? '⏳...' : '⬇ PDF'}
          </button>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="text-xs md:text-sm px-4 py-2 rounded-xl font-semibold transition-all disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg,#7C3AED,#2563EB)', color: 'white' }}
          >
            {saving ? 'Saving...' : '💾 Save'}
          </button>

          {/* Close */}
          <button
            onClick={() => navigate('/dashboard')}
            className="text-xs md:text-sm px-3 py-2 rounded-xl transition-all"
            style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}
          >
            ✕
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="flex h-screen pt-[59px]">

        {/* Form Panel */}
        <div
          className="flex flex-col overflow-hidden"
          style={{ width: showPreview ? '0' : '100%' }}
        >
          {/* Steps */}
          <div
            className="flex overflow-x-auto px-4 py-3 gap-1"
            style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', scrollbarWidth: 'none' }}
          >
            {steps.map((s, i) => (
              <button
                key={s}
                onClick={() => setStep(i)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex-shrink-0"
                style={step === i
                  ? { background: 'linear-gradient(135deg,#7C3AED,#2563EB)', color: 'white' }
                  : { color: '#64748B' }
                }
              >
                {i < step ? '✓ ' : ''}{s}
              </button>
            ))}
          </div>

          {/* Form Body */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <h2 className="text-lg font-bold text-white mb-5">{steps[step]}</h2>
            {renderStep()}
          </div>

          {/* Navigation */}
          <div
            className="flex items-center justify-between px-4 md:px-6 py-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <button
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className="px-4 py-2 rounded-xl text-sm transition-all disabled:opacity-30"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#94A3B8', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              ← Back
            </button>
            <span className="text-xs" style={{ color: '#4B5563' }}>{step + 1} / {steps.length}</span>
            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{ background: 'linear-gradient(135deg,#7C3AED,#2563EB)', color: 'white' }}
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg,#7C3AED,#2563EB)', color: 'white' }}
              >
                {saving ? 'Saving...' : '💾 Save Resume'}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Preview */}
        <div
          className="overflow-y-auto p-4 md:hidden"
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.02)',
            borderLeft: '1px solid rgba(255,255,255,0.06)',
            display: showPreview ? 'block' : 'none',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-white">Live Preview</span>
            <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa' }}>
              {themes.find(t => t.id === theme)?.label}
            </span>
          </div>
          <ResumePreview data={data} theme={theme} />
        </div>

        {/* Desktop Preview */}
        <div
          className="overflow-y-auto p-6 hidden md:block"
          style={{
            width: '55%',
            background: 'rgba(255,255,255,0.02)',
            borderLeft: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-white">Live Preview</span>
            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa' }}>
                {themes.find(t => t.id === theme)?.label}
              </span>
              <button
                onClick={handleDownloadPDF}
                disabled={downloading}
                className="text-xs px-3 py-1.5 rounded-xl font-medium transition-all"
                style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }}
              >
                {downloading ? '⏳...' : '⬇ Download PDF'}
              </button>
            </div>
          </div>
          <ResumePreview data={data} theme={theme} />
        </div>
      </div>
    </div>
  )
}

export default ResumeEditor