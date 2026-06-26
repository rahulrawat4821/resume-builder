import { StyledInput, StyledTextarea } from '../StyledInputs'

const addBtnStyle = {
  border: '1px dashed rgba(124,58,237,0.4)',
  color: '#a78bfa',
  background: 'rgba(124,58,237,0.05)'
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
      {data.experience.map((exp, i) => (
        <div key={i} className="rounded-2xl p-4 flex flex-col gap-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-white">Experience {i + 1}</span>
            <button onClick={() => remove(i)} className="text-xs px-3 py-1 rounded-lg" style={{ color: '#f87171', background: 'rgba(248,113,113,0.1)' }}>Remove</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <StyledInput label="Job Title" value={exp.jobTitle} onChange={e => update(i, 'jobTitle', e.target.value)} placeholder="Full Stack Developer" />
            <StyledInput label="Company" value={exp.company} onChange={e => update(i, 'company', e.target.value)} placeholder="Infosys" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <StyledInput label="Start Date" value={exp.startDate} onChange={e => update(i, 'startDate', e.target.value)} placeholder="01/2023" />
            <StyledInput label="End Date" value={exp.endDate} onChange={e => update(i, 'endDate', e.target.value)} placeholder="Present" />
          </div>
          <StyledTextarea label="Description" value={exp.description} onChange={e => update(i, 'description', e.target.value)} placeholder="Describe your responsibilities..." rows={3} />
        </div>
      ))}
      <button
        onClick={add}
        className="py-3 rounded-2xl text-sm font-medium transition-all"
        style={addBtnStyle}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(124,58,237,0.05)'}
      >
        + Add Experience
      </button>
    </div>
  )
}

export default ExperienceStep