import { StyledInput } from '../StyledInputs'

const addBtnStyle = {
  border: '1px dashed rgba(124,58,237,0.4)',
  color: '#a78bfa',
  background: 'rgba(124,58,237,0.05)'
}

const CertificationsStep = ({ data, onChange }) => {
  const add = () => onChange('certifications', [...data.certifications, { name: '', issuer: '', date: '', description: '' }])
  const remove = (i) => onChange('certifications', data.certifications.filter((_, idx) => idx !== i))
  const update = (i, field, val) => {
    const updated = [...data.certifications]
    updated[i] = { ...updated[i], [field]: val }
    onChange('certifications', updated)
  }

  return (
    <div className="flex flex-col gap-4">
      {data.certifications.map((cert, i) => (
        <div key={i} className="rounded-2xl p-4 flex flex-col gap-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-white">Certification {i + 1}</span>
            <button onClick={() => remove(i)} className="text-xs px-3 py-1 rounded-lg" style={{ color: '#f87171', background: 'rgba(248,113,113,0.1)' }}>Remove</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <StyledInput label="Certificate Name" value={cert.name} onChange={e => update(i, 'name', e.target.value)} placeholder="AWS Cloud Practitioner" />
            <StyledInput label="Issuer" value={cert.issuer} onChange={e => update(i, 'issuer', e.target.value)} placeholder="Amazon Web Services" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <StyledInput label="Date" value={cert.date} onChange={e => update(i, 'date', e.target.value)} placeholder="2024" />
            <StyledInput label="Description" value={cert.description} onChange={e => update(i, 'description', e.target.value)} placeholder="Brief description..." />
          </div>
        </div>
      ))}
      <button
        onClick={add}
        className="py-3 rounded-2xl text-sm font-medium transition-all"
        style={addBtnStyle}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(124,58,237,0.05)'}
      >
        + Add Certification
      </button>
    </div>
  )
}

export default CertificationsStep