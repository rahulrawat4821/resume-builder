import { useState } from 'react'
import { inputClass, inputStyle } from '../StyledInputs'

const SkillsStep = ({ data, onChange }) => {
  const [input, setInput] = useState('')
  const [langInput, setLangInput] = useState('')

  const addSkill = () => {
    if (!input.trim()) return
    onChange('skills', [...data.skills, input.trim()])
    setInput('')
  }

  const removeSkill = (i) => onChange('skills', data.skills.filter((_, idx) => idx !== i))

  const addLang = () => {
    if (!langInput.trim()) return
    onChange('languages', [...data.languages, langInput.trim()])
    setLangInput('')
  }

  const removeLang = (i) => onChange('languages', data.languages.filter((_, idx) => idx !== i))

  return (
    <div className="flex flex-col gap-6">
      {/* Skills */}
      <div>
        <label className="block text-xs mb-2" style={{ color: '#94A3B8' }}>Skills</label>
        <div className="flex gap-2 mb-3">
          <input
            className={inputClass + ' flex-1'}
            style={inputStyle}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addSkill()}
            placeholder="Type a skill and press Enter"
            onFocus={e => e.target.style.borderColor = '#7C3AED'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
          <button
            onClick={addSkill}
            className="px-4 rounded-xl text-sm font-medium"
            style={{ background: 'linear-gradient(135deg,#7C3AED,#2563EB)', color: 'white' }}
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, i) => (
            <span key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium" style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.3)' }}>
              {skill}
              <button onClick={() => removeSkill(i)} style={{ color: '#f87171' }}>×</button>
            </span>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div>
        <label className="block text-xs mb-2" style={{ color: '#94A3B8' }}>Languages</label>
        <div className="flex gap-2 mb-3">
          <input
            className={inputClass + ' flex-1'}
            style={inputStyle}
            value={langInput}
            onChange={e => setLangInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addLang()}
            placeholder="Type a language and press Enter"
            onFocus={e => e.target.style.borderColor = '#7C3AED'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
          <button
            onClick={addLang}
            className="px-4 rounded-xl text-sm font-medium"
            style={{ background: 'linear-gradient(135deg,#7C3AED,#2563EB)', color: 'white' }}
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.languages.map((lang, i) => (
            <span key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium" style={{ background: 'rgba(37,99,235,0.15)', color: '#93c5fd', border: '1px solid rgba(37,99,235,0.3)' }}>
              {lang}
              <button onClick={() => removeLang(i)} style={{ color: '#f87171' }}>×</button>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkillsStep