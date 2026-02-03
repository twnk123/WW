import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from './AnimatedText';
import { useLanguage } from '../contexts/LanguageContext';

const quickLinks = [
  { path: '/work', labelKey: 'nav.work' },
  { path: '/services', labelKey: 'nav.services' },
  { path: '/plans', labelKey: 'nav.plans' },
  { path: '/blog', labelKey: 'nav.blog' },
  { path: '/about', labelKey: 'nav.about' },
  { path: '/contact', labelKey: 'nav.contact' },
];

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <>
      {/* Marquee band - section above footer */}
      <section className="w-full bg-bg py-16 md:py-24 lg:py-32 overflow-hidden border-t border-line">
        <div className="marquee-content whitespace-nowrap font-display text-[16rem] md:text-[24rem] lg:text-[32rem] font-bold tracking-widest uppercase leading-none notranslate keep-color-invert" translate="no" style={{ color: '#0E5F63' }}>
          WHITEWEAVER — WHITEWEAVER — WHITEWEAVER — WHITEWEAVER — WHITEWEAVER — WHITEWEAVER — WHITEWEAVER — WHITEWEAVER — WHITEWEAVER — WHITEWEAVER — WHITEWEAVER — WHITEWEAVER — WHITEWEAVER — WHITEWEAVER — WHITEWEAVER — WHITEWEAVER —
        </div>
      </section>

      <footer className="bg-bg border-t border-line">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tighter">
               <AnimatedText text={t('home.cta.buildTogether')} el="span" className="block"/>
            </h2>
            <Link to="/contact">
              <button className="mt-8 bg-[#0E5F63] hover:bg-[#0c5256] text-white px-8 py-4 rounded-full transition-colors keep-color-invert">
                {t('home.cta.startProject')}
              </button>
            </Link>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left border-t border-line pt-8">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">{t('footer.copyright')}</p>
            </div>
            <nav className="flex items-center space-x-6">
              {quickLinks.map(link => <Link key={link.path} to={link.path} className="text-sm text-text-active/70 hover:text-text-active">{t(link.labelKey)}</Link>)}
            </nav>
          </div>
          {/* Bottom-most legal links */}
          <div className="mt-6 border-t border-line pt-6 text-center">
            <nav className="inline-flex items-center gap-6">
              <Link to="/privacy" className="text-xs text-text-active/60 hover:text-text-active">{t('nav.privacy')}</Link>
              <Link to="/terms" className="text-xs text-text-active/60 hover:text-text-active">{t('nav.terms')}</Link>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
