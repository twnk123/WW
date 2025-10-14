import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';
import { projectsTranslations } from '../data/projectsTranslations';
import TestimonialsSection from '../components/TestimonialsSection';
import { plans } from '../data/plans';
import { useLanguage } from '../contexts/LanguageContext';
import Seo from '../components/Seo';

const floatingImages = [
  { id: 1, src: `${import.meta.env.BASE_URL}hero/hero-1.webp`, className: 'absolute top-1/2 -translate-y-1/2 left-[5%] w-[24vw] max-w-[340px] rounded-2xl', yRange: [-20, 20] as [number, number] },
  { id: 2, src: `${import.meta.env.BASE_URL}hero/hero-2.webp`, className: 'absolute top-1/2 -translate-y-[40%] right-[5%] w-[22vw] max-w-[300px] rounded-2xl', yRange: [-30, 30] as [number, number] },
  { id: 3, src: `${import.meta.env.BASE_URL}hero/hero-3.webp`, className: 'absolute top-[25%] right-[8%] w-[26vw] max-w-[380px] rounded-2xl', yRange: [-15, 15] as [number, number] },
];

const mobileImages = [
  `${import.meta.env.BASE_URL}hero/hero-1.webp`,
  `${import.meta.env.BASE_URL}hero/hero-2.webp`,
  `${import.meta.env.BASE_URL}hero/hero-3.webp`,
];

const FloatingImage: React.FC<{ imageData: typeof floatingImages[number] }> = ({ imageData }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], imageData.yRange);

  return (
    <motion.div
      key={imageData.id}
      className={imageData.className}
      style={{ y, marginTop: imageData.id === 3 ? -100 : undefined }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 + imageData.id * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <motion.img
        src={imageData.src}
        alt={`Hero image ${imageData.id}`}
        className="w-full h-auto object-cover rounded-2xl shadow-xl pointer-events-none"
      />
    </motion.div>
  );
};

const HomePage: React.FC = () => {
  const { t, language } = useLanguage();

  // Get translated projects
  const translatedProjects = projects.map(project => {
    const translation = projectsTranslations[language].projects.find(p => p.slug === project.slug);
    return {
      ...project,
      title: translation?.title || project.title,
      tag: translation?.tag || project.tag,
    };
  });

  const featuredProjects = translatedProjects.slice(0, 2);

  return (
    <div>
      <Seo
        title={`WHITEWEAVER Studio — ${language === 'sl' ? 'od ideje do izvedbe hitro' : 'from idea to reality fast'}`}
        description={t('home.services.subtitle')}
        canonical="/"
        image={`${import.meta.env.BASE_URL}hero/hero-1.webp`}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'WHITEWEAVER Studio',
            url: window.location.origin,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'WHITEWEAVER Studio',
            url: window.location.origin,
          },
        ]}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Desktop Hero */}
        <div className="hidden lg:flex min-h-screen flex-col items-center justify-center text-center relative">
          <div className="absolute inset-0 z-10">
            {floatingImages.map((img) => (
              <FloatingImage key={img.id} imageData={img} />
            ))}
          </div>

          <div className="max-w-4xl mx-auto px-6 md:px-10 z-20 relative">
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-tight">
              <AnimatedText text={t('home.hero.line1')} el="span" className="block" />
              <AnimatedText text={t('home.hero.line2')} el="span" className="block" />
            </h1>
            <ScrollReveal delay={0.6}>
              <p className="mt-6 text-lg text-text-active/80 max-w-xl mx-auto">{t('home.hero.subtitle')}</p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.8} className="absolute bottom-10 z-30">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-10 h-10 rounded-full border border-line flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </ScrollReveal>
        </div>

        {/* Mobile & Tablet Hero */}
        <div className="flex flex-col pt-32 pb-16 px-6 lg:hidden">
          <div className="text-center">
            <h1 className="font-display text-6xl font-medium tracking-tighter leading-tight uppercase">
              <AnimatedText text={t('home.hero.mobileTitle')} el="span" />
            </h1>
            <ScrollReveal delay={0.3}>
              <p className="mt-6 text-base text-text-active/80 max-w-md mx-auto">{t('home.hero.subtitle')}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.4} className="mt-8 flex flex-col items-center space-y-4">
              <Button to="/contact" className="w-full max-w-xs">
                {t('home.hero.startBuild')}
              </Button>
              <Button to="/services" variant="secondary" className="w-full max-w-xs">
                {t('home.hero.seeHow')}
              </Button>
            </ScrollReveal>
          </div>
          <div className="mt-16 space-y-8">
            {mobileImages.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt={`Mobile project image ${i + 1}`}
                className="w-full h-auto object-cover rounded-2xl shadow-lg"
                initial={{
                  opacity: 0,
                  scale: 0.96,
                  filter: 'blur(8px)',
                  x: i === 0 ? -70 : i === 1 ? 70 : 0,
                  y: i === 2 ? 70 : 0,
                }}
                whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)', x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: 0.05 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tighter">{t('home.featured.title')}</h2>
          </ScrollReveal>
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.08 }}
          >
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </motion.div>
          <ScrollReveal className="text-center mt-12">
            <Button to="/work" variant="secondary">
              {t('home.featured.viewAll')}
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Section */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tighter mb-6">
              {t('home.services.title')}
            </h2>
            <p className="text-text-active/80 mb-8">
              {t('home.services.subtitle')}
            </p>
            <Button to="/services" variant="secondary">
              {t('home.services.button')}
            </Button>
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-4">
            <ScrollReveal delay={0.1}>
              <div className="bg-button-bg aspect-square rounded-lg flex flex-col items-center justify-center p-6 text-center">
                <img
                  src={`${import.meta.env.BASE_URL}agents/stylist.png`}
                  alt="(stylist) UI/UX agent"
                  className="w-full h-full object-cover rounded-md"
                />
                <p className="mt-2 text-xs text-text-active/80">Stylist — UI/UX Design & Branding</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="bg-button-bg aspect-square rounded-lg flex flex-col items-center justify-center p-6 text-center mt-12">
                <img
                  src={`${import.meta.env.BASE_URL}agents/smith.png`}
                  alt="(smith) front-end agent"
                  className="w-full h-full object-cover rounded-md"
                />
                <p className="mt-2 text-xs text-text-active/80">Smith — Web & Mobile Development</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="bg-button-bg aspect-square rounded-lg flex flex-col items-center justify-center p-6 text-center">
                <img
                  src={`${import.meta.env.BASE_URL}agents/foundry.png`}
                  alt="(foundry) AI agent integration"
                  className="w-full h-full object-cover rounded-md"
                />
                <p className="mt-2 text-xs text-text-active/80">Foundry — AI Agent Integration</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <div className="bg-button-bg aspect-square rounded-lg flex flex-col items-center justify-center p-6 text-center mt-12">
                <img
                  src={`${import.meta.env.BASE_URL}agents/conveyor.png`}
                  alt="(conveyor) CI-CD agent"
                  className="w-full h-full object-cover rounded-md"
                />
                <p className="mt-2 text-xs text-text-active/80">Conveyor — Automation Pipelines</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Pricing Section */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tighter">{t('home.pricing.title')}</h2>
            <p className="mt-4 text-lg text-text-active/80 max-w-2xl mx-auto">
              {t('home.pricing.subtitle')}
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {plans.map((plan, index) => (
              <ScrollReveal key={plan.name} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.22 }}
                  className="border border-line rounded-lg p-8 h-full flex flex-col"
                >
                  <h2 className="font-display text-3xl font-medium tracking-tighter">{plan.name}</h2>
                  <p className="text-text-active/70 my-2">{plan.description}</p>
                  <p className="font-display text-5xl font-bold my-4">{plan.price}</p>
                  <ul className="space-y-2 text-text-active/80 flex-grow mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button to="/contact" className="w-full">
                    {t('home.pricing.choosePlan')}
                  </Button>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="text-center mt-12">
            <Button to="/plans" variant="secondary">
              {t('home.pricing.viewAll')}
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
