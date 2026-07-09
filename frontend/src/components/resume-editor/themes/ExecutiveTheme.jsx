const ExecutiveTheme = ({ data }) => (
  <div id="resume-preview" style={{
    width: '100%',
    background: '#0f172a',
    borderRadius: '8px',
    overflow: 'hidden',
    fontSize: '10px',
    fontFamily: 'system-ui, sans-serif',
    boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
    color: 'white',
  }}>
    {/* Top accent */}
    <div style={{ height: '4px', background: 'linear-gradient(90deg, #7C3AED, #06B6D4, #4ADE80)' }} />

    {/* Header */}
    <div style={{ padding: '24px 32px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {data.profilePhoto ? (
          <img
            src={data.profilePhoto}
            alt="Profile"
            style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover', border: '2px solid rgba(124,58,237,0.5)', flexShrink: 0 }}
          />
        ) : (
          <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'linear-gradient(135deg, #7C3AED, #2563EB)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '800', color: 'white', flexShrink: 0 }}>
            {data.fullName?.charAt(0)?.toUpperCase() || 'R'}
          </div>
        )}
        <div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: 'white', marginBottom: '3px' }}>{data.fullName || 'Your Name'}</div>
          <div style={{ fontSize: '10px', color: '#a78bfa', fontWeight: '500' }}>{data.jobTitle || 'Job Title'}</div>
        </div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        {data.email && <div style={{ fontSize: '8px', color: '#94a3b8', marginBottom: '3px' }}>✉ {data.email}</div>}
        {data.phone && <div style={{ fontSize: '8px', color: '#94a3b8', marginBottom: '3px' }}>📞 {data.phone}</div>}
        {data.address && <div style={{ fontSize: '8px', color: '#94a3b8', marginBottom: '3px' }}>📍 {data.address}</div>}
        {data.linkedin && <div style={{ fontSize: '8px', color: '#a78bfa', marginBottom: '3px' }}>🔗 {data.linkedin}</div>}
        {data.github && <div style={{ fontSize: '8px', color: '#a78bfa' }}>💻 {data.github}</div>}
      </div>
    </div>

    {/* Body */}
    <div style={{ display: 'flex' }}>
      {/* Left */}
      <div style={{ width: '38%', padding: '16px 16px 16px 32px', borderRight: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {data.skills?.length > 0 && (
          <div>
            <div style={{ fontSize: '8px', fontWeight: '700', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>Skills</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {data.skills.map((s, i) => (
                <span key={i} style={{ fontSize: '7px', padding: '3px 8px', borderRadius: '999px', background: 'rgba(124,58,237,0.2)', color: '#c4b5fd', border: '1px solid rgba(124,58,237,0.3)' }}>{s}</span>
              ))}
            </div>
          </div>
        )}
        {data.education?.length > 0 && (
          <div>
            <div style={{ fontSize: '8px', fontWeight: '700', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>Education</div>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '9px', fontWeight: '600', color: 'white' }}>{edu.degree}</div>
                <div style={{ fontSize: '8px', color: '#94a3b8' }}>{edu.institution}</div>
                <div style={{ fontSize: '7px', color: '#64748b' }}>{edu.grade} {edu.startDate}{edu.endDate ? ` – ${edu.endDate}` : ''}</div>
              </div>
            ))}
          </div>
        )}
        {data.certifications?.length > 0 && (
          <div>
            <div style={{ fontSize: '8px', fontWeight: '700', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>Certifications</div>
            {data.certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: '6px' }}>
                <div style={{ fontSize: '8px', fontWeight: '600', color: 'white' }}>{cert.name}</div>
                <div style={{ fontSize: '7px', color: '#64748b' }}>{cert.issuer}{cert.date ? ` · ${cert.date}` : ''}</div>
              </div>
            ))}
          </div>
        )}
        {data.languages?.length > 0 && (
          <div>
            <div style={{ fontSize: '8px', fontWeight: '700', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>Languages</div>
            {data.languages.map((l, i) => (
              <div key={i} style={{ fontSize: '8px', color: '#94a3b8', marginBottom: '3px' }}>• {l}</div>
            ))}
          </div>
        )}
      </div>

      {/* Right */}
      <div style={{ flex: 1, padding: '16px 32px 16px 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {data.summary && (
          <div>
            <div style={{ fontSize: '8px', fontWeight: '700', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>Summary</div>
            <p style={{ fontSize: '8px', color: '#94a3b8', lineHeight: '1.6' }}>{data.summary}</p>
          </div>
        )}
        {data.experience?.length > 0 && (
          <div>
            <div style={{ fontSize: '8px', fontWeight: '700', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>Experience</div>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '10px', paddingLeft: '10px', borderLeft: '2px solid rgba(124,58,237,0.4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <div style={{ fontSize: '9px', fontWeight: '600', color: 'white' }}>{exp.jobTitle}</div>
                  <div style={{ fontSize: '7px', color: '#64748b' }}>{exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}</div>
                </div>
                <div style={{ fontSize: '8px', color: '#a78bfa', marginBottom: '3px' }}>{exp.company}</div>
                {exp.description && <p style={{ fontSize: '7px', color: '#64748b', lineHeight: '1.5' }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}
        {data.projects?.length > 0 && (
          <div>
            <div style={{ fontSize: '8px', fontWeight: '700', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>Projects</div>
            {data.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '10px', paddingLeft: '10px', borderLeft: '2px solid rgba(6,182,212,0.4)' }}>
                <div style={{ fontSize: '9px', fontWeight: '600', color: 'white' }}>{proj.name}</div>
                {proj.techStack && <div style={{ fontSize: '7px', color: '#06B6D4', marginBottom: '2px' }}>{proj.techStack}</div>}
                {proj.description && <p style={{ fontSize: '7px', color: '#64748b', lineHeight: '1.5' }}>{proj.description}</p>}
                {proj.link && <div style={{ fontSize: '7px', color: '#a78bfa', marginTop: '2px' }}>{proj.link}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
)

export default ExecutiveTheme