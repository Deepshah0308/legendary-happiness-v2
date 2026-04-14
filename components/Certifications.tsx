import React, { useRef, useEffect } from 'react';
import { CERTIFICATIONS } from '../constants';
import { ExternalLink, Award } from 'lucide-react';

const Certifications: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll<HTMLElement>('.cert-card').forEach((el, i) => {
            setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, i * 70);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className="section-dark section">
      <div className="container-wide">
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <p className="eyebrow eyebrow-dark">Credentials</p>
          <h2 className="section-title" style={{ color: '#fff' }}>Certifications</h2>
          <p style={{ fontSize: '17px', lineHeight: 1.47, letterSpacing: '-0.374px', color: 'rgba(255,255,255,0.65)', maxWidth: '540px', margin: '0 auto' }}>
            Industry-recognized credentials validating cloud and security expertise.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
          {CERTIFICATIONS.map((cert, idx) => {
            const El = cert.url ? 'a' : 'div';
            return (
              <El
                key={idx}
                {...(cert.url ? { href: cert.url, target: '_blank', rel: 'noreferrer' } : {})}
                className="cert-card"
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  textAlign: 'center', padding: '28px 20px',
                  background: '#1c1c1e',
                  borderRadius: '12px',
                  boxShadow: 'rgba(0,0,0,0.5) 3px 5px 30px 0px',
                  opacity: 0, transform: 'translateY(16px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.25s',
                  transitionDelay: `${idx * 0.05}s`,
                  textDecoration: 'none', cursor: cert.url ? 'pointer' : 'default',
                  position: 'relative',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                  if (cert.url) (e.currentTarget as HTMLElement).style.boxShadow = 'rgba(0,113,227,0.25) 0 0 0 1px, rgba(0,0,0,0.5) 3px 5px 30px 0px';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'rgba(0,0,0,0.5) 3px 5px 30px 0px';
                }}
              >
                {cert.url && <ExternalLink size={13} style={{ position: 'absolute', top: '14px', right: '14px', color: 'rgba(255,255,255,0.25)' }} />}

                <div style={{ width: '72px', height: '72px', background: '#ffffff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', overflow: 'hidden', padding: '10px', boxShadow: 'rgba(0,0,0,0.15) 0 2px 8px' }}>
                  {cert.logo
                    ? <img src={cert.logo} alt={cert.issuer} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    : <Award size={32} style={{ color: '#0071e3' }} />
                  }
                </div>

                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#2997ff', marginBottom: '8px', display: 'block' }}>
                  {cert.issuer}
                </span>
                <h3 style={{ fontSize: '14px', fontWeight: 400, lineHeight: 1.43, letterSpacing: '-0.224px', color: 'rgba(255,255,255,0.85)' }}>
                  {cert.name}
                </h3>
              </El>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;