import React, { useRef, useEffect } from 'react';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll<HTMLElement>('.project-card').forEach((el, i) => {
            setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, i * 80);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} style={{ background: '#f5f5f7', padding: '100px 0', color: '#1d1d1f' }}>
      <div className="container-wide">
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#0071e3', marginBottom: '12px' }}>Work</p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 600, lineHeight: 1.10, letterSpacing: '-0.3px', color: '#1d1d1f', marginBottom: '16px' }}>Featured Projects</h2>
          <p style={{ fontSize: '17px', lineHeight: 1.47, letterSpacing: '-0.374px', color: 'rgba(0,0,0,0.56)', maxWidth: '540px', margin: '0 auto' }}>
            Enterprise infrastructure initiatives delivered at scale.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {PROJECTS.map((project, idx) => (
            <div
              key={idx}
              className="project-card"
              style={{
                background: '#fff',
                borderRadius: '8px',
                padding: '28px',
                boxShadow: 'rgba(0,0,0,0.22) 3px 5px 30px 0px',
                opacity: 0,
                transform: 'translateY(16px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.25s',
                transitionDelay: `${idx * 0.06}s`,
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Index */}
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#0071e3', letterSpacing: '0.04em', marginBottom: '16px', display: 'block' }}>
                {String(idx + 1).padStart(2, '0')}
              </span>

              {project.company && (
                <span style={{ fontSize: '12px', fontWeight: 400, letterSpacing: '-0.12px', color: 'rgba(0,0,0,0.48)', marginBottom: '6px', display: 'block' }}>
                  {project.company}
                </span>
              )}

              <h3 style={{ fontSize: '21px', fontWeight: 600, color: '#1d1d1f', marginBottom: '12px', lineHeight: 1.19, letterSpacing: '-0.3px', flex: 1 }}>
                {project.title}
              </h3>

              <p style={{ fontSize: '14px', lineHeight: 1.43, letterSpacing: '-0.224px', color: 'rgba(0,0,0,0.56)', marginBottom: '20px' }}>
                {project.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
                {project.technologies.map(t => (
                  <span key={t} className="tag tag-light" style={{ fontSize: '12px' }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;