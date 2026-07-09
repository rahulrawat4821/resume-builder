import { StyledTextarea } from '../StyledInputs'

const SummaryStep = ({ data, onChange }) => (
  <div className="flex flex-col gap-4">
    <StyledTextarea
      label="Professional Summary"
      value={data.summary}
      onChange={e => onChange('summary', e.target.value)}
      placeholder="e.g. Java Full Stack Developer with 2+ years of experience building scalable web applications using Spring Boot and React.js. Proficient in REST APIs, JWT authentication, MongoDB, and cloud deployments. Passionate about writing clean, maintainable code and delivering high-quality software."
      rows={8}
    />
    <div className="rounded-xl p-4" style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}>
      <p className="text-xs font-medium mb-2" style={{ color: '#a78bfa' }}>💡 Tips for a strong summary:</p>
      <ul className="text-xs flex flex-col gap-1" style={{ color: '#64748B' }}>
        <li>• Keep it 3-5 sentences</li>
        <li>• Mention your top 2-3 technical skills</li>
        <li>• Include years of experience or key projects</li>
        <li>• End with your career goal</li>
      </ul>
    </div>
  </div>
)

export default SummaryStep