import React from 'react';
import { PROFILE, SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 py-12 border-t border-slate-200 dark:border-slate-900 text-center transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Let's Connect</h2>
        
        <div className="flex justify-center gap-6 mb-8">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-azure-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-azure-600 transition-all"
              aria-label={link.name}
            >
              <link.icon className="w-6 h-6" />
            </a>
          ))}
        </div>
        
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;