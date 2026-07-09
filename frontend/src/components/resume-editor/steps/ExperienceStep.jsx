import { StyledInput, StyledTextarea } from '../StyledInputs'

const addBtnStyle = {
  border: '1px dashed rgba(124,58,237,0.4)',
  color: '#a78bfa',
  background: 'rgba(124,58,237,0.05)',
  cursor: 'pointer'
}

const ExperienceStep = ({ data, onChange }) => {
  const add = () => onChange('experience', [...data.experience, { jobTitle: '', company: '', startDate: '', endDate: '', description: '' }])
  const remove = (i) => onChange('experience', data.experience.filter((_, idx) => idx !== i))
  const update = (i, field, val) => {
    const updated = [...data.experience]
    updated[i] = { ...updated[i], [field]: val }
    onChange('experience', updated)
  }

  return (
    <div className="flex flex-col gap-4">
      {data.experience.length === 0 && (
        <div className="rounded-xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)' }}>
          <p className="text-xs" style={{ color: '#64748B' }}>No experience added yet. Click below to add your work experience.</p>
        </div>
      )}
      {data.experience.map((exp, i) => (
        <div key={i} className="rounded-2xl p-4 flex flex-col gap-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-white">Experience {i + 1}</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <StyledInput label="Job Title" value={exp.jobTitle} onChange={e => update(i, 'jobTitle', e.target.value)} placeholder="e.g. Java Backend Developer" />
            <StyledInput label="Company Name" value={exp.company} onChange={e => update(i, 'company', e.target.value)} placeholder="e.g. Infosys Pvt Ltd" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <StyledInput label="Start Date" value={exp.startDate} onChange={e => update(i, 'startDate', e.target.value)} placeholder="e.g. Jan 2023" />
            <StyledInput label="End Date" value={exp.endDate} onChange={e => update(i, 'endDate', e.target.value)} placeholder="e.g. Dec 2023 or Present" />
          </div>
          <StyledTextarea
            label="Job Description"
            value={exp.description}
            onChange={e => update(i, 'description', e.target.value)}
            placeholder="e.g. Developed REST APIs using Spring Boot, integrated JWT authentication, worked with MongoDB and MySQL databases. Collaborated with frontend team on React.js integration."
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
        + Add Work Experience
      </button>
    </div>
  )
}

export default ExperienceStep