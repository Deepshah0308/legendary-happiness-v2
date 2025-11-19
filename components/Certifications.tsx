import React from 'react';
import { CERTIFICATIONS } from '../constants';
import { motion } from 'framer-motion';
import { Award, CheckCircle2 } from 'lucide-react';

const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-20 bg-slate-100/50 dark:bg-slate-900/30 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/3 text-center md:text-left">
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Certifications</h2>
             <p className="text-slate-600 dark:text-slate-400 mb-6">
               Continuous learning and validation of skills through industry-recognized certifications.
             </p>
             <Award className="w-32 h-32 text-azure-200 dark:text-azure-900/50 mx-auto md:mx-0" />
          </div>

          <div className="w-full md:w-2/3 grid gap-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-azure-400 dark:hover:border-azure-500/40 transition-colors shadow-sm dark:shadow-none"
              >
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{cert.name}</h3>
                  <p className="text-sm text-slate-500">{cert.issuer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;