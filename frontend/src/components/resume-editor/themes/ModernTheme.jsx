const ModernTheme = ({ data }) => (
  <div
    id="resume-preview"
    style={{
      width: '100%',
      minHeight: '700px',
      background: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      fontSize: '10px',
      fontFamily: 'Georgia, serif',
      boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
      padding: '32px 40px',
      color: '#1a1a1a',
    }}
  >
    {/* Header */}
    <div style={{ textAlign: 'center', marginBottom: '16px', borderBottom: '2px solid #1a1a1a', paddingBottom: '12px' }}>
      {/* Profile Photo */}
      {data.profilePhoto && (
        <img
          src={data.profilePhoto}
          alt="Profile"
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            objectFit: 'cover',
            margin: '0 auto 8px',
            display: 'block',
            border: '2px solid #1a1a1a'
          }}
        />
      )}
      <div style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a1a', letterSpacing: '0.05em' }}>
        {data.fullName || 'Your Name'}
      </div>
      <div style={{ fontSize: '11px', color: '#7C3AED', fontWeight: '500', marginTop: '3px', fontStyle: 'italic' }}>
        {data.jobTitle || 'Job Title'}
      </div>

      {/* Contact info in one line */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginTop: '8px' }}>
        {data.email && (
          <span style={{ fontSize: '8px', color: '#374151' }}>✉ {data.email}</span>
        )}
        {data.phone && (
          <span style={{ fontSize: '8px', color: '#374151' }}>📞 {data.phone}</span>
        )}
        {data.github && (
          <span style={{ fontSize: '8px', color: '#374151' }}>
            <a href={`https://${data.github}`} style={{ color: '#374151', textDecoration: 'none' }}>
              🔗 {data.github}
            </a>
          </span>
        )}
        {data.linkedin && (
          <span style={{ fontSize: '8px', color: '#374151' }}>
            <a href={`https://${data.linkedin}`} style={{ color: '#374151', textDecoration: 'none' }}>
              🔗 {data.linkedin}
            </a>
          </span>
        )}
        {data.website && (
          <span style={{ fontSize: '8px', color: '#374151' }}>🌐 {data.website}</span>
        )}
      </div>
    </div>

    {/* Summary */}
    {data.summary && (
      <div style={{ marginBottom: '14px' }}>
        <div style={{
          fontSize: '10px',
          fontWeight: '700',
          color: '#1a1a1a',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          borderBottom: '1px solid #1a1a1a',
          paddingBottom: '3px',
          marginBottom: '6px'
        }}>
          Professional Summary
        </div>
        <p style={{ fontSize: '9px', color: '#374151', lineHeight: '1.6', textAlign: 'justify' }}>
          {data.summary}
        </p>
      </div>
    )}

    {/* Education */}
    {data.education?.length > 0 && (
      <div style={{ marginBottom: '14px' }}>
        <div style={{
          fontSize: '10px',
          fontWeight: '700',
          color: '#1a1a1a',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          borderBottom: '1px solid #1a1a1a',
          paddingBottom: '3px',
          marginBottom: '8px'
        }}>
          Education
        </div>
        {data.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#1a1a1a' }}>{edu.degree}</div>
                <div style={{ fontSize: '9px', color: '#374151', fontStyle: 'italic' }}>{edu.institution}</div>
                {edu.grade && (
                  <div style={{ fontSize: '8px', color: '#374151', marginTop: '2px' }}>• {edu.grade}</div>
                )}
              </div>
              <div style={{ fontSize: '8px', color: '#374151', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                {edu.startDate}{edu.endDate ? ` – ${edu.endDate}` : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Skills */}
    {data.skills?.length > 0 && (
      <div style={{ marginBottom: '14px' }}>
        <div style={{
          fontSize: '10px',
          fontWeight: '700',
          color: '#1a1a1a',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          borderBottom: '1px solid #1a1a1a',
          paddingBottom: '3px',
          marginBottom: '6px'
        }}>
          Skills
        </div>
        <div style={{ fontSize: '9px', color: '#374151', lineHeight: '1.6' }}>
          <span style={{ fontWeight: '600' }}>Technical Skills</span>
          <br />
          {data.skills.join(', ')}
        </div>
      </div>
    )}

    {/* Certifications */}
    {data.certifications?.length > 0 && (
      <div style={{ marginBottom: '14px' }}>
        <div style={{
          fontSize: '10px',
          fontWeight: '700',
          color: '#1a1a1a',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          borderBottom: '1px solid #1a1a1a',
          paddingBottom: '3px',
          marginBottom: '8px'
        }}>
          Certificates
        </div>
        {data.certifications.map((cert, i) => (
          <div key={i} style={{ marginBottom: '6px' }}>
            <span style={{ fontSize: '9px', fontWeight: '700', color: '#7C3AED' }}>{cert.name}: </span>
            <span style={{ fontSize: '9px', color: '#374151' }}>{cert.description}</span>
          </div>
        ))}
      </div>
    )}

    {/* Projects */}
    {data.projects?.length > 0 && (
      <div style={{ marginBottom: '14px' }}>
        <div style={{
          fontSize: '10px',
          fontWeight: '700',
          color: '#1a1a1a',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          borderBottom: '1px solid #1a1a1a',
          paddingBottom: '3px',
          marginBottom: '8px'
        }}>
          Projects
        </div>
        {data.projects.map((proj, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', color: '#1a1a1a' }}>{proj.name}</div>
              {proj.link && (
                <a href={`https://${proj.link}`} style={{ fontSize: '8px', color: '#7C3AED' }}>{proj.link}</a>
              )}
            </div>
            {proj.techStack && (
              <div style={{ fontSize: '8px', color: '#7C3AED', fontStyle: 'italic', marginBottom: '3px' }}>
                Tech Stack: {proj.techStack}
              </div>
            )}
            {proj.description && (
              <p style={{ fontSize: '8px', color: '#374151', lineHeight: '1.5' }}>{proj.description}</p>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Experience */}
    {data.experience?.length > 0 && (
      <div style={{ marginBottom: '14px' }}>
        <div style={{
          fontSize: '10px',
          fontWeight: '700',
          color: '#1a1a1a',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          borderBottom: '1px solid #1a1a1a',
          paddingBottom: '3px',
          marginBottom: '8px'
        }}>
          Experience
        </div>
        {data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#1a1a1a' }}>{exp.jobTitle}</div>
                <div style={{ fontSize: '9px', color: '#374151', fontStyle: 'italic' }}>{exp.company}</div>
              </div>
              <div style={{ fontSize: '8px', color: '#374151', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                {exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}
              </div>
            </div>
            {exp.description && (
              <p style={{ fontSize: '8px', color: '#374151', lineHeight: '1.5', marginTop: '3px' }}>
                {exp.description}
              </p>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Languages */}
    {data.languages?.length > 0 && (
      <div style={{ marginBottom: '14px' }}>
        <div style={{
          fontSize: '10px',
          fontWeight: '700',
          color: '#1a1a1a',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          borderBottom: '1px solid #1a1a1a',
          paddingBottom: '3px',
          marginBottom: '6px'
        }}>
          Languages
        </div>
        <div style={{ fontSize: '9px', color: '#374151' }}>
          {data.languages.join(' • ')}
        </div>
      </div>
    )}
  </div>
)

export default ModernTheme