import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen]             = useState(false);
  const [showContact, setShowContact]   = useState(false);

  useEffect(() => {
    document.body.style.overflow = (isOpen || showContact) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, showContact]);

  const links = [
    { label: 'Skills',           href: '#skills' },
    { label: 'Experience',       href: '#experience' },
    { label: 'Projects',         href: '#projects' },
    { label: 'Certifications',   href: '#certifications' },
    { label: 'Articles',         href: '#articles' },
  ];

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const id = href.replace('#', '');
    if (!id) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 48, behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Sticky glass nav ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: '48px',
        background: 'rgba(0,0,0,0.82)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        display: 'flex', alignItems: 'center',
      }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          {/* Logo */}
          <a href="#" onClick={e => scrollTo(e, '#')} style={{ display: 'flex', alignItems: 'center', flexShrink: 0, opacity: 0.9 }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.9')}
          >
            <img
              src="/assets/logo-dvs.png"
              alt="DVS Logo"
              style={{ height: '28px', width: 'auto', filter: 'brightness(0) invert(1)' }}
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </a>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0' }} className="desktop-nav">
            {links.map(l => (
              <a key={l.label} href={l.href} onClick={e => scrollTo(e, l.href)}
                style={{
                  padding: '0 14px', height: '48px',
                  display: 'flex', alignItems: 'center',
                  fontSize: '12px', fontWeight: 400,
                  color: 'rgba(255,255,255,0.85)',
                  letterSpacing: '-0.01em',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => setShowContact(true)}
              style={{
                marginLeft: '8px',
                padding: '6px 14px',
                background: '#0071e3',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 400,
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#0077ed')}
              onMouseLeave={e => (e.currentTarget.style.background = '#0071e3')}
            >
              Contact
            </button>
          </div>

          {/* Mobile */}
          <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-btn"
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: '4px' }}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: 'rgba(0,0,0,0.92)',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column',
          paddingTop: '64px', paddingLeft: '24px',
        }}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={e => scrollTo(e, l.href)}
              style={{ fontSize: '24px', fontWeight: 600, color: '#fff', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', letterSpacing: '-0.3px' }}
            >
              {l.label}
            </a>
          ))}
          <button onClick={() => { setIsOpen(false); setShowContact(true); }}
            style={{ marginTop: '24px', alignSelf: 'flex-start', padding: '12px 24px', background: '#0071e3', color: '#fff', fontSize: '17px', fontWeight: 400, border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit' }}>
            Contact
          </button>
        </div>
      )}

      {/* Contact modal */}
      {showContact && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }}
            onClick={() => setShowContact(false)} />
          <div style={{
            position: 'relative', width: '100%', maxWidth: '700px',
            background: '#1c1c1e', borderRadius: '12px',
            boxShadow: 'rgba(0,0,0,0.5) 0 20px 60px',
            overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '80vh',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: '17px', fontWeight: 600, color: '#fff' }}>Get in Touch</span>
              <button onClick={() => setShowContact(false)}
                style={{ background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={16} />
              </button>
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSe8Fg1ZnO8XkA7oHaJLIXDXSalRuK1Icrw2RkLxkTnDsdWe4Q/viewform?embedded=true"
                width="100%" height="100%"
                style={{ border: 'none', display: 'block', minHeight: '500px', filter: 'invert(1) hue-rotate(180deg)' }}
                title="Contact Form"
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav  { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navigation;