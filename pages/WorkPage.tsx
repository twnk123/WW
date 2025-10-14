import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';
import { projectsTranslations } from '../data/projectsTranslations';
import Seo from '../components/Seo';

const WorkPage: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Get translated projects
  const translatedProjects = projects.map(project => {
    const translation = projectsTranslations[language].projects.find(p => p.slug === project.slug);
    return {
      ...project,
      title: translation?.title || project.title,
      tag: translation?.tag || project.tag,
      client: translation?.client || project.client,
      expertise: translation?.expertise || project.expertise,
      description: translation?.description || project.description,
      mission: translation?.mission || project.mission,
    };
  });

  return (
    <div className="min-h-screen overflow-hidden">
      <Seo
        title={`${t('work.title')} — WHITEWEAVER Studio`}
        description={t('work.subtitle')}
        canonical="/work"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
            { '@type': 'ListItem', position: 2, name: String(t('work.title')), item: window.location.origin + '/work' },
          ],
        }}
      />
      {/* Hero Section - Above the fold */}
      <section className="h-screen flex items-center justify-center">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1 className="font-display text-[clamp(3rem,10vw,8rem)] md:text-[clamp(4rem,12vw,10rem)] font-normal tracking-[0.02em] leading-[0.85] uppercase mb-6 md:mb-8">
              {t('work.title')}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-base md:text-lg text-text-active/70 max-w-2xl mx-auto mb-8 md:mb-10"
            >
              {t('work.subtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/contact"
                className="inline-block px-8 py-3 rounded-full border border-text-active/20 hover:border-text-active/40 transition-colors text-sm md:text-base"
              >
                {t('work.getInTouch')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Showcase - New Design */}
      <section className="pb-24 md:pb-32 lg:pb-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-24"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] bg-line flex-1"></div>
              <span className="text-sm text-text-active/60 uppercase tracking-widest">{t('work.packageExamples')}</span>
              <div className="h-[1px] bg-line flex-1"></div>
            </div>
          </motion.div>

          {/* Projects Grid - Mixed Layout */}
          <div className="space-y-8 md:space-y-12">
            {translatedProjects.map((project, index) => {
              const isFeature = index === 0 || index === 3; // Make first and fourth projects featured
              const isReverse = index % 2 === 1;
              
              if (isFeature) {
                // Full-width featured project
                return (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link to={`/work/${project.slug}`} className="group block">
                      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-button-bg">
                        {/* Large Image */}
                        <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                          <motion.img
                            src={project.coverImage}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        
                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white mix-blend-difference">
                          <div className="flex items-end justify-between">
                            <div>
                              <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs uppercase tracking-wider mb-4">
                                {project.tag}
                              </span>
                              <h3 className="font-display text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight uppercase">
                                {project.title}
                              </h3>
                            </div>
                            <motion.div 
                              className="hidden md:block"
                              initial={{ x: -20, opacity: 0 }}
                              whileHover={{ x: 0, opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-md">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </span>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              } else {
                // Regular project card
                return (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link to={`/work/${project.slug}`} className="group">
                      <div className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center ${isReverse ? 'md:flex-row-reverse' : ''}`}>
                        {/* Image */}
                        <div className={`md:col-span-7 ${isReverse ? 'md:col-start-6' : ''}`}>
                          <motion.div 
                            className="relative aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden bg-gray-200"
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.3 }}
                          >
                            <img
                              src={project.coverImage}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          </motion.div>
                        </div>
                        
                        {/* Content */}
                        <div className={`md:col-span-5 ${isReverse ? 'md:col-start-1 md:row-start-1' : ''}`}>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <span className="text-xs uppercase tracking-widest text-text-active/60">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <div className="h-[1px] bg-line flex-1 max-w-[60px]"></div>
                              <span className="text-xs uppercase tracking-widest text-text-active/60">
                                {project.date}
                              </span>
                            </div>
                            
                            <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight uppercase group-hover:text-text-active/80 transition-colors">
                              {project.title}
                            </h3>
                            
                            <p className="text-text-active/70 line-clamp-2">
                              {project.description}
                            </p>
                            
                            <div className="flex items-center gap-4 pt-2">
                              <span className="px-3 py-1 bg-button-bg rounded-full text-sm">
                                {project.tag}
                              </span>
                              <motion.span 
                                className="inline-flex items-center gap-2 text-sm group-hover:gap-3 transition-all duration-300"
                                whileHover={{ x: 4 }}
                              >
                                <span>{t('work.viewCaseStudy')}</span>
                                <span>→</span>
                              </motion.span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              }
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-24 md:mt-32 text-center"
          >
            <p className="text-text-active/60 mb-8">{t('work.haveProject')}</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-text-active text-bg rounded-full hover:bg-text-active/90 transition-colors group"
            >
              <span className="text-lg font-medium">{t('work.letsWork')}</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WorkPage;
