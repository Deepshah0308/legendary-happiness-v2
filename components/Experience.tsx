import React, { useRef, useEffect, useState } from 'react';
import { EXPERIENCES } from '../constants';
import { Briefcase, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll<HTMLElement>('.exp-item').forEach((el, i) => {
            setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, i * 120);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.05 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section-dark section">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <p className="eyebrow eyebrow-dark">Career</p>
          <h2 className="section-title" style={{ color: '#fff' }}>Professional Journey</h2>
          <p style={{ fontSize: '17px', lineHeight: 1.47, letterSpacing: '-0.374px', color: 'rgba(255,255,255,0.65)', maxWidth: '540px', margin: '0 auto' }}>
            Building resilient infrastructure and security platforms across enterprise environments.
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {EXPERIENCES.map((exp, idx) => {
            const isOpen    = expanded === idx;
            const isCurrent = idx === 0;
            return (
              <div key={idx} className="exp-item"
                style={{ opacity: 0, transform: 'translateY(16px)', transition: 'opacity 0.5s ease, transform 0.5s ease', transitionDelay: `${idx * 0.1}s` }}>
                <div className="card-dark" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: isOpen ? 'rgba(0,0,0,0.5) 0 8px 30px' : 'none', transition: 'box-shadow 0.3s' }}>
                  {/* Blue accent bar for current role */}
                  <div style={{ height: '3px', background: isCurrent ? 'linear-gradient(90deg,#0071e3,#2997ff)' : 'rgba(255,255,255,0.06)' }} />

                  <button onClick={() => setExpanded(isOpen ? -1 : idx)} style={{
                    width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                    padding: '24px 28px', textAlign: 'left', display: 'flex',
                    alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', fontFamily: 'inherit',
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
                          color: isCurrent ? '#2997ff' : 'rgba(255,255,255,0.4)',
                          background: isCurrent ? 'rgba(0,113,227,0.12)' : 'rgba(255,255,255,0.06)',
                          padding: '3px 10px', borderRadius: '980px',
                        }}>
                          {exp.period}
                        </span>
                        {isCurrent && (
                          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#0071e3', background: 'rgba(0,113,227,0.15)', padding: '3px 8px', borderRadius: '980px' }}>
                            ● Current
                          </span>
                        )}
                      </div>
                      <h3 style={{ fontSize: '21px', fontWeight: 700, color: '#fff', marginBottom: '4px', letterSpacing: '-0.3px', lineHeight: 1.19 }}>
                        {exp.title}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.5)', fontSize: '14px', letterSpacing: '-0.224px' }}>
                        <Briefcase size={13} />
                        <span>{exp.company}</span>
                        <span style={{ opacity: 0.3 }}>·</span>
                        <a href={exp.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                          style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.15s' }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#2997ff')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    </div>
                    <div style={{
                      flexShrink: 0, width: '32px', height: '32px',
                      background: isOpen ? '#0071e3' : 'rgba(255,255,255,0.08)',
                      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', transition: 'all 0.2s ease', marginTop: '4px',
                    }}>
                      {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </div>
                  </button>

                  {/* Expandable body */}
                  <div style={{ maxHeight: isOpen ? '800px' : '0', overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                    <div style={{ padding: '0 28px 28px' }}>
                      <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '20px' }} />
                      <p style={{ fontSize: '17px', lineHeight: 1.47, letterSpacing: '-0.374px', color: 'rgba(255,255,255,0.60)', marginBottom: '24px' }}>
                        {exp.description}
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: '10px' }}>
                        {exp.achievements.map((a, i) => (
                          <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '14px 16px', background: 'rgba(0,113,227,0.07)', borderRadius: '8px', border: '1px solid rgba(0,113,227,0.12)' }}>
                            <div style={{ flexShrink: 0, width: '22px', height: '22px', background: '#0071e3', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#fff', marginTop: '1px' }}>
                              {i + 1}
                            </div>
                            <p style={{ fontSize: '14px', lineHeight: 1.43, letterSpacing: '-0.224px', color: 'rgba(255,255,255,0.80)', margin: 0 }}>{a}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;