
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { projectsTranslations } from '../data/projectsTranslations';
import Seo from '../components/Seo';

const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [imageIndex, setImageIndex] = useState(0);
  const { t, language } = useLanguage();
  
  const project = projects.find(p => p.slug === slug);
  
  // Get translated project data
  const getTranslatedProject = (proj: typeof project) => {
    if (!proj) return null;
    const translation = projectsTranslations[language].projects.find(p => p.slug === proj.slug);
    return {
      ...proj,
      title: translation?.title || proj.title,
      tag: translation?.tag || proj.tag,
      client: translation?.client || proj.client,
      expertise: translation?.expertise || proj.expertise,
      description: translation?.description || proj.description,
      mission: translation?.mission || proj.mission,
    };
  };
  
  const translatedProject = getTranslatedProject(project);
  
  // Find next and previous projects
  const currentIndex = projects.findIndex(p => p.slug === slug);
  const nextProject = getTranslatedProject(projects[currentIndex + 1] || projects[0]);
  const prevProject = getTranslatedProject(projects[currentIndex - 1] || projects[projects.length - 1]);

  useEffect(() => {
    if (!translatedProject) {
        const timer = setTimeout(() => navigate('/work'), 100);
        return () => clearTimeout(timer);
    }
  }, [translatedProject, navigate]);
  
  if (!translatedProject) {
    return <div className="h-screen w-full flex items-center justify-center">{t('project.loading')}</div>;
  }

  return (
    <div className="min-h-screen">
      <Seo
        title={`${translatedProject.title} — ${translatedProject.client}`}
        description={translatedProject.description}
        canonical={`/work/${translatedProject.slug}`}
        image={translatedProject.coverImage}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: translatedProject.title,
          description: translatedProject.description,
          image: translatedProject.images,
          datePublished: `${translatedProject.date}-01-01`,
          dateModified: `${translatedProject.date}-01-01`,
          author: {
            '@type': 'Organization',
            name: 'WHITEWEAVER Studio'
          },
          publisher: {
            '@type': 'Organization',
            name: 'WHITEWEAVER Studio',
            logo: {
              '@type': 'ImageObject',
              url: window.location.origin + '/logo.png'
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': window.location.origin + `/work/${translatedProject.slug}`
          },
          articleSection: translatedProject.tag,
          keywords: translatedProject.expertise.join(', ')
        }}
      />
      {/* Hero Section - Full viewport with overlay info */}
      <section className="relative h-screen flex items-end">
        {/* Background Image */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img 
            src={translatedProject.coverImage} 
            alt={translatedProject.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </motion.div>
        
        {/* Content Overlay */}
        <div className="relative z-10 w-full pb-16 md:pb-24">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-white"
            >
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm uppercase tracking-wider">
                  {translatedProject.tag}
                </span>
              </div>
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-normal tracking-tight uppercase mb-8">
                {translatedProject.title}
              </h1>
              <div className="flex flex-wrap gap-8 text-sm uppercase tracking-wider opacity-90">
                <div>
                  <span className="opacity-70">{t('project.client')}</span>
                  <span className="mx-3">—</span>
                  <span>{translatedProject.client}</span>
                </div>
                <div>
                  <span className="opacity-70">{t('project.year')}</span>
                  <span className="mx-3">—</span>
                  <span>{translatedProject.date}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Project Info Grid */}
      <section className="py-24 md:py-32 bg-bg">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16">
            {/* Left Column - Details */}
            <div className="md:col-span-4">
              <ScrollReveal>
                <div className="sticky top-32">
                  <h2 className="font-display text-3xl font-normal tracking-tight mb-8">{t('project.details')}</h2>
                  
                  <div className="space-y-6">
                    <div className="pb-6 border-b border-line">
                      <p className="text-xs uppercase tracking-widest text-text-active/60 mb-2">{t('project.services')}</p>
                      <div className="flex flex-wrap gap-2">
                        {translatedProject.expertise.map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-button-bg rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pb-6 border-b border-line">
                      <p className="text-xs uppercase tracking-widest text-text-active/60 mb-2">{t('project.timeline')}</p>
                      <p className="text-lg">{translatedProject.date}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs uppercase tracking-widest text-text-active/60 mb-2">{t('project.category')}</p>
                      <p className="text-lg">{translatedProject.tag}</p>
                    </div>
                  </div>
                  
                  {/* View Live Site Button */}
                  {translatedProject.liveUrl && (
                    <motion.div className="mt-8">
                      <a 
                        href={translatedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3 bg-accent text-black rounded-full hover:bg-accent/90 transition-colors w-full justify-center"
                      >
                        <span className="font-medium">{t('project.viewLiveSite')}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </motion.div>
                  )}
                  
                  <motion.div className="mt-8">
                    <Link 
                      to="/contact"
                      className="inline-flex items-center gap-3 text-text-active group"
                    >
                      <span className="text-lg">{t('project.startSimilar')}</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                </div>
              </ScrollReveal>
            </div>
            
            {/* Right Column - Story */}
            <div className="md:col-span-8">
              <ScrollReveal delay={0.1}>
                <div className="mb-16">
                  <h2 className="font-display text-4xl md:text-5xl font-normal tracking-tight mb-6">
                    {t('project.challenge')}
                  </h2>
                  <p className="text-lg text-text-active/80 leading-relaxed">
                    {translatedProject.description}
                  </p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2}>
                <div>
                  <h2 className="font-display text-4xl md:text-5xl font-normal tracking-tight mb-6">
                    {t('project.approach')}
                  </h2>
                  <p className="text-lg text-text-active/80 leading-relaxed">
                    {translatedProject.mission}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery - Interactive */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <ScrollReveal className="mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-normal tracking-tight text-center">
              {t('project.visualJourney')}
            </h2>
          </ScrollReveal>
          
          {/* Main Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={imageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-200 mb-8"
            >
              <img 
                src={translatedProject.images[imageIndex]} 
                alt={`${translatedProject.title} view ${imageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Thumbnail Navigation */}
          <div className="flex gap-4 justify-center">
            {translatedProject.images.map((image, i) => (
              <motion.button
                key={i}
                onClick={() => setImageIndex(i)}
                className={`relative w-24 h-16 rounded-lg overflow-hidden ${
                  i === imageIndex ? 'ring-2 ring-text-active' : 'opacity-60 hover:opacity-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="w-full bg-bg text-text-active py-16 md:py-24 lg:py-32 overflow-hidden border-t border-line">
        <div className="marquee-content whitespace-nowrap font-display text-[8rem] md:text-[12rem] lg:text-[16rem] font-bold tracking-widest uppercase leading-none opacity-10">
          {translatedProject.title} — {translatedProject.title} — {translatedProject.title} — {translatedProject.title} — {translatedProject.title} — {translatedProject.title} — {translatedProject.title} — {translatedProject.title} —
        </div>
      </section>

      {/* Next Project Navigation */}
      <section className="py-24 md:py-32 border-t border-line">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Previous Project */}
            <Link to={`/work/${prevProject?.slug}`} className="group">
              <motion.div
                whileHover={{ x: -4 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4 mb-4"
              >
                <span className="text-text-active/60">←</span>
                <span className="text-xs uppercase tracking-widest text-text-active/60">{t('project.previousProject')}</span>
              </motion.div>
              <h3 className="font-display text-3xl md:text-4xl font-normal tracking-tight uppercase group-hover:text-text-active/80 transition-colors">
                {prevProject?.title}
              </h3>
            </Link>
            
            {/* Next Project */}
            <Link to={`/work/${nextProject?.slug}`} className="group text-right">
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4 mb-4 justify-end"
              >
                <span className="text-xs uppercase tracking-widest text-text-active/60">{t('project.nextProject')}</span>
                <span className="text-text-active/60">→</span>
              </motion.div>
              <h3 className="font-display text-3xl md:text-4xl font-normal tracking-tight uppercase group-hover:text-text-active/80 transition-colors">
                {nextProject?.title}
              </h3>
            </Link>
          </div>
          
          <div className="mt-24 text-center">
            <Link 
              to="/work"
              className="inline-flex items-center gap-2 px-6 py-3 border border-line rounded-full hover:bg-button-bg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>{t('project.viewAllWork')}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
