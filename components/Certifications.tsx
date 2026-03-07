import React from 'react';
import { CERTIFICATIONS } from '../constants';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-20 bg-slate-100/50 dark:bg-slate-900/30 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">Certifications</h2>
          <div className="w-20 h-1 bg-luxury-gold mx-auto rounded-full mb-6"></div>
          <p className="font-sans text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Continuous learning and validation of skills through industry-recognized certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATIONS.map((cert, idx) => {
            const CardWrapper = cert.url ? motion.a : motion.div;
            return (
              <CardWrapper
                href={cert.url}
                target={cert.url ? "_blank" : undefined}
                rel={cert.url ? "noreferrer" : undefined}
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex flex-col items-center text-center gap-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-8 rounded-xl border border-slate-200/50 dark:border-slate-800/50 hover:border-luxury-gold/50 dark:hover:border-luxury-gold/50 transition-all duration-300 shadow-sm hover:shadow-xl dark:shadow-[0_0_15px_rgba(212,175,55,0.05)] dark:hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] relative overflow-hidden group"
              >
                {cert.logo ? (
                  <div className="w-24 h-24 flex-shrink-0 bg-slate-50 dark:bg-white rounded-xl p-4 flex items-center justify-center border border-slate-100 dark:border-slate-200 shadow-inner mb-2">
                    <img src={cert.logo} alt={`${cert.issuer} logo`} className="max-w-full max-h-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300" />
                  </div>
                ) : (
                  <div className="w-24 h-24 flex-shrink-0 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-700 shadow-inner mb-2">
                    <CheckCircle2 className="w-10 h-10 text-luxury-gold" />
                  </div>
                )}

                <div className="relative z-10 flex flex-col flex-grow justify-between">
                  <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-luxury-gold transition-colors duration-300">{cert.name}</h3>
                  <p className="text-xs font-sans tracking-widest text-luxury-gold uppercase font-semibold">{cert.issuer}</p>
                </div>
              </CardWrapper>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;