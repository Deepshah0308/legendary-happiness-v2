import React from 'react';
import { PROFILE, SOCIAL_LINKS } from '../constants';
import { Linkedin, Github, Mail } from 'lucide-react';

const iconMap: Record<string, React.FC<{ size?: number }>> = {
  LinkedIn: Linkedin, GitHub: Github, Email: Mail,
};

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="section-dark" style={{ padding: '72px 0 40px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="container-wide">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '48px', marginBottom: '60px' }}>
          {/* Brand */}
          <div style={{ maxWidth: '300px' }}>
            <p style={{ fontSize: '21px', fontWeight: 600, color: '#fff', letterSpacing: '-0.3px', marginBottom: '12px' }}>
              {PROFILE.name}
            </p>
            <p style={{ fontSize: '14px', lineHeight: 1.57, letterSpacing: '-0.224px', color: 'rgba(255,255,255,0.55)' }}>
              {PROFILE.tagline}. Building resilient infrastructure platforms and security solutions at scale.
            </p>
          </div>

          {/* Social */}
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '16px' }}>
              Connect
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SOCIAL_LINKS.map(link => {
                const Icon = iconMap[link.name] || Mail;
                return (
                  <a key={link.name} href={link.url} target="_blank" rel="noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', letterSpacing: '-0.224px', color: 'rgba(255,255,255,0.65)', transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#2997ff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}>
                    <Icon size={15} /> {link.name}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '16px' }}>
              Navigate
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Skills','Experience','Projects','Certifications','Articles'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`}
                  style={{ fontSize: '14px', letterSpacing: '-0.224px', color: 'rgba(255,255,255,0.65)', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#2997ff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}>
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '12px' }}>
          <p style={{ fontSize: '12px', letterSpacing: '-0.12px', color: 'rgba(255,255,255,0.3)' }}>
            © {year} {PROFILE.name}. All rights reserved.
          </p>
          <p style={{ fontSize: '12px', letterSpacing: '-0.12px', color: 'rgba(255,255,255,0.3)' }}>
            Built with React + Vite
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;