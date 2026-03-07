import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { PROFILE, SOCIAL_LINKS } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center py-20 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-luxury-gold/10 dark:bg-luxury-gold/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-400/10 dark:bg-slate-600/10 rounded-full blur-3xl -z-10" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10 mix-blend-overlay"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-4 rounded-full bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-luxury-gold dark:text-luxury-gold text-sm font-sans tracking-widest uppercase mb-8 shadow-sm">
            {PROFILE.tagline}
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 dark:text-white tracking-tight mb-4 md:mb-6">
            Hi, I'm <span className="block mt-2 md:inline md:mt-0 text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold to-yellow-600 dark:from-luxury-gold dark:to-yellow-500">{PROFILE.name}</span>
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-4xl font-light text-slate-600 dark:text-slate-400 mb-6 md:mb-8 font-sans tracking-wide">
            {PROFILE.role}
          </h2>

          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed mb-10">
            {PROFILE.summary}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center mb-12">
            <a
              href="/resume.pdf"
              download="Deep_Shah_Resume.pdf"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-azure-600 text-white border border-azure-600 hover:bg-azure-500 hover:border-azure-500 transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)] group"
            >
              <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-bold">Download Resume</span>
            </a>

            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-azure-500 hover:text-azure-500 dark:hover:text-azure-400 transition-all group shadow-sm dark:shadow-none"
              >
                <link.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>{link.name}</span>
              </a>
            ))}
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <ArrowDown className="w-6 h-6 text-slate-400 dark:text-slate-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;