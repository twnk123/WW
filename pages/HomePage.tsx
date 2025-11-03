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
        alt={`Professional web application ${imageData.id === 1 ? 'dashboard' : imageData.id === 2 ? 'interface' : 'design'} developed by WHITEWEAVER Studio`}
        className="w-full h-auto object-cover rounded-2xl shadow-xl pointer-events-none"
      />
    </motion.div>
  );
};

const HomePage: React.FC = () => {
  const { t } = useLanguage();

  // Get translated projects
  const translatedProjects = projects.map(project => {
    const translation = projectsTranslations.en.projects.find(p => p.slug === project.slug);
    return {
      ...project,
      title: translation?.title || project.title,
      tag: translation?.tag || project.tag,
    };
  });

  const featuredProjects = translatedProjects.slice(0, 2);

  const seoTitle = 'AI Web Development Agency | Build Your MVP in 5 Days | WHITEWEAVER';

  const baseDesc = t('home.services.subtitle') as string;
  const description = `AI-powered web development agency building production-ready MVPs in 5 days. Fixed pricing from €200. Money-back guarantee. Fast, affordable, expert-driven development for startups.`;

  return (
    <div>
      <Seo
        title={seoTitle}
        description={description}
        canonical="/"
        image={`${import.meta.env.BASE_URL}hero/hero-1.webp`}
        alternates={[
          { hrefLang: 'en', href: '/' },
          { hrefLang: 'x-default', href: '/' },
        ]}
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
          {
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'WHITEWEAVER Studio',
            url: window.location.origin,
            description: 'AI-powered web development agency specializing in rapid MVP development, custom web applications, and automation. Delivering production-ready software in 3 days to clients worldwide.',
            areaServed: ['Europe', 'North America', 'United States', 'United Kingdom', 'Germany', 'France', 'Canada', 'Worldwide'],
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'SI',
              addressLocality: 'Ljubljana'
            },
            priceRange: '€200-€2200',
            serviceType: ['Web Development', 'MVP Development', 'Web Application Development', 'AI Integration', 'E-commerce Development'],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '47'
            }
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How can you build an MVP in just 5 days?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We use AI automation for repetitive tasks (code generation, testing, deployment) while expert developers handle architecture, design decisions, and quality control. This hybrid approach compresses months of work into days without sacrificing quality.'
                }
              },
              {
                '@type': 'Question',
                name: "What's included in the money-back guarantee?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "If we don't deliver your production-ready MVP within 5 days, you get 100% of your money back. No questions asked. We're that confident in our process."
                }
              },
              {
                '@type': 'Question',
                name: 'Do you use templates or build from scratch?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Every project is custom-built to your specifications. No templates. We use modern frameworks (React, Node.js) and best practices, with AI handling boilerplate while humans craft the unique features.'
                }
              },
              {
                '@type': 'Question',
                name: 'What happens after the 5 days?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You get the complete source code, documentation, and deployment access. Pro and Scale packages include 1 month of free updates. After that, you can maintain it yourself or choose our ongoing support plans.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can you integrate with my existing systems?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. We can integrate with APIs, databases, payment processors, and third-party services. Just let us know your requirements during the strategy session.'
                }
              },
              {
                '@type': 'Question',
                name: 'What if I need changes after delivery?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Each package includes revision rounds (1-3 depending on tier). After those, Pro and Scale packages get 1 month free updates. Additional changes are billed at €50/hour or you can upgrade to a support plan.'
                }
              }
            ]
          }
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
              <AnimatedText text="WE BUILD YOUR MVP" el="span" className="block" />
              <AnimatedText text="IN UNDER 5 DAYS" el="span" className="block" />
              <AnimatedText text="OR YOU GET YOUR" el="span" className="block" />
              <AnimatedText text="MONEY BACK" el="span" className="block" />
            </h1>
            <ScrollReveal delay={0.6}>
              <p className="mt-6 text-lg text-text-active/80 max-w-xl mx-auto">{t('home.hero.subtitle')}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.8} className="mt-10 flex items-center justify-center gap-4">
              <a href="https://calendly.com/tonklis-vodopivec/30min" target="_blank" rel="noopener noreferrer">
                <Button variant="navbar">
                  {t('home.hero.startBuild')}
                </Button>
              </a>
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
              <AnimatedText text="WE BUILD YOUR MVP IN UNDER 5 DAYS OR YOU GET YOUR MONEY BACK" el="span" />
            </h1>
            <ScrollReveal delay={0.3}>
              <p className="mt-6 text-base text-text-active/80 max-w-md mx-auto">{t('home.hero.subtitle')}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.4} className="mt-8 flex flex-col items-center space-y-4">
              <a href="https://calendly.com/tonklis-vodopivec/30min" target="_blank" rel="noopener noreferrer" className="w-full max-w-xs">
                <Button variant="navbar" className="w-full">
                  {t('home.hero.startBuild')}
                </Button>
              </a>
            </ScrollReveal>
          </div>
          <div className="mt-16 space-y-8">
            {mobileImages.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt={`${i === 0 ? 'Custom web application showcase' : i === 1 ? 'Modern website design portfolio' : 'Professional web development project'} by WHITEWEAVER`}
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
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter">{t('home.featured.title')}</h2>
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
            <Button to="/work" variant="secondary" style={{ borderColor: '#0E5F63' }}>
              {t('home.featured.viewAll')}
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Why We Exist Section */}
      <section className="py-16 md:py-24 pb-32 md:pb-48">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-8">
                Why We Exist
              </h2>
              <div className="relative w-full max-w-4xl mx-auto h-[2px] mb-12">
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to right, transparent 0%, #0E5F63 20%, #0E5F63 80%, transparent 100%)',
                  }}
                />
              </div>
              <div className="max-w-3xl mx-auto space-y-6 text-left md:text-center">
                <ScrollReveal delay={0.2}>
                  <p className="text-lg md:text-xl text-text-active leading-relaxed">
                    <span className="font-semibold">We saw a problem:</span> Startups with game-changing ideas were bleeding opportunity. Traditional agencies demanded €20,000+ and wasted 3-6 months of runway. DIY platforms handed them amateur templates that screamed "cheap."
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.3}>
                  <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-bold" style={{ color: '#0E5F63' }}>
                    Every day you wait is a day your competitors launch. Your window is closing.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.4}>
                  <p className="text-lg md:text-xl text-text-active leading-relaxed">
                    So we built the antidote. AI automation + expert oversight = <span className="font-semibold">months compressed into 5 days.</span> Production-ready code. Zero corners cut. Fixed pricing. Money-back guarantee.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.5}>
                  <p className="text-xl md:text-2xl font-semibold text-text-active leading-relaxed">
                    Our mission: Professional web development for every startup—at a price you can afford, delivered while your competitors are still waiting for quotes.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.6}>
                  <div className="pt-8">
                    <a href="https://calendly.com/tonklis-vodopivec/30min" target="_blank" rel="noopener noreferrer">
                      <Button variant="navbar" className="text-lg px-8 py-4">
                        Lock In Founding Rates →
                      </Button>
                    </a>
                    <p className="mt-4 text-sm text-red-600 font-semibold">
                      Only 3 founding client spots left forever
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
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
            <Button to="/services" variant="secondary" style={{ border: '2px solid #0E5F63' }}>
              {t('home.services.button')}
            </Button>
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-4">
            <ScrollReveal delay={0.1}>
              <div className="bg-button-bg aspect-square rounded-lg flex flex-col items-center justify-center p-6 text-center">
                <img
                  src={`${import.meta.env.BASE_URL}agents/stylist.webp`}
                  alt="AI-powered UI/UX design and branding automation agent for web development"
                  className="w-full h-full object-cover rounded-md"
                />
                <p className="mt-2 text-xs text-text-active/80">Stylist — UI/UX Design & Branding</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="bg-button-bg aspect-square rounded-lg flex flex-col items-center justify-center p-6 text-center mt-12">
                <img
                  src={`${import.meta.env.BASE_URL}agents/smith.webp`}
                  alt="AI front-end development agent for React and modern web applications"
                  className="w-full h-full object-cover rounded-md"
                />
                <p className="mt-2 text-xs text-text-active/80">Smith — Web & Mobile Development</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="bg-button-bg aspect-square rounded-lg flex flex-col items-center justify-center p-6 text-center">
                <img
                  src={`${import.meta.env.BASE_URL}agents/foundry.webp`}
                  alt="AI integration and automation agent for web development workflows"
                  className="w-full h-full object-cover rounded-md"
                />
                <p className="mt-2 text-xs text-text-active/80">Foundry — AI Agent Integration</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <div className="bg-button-bg aspect-square rounded-lg flex flex-col items-center justify-center p-6 text-center mt-12">
                <img
                  src={`${import.meta.env.BASE_URL}agents/conveyor.webp`}
                  alt="Automated CI/CD deployment agent for fast web application delivery"
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
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tighter">{t('home.pricing.title')}</h2>
            <p className="mt-4 text-lg text-text-active/80 max-w-2xl mx-auto">
              {t('home.pricing.subtitle')}
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {plans.map((plan, index) => {
              const isPopular = index === 1;
              const isPremium = index === 2;
              const hasDiscount = index >= 1;
              const discountPercent = index === 1 ? 0.30 : 0.50;
              const originalPrice = parseInt(plan.price.replace(/[^0-9]/g, ''));
              const discountedPrice = index === 1 ? 700 : Math.round(originalPrice * (1 - discountPercent));

              return (
              <ScrollReveal key={plan.name} delay={index * 0.1}>
                <div className="relative">
                  {hasDiscount && (
                    <div className="absolute -top-3 -right-3 z-20">
                      <div className="relative">
                        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white px-4 py-2 rounded-lg shadow-xl transform rotate-3">
                          <div className="font-bold text-sm">{Math.round(discountPercent * 100)}% OFF</div>
                          <div className="text-xs opacity-90">Founding Clients</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {isPopular && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="px-4 py-1 bg-accent text-black text-xs font-semibold rounded-full whitespace-nowrap shadow-lg" style={{ border: '2px solid #0E5F63' }}>
                        Most Popular
                      </span>
                    </div>
                  )}

                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="relative h-full rounded-2xl p-7 flex flex-col bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
                    style={{ border: '1px solid #0E5F63' }}
                  >
                    <div className="mb-4">
                      <h3 className="font-display text-3xl font-medium tracking-tight mb-1">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-text-active leading-relaxed">
                        {plan.description}
                      </p>
                    </div>

                    <div className="mb-6">
                      {hasDiscount ? (
                        <div className="flex items-baseline gap-3">
                          <span className="font-display text-4xl font-bold tracking-tight text-red-600">
                            €{discountedPrice}
                          </span>
                          <span className="font-display text-2xl font-medium tracking-tight text-text-active/40 line-through">
                            {plan.price}
                          </span>
                        </div>
                      ) : (
                        <span className="font-display text-4xl font-bold tracking-tight">
                          {plan.price}
                        </span>
                      )}
                    </div>

                    <ul className="space-y-2 mb-8 flex-1">
                      {plan.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                          className="flex items-start gap-2 text-sm text-text-active"
                        >
                          <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <Button to="/contact" variant="navbar" className="w-full">
                      {t('home.pricing.choosePlan')}
                    </Button>
                  </motion.div>
                </div>
              </ScrollReveal>
              );
            })}
          </div>
          <ScrollReveal className="text-center mt-12">
            <Button to="/plans" variant="secondary" style={{ borderColor: '#0E5F63' }}>
              {t('home.pricing.viewAll')}
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tighter mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-text-active/70">
              Everything you need to know about our AI-powered development
            </p>
          </ScrollReveal>

          <div className="space-y-4">
            <ScrollReveal delay={0.1}>
              <details className="group bg-white rounded-xl p-6 shadow-sm border border-line">
                <summary className="flex justify-between items-center cursor-pointer list-none font-semibold text-lg">
                  How can you build an MVP in just 5 days?
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="mt-4 text-text-active/80 leading-relaxed">
                  We use AI automation for repetitive tasks (code generation, testing, deployment) while expert developers handle architecture, design decisions, and quality control. This hybrid approach compresses months of work into days without sacrificing quality.
                </div>
              </details>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <details className="group bg-white rounded-xl p-6 shadow-sm border border-line">
                <summary className="flex justify-between items-center cursor-pointer list-none font-semibold text-lg">
                  What's included in the money-back guarantee?
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="mt-4 text-text-active/80 leading-relaxed">
                  If we don't deliver your production-ready MVP within 5 days, you get 100% of your money back. No questions asked. We're that confident in our process.
                </div>
              </details>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <details className="group bg-white rounded-xl p-6 shadow-sm border border-line">
                <summary className="flex justify-between items-center cursor-pointer list-none font-semibold text-lg">
                  Do you use templates or build from scratch?
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="mt-4 text-text-active/80 leading-relaxed">
                  Every project is custom-built to your specifications. No templates. We use modern frameworks (React, Node.js) and best practices, with AI handling boilerplate while humans craft the unique features.
                </div>
              </details>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <details className="group bg-white rounded-xl p-6 shadow-sm border border-line">
                <summary className="flex justify-between items-center cursor-pointer list-none font-semibold text-lg">
                  What happens after the 5 days?
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="mt-4 text-text-active/80 leading-relaxed">
                  You get the complete source code, documentation, and deployment access. Pro and Scale packages include 1 month of free updates. After that, you can maintain it yourself or choose our ongoing support plans.
                </div>
              </details>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <details className="group bg-white rounded-xl p-6 shadow-sm border border-line">
                <summary className="flex justify-between items-center cursor-pointer list-none font-semibold text-lg">
                  Can you integrate with my existing systems?
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="mt-4 text-text-active/80 leading-relaxed">
                  Yes. We can integrate with APIs, databases, payment processors, and third-party services. Just let us know your requirements during the strategy session.
                </div>
              </details>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <details className="group bg-white rounded-xl p-6 shadow-sm border border-line">
                <summary className="flex justify-between items-center cursor-pointer list-none font-semibold text-lg">
                  What if I need changes after delivery?
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="mt-4 text-text-active/80 leading-relaxed">
                  Each package includes revision rounds (1-3 depending on tier). After those, Pro and Scale packages get 1 month free updates. Additional changes are billed at €50/hour or you can upgrade to a support plan.
                </div>
              </details>
            </ScrollReveal>
          </div>

          <ScrollReveal className="text-center mt-12">
            <p className="text-text-active/70 mb-6">Still have questions?</p>
            <Button to="/contact" variant="navbar">
              Get a 15-min Strategy Session
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
