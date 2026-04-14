import React, { useRef, useEffect } from 'react';
import { SKILLS_DATA } from '../constants';

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll<HTMLElement>('.skill-card').forEach((el, i) => {
            setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, i * 100);
          });
          entry.target.querySelectorAll<HTMLElement>('[data-target]').forEach(bar => {
            bar.style.width = bar.dataset.target || '0%';
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{ background: '#f5f5f7', padding: '100px 0', color: '#1d1d1f' }}
    >
      <div className="container-wide">
        {/* Header — all colors explicit */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <p style={{
            fontSize: '12px', fontWeight: 600,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: '#0071e3', marginBottom: '12px',
          }}>
            Expertise
          </p>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 600, lineHeight: 1.10,
            letterSpacing: '-0.3px', color: '#1d1d1f',
            marginBottom: '16px',
          }}>
            Technical Skills
          </h2>
          <p style={{
            fontSize: '17px', lineHeight: 1.47,
            letterSpacing: '-0.374px', color: 'rgba(0,0,0,0.56)',
            maxWidth: '540px', margin: '0 auto',
          }}>
            Specializing in Microsoft Azure, enterprise security, and cross-platform endpoint management.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {SKILLS_DATA.map((skill, idx) => (
            <div
              key={idx}
              className="skill-card"
              style={{
                background: '#ffffff',
                borderRadius: '8px',
                padding: '28px',
                boxShadow: 'rgba(0,0,0,0.22) 3px 5px 30px 0px',
                opacity: 0,
                transform: 'translateY(16px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                transitionDelay: `${idx * 0.07}s`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <h3 style={{
                  fontSize: '17px', fontWeight: 600,
                  color: '#1d1d1f', letterSpacing: '-0.374px',
                  lineHeight: 1.24,
                }}>
                  {skill.category}
                </h3>
                <span style={{
                  fontSize: '13px', fontWeight: 600,
                  color: '#0071e3', flexShrink: 0, marginLeft: '12px',
                }}>
                  {skill.proficiency}%
                </span>
              </div>

              {/* Progress bar — fully inline, no class color dependency */}
              <div style={{
                width: '100%', height: '3px',
                background: 'rgba(0,0,0,0.08)',
                borderRadius: '999px', overflow: 'hidden',
                marginBottom: '20px',
              }}>
                <div
                  data-target={`${skill.proficiency}%`}
                  style={{
                    height: '100%',
                    background: '#0071e3',
                    borderRadius: '999px',
                    width: '0%',
                    transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
                  }}
                />
              </div>

              {/* Tech tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skill.technologies.map(t => (
                  <span
                    key={t}
                    style={{
                      display: 'inline-block',
                      padding: '3px 10px',
                      fontSize: '12px', fontWeight: 500,
                      letterSpacing: '-0.12px',
                      borderRadius: '5px',
                      background: 'rgba(0,0,0,0.05)',
                      color: 'rgba(0,0,0,0.55)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;