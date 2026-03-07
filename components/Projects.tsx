import React from 'react';
import { PROJECTS } from '../constants';
import { motion } from 'framer-motion';
import { FolderGit2 } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-12 md:py-20 bg-luxury-light dark:bg-luxury-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-luxury-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl dark:hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:border-luxury-gold/50 dark:hover:border-luxury-gold/50 transition-all duration-300 group flex flex-col"
            >
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-luxury-gold/10 rounded-lg text-luxury-gold group-hover:bg-luxury-gold group-hover:text-white transition-colors duration-300">
                    <FolderGit2 className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-2 group-hover:text-luxury-gold transition-colors duration-300">
                  {project.title}
                </h3>
                {project.company && (
                  <p className="text-xs text-luxury-gold/80 font-sans mb-3 uppercase tracking-widest">
                    {project.company}
                  </p>
                )}

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-sans">
                  {project.description}
                </p>
              </div>

              <div className="p-6 pt-0 mt-auto">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-sans text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;