import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { PROFILE, SOCIAL_LINKS } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-azure-400/20 dark:bg-azure-600/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl -z-10" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-azure-600 dark:text-azure-400 text-sm font-mono mb-6 shadow-sm">
            Infrastructure & Security Specialist
          </span>
          
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-azure-500 to-indigo-500 dark:from-azure-400 dark:to-indigo-400">{PROFILE.name}</span>
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-light text-slate-600 dark:text-slate-400 mb-8 font-mono">
             {PROFILE.role}
          </h2>

          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10">
            {PROFILE.summary}
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
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