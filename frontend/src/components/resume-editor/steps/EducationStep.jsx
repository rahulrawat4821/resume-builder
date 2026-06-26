import { StyledInput } from '../StyledInputs'

const addBtnStyle = {
  border: '1px dashed rgba(124,58,237,0.4)',
  color: '#a78bfa',
  background: 'rgba(124,58,237,0.05)'
}

const EducationStep = ({ data, onChange }) => {
  const add = () => onChange('education', [...data.education, { degree: '', institution: '', startDate: '', endDate: '', grade: '' }])
  const remove = (i) => onChange('education', data.education.filter((_, idx) => idx !== i))
  const update = (i, field, val) => {
    const updated = [...data.education]
    updated[i] = { ...updated[i], [field]: val }
    onChange('education', updated)
  }

  return (
    <div className="flex flex-col gap-4">
      {data.education.map((edu, i) => (
        <div key={i} className="rounded-2xl p-4 flex flex-col gap-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-white">Education {i + 1}</span>
            <button onClick={() => remove(i)} className="text-xs px-3 py-1 rounded-lg" style={{ color: '#f87171', background: 'rgba(248,113,113,0.1)' }}>Remove</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <StyledInput label="Degree" value={edu.degree} onChange={e => update(i, 'degree', e.target.value)} placeholder="B.Tech Computer Science" />
            <StyledInput label="Institution" value={edu.institution} onChange={e => update(i, 'institution', e.target.value)} placeholder="Oriental College" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <StyledInput label="Start Date" value={edu.startDate} onChange={e => update(i, 'startDate', e.target.value)} placeholder="08/2021" />
            <StyledInput label="End Date" value={edu.endDate} onChange={e => update(i, 'endDate', e.target.value)} placeholder="06/2025" />
          </div>
          <StyledInput label="Grade / CGPA" value={edu.grade} onChange={e => update(i, 'grade', e.target.value)} placeholder="CGPA: 8.5" />
        </div>
      ))}
      <button
        onClick={add}
        className="py-3 rounded-2xl text-sm font-medium transition-all"
        style={addBtnStyle}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(124,58,237,0.05)'}
      >
        + Add Education
      </button>
    </div>
  )
}

export default EducationStep