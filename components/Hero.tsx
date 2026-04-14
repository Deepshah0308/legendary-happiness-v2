import React, { useEffect, useRef } from 'react';
import { ArrowDown, Download, Linkedin, Github, Mail } from 'lucide-react';
import { PROFILE, SOCIAL_LINKS } from '../constants';
import NetworkBackground from './NetworkBackground';

const iconMap: Record<string, any> = {
  LinkedIn: Linkedin, GitHub: Github, Email: Mail,
};

const Hero: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    Array.from(el.children).forEach((child, i) => {
      const c = child as HTMLElement;
      c.style.animationDelay = `${i * 0.13}s`;
      c.classList.add('animate-up');
      setTimeout(() => { c.style.opacity = '1'; }, i * 130 + 650);
    });
  }, []);

  return (
    <section className="section-dark" style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      paddingTop: '120px', paddingBottom: '80px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle network canvas — very faint on black */}
      <NetworkBackground />

      {/* Vignette — dark section, just dims the canvas center */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.20) 65%, transparent 100%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div ref={textRef}>
          {/* Eyebrow */}
          <p style={{
            fontSize: '12px', fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: '#0071e3', marginBottom: '20px', opacity: 0,
          }}>
            {PROFILE.tagline}
          </p>

          {/* Main headline */}
          <h1 style={{
            fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
            fontWeight: 600, lineHeight: 1.07, letterSpacing: '-0.28px',
            color: '#fff', marginBottom: '18px', opacity: 0,
          }}>
            Deep Shah
          </h1>

          {/* Sub headline */}
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            fontWeight: 400, lineHeight: 1.19, letterSpacing: '-0.2px',
            color: 'rgba(255,255,255,0.82)', marginBottom: '20px', opacity: 0,
          }}>
            {PROFILE.role}
          </p>

          {/* Body */}
          <p style={{
            maxWidth: '580px', margin: '0 auto 48px',
            fontSize: '17px', lineHeight: 1.47, letterSpacing: '-0.374px',
            color: 'rgba(255,255,255,0.65)', opacity: 0,
          }}>
            {PROFILE.summary}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center', opacity: 0 }}>
            <a href="/resume.pdf" download="Deep_Shah_Resume.pdf" className="btn-blue">
              <Download size={16} /> Download Resume
            </a>
            {SOCIAL_LINKS.map(link => {
              const Icon = iconMap[link.name] || Mail;
              return (
                <a key={link.name} href={link.url} target="_blank" rel="noreferrer"
                  className="pill-link pill-link-dark">
                  <Icon size={15} /> {link.name}
                </a>
              );
            })}
          </div>
        </div>

        {/* Tech stack row */}
        <div style={{
          marginTop: '72px',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px',
        }}>
          {['Microsoft Azure', 'Entra ID', 'Intune', 'Sentinel', 'FortiGate', 'PowerShell'].map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '50%',
        animation: 'scrollBounce 2s infinite',
        zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
      }}>
        <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Scroll</span>
        <ArrowDown size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
      </div>
    </section>
  );
};

export default Hero;