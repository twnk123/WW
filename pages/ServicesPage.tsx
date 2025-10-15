import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import { useLanguage } from '../contexts/LanguageContext';
import Seo from '../components/Seo';

// Utility: Check for reduced motion preference
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

// Enhanced Service Icon Component
const ServiceIcon: React.FC<{ name: 'web' | 'ai' | 'mobile' | 'strategy'; className?: string; size?: number }> = ({ name, className, size = 24 }) => {
  const common = `text-accent drop-shadow transition-all duration-300 ${className ?? ''}`;
  const svgProps = {
    className: common,
    width: size,
    height: size,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    viewBox: "0 0 24 24"
  };

  if (name === 'web') {
    return (
      <svg {...svgProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    );
  }
  if (name === 'ai') {
    return (
      <svg {...svgProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a1.5 1.5 0 00-1.456-1.456L15.25 7l1.035-.259a1.5 1.5 0 001.456-1.456L18 4.25l.259 1.035a1.5 1.5 0 001.456 1.456L20.75 7l-1.035.259a1.5 1.5 0 00-1.456 1.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-2.423-2.423L12.5 17.75l1.183-.394a2.25 2.25 0 002.423-2.423l.394-1.183.394 1.183a2.25 2.25 0 002.423 2.423l1.183.394-1.183.394a2.25 2.25 0 00-2.423 2.423z" />
      </svg>
    );
  }
  if (name === 'mobile') {
    return (
      <svg {...svgProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    );
  }
  return (
    <svg {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  );
};

// Parallax Section Wrapper
const ParallaxSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  speed?: number;
}> = ({ children, className = "", speed = 0.5 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-100 * speed, 100 * speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

// Enhanced Service Card with 3D effects
const ServiceCard: React.FC<{
  service: {
    name: 'web' | 'ai' | 'mobile' | 'strategy';
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    image: string;
    upcoming?: boolean;
  };
  index: number;
}> = ({ service, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(x);
    mouseY.set(y);
    rotateY.set(x * 5);
    rotateX.set(-y * 5);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      style={prefersReducedMotion ? {} : {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={prefersReducedMotion ? {} : { 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <div className={`${service.upcoming ? 'bg-white/50 border-accent/40' : 'bg-white border-accent/20'} border rounded-2xl overflow-hidden hover:border-accent transition-all duration-300 relative shadow-sm hover:shadow-lg`}>
        {service.upcoming && (
          <div className="absolute inset-x-0 top-1/3 z-20 flex justify-center">
            <div className="bg-accent text-white px-10 py-5 rounded-2xl text-3xl font-black shadow-2xl transform rotate-[-5deg]">
              {t('services.comingSoon')}
            </div>
          </div>
        )}
        {/* Image Section */}
        <div className="aspect-video overflow-hidden relative">
          <motion.img 
            src={service.image}
            alt={service.title}
            className={`w-full h-full object-cover ${service.upcoming ? 'opacity-50 grayscale' : ''}`}
            animate={isHovered && !prefersReducedMotion && !service.upcoming ? { scale: 1.1 } : {}}
            transition={{ duration: 0.4 }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/50 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-3">
              <ServiceIcon name={service.name} size={32} className="text-accent" />
              <h3 className="font-display text-2xl font-medium tracking-tighter text-white">
                {service.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className={`p-6 md:p-8 ${service.upcoming ? 'opacity-60' : ''}`}>
          <p className="text-accent font-medium mb-3">{service.subtitle}</p>
          <p className="text-text-active mb-6 leading-relaxed">
            {service.description}
          </p>
          <div className="space-y-3">
            <h4 className="font-medium text-text-active">{t('services.process.keyFeatures')}</h4>
            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start gap-3 text-text-active"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 + idx * 0.05 }}
                >
                  <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Process Timeline Component
const ProcessTimeline: React.FC<{
  steps: Array<{
    number: string;
    title: string;
    description: string;
    deliverables: string[];
  }>;
}> = ({ steps }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useLanguage();

  return (
    <div className="relative">
      {/* Progress Bar */}
      <div className="hidden lg:block absolute left-20 top-0 bottom-0 w-0.5 bg-line">
        <motion.div
          className="w-full bg-gradient-to-b from-accent to-accent/50"
          initial={{ height: "0%" }}
          animate={{ height: `${(activeStep + 1) * (100 / steps.length)}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {steps.map((step, index) => {
        const ref = useRef(null);
        const isInView = useInView(ref, { once: false, margin: "-200px" });
        
        useEffect(() => {
          if (isInView && index > activeStep) {
            setActiveStep(index);
          }
        }, [isInView, index, activeStep]);

        return (
          <motion.div
            key={index}
            ref={ref}
            className={`relative flex flex-col lg:flex-row gap-6 mb-12 lg:mb-16 last:mb-0 ${index <= activeStep ? 'opacity-100' : 'opacity-50'}`}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: index <= activeStep ? 1 : 0.5, x: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut"
            }}
          >
            {/* Step Number */}
            <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:w-40">
              <motion.div
                className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-2 transition-colors duration-300 ${
                  index <= activeStep ? 'bg-accent border-accent' : 'bg-bg border-line'
                }`}
                whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
              >
                <span className="text-lg font-bold text-text-active">
                  {step.number}
                </span>
              </motion.div>
              <h3 className="text-xl lg:text-2xl font-display font-medium tracking-tighter lg:hidden">
                {step.title}
              </h3>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="hidden lg:block text-2xl md:text-3xl font-display font-medium tracking-tighter mb-4">
                {step.title}
              </h3>
              <p className="text-text-active mb-6 leading-relaxed">
                {step.description}
              </p>
              <div className="bg-white/40 border border-line rounded-xl p-4 md:p-6">
                <h4 className="font-medium mb-3">{t('services.process.deliverables')}</h4>
                <ul className="grid md:grid-cols-2 gap-3">
                  {step.deliverables.map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-text-active"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.1 + idx * 0.03 }}
                    >
                      <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Comparison Table Component
const ComparisonTable: React.FC = () => {
  const { t } = useLanguage();
  
  const features = [
    { 
      feature: t('services.comparison.speedToMarket'), 
      ai: t('services.comparison.values.speedAI'), 
      traditional: t('services.comparison.values.speedTraditional'), 
      whiteweaver: t('services.comparison.values.speedOur') 
    },
    { 
      feature: t('services.comparison.codeQuality'), 
      ai: t('services.comparison.values.qualityAI'), 
      traditional: t('services.comparison.values.qualityTraditional'), 
      whiteweaver: t('services.comparison.values.qualityOur') 
    },
    { 
      feature: t('services.comparison.customSolutions'), 
      ai: t('services.comparison.values.customAI'), 
      traditional: t('services.comparison.values.customTraditional'), 
      whiteweaver: t('services.comparison.values.customOur') 
    },
    { 
      feature: t('services.comparison.cost'), 
      ai: t('services.comparison.values.costAI'), 
      traditional: t('services.comparison.values.costTraditional'), 
      whiteweaver: t('services.comparison.values.costOur') 
    },
    { 
      feature: t('services.comparison.scalability'), 
      ai: t('services.comparison.values.scaleAI'), 
      traditional: t('services.comparison.values.scaleTraditional'), 
      whiteweaver: t('services.comparison.values.scaleOur') 
    },
    { 
      feature: t('services.comparison.security'), 
      ai: t('services.comparison.values.securityAI'), 
      traditional: t('services.comparison.values.securityTraditional'), 
      whiteweaver: t('services.comparison.values.securityOur') 
    }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-line">
            <th className="text-left py-4 px-4 font-medium">{t('services.comparison.feature')}</th>
            <th className="text-center py-4 px-4 font-medium">{t('services.comparison.aiOnly')}</th>
            <th className="text-center py-4 px-4 font-medium">{t('services.comparison.traditional')}</th>
            <th className="text-center py-4 px-4 font-medium text-accent">{t('services.comparison.ourApproach')}</th>
          </tr>
        </thead>
        <tbody>
          {features.map((row, index) => (
            <motion.tr
              key={row.feature}
              className="border-b border-accent/10 hover:bg-gradient-to-r hover:from-accent/5 hover:to-purple-500/5 transition-all"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <td className="py-4 px-4 font-medium">{row.feature}</td>
              <td className="py-4 px-4 text-center text-text-active">{row.ai}</td>
              <td className="py-4 px-4 text-center text-text-active">{row.traditional}</td>
              <td className="py-4 px-4 text-center font-medium">{row.whiteweaver}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Interactive FAQ Component
const FAQ: React.FC<{
  items: Array<{ q: string; a: string }>;
}> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full text-left p-6 rounded-xl bg-white hover:bg-accent/5 transition-all duration-300 border border-accent/20 hover:border-accent"
              aria-expanded={isOpen}
            >
              <div className="flex items-center justify-between">
                <h3 className="pr-4 text-lg font-medium text-text-active">
                  {item.q}
                </h3>
                <motion.svg
                  className="w-5 h-5 text-accent flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </div>
            </button>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto", marginTop: 8 },
                    collapsed: { opacity: 0, height: 0, marginTop: 0 }
                  }}
                  transition={prefersReducedMotion ? { duration: 0 } : { 
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4">
                    <p className="text-text-active leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

const ServicesPage: React.FC = () => {
  const { t, language } = useLanguage();
  
  const services = [
    {
      name: 'web' as const,
      title: t('services.cards.web.title'),
      subtitle: t('services.cards.web.subtitle'),
      description: t('services.cards.web.description'),
      features: t('services.cards.web.features') as string[],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
      upcoming: false
    },
    {
      name: 'mobile' as const,
      title: t('services.cards.mobile.title'),
      subtitle: t('services.cards.mobile.subtitle'),
      description: t('services.cards.mobile.description'),
      features: t('services.cards.mobile.features') as string[],
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop',
      upcoming: true
    },
    {
      name: 'ai' as const,
      title: t('services.cards.ai.title'),
      subtitle: t('services.cards.ai.subtitle'),
      description: t('services.cards.ai.description'),
      features: t('services.cards.ai.features') as string[],
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
      upcoming: true
    },
    {
      name: 'strategy' as const,
      title: t('services.cards.strategy.title'),
      subtitle: t('services.cards.strategy.subtitle'),
      description: t('services.cards.strategy.description'),
      features: t('services.cards.strategy.features') as string[],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop',
      upcoming: true
    }
  ];

  const processSteps = t('services.process.steps') as Array<{
    number: string;
    title: string;
    description: string;
    deliverables: string[];
  }>;

  const faqs = t('services.faqs') as Array<{ q: string; a: string }>;
  
  const upcomingServices = [
    {
      icon: 'mobile' as const,
      title: t('services.upcoming.mobile.title'),
      description: t('services.upcoming.mobile.description'),
      features: t('services.upcoming.mobile.features') as string[]
    },
    {
      icon: 'ai' as const,
      title: t('services.upcoming.ai.title'),
      description: t('services.upcoming.ai.description'),
      features: t('services.upcoming.ai.features') as string[]
    },
    {
      icon: 'strategy' as const,
      title: t('services.upcoming.strategy.title'),
      description: t('services.upcoming.strategy.description'),
      features: t('services.upcoming.strategy.features') as string[]
    }
  ];

  const servicesSeoTitle = language === 'sl'
    ? 'Storitve razvoja spletnih strani, ecommerce in AI integracija — WHITEWEAVER Studio'
    : 'Web Development Services, Ecommerce & AI Integration — WHITEWEAVER Studio';
  const servicesDescBase = t('services.subtitle') as string;
  const servicesDesc = language === 'sl'
    ? `${servicesDescBase} Lokacija: Slovenija (Ljubljana).`
    : `${servicesDescBase} Location: Slovenia (Ljubljana).`;

  return (
    <div className="min-h-screen overflow-hidden bg-bg">
      <Seo
        title={servicesSeoTitle}
        description={servicesDesc}
        canonical="/services"
        alternates={[
          { hrefLang: 'en', href: '/services' },
          { hrefLang: 'sl', href: '/services?lang=sl' },
          { hrefLang: 'x-default', href: '/services' },
        ]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
              { '@type': 'ListItem', position: 2, name: String(t('services.title')), item: window.location.origin + '/services' },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: (t('services.faqs') as Array<{ q: string; a: string }>).map(item => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a }
            }))
          }
        ]}
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
            <h1 className="font-display text-[clamp(3rem,9vw,5.5rem)] md:text-[clamp(4.5rem,12vw,7rem)] font-normal tracking-[0.02em] leading-[0.9] uppercase mb-6 md:mb-8">
              {language === 'sl' ? 'STORITVE RAZVOJA SPLETNIH STRANI, ECOMMERCE IN AI INTEGRACIJA' : 'WEB DEVELOPMENT SERVICES, ECOMMERCE & AI INTEGRATION'}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-base md:text-lg text-text-active max-w-2xl mx-auto"
            >
              {t('services.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
            <a href="#web-development" className="px-4 py-2 rounded-full border border-line hover:border-text-active text-sm">Web Development</a>
            <a href="#ecommerce-development" className="px-4 py-2 rounded-full border border-line hover:border-text-active text-sm">Ecommerce Development</a>
            <a href="#ai-agent-integration" className="px-4 py-2 rounded-full border border-line hover:border-text-active text-sm">AI Agent Integration</a>
            <a href="#headless-cms" className="px-4 py-2 rounded-full border border-line hover:border-text-active text-sm">Headless CMS</a>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              {t('services.whatWeBuild')}
            </h2>
            <p className="text-lg md:text-xl text-text-active max-w-3xl mx-auto">
              {t('services.whatWeBuildSubtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const idMap: Record<string, string> = {
                web: 'web-development',
                ai: 'ai-agent-integration',
                strategy: 'headless-cms',
                mobile: 'mobile-app-development',
              };
              const anchorId = idMap[service.name] || service.name;
              return (
                <div key={service.name} id={anchorId}>
                  {/* For ecommerce, link to web-development section */}
                  {service.name === 'web' && (
                    <div id="ecommerce-development" className="sr-only">Ecommerce Development</div>
                  )}
                  <ServiceCard service={service} index={index} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-accent/5 to-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              {t('services.ourProcess')}
            </h2>
            <p className="text-lg md:text-xl text-text-active max-w-3xl mx-auto">
              {t('services.ourProcessSubtitle')}
            </p>
          </motion.div>

          <ProcessTimeline steps={processSteps} />
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              {t('services.whyChooseUs')}
            </h2>
            <p className="text-lg md:text-xl text-text-active max-w-3xl mx-auto">
              {t('services.whyChooseUsSubtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-accent/20 rounded-2xl p-6 md:p-10 shadow-lg"
          >
            <ComparisonTable />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-accent/5 to-transparent">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              {t('services.faq')}
            </h2>
            <p className="text-lg md:text-xl text-text-active">
              {t('services.faqSubtitle')}
            </p>
          </motion.div>

          <FAQ items={faqs} />
        </div>
      </section>

      {/* Sneak Peek Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-transparent via-button-bg/30 to-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-8 py-4 bg-accent/20 text-accent rounded-full text-xl font-bold mb-6 border-2 border-accent/30">
              {t('services.comingSoon')}
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              {t('services.whatsNext')}
            </h2>
            <p className="text-lg md:text-xl text-text-active max-w-3xl mx-auto">
              {t('services.whatsNextSubtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index + 1) * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-accent/10 rounded-2xl flex items-center justify-center">
                  <ServiceIcon name={service.icon} size={40} className="text-accent" />
                </div>
                <h3 className="font-display text-2xl font-medium tracking-tighter mb-2">{service.title}</h3>
                <p className="text-text-active mb-4">
                  {service.description}
                </p>
                <ul className="text-sm text-text-active space-y-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-text-active mb-6">
              {t('services.beFirst')}
            </p>
            <Button to="/contact" variant="secondary">
              {t('services.joinWaitlist')}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-16 overflow-hidden border-t border-line">
        <div className="marquee-content whitespace-nowrap">
          <span className="inline-block font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider text-accent/20 uppercase">
            {t('services.marquee')} {t('services.marquee')}
          </span>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <ParallaxSection speed={0.2}>
          <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-12 md:p-20 border border-accent/20"
            >
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                {t('services.readyToBuild')}
              </h2>
              <p className="text-lg md:text-xl text-text-active mb-8 max-w-2xl mx-auto">
                {t('services.readyToBuildSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button to="/contact" size="lg">{t('services.startProject')}</Button>
                <Button to="/plans" variant="secondary" size="lg">{t('services.viewPlans')}</Button>
              </div>
            </motion.div>
          </div>
        </ParallaxSection>
      </section>
    </div>
  );
};

export default ServicesPage;
