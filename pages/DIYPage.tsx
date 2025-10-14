import React, { useEffect, useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import Button from "../components/Button";
import TabSwitch from "../components/TabSwitch";
import { useLanguage } from "../contexts/LanguageContext";

// Route hint: already wired at /diy in App.tsx

const useSEO = (opts: { title: string; description: string; canonical?: string; og?: Partial<Record<string, string>> }) => {
  useEffect(() => {
    const set = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        if (selector.includes('[name="')) {
          el.setAttribute("name", selector.match(/name=\"([^\"]+)\"/)?.[1] || "");
        } else if (selector.includes('[property="')) {
          el.setAttribute("property", selector.match(/property=\"([^\"]+)\"/)?.[1] || "");
        }
        document.head.appendChild(el);
      }
      el!.setAttribute(attr, value);
    };

    document.title = opts.title;
    set('meta[name="description"]', 'content', opts.description);
    if (opts.canonical) {
      let linkEl = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!linkEl) {
        linkEl = document.createElement('link');
        linkEl.setAttribute('rel', 'canonical');
        document.head.appendChild(linkEl);
      }
      linkEl.setAttribute('href', opts.canonical);
    }
    const og = opts.og || {};
    const setOg = (property: string, content: string) => set(`meta[property="${property}"]`, 'content', content);
    setOg('og:title', opts.title);
    setOg('og:description', opts.description);
    if (og['og:url']) setOg('og:url', og['og:url']!);
    if (og['og:image']) setOg('og:image', og['og:image']!);
    setOg('twitter:card', 'summary_large_image');
    setOg('twitter:title', opts.title);
    setOg('twitter:description', opts.description);
  }, [opts]);
};

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

// Enhanced Card with 3D tilt and glow effects
const EnhancedCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  index?: number;
}> = ({ children, className = "", delay = 0, index = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  const prefersReducedMotion = usePrefersReducedMotion();

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
  };

  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={prefersReducedMotion ? {} : {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: delay + index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={prefersReducedMotion ? {} : { 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <div className="relative z-10">{children}</div>
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mouseX.get() * 100}% ${mouseY.get() * 100}%, rgba(59, 130, 246, 0.1), transparent 40%)`,
          }}
        />
      )}
    </motion.div>
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

// Timeline/Stepper Component
const Timeline: React.FC<{ steps: Array<{ title: string; description: string; time?: string }> }> = ({ steps }) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-transparent" />
      
      {steps.map((step, index) => {
        const ref = useRef(null);
        const isInView = useInView(ref, { once: true, margin: "-50px" });
        
        return (
          <motion.div
            key={index}
            ref={ref}
            className="relative flex items-start mb-8 md:mb-12 last:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut"
            }}
          >
            {/* Circle */}
            <motion.div
              className="relative z-10 flex items-center justify-center w-8 h-8 md:w-16 md:h-16 bg-bg border-2 border-accent rounded-full"
              whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
            >
              <span className="text-xs md:text-sm font-bold text-accent">{index + 1}</span>
            </motion.div>
            
            {/* Content */}
            <div className="ml-6 md:ml-8 flex-1">
              {step.time && (
                <span className="inline-block px-3 py-1 mb-2 text-xs rounded-full bg-accent/10 text-accent font-medium">
                  {step.time}
                </span>
              )}
              <h3 className="text-lg md:text-xl font-display font-medium mb-2">{step.title}</h3>
              <p className="text-sm md:text-base text-text-active leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Interactive FAQ Component with smooth animations
const FAQ: React.FC<{ items: Array<{ q: string; a: string }> }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="space-y-3">
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
              className="w-full text-left p-4 md:p-6 rounded-xl bg-white hover:bg-accent/5 transition-all duration-300 border border-accent/20 hover:border-accent min-h-[44px] touch-manipulation"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="pr-4 text-base md:text-lg font-medium text-text-active">
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
                  id={`faq-answer-${index}`}
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
                  <div className="p-4 md:p-6 pt-0">
                    <p className="text-sm md:text-base text-text-active leading-relaxed">
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

// Copy Code Button with feedback
const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      className="relative px-4 py-2 min-h-[44px] bg-accent hover:bg-accent/90 text-white rounded-lg font-medium text-sm transition-colors touch-manipulation"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {t('diy.copied')}
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {t('diy.copyCode')}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// Code Block Component
const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language = "bash" }) => {
  return (
    <div className="relative group">
      <pre className="bg-gradient-to-br from-white to-accent/5 border border-accent/20 rounded-xl p-4 md:p-6 overflow-x-auto text-xs md:text-sm font-mono">
        <code className="text-text-active">{code}</code>
      </pre>
      <div className="absolute top-2 right-2 md:top-4 md:right-4">
        <CopyButton text={code} />
      </div>
    </div>
  );
};

const DIYPage: React.FC = () => {
  const { t } = useLanguage();
  
  const title = 'DIY Development • Build Your Own Website';
  const description = 'Build professional websites with our modern stack. Step-by-step guides, interactive tutorials, and everything you need to create your own web presence.';

  useSEO({ title, description });

  const [activeTab, setActiveTab] = useState('modify');
  const prefersReducedMotion = usePrefersReducedMotion();

  // FAQ items
  const faqItems = t('diy.faq.items') as Array<{ q: string; a: string }>;

  // Add FAQPage structured data
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-faqpage', '1');
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a
        }
      }))
    });
    document.head.appendChild(script);

    return () => {
      document.head.querySelectorAll('script[data-faqpage="1"]').forEach(s => s.remove());
    };
  }, [JSON.stringify(faqItems)]);

  const tabs = [
    { id: 'modify', label: t('diy.tabs.modify') },
    { id: 'build', label: t('diy.tabs.build') }
  ];

  // Timeline steps for build process
  const buildSteps = t('diy.buildProcess.steps') as Array<{
    title: string;
    description: string;
    time: string;
  }>;

  return (
    <div className="min-h-screen bg-bg overflow-hidden">
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
              {t('diy.title')}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-base md:text-lg text-text-active max-w-2xl mx-auto"
            >
              {t('diy.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-line">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              t('diy.stats.buildTime'),
              t('diy.stats.ownership'),
              t('diy.stats.performance')
            ].map((stat: any, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-text-active">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Section */}
      <section id="get-started" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl md:text-5xl font-bold tracking-tighter mb-4"
            >
              {t('diy.choosePath.title')}
            </motion.h2>
            <p className="text-lg text-text-active max-w-2xl mx-auto">
              {t('diy.choosePath.subtitle')}
            </p>
          </div>

          <TabSwitch
            tabs={tabs}
            activeId={activeTab}
            onChange={setActiveTab}
          />

          <AnimatePresence mode="wait">
            {activeTab === 'modify' && (
              <motion.div
                key="modify"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-12"
              >
                {/* Quick Start Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  {[
                    {
                      ...t('diy.quickStart.clone'),
                      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop"
                    },
                    {
                      ...t('diy.quickStart.customize'),
                      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop"
                    },
                    {
                      ...t('diy.quickStart.deploy'),
                      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop"
                    }
                  ].map((card: any, index) => (
                    <EnhancedCard key={index} index={index} className="group">
                      <div className="relative bg-white border border-accent/20 rounded-xl overflow-hidden hover:border-accent transition-colors shadow-sm hover:shadow-lg">
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={card.image}
                            alt={card.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-6">
                          <div className="text-3xl mb-3">{card.icon}</div>
                          <h3 className="text-xl font-display font-medium mb-2">{card.title}</h3>
                          <p className="text-sm text-text-active leading-relaxed">{card.description}</p>
                        </div>
                      </div>
                    </EnhancedCard>
                  ))}
                </div>

                {/* Common Tasks Section */}
                <div className="mb-12">
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-8">{t('diy.commonMods.title')}</h3>
                  <div className="space-y-6">
                    {[
                      {
                        title: t('diy.commonMods.updateContent.title'),
                        steps: t('diy.commonMods.updateContent.steps'),
                        code: `// pages/HomePage.tsx
export const HomePage = () => {
  return (
    <Hero
      title="Your New Headline"
      subtitle="Updated value proposition"
      ctaText="Get Started"
    />
  );
};`
                      },
                      {
                        title: t('diy.commonMods.addSection.title'),
                        steps: t('diy.commonMods.addSection.steps'),
                        code: `import { FeatureGrid } from '../components/FeatureGrid';

const features = [
  { icon: "⚡", title: "Fast", description: "Lightning quick" },
  { icon: "🔒", title: "Secure", description: "Bank-level security" }
];

<FeatureGrid items={features} />`
                      },
                      {
                        title: t('diy.commonMods.createPage.title'),
                        steps: t('diy.commonMods.createPage.steps'),
                        code: `// App.tsx
<Route path="/new-page" element={<NewPage />} />

// components/Header.tsx
<NavLink to="/new-page">New Page</NavLink>`
                      }
                    ].map((task: any, index) => (
                      <EnhancedCard key={index} index={index}>
                        <div className="bg-white border border-accent/20 rounded-xl p-6 md:p-8 shadow-sm">
                          <h4 className="text-xl font-display font-medium mb-4">{task.title}</h4>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h5 className="font-medium mb-3 text-accent">{t('diy.commonMods.stepsLabel')}</h5>
                              <ol className="space-y-2">
                                {task.steps.map((step: string, i: number) => (
                                  <li key={i} className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 bg-accent/10 text-accent rounded-full flex items-center justify-center text-sm font-bold">
                                      {i + 1}
                                    </span>
                                    <span className="text-sm text-text-active">{step}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>
                            <div>
                              <h5 className="font-medium mb-3 text-accent">{t('diy.commonMods.exampleLabel')}</h5>
                              <CodeBlock code={task.code} language="typescript" />
                            </div>
                          </div>
                        </div>
                      </EnhancedCard>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'build' && (
              <motion.div
                key="build"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-12"
              >
                {/* Build Process Timeline */}
                <div className="mb-16">
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-8">{t('diy.buildProcess.title')}</h3>
                  <Timeline steps={buildSteps} />
                </div>

                {/* Tech Stack Cards */}
                <div className="mb-16">
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-8">{t('diy.techStack.title')}</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {(t('diy.techStack.items') as Array<{name: string; category: string; description: string}>).map((tech, index) => {
                      const images = [
                        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
                        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop",
                        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
                        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop"
                      ];
                      return (
                      <EnhancedCard key={index} index={index}>
                        <div className="bg-white border border-accent/20 rounded-xl overflow-hidden group hover:border-accent transition-all shadow-sm hover:shadow-lg">
                          <div className="aspect-video overflow-hidden">
                            <img 
                              src={images[index]}
                              alt={tech.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                          </div>
                          <div className="p-4">
                            <span className="text-xs text-accent font-medium">{tech.category}</span>
                            <h4 className="text-lg font-display font-medium mt-1">{tech.name}</h4>
                            <p className="text-sm text-text-active mt-1">{tech.description}</p>
                          </div>
                        </div>
                      </EnhancedCard>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Start Commands */}
                <div className="mb-16">
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-8">{t('diy.quickStartCommands.title')}</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">{t('diy.quickStartCommands.create.title')}</h4>
                      <CodeBlock code={`npm create vite@latest my-website -- --template react-ts
cd my-website
npm install`} />
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">{t('diy.quickStartCommands.install.title')}</h4>
                      <CodeBlock code={`npm install framer-motion react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`} />
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">{t('diy.quickStartCommands.start.title')}</h4>
                      <CodeBlock code={`npm run dev
# Open http://localhost:5173`} />
                    </div>
                  </div>
                </div>

                {/* Feature Comparison */}
                <div className="mb-16">
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-8">{t('diy.comparison.title')}</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <EnhancedCard>
                      <div className="bg-white border border-accent/20 rounded-xl p-6 md:p-8 shadow-sm">
                        <h4 className="text-xl font-display font-medium mb-4 text-accent">{t('diy.comparison.visual.title')}</h4>
                        <ul className="space-y-3">
                          {(t('diy.comparison.visual.pros') as string[]).map((pro, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-sm">{pro}</span>
                            </li>
                          ))}
                          {(t('diy.comparison.visual.cons') as string[]).map((con, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                              <span className="text-sm">{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </EnhancedCard>

                    <EnhancedCard>
                      <div className="bg-button-bg border border-accent rounded-xl p-6 md:p-8">
                        <h4 className="text-xl font-display font-medium mb-4 text-accent">{t('diy.comparison.code.title')}</h4>
                        <ul className="space-y-3">
                          {(t('diy.comparison.code.pros') as string[]).map((pro, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-sm">{pro}</span>
                            </li>
                          ))}
                          {(t('diy.comparison.code.cons') as string[]).map((con, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                              <span className="text-sm">{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </EnhancedCard>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="py-16 md:py-24 bg-gradient-to-b from-accent/5 to-transparent">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tighter mb-4">
              {t('diy.examples.title')}
            </h2>
            <p className="text-lg text-text-active max-w-2xl mx-auto">
              {t('diy.examples.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(t('diy.examples.items') as Array<{title: string; category: string}>).map((example, index) => {
              const images = [
                "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop"
              ];
              const metrics = [
                { score: "92", time: "2.4s", size: "1.6MB" },
                { score: "95", time: "2.1s", size: "1.2MB" },
                { score: "88", time: "2.9s", size: "2.3MB" },
                { score: "93", time: "2.3s", size: "1.4MB" },
                { score: "98", time: "1.8s", size: "0.9MB" },
                { score: "91", time: "2.5s", size: "1.7MB" }
              ];
              return (
              <EnhancedCard key={index} index={index}>
                <div className="bg-white border border-accent/20 rounded-xl overflow-hidden group hover:border-accent transition-all duration-300 shadow-sm hover:shadow-lg">
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={images[index]}
                      alt={example.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-bg/90 backdrop-blur rounded-full text-xs font-medium">
                        {example.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-display font-medium mb-3">{example.title}</h3>
                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div>
                        <div className="text-text-active mb-1">{t('diy.examples.metrics.score')}</div>
                        <div className="font-bold text-accent">{metrics[index].score}</div>
                      </div>
                      <div>
                        <div className="text-text-active mb-1">{t('diy.examples.metrics.load')}</div>
                        <div className="font-bold">{metrics[index].time}</div>
                      </div>
                      <div>
                        <div className="text-text-active mb-1">{t('diy.examples.metrics.size')}</div>
                        <div className="font-bold">{metrics[index].size}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </EnhancedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tighter mb-4">
              {t('diy.faq.title')}
            </h2>
            <p className="text-lg text-text-active">
              {t('diy.faq.subtitle')}
            </p>
          </motion.div>

          <FAQ items={faqItems} />
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-16 overflow-hidden border-t border-line">
        <div className="marquee-content whitespace-nowrap">
          <span className="inline-block font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider text-accent/20 uppercase">
            {t('diy.marquee')}
          </span>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <ParallaxSection speed={0.2}>
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-8 md:p-16 border border-accent/20"
            >
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tighter mb-6">
                {t('diy.cta.title')}
              </h2>
              <p className="text-lg md:text-xl text-text-active mb-8 max-w-2xl mx-auto">
                {t('diy.cta.subtitle')}
              </p>
              <div className="flex justify-center">
                <Button href="/contact" variant="primary" size="lg">
                  {t('diy.cta.button')}
                </Button>
              </div>
            </motion.div>
          </div>
        </ParallaxSection>
      </section>
    </div>
  );
};

export default DIYPage;
