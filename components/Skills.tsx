import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { SKILLS_DATA, getSkillIcon } from '../constants';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';

const Skills: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="skills" className="py-12 md:py-20 bg-luxury-light dark:bg-luxury-dark relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">Technical Expertise</h2>
          <div className="w-20 h-1 bg-luxury-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Chart Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-[300px] md:h-[400px] w-full bg-white/50 dark:bg-slate-900/30 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 md:p-4 backdrop-blur-sm shadow-sm dark:shadow-none"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={SKILLS_DATA}>
                <PolarGrid gridType="polygon" stroke={isDark ? "#334155" : "#e2e8f0"} />
                <PolarAngleAxis dataKey="category" tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Proficiency"
                  dataKey="proficiency"
                  stroke="#D4AF37"
                  strokeWidth={2}
                  fill="#D4AF37"
                  fillOpacity={0.3}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#0f172a' : '#ffffff',
                    borderColor: isDark ? '#1e293b' : '#e2e8f0',
                    color: isDark ? '#f1f5f9' : '#1e293b'
                  }}
                  itemStyle={{ color: '#D4AF37' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Skills List Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILLS_DATA.map((skill, idx) => {
              const Icon = getSkillIcon(skill.category);
              return (
                <motion.div
                  key={skill.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-luxury-gold/50 dark:hover:border-luxury-gold/50 transition-all duration-300 shadow-sm dark:shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-luxury-gold/10 rounded-lg text-luxury-gold group-hover:bg-luxury-gold group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white group-hover:text-luxury-gold transition-colors duration-300">{skill.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;