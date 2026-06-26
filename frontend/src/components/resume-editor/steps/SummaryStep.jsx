import { StyledTextarea } from '../StyledInputs'

const SummaryStep = ({ data, onChange }) => (
  <div>
    <StyledTextarea
      label="Professional Summary"
      value={data.summary}
      onChange={e => onChange('summary', e.target.value)}
      placeholder="Write a short professional summary about yourself..."
      rows={8}
    />
    <p className="text-xs mt-2" style={{ color: '#4B5563' }}>
      Tip: Keep it 3-5 sentences. Focus on your key skills and experience.
    </p>
  </div>
)

export default SummaryStep