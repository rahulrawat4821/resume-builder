const ModernTheme = ({ data }) => (
  <div id="resume-preview" style={{ width: '100%', minHeight: '700px', background: 'white', borderRadius: '8px', overflow: 'hidden', fontSize: '10px', fontFamily: 'system-ui, sans-serif', boxShadow: '0 4px 24px rgba(0,0,0,0.18)', padding: '32px' }}>
    {/* Header */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', paddingBottom: '16px', borderBottom: '3px solid #06B6D4' }}>
      <div>
        <div style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>{data.fullName || 'Your Name'}</div>
        <div style={{ fontSize: '11px', color: '#06B6D4', fontWeight: '600', marginBottom: '8px' }}>{data.jobTitle || 'Job Title'}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {data.email && <span style={{ fontSize: '8px', color: '#64748b' }}>✉ {data.email}</span>}
          {data.phone && <span style={{ fontSize: '8px', color: '#64748b' }}>📞 {data.phone}</span>}
          {data.address && <span style={{ fontSize: '8px', color: '#64748b' }}>📍 {data.address}</span>}
          {data.linkedin && <span style={{ fontSize: '8px', color: '#06B6D4' }}>🔗 {data.linkedin}</span>}
          {data.github && <span style={{ fontSize: '8px', color: '#06B6D4' }}>💻 {data.github}</span>}
        </div>
      </div>
      <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, #06B6D4, #0284c7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '800', color: 'white', flexShrink: 0 }}>
        {data.fullName?.charAt(0)?.toUpperCase() || 'R'}
      </div>
    </div>

    <div style={{ display: 'flex', gap: '24px' }}>
      {/* Left column */}
      <div style={{ width: '35%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {data.summary && (
          <div>
            <div style={{ fontSize: '9px', fontWeight: '700', color: '#06B6D4', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>About Me</div>
            <p style={{ fontSize: '8px', color: '#475569', lineHeight: '1.6' }}>{data.summary}</p>
          </div>
        )}
        {data.skills?.length > 0 && (
          <div>
            <div style={{ fontSize: '9px', fontWeight: '700', color: '#06B6D4', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Skills</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {data.skills.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#06B6D4', flexShrink: 0 }} />
                  <span style={{ fontSize: '8px', color: '#334155' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.languages?.length > 0 && (
          <div>
            <div style={{ fontSize: '9px', fontWeight: '700', color: '#06B6D4', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Languages</div>
            {data.languages.map((l, i) => (
              <div key={i} style={{ fontSize: '8px', color: '#334155', marginBottom: '3px' }}>• {l}</div>
            ))}
          </div>
        )}
        {data.certifications?.length > 0 && (
          <div>
            <div style={{ fontSize: '9px', fontWeight: '700', color: '#06B6D4', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Certifications</div>
            {data.certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: '6px' }}>
                <div style={{ fontSize: '8px', fontWeight: '600', color: '#0f172a' }}>{cert.name}</div>
                <div style={{ fontSize: '7px', color: '#64748b' }}>{cert.issuer}{cert.date ? ` · ${cert.date}` : ''}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {data.experience?.length > 0 && (
          <div>
            <div style={{ fontSize: '9px', fontWeight: '700', color: '#06B6D4', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Experience</div>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '10px', paddingLeft: '10px', borderLeft: '2px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '10px', fontWeight: '600', color: '#0f172a' }}>{exp.jobTitle}</div>
                  <div style={{ fontSize: '8px', color: '#94a3b8' }}>{exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}</div>
                </div>
                <div style={{ fontSize: '9px', color: '#06B6D4', marginBottom: '3px' }}>{exp.company}</div>
                {exp.description && <p style={{ fontSize: '8px', color: '#64748b', lineHeight: '1.5' }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}
        {data.education?.length > 0 && (
          <div>
            <div style={{ fontSize: '9px', fontWeight: '700', color: '#06B6D4', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Education</div>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '8px', paddingLeft: '10px', borderLeft: '2px solid #e2e8f0' }}>
                <div style={{ fontSize: '10px', fontWeight: '600', color: '#0f172a' }}>{edu.degree}</div>
                <div style={{ fontSize: '9px', color: '#06B6D4' }}>{edu.institution}</div>
                <div style={{ fontSize: '8px', color: '#94a3b8' }}>{edu.grade} {edu.startDate}{edu.endDate ? ` – ${edu.endDate}` : ''}</div>
              </div>
            ))}
          </div>
        )}
        {data.projects?.length > 0 && (
          <div>
            <div style={{ fontSize: '9px', fontWeight: '700', color: '#06B6D4', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Projects</div>
            {data.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '10px', paddingLeft: '10px', borderLeft: '2px solid #e2e8f0' }}>
                <div style={{ fontSize: '10px', fontWeight: '600', color: '#0f172a' }}>{proj.name}</div>
                {proj.techStack && <div style={{ fontSize: '8px', color: '#06B6D4', marginBottom: '2px' }}>{proj.techStack}</div>}
                {proj.description && <p style={{ fontSize: '8px', color: '#64748b', lineHeight: '1.5' }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
)

export default ModernTheme