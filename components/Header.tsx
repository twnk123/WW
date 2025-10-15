
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const navLinks = [
  { path: '/work', labelKey: 'nav.work' },
  { path: '/services', labelKey: 'nav.services' },
  { path: '/diy', labelKey: 'nav.diy' },
  { path: '/plans', labelKey: 'nav.plans' },
  { path: '/about', labelKey: 'nav.about' },
  { path: '/contact', labelKey: 'nav.contact' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [invertOn, setInvertOn] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    setIsOpen(false); 
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Invert-colors mode: toggles CSS filter on the root element, skipping images via CSS
  useEffect(() => {
    const saved = localStorage.getItem('invert-colors');
    const on = saved === '1';
    setInvertOn(on);
    document.documentElement.classList.toggle('invert-colors', on);
  }, []);

  const toggleInvert = () => {
    const next = !invertOn;
    setInvertOn(next);
    document.documentElement.classList.toggle('invert-colors', next);
    localStorage.setItem('invert-colors', next ? '1' : '0');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sl' : 'en');
  };

  const menuVariants: Variants = {
    closed: { opacity: 0, y: '-100%' },
    open: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.07, 
        delayChildren: 0.2 
      } 
    },
  };
  
  const mobileLinkVariants: Variants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Desktop Header - hide nav bar below 1050px */}
      <header className="hidden min-[1050px]:block fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
        <div className={`max-w-7xl mx-auto px-6 md:px-10 transition-all duration-300 ${isScrolled ? 'pt-4' : 'pt-8'}`}>
          <div className="relative flex justify-center items-center h-16 bg-transparent">
            <Link to="/" className="absolute left-0 font-display text-2xl font-bold tracking-widest uppercase z-10">
              Whiteweaver
            </Link>
            <nav className="flex-shrink-0">
              <div className="bg-text-active text-bg px-3 py-2 rounded-full flex items-center space-x-1">
                {navLinks.map(link => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `text-sm font-medium px-4 py-1 rounded-full transition-colors ${isActive ? 'bg-white/20' : 'hover:bg-white/10'}`
                    }
                  >
                    {t(link.labelKey)}
                  </NavLink>
                ))}
              </div>
            </nav>
            <div className="absolute right-0 flex items-center space-x-2">
              <button aria-label="Toggle language" onClick={toggleLanguage} title={language === 'en' ? 'Switch to Slovenian' : 'Preklopi na angleščino'} className="rounded-full p-2 bg-white/40 hover:bg-white/60 border border-white/60 shadow-sm transition-colors">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
              </button>
              <button aria-label="Toggle theme" onClick={toggleInvert} title={invertOn ? 'Disable color invert' : 'Invert colors'} className="rounded-full p-2 bg-white/40 hover:bg-white/60 border border-white/60 shadow-sm transition-colors">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 18a6 6 0 100-12 6 6 0 000 12z"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header - show below 1050px */}
      <header className={`min-[1050px]:hidden fixed top-4 left-4 right-4 z-50 transition-all duration-300`}>
        <div className={`p-2 rounded-2xl ${isOpen ? 'bg-bg' : 'bg-bg/80 backdrop-blur-sm'}`}>
            <div className="flex justify-between items-center h-12 px-4">
                <Link to="/" className="font-display text-xl font-bold tracking-widest uppercase">
                  Whiteweaver
                </Link>
                <div className="flex items-center space-x-2">
                  <button aria-label="Toggle language" onClick={toggleLanguage} title={language === 'en' ? 'Switch to Slovenian' : 'Preklopi na angleščino'} className="rounded-full p-2 bg-white/40 hover:bg-white/60 border border-white/60 shadow-sm transition-colors">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                  </button>
                  <button aria-label="Toggle theme" onClick={toggleInvert} title={invertOn ? 'Disable color invert' : 'Invert colors'} className="rounded-full p-2 bg-white/40 hover:bg-white/60 border border-white/60 shadow-sm transition-colors">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 18a6 6 0 100-12 6 6 0 000 12z"></path></svg>
                  </button>
                  <button onClick={toggleMenu} aria-label="Toggle menu" className="relative w-6 h-6">
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={isOpen ? 'close' : 'open'}
                        initial={{ opacity: 0, rotate: -45 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 45 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0"
                      >
                       {isOpen ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        ) : (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </button>
                </div>
            </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="min-[1050px]:hidden fixed inset-0 bg-bg z-40 pt-24"
          >
            <nav className="flex flex-col items-center justify-center h-full pb-20">
              {navLinks.map(link => (
                <motion.div variants={mobileLinkVariants} key={link.path} className="w-full text-center py-4">
                    <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                        `font-display text-4xl font-medium tracking-tighter ${isActive ? 'text-text-active' : 'text-text-active/70'}`
                        }
                    >
                        {t(link.labelKey)}
                    </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
