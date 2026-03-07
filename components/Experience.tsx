import React from 'react';
import { EXPERIENCES } from '../constants';
import { motion } from 'framer-motion';
import { Briefcase, ExternalLink } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-12 md:py-20 bg-slate-100/50 dark:bg-slate-900/30 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Professional Journey</h2>
          <div className="w-12 h-1 bg-luxury-gold mx-auto" />
        </div>

        <div className="relative space-y-12">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-300 dark:bg-slate-800 -translate-x-1/2 hidden md:block" />

          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-azure-500 rounded-full border-4 border-white dark:border-slate-900 -translate-x-1/2 mt-1.5 hidden md:block shadow-[0_0_10px_rgba(14,165,233,0.5)]" />

              {/* Content */}
              <div className="w-full md:w-[calc(50%-2rem)]">
                <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 p-8 rounded-xl hover:border-luxury-gold/50 dark:hover:border-luxury-gold/30 transition-all duration-300 group shadow-sm hover:shadow-md dark:shadow-none">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-luxury-gold dark:text-luxury-gold font-sans tracking-wider text-sm font-bold uppercase">{exp.period}</span>
                    <a href={exp.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-luxury-gold dark:hover:text-luxury-gold transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-luxury-gold dark:group-hover:text-luxury-gold transition-colors">
                    {exp.title}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-4">
                    <Briefcase className="w-4 h-4" />
                    <span className="font-medium">{exp.company}</span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-azure-500 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;