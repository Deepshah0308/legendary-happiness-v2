import React, { useEffect, useState, useRef } from 'react';
import { BookOpen, Heart, MessageCircle, ExternalLink, Calendar } from 'lucide-react';

interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  public_reactions_count: number;
  comments_count: number;
  published_at: string;
  tag_list: string[];
}

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<DevToArticle[]>([]);
  const [loading, setLoading]   = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch('https://dev.to/api/articles?username=shahdeep')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setArticles(data.slice(0, 4)); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!articles.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll<HTMLElement>('.article-card').forEach((el, i) => {
            setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, i * 100);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [articles]);

  if (!loading && !articles.length) return null;

  return (
    <section id="articles" ref={sectionRef} style={{ background: '#f5f5f7', padding: '100px 0', color: '#1d1d1f' }}>
      <div className="container-wide">
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#0071e3', marginBottom: '12px' }}>Writing</p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 600, lineHeight: 1.10, letterSpacing: '-0.3px', color: '#1d1d1f', marginBottom: '16px' }}>Latest Articles</h2>
          <p style={{ fontSize: '17px', lineHeight: 1.47, letterSpacing: '-0.374px', color: 'rgba(0,0,0,0.56)', maxWidth: '540px', margin: '0 auto' }}>
            Practical writing on cloud architecture, automation, and cybersecurity.
          </p>
        </div>

        {/* Skeleton */}
        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '16px' }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ background: '#fff', borderRadius: '8px', height: '280px', boxShadow: 'rgba(0,0,0,0.22) 3px 5px 30px 0px', overflow: 'hidden' }}>
                <div style={{ height: '150px', background: '#e8e8ed' }} />
                <div style={{ padding: '18px' }}>
                  <div style={{ height: '10px', background: '#e8e8ed', borderRadius: '4px', marginBottom: '8px', width: '60%' }} />
                  <div style={{ height: '14px', background: '#e8e8ed', borderRadius: '4px', width: '90%' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '16px' }}>
            {articles.map((article, idx) => (
              <a key={article.id} href={article.url} target="_blank" rel="noreferrer"
                className="article-card"
                style={{
                  display: 'flex', flexDirection: 'column',
                  background: '#fff', borderRadius: '8px', overflow: 'hidden',
                  boxShadow: 'rgba(0,0,0,0.22) 3px 5px 30px 0px',
                  opacity: 0, transform: 'translateY(16px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  transitionDelay: `${idx * 0.08}s`,
                  textDecoration: 'none', color: 'inherit',
                }}
              >
                {/* Cover */}
                <div style={{ height: '160px', background: '#f5f5f7', overflow: 'hidden', position: 'relative' }}>
                  {article.cover_image
                    ? <img src={article.cover_image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}><BookOpen size={36} style={{ color: '#c7c7cc' }} /></div>
                  }
                  <span style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', borderRadius: '980px', padding: '3px 10px', fontSize: '12px', fontWeight: 400, color: 'rgba(0,0,0,0.56)', display: 'flex', alignItems: 'center', gap: '4px', letterSpacing: '-0.12px' }}>
                    <Calendar size={11} />
                    {new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                {/* Body */}
                <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
                    {article.tag_list.slice(0,3).map(tag => (
                      <span key={tag} style={{ fontSize: '12px', fontWeight: 400, color: '#0066cc', letterSpacing: '-0.12px' }}>#{tag}</span>
                    ))}
                  </div>

                  <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#1d1d1f', lineHeight: 1.24, letterSpacing: '-0.374px', marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {article.title}
                  </h3>

                  <p style={{ fontSize: '14px', lineHeight: 1.43, letterSpacing: '-0.224px', color: 'rgba(0,0,0,0.56)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1, marginBottom: '14px' }}>
                    {article.description}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #f2f2f7' }}>
                    <div style={{ display: 'flex', gap: '12px', color: 'rgba(0,0,0,0.4)', fontSize: '13px', letterSpacing: '-0.12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Heart size={12} /> {article.public_reactions_count}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MessageCircle size={12} /> {article.comments_count}</span>
                    </div>
                    <span style={{ fontSize: '14px', color: '#0066cc', display: 'flex', alignItems: 'center', gap: '3px', letterSpacing: '-0.224px' }}>
                      Read <ExternalLink size={12} />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {!loading && articles.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <a href="https://dev.to/shahdeep" target="_blank" rel="noreferrer" className="pill-link pill-link-light">
              <BookOpen size={15} /> View All Articles ›
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Articles;