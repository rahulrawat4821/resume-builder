import { StyledInput, StyledTextarea } from '../StyledInputs'

const addBtnStyle = {
  border: '1px dashed rgba(124,58,237,0.4)',
  color: '#a78bfa',
  background: 'rgba(124,58,237,0.05)',
  cursor: 'pointer'
}

const CertificationsStep = ({ data, onChange }) => {
  const add = () => onChange('certifications', [...data.certifications, { name: '', issuer: '', date: '', description: '', link: '' }])
  const remove = (i) => onChange('certifications', data.certifications.filter((_, idx) => idx !== i))
  const update = (i, field, val) => {
    const updated = [...data.certifications]
    updated[i] = { ...updated[i], [field]: val }
    onChange('certifications', updated)
  }

  return (
    <div className="flex flex-col gap-4">
      {data.certifications.length === 0 && (
        <div className="rounded-xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)' }}>
          <p className="text-xs" style={{ color: '#64748B' }}>No certifications added yet. Click below to add your certifications.</p>
        </div>
      )}
      {data.certifications.map((cert, i) => (
        <div key={i} className="rounded-2xl p-4 flex flex-col gap-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-white">Certification {i + 1}</span>
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

          {/* ✅ Certificate Name + Link side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <StyledInput
              label="Certificate Name"
              value={cert.name}
              onChange={e => update(i, 'name', e.target.value)}
              placeholder="e.g. AWS Cloud Practitioner"
            />
            {/* ✅ Certificate Link */}
            <StyledInput
              label="Certificate Link (optional)"
              value={cert.link || ''}
              onChange={e => update(i, 'link', e.target.value)}
              placeholder="e.g. coursera.org/verify/your-cert-id"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <StyledInput
              label="Issuing Organization"
              value={cert.issuer}
              onChange={e => update(i, 'issuer', e.target.value)}
              placeholder="e.g. Amazon Web Services"
            />
            <StyledInput
              label="Year / Date Issued"
              value={cert.date}
              onChange={e => update(i, 'date', e.target.value)}
              placeholder="e.g. 2024 or March 2024"
            />
          </div>

          <StyledTextarea
            label="Description (optional)"
            value={cert.description}
            onChange={e => update(i, 'description', e.target.value)}
            placeholder="e.g. Completed comprehensive training on AWS cloud fundamentals including EC2, S3, RDS, Lambda and cloud architecture best practices."
            rows={2}
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
        + Add Certification
      </button>
    </div>
  )
}

export default CertificationsStep