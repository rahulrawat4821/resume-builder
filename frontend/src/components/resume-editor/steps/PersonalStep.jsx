import { StyledInput } from '../StyledInputs'

const PersonalStep = ({ data, onChange }) => (
  <div className="flex flex-col gap-4">
    <StyledInput label="Resume Title" value={data.title} onChange={e => onChange('title', e.target.value)} placeholder="My Resume" />
    <div className="grid grid-cols-2 gap-4">
      <StyledInput label="Full Name" value={data.fullName} onChange={e => onChange('fullName', e.target.value)} placeholder="Rahul Rawat" />
      <StyledInput label="Job Title" value={data.jobTitle} onChange={e => onChange('jobTitle', e.target.value)} placeholder="Full Stack Developer" />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <StyledInput label="Email" type="email" value={data.email} onChange={e => onChange('email', e.target.value)} placeholder="rahul@gmail.com" />
      <StyledInput label="Phone" value={data.phone} onChange={e => onChange('phone', e.target.value)} placeholder="+91 9999999999" />
    </div>
    <StyledInput label="Address" value={data.address} onChange={e => onChange('address', e.target.value)} placeholder="Bhopal, Madhya Pradesh, India" />
    <div className="grid grid-cols-2 gap-4">
      <StyledInput label="LinkedIn" value={data.linkedin} onChange={e => onChange('linkedin', e.target.value)} placeholder="linkedin.com/in/rahul" />
      <StyledInput label="GitHub" value={data.github} onChange={e => onChange('github', e.target.value)} placeholder="github.com/rahul" />
    </div>
    <StyledInput label="Website" value={data.website} onChange={e => onChange('website', e.target.value)} placeholder="rahul.dev" />
  </div>
)

export default PersonalStep