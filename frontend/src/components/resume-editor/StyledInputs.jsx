export const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
export const inputStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  cursor: 'text'
}

export const StyledInput = ({ label, ...props }) => (
  <div>
    {label && <label className="block text-xs mb-2" style={{ color: '#94A3B8' }}>{label}</label>}
    <input
      className={inputClass}
      style={inputStyle}
      onFocus={e => e.target.style.borderColor = '#7C3AED'}
      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
      {...props}
    />
  </div>
)

export const StyledTextarea = ({ label, ...props }) => (
  <div>
    {label && <label className="block text-xs mb-2" style={{ color: '#94A3B8' }}>{label}</label>}
    <textarea
      className={inputClass}
      style={{ ...inputStyle, resize: 'none' }}
      rows={4}
      onFocus={e => e.target.style.borderColor = '#7C3AED'}
      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
      {...props}
    />
  </div>
)