import { StyledInput, StyledTextarea } from '../StyledInputs'

const addBtnStyle = {
  border: '1px dashed rgba(124,58,237,0.4)',
  color: '#a78bfa',
  background: 'rgba(124,58,237,0.05)',
  cursor: 'pointer'
}

const ProjectsStep = ({ data, onChange }) => {
  const add = () => onChange('projects', [...data.projects, { name: '', techStack: '', description: '', link: '' }])
  const remove = (i) => onChange('projects', data.projects.filter((_, idx) => idx !== i))
  const update = (i, field, val) => {
    const updated = [...data.projects]
    updated[i] = { ...updated[i], [field]: val }
    onChange('projects', updated)
  }

  return (
    <div className="flex flex-col gap-4">
      {data.projects.length === 0 && (
        <div className="rounded-xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)' }}>
          <p className="text-xs" style={{ color: '#64748B' }}>No projects added yet. Click below to showcase your projects.</p>
        </div>
      )}
      {data.projects.map((proj, i) => (
        <div key={i} className="rounded-2xl p-4 flex flex-col gap-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-white">Project {i + 1}</span>
            <button
              onClick={() => remove(i)}
              className="text-xs px-3 py-1 rounded-lg transition-all"
              style={{ color: '#f87171', background: 'rgba(248,113,113,0.1)', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(248,113,113,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(248,113,113,0.1)'}
            >
              🗑 Remove
            </button>
          </div>

          {/* ✅ Project Name + GitHub Link side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <StyledInput
              label="Project Name"
              value={proj.name}
              onChange={e => update(i, 'name', e.target.value)}
              placeholder="e.g. Resume Builder"
            />
            {/* ✅ GitHub/Live link right below project name */}
            <StyledInput
              label="GitHub / Live Link"
              value={proj.link}
              onChange={e => update(i, 'link', e.target.value)}
              placeholder="e.g. github.com/rahulrawat4821/resume-builder"
            />
          </div>

          <StyledInput
            label="Tech Stack"
            value={proj.techStack}
            onChange={e => update(i, 'techStack', e.target.value)}
            placeholder="e.g. React, Spring Boot, MongoDB, JWT"
          />

          <StyledTextarea
            label="Project Description"
            value={proj.description}
            onChange={e => update(i, 'description', e.target.value)}
            placeholder="e.g. A full-stack resume builder with live preview, multiple themes, JWT authentication, PDF download and Razorpay payment integration."
            rows={3}
          />
        </div>
      ))}
      <button
        onClick={add}
        className="py-3 rounded-2xl text-sm font-medium transition-all"
        style={addBtnStyle}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(124,58,237,0.05)'}
      >
        + Add Project
      </button>
    </div>
  )
}

export default ProjectsStep