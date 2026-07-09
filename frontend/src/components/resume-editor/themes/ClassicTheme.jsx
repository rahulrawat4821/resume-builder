const ClassicTheme = ({ data }) => (
  <div id="resume-preview" style={{ display: 'flex', width: '100%', minHeight: '700px', background: 'white', borderRadius: '8px', overflow: 'hidden', fontSize: '10px', fontFamily: 'system-ui, sans-serif', boxShadow: '0 4px 24px rgba(0,0,0,0.18)' }}>

    {/* LEFT SIDEBAR */}
    <div style={{ width: '200px', minWidth: '200px', maxWidth: '200px', background: 'linear-gradient(160deg, #1e1b4b 0%, #312e81 100%)', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '16px', overflowWrap: 'break-word', wordBreak: 'break-word' }}>

      {/* Avatar */}
      <div style={{ textAlign: 'center' }}>
        {data.profilePhoto ? (
          <img
            src={data.profilePhoto}
            alt="Profile"
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              objectFit: 'cover',
              margin: '0 auto 10px',
              display: 'block',
              border: '3px solid rgba(124,58,237,0.6)'
            }}
          />
        ) : (
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7C3AED, #2563EB)',
            margin: '0 auto 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '26px',
            fontWeight: '700',
            color: 'white',
          }}>
            {data.fullName?.charAt(0)?.toUpperCase() || 'R'}
          </div>
        )}
        <div style={{ fontWeight: '700', fontSize: '12px', color: 'white', marginBottom: '3px', wordBreak: 'break-word' }}>
          {data.fullName || 'Your Name'}
        </div>
        <div style={{ fontSize: '9px', color: '#a5b4fc', wordBreak: 'break-word' }}>
          {data.jobTitle || 'Job Title'}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }} />

      {/* Contact */}
      <div>
        <div style={{ fontSize: '8px', fontWeight: '700', color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
          Contact
        </div>
        {data.email && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', marginBottom: '6px' }}>
            <span style={{ color: '#818cf8', flexShrink: 0, marginTop: '1px' }}>✉</span>
            <span style={{ fontSize: '8px', color: '#c7d2fe', wordBreak: 'break-all', lineHeight: '1.4' }}>{data.email}</span>
          </div>
        )}
        {data.phone && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', marginBottom: '6px' }}>
            <span style={{ color: '#818cf8', flexShrink: 0 }}>📞</span>
            <span style={{ fontSize: '8px', color: '#c7d2fe', wordBreak: 'break-all' }}>{data.phone}</span>
          </div>
        )}
        {data.address && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', marginBottom: '6px' }}>
            <span style={{ color: '#818cf8', flexShrink: 0 }}>📍</span>
            <span style={{ fontSize: '8px', color: '#c7d2fe', wordBreak: 'break-word', lineHeight: '1.4' }}>{data.address}</span>
          </div>
        )}
        {data.linkedin && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', marginBottom: '6px' }}>
            <span style={{ color: '#818cf8', flexShrink: 0 }}>🔗</span>
            <span style={{ fontSize: '8px', color: '#c7d2fe', wordBreak: 'break-all', lineHeight: '1.4' }}>{data.linkedin}</span>
          </div>
        )}
        {data.github && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', marginBottom: '6px' }}>
            <span style={{ color: '#818cf8', flexShrink: 0 }}>💻</span>
            <span style={{ fontSize: '8px', color: '#c7d2fe', wordBreak: 'break-all', lineHeight: '1.4' }}>{data.github}</span>
          </div>
        )}  
        {data.website && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', marginBottom: '6px' }}>
            <span style={{ color: '#818cf8', flexShrink: 0 }}>🌐</span>
            <span style={{ fontSize: '8px', color: '#c7d2fe', wordBreak: 'break-all', lineHeight: '1.4' }}>{data.website}</span>
          </div>
        )}
      </div>

      {/* Skills */}
      {data.skills?.length > 0 && (
        <div>
          <div style={{ fontSize: '8px', fontWeight: '700', color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
            Skills
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {data.skills.map((s, i) => (
              <span key={i} style={{ background: 'rgba(124,58,237,0.35)', color: '#c7d2fe', padding: '2px 7px', borderRadius: '4px', fontSize: '8px', wordBreak: 'break-word' }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages?.length > 0 && (
        <div>
          <div style={{ fontSize: '8px', fontWeight: '700', color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
            Languages
          </div>
          {data.languages.map((l, i) => (
            <div key={i} style={{ fontSize: '8px', color: '#c7d2fe', marginBottom: '4px' }}>• {l}</div>
          ))}
        </div>
      )}
    </div>

    {/* RIGHT CONTENT */}
    <div style={{ flex: 1, background: '#ffffff', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>

      {/* Name Header */}
      <div style={{ borderBottom: '2px solid #7C3AED', paddingBottom: '10px' }}>
        <div style={{ fontSize: '20px', fontWeight: '700', color: '#1e1b4b' }}>{data.fullName || 'Your Name'}</div>
        <div style={{ fontSize: '11px', color: '#7C3AED', fontWeight: '500', marginTop: '2px' }}>{data.jobTitle || ''}</div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div>
          <div style={{ fontSize: '9px', fontWeight: '700', color: '#1e1b4b', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', marginBottom: '8px' }}>
            Professional Summary
          </div>
          <p style={{ fontSize: '9px', color: '#374151', lineHeight: '1.6' }}>{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <div>
          <div style={{ fontSize: '9px', fontWeight: '700', color: '#1e1b4b', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', marginBottom: '8px' }}>
            Work Experience
          </div>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: '600', color: '#111827' }}>{exp.jobTitle}</div>
                  <div style={{ fontSize: '9px', color: '#6b7280' }}>{exp.company}</div>
                </div>
                <div style={{ fontSize: '8px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                  {exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}
                </div>
              </div>
              {exp.description && (
                <p style={{ fontSize: '8px', color: '#6b7280', lineHeight: '1.5', marginTop: '3px' }}>{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <div>
          <div style={{ fontSize: '9px', fontWeight: '700', color: '#1e1b4b', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', marginBottom: '8px' }}>
            Education
          </div>
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '10px', fontWeight: '600', color: '#111827' }}>{edu.degree}</div>
              <div style={{ fontSize: '9px', color: '#6b7280' }}>
                {edu.institution}{edu.grade ? ` · ${edu.grade}` : ''}
              </div>
              <div style={{ fontSize: '8px', color: '#9ca3af' }}>
                {edu.startDate}{edu.endDate ? ` – ${edu.endDate}` : ''}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <div>
          <div style={{ fontSize: '9px', fontWeight: '700', color: '#1e1b4b', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', marginBottom: '8px' }}>
            Projects
          </div>
          {data.projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <div style={{ fontSize: '10px', fontWeight: '600', color: '#111827' }}>{proj.name}</div>
              {proj.techStack && (
                <div style={{ fontSize: '8px', color: '#7C3AED', marginBottom: '2px' }}>{proj.techStack}</div>
              )}
              {proj.description && (
                <p style={{ fontSize: '8px', color: '#6b7280', lineHeight: '1.5' }}>{proj.description}</p>
              )}
              {proj.link && (
                <div style={{ fontSize: '8px', color: '#2563EB', marginTop: '2px' }}>{proj.link}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {data.certifications?.length > 0 && (
        <div>
          <div style={{ fontSize: '9px', fontWeight: '700', color: '#1e1b4b', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', marginBottom: '8px' }}>
            Certifications
          </div>
          {data.certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '10px', fontWeight: '600', color: '#111827' }}>{cert.name}</div>
              <div style={{ fontSize: '9px', color: '#6b7280' }}>
                {cert.issuer}{cert.date ? ` · ${cert.date}` : ''}
              </div>
              {cert.description && (
                <p style={{ fontSize: '8px', color: '#9ca3af', lineHeight: '1.5' }}>{cert.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    

  </div>
)

export default ClassicTheme