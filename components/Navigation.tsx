import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Cloud } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { PROFILE } from '../constants';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showContactForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showContactForm]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Articles', href: '#articles' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    
    // Handle scroll to top for empty hash or just '#'
    if (!targetId) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setIsOpen(false);
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      // 80px offset accounts for header height (64px) + extra padding
      const headerOffset = 80; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <a 
                href="#" 
                onClick={(e) => handleLinkClick(e, '#')}
                className="text-azure-600 dark:text-azure-400 font-signature text-3xl"
              >
                {PROFILE.name}
              </a>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-slate-600 dark:text-slate-300 hover:text-azure-600 dark:hover:text-azure-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <button 
                  onClick={() => setShowContactForm(true)}
                  className="bg-azure-600 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-azure-500 transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                >
                  Contact
                </button>
              </div>
            </div>

            <div className="-mr-2 flex md:hidden items-center gap-4">
               <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-slate-600 dark:text-slate-300 hover:text-azure-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 block px-3 py-2 rounded-md text-base font-medium"
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setShowContactForm(true);
                }}
                className="w-full text-left text-azure-600 dark:text-azure-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 block px-3 py-2 rounded-md text-base"
              >
                Contact Me
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Contact Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-4 sm:px-6">
          <div 
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowContactForm(false)}
          />
          <div className="relative w-full max-w-3xl bg-white dark:bg-slate-950 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Cloud className="w-5 h-5 text-azure-500" />
                Get in Touch
              </h3>
              <button 
                onClick={() => setShowContactForm(false)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Body - iframe container */}
            <div className="flex-1 overflow-y-auto bg-white w-full">
               <iframe 
                 src="https://docs.google.com/forms/d/e/1FAIpQLSe8Fg1ZnO8XkA7oHaJLIXDXSalRuK1Icrw2RkLxkTnDsdWe4Q/viewform?embedded=true" 
                 width="100%" 
                 height="100%" 
                 frameBorder="0" 
                 marginHeight={0} 
                 marginWidth={0}
                 className="w-full h-full min-h-[600px]"
                 title="Contact Form"
               >
                 Loading…
               </iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;