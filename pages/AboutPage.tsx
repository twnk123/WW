import React from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import { teamMembers } from '../data/team';
import { faqs } from '../data/faqs';
import { useLanguage } from '../contexts/LanguageContext';
import Seo from '../components/Seo';

const AboutPage: React.FC = () => {
  const { t, language } = useLanguage();
  const valuesData = t('about.values') as any;
  const valuesItems = Array.isArray(valuesData?.items) ? valuesData.items : [];
  const timelineData = t('about.timeline') as any;
  const timelineItems = Array.isArray(timelineData?.items)
    ? timelineData.items
    : [
        { year: '2022', text: timelineData?.year2022 },
        { year: '2023', text: timelineData?.year2023 },
        { year: '2024', text: timelineData?.year2024 }
      ].filter((item) => item?.text);
  const whyData = t('about.why') as any;
  const whyItems = ['methodology', 'experts', 'speedQuality', 'ownership']
    .map((key) => ({ key, ...(whyData?.[key] || {}) }))
    .filter((item) => item.title && item.text);
  const statsTranslations = t('about.stats') as Record<string, string> | undefined;
  const statsData = [
    { value: '98%', label: statsTranslations?.satisfaction || 'Client Satisfaction' },
    { value: '5x', label: statsTranslations?.speed || 'Faster Delivery' },
    { value: '50+', label: statsTranslations?.projects || 'Projects Completed' },
    { value: '24/7', label: statsTranslations?.support || 'Support Available' }
  ];
  const faqData = t('about.faq') as { title?: string; items?: Array<{ question: string; answer: string }> };
  const localizedFaqs = Array.isArray(faqData?.items) && faqData.items.length
    ? faqData.items
    : faqs;
  const faqTitle = faqData?.title || (language === 'sl' ? 'Pogosta vprašanja' : 'FAQ');

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-transparent via-accent/5 to-transparent">
      <Seo
        title={`${t('about.title')} — WHITEWEAVER Studio`}
        description={t('about.subtitle')}
        canonical="/about"
        alternates={[
          { hrefLang: 'en', href: '/about' },
          { hrefLang: 'sl', href: '/about?lang=sl' },
          { hrefLang: 'x-default', href: '/about' },
        ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
            { '@type': 'ListItem', position: 2, name: String(t('nav.about')), item: window.location.origin + '/about' },
          ],
        }}
      />
      {/* Hero Section - Above the fold */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500 rounded-full blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block px-6 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-accent/20"
            >
              {t('about.badge')}
            </motion.span>
            <h1 className="font-display text-[clamp(3rem,10vw,8rem)] md:text-[clamp(4rem,12vw,10rem)] font-normal tracking-[0.02em] leading-[0.85] uppercase mb-6 md:mb-8 bg-gradient-to-br from-text-active to-accent bg-clip-text text-transparent">
              {t('about.title').toUpperCase()}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl text-text-active max-w-3xl mx-auto leading-relaxed"
            >
              {t('about.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Our Mission */}
      <section className="pb-24 md:pb-32 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="relative">
              <ScrollReveal>
                <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium mb-6">{t('about.mission.title')}</span>
                <h2 className="font-display text-5xl md:text-6xl font-medium tracking-tighter mb-6 bg-gradient-to-br from-text-active to-accent/80 bg-clip-text text-transparent">
                  {t('about.title')}
                </h2>
                <div className="text-text-active space-y-6 leading-relaxed text-lg">
                  <p className="text-text-active/90">{t('about.mission.text')}</p>
                  <p className="text-text-active/80">{t('about.subtitle')}</p>
                </div>
              </ScrollReveal>
            </div>
            <div>
              {/* Stats grid with glassmorphism */}
              <div className="grid grid-cols-2 gap-4">
                {statsData.map((s, i) => (
                  <ScrollReveal key={s.label} delay={i * 0.08}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="rounded-2xl bg-gradient-to-br from-white to-accent/5 backdrop-blur-sm border border-accent/20 text-center py-8 px-4 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="font-display text-5xl md:text-6xl font-bold text-text-active/80">{s.value}</div>
                      <div className="mt-2 text-sm text-text-active/80 font-medium">{s.label}</div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Our Core Values */}
      <section className="py-32 md:py-40 bg-gradient-to-b from-accent/5 via-transparent to-accent/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal className="mb-16 text-center">
            <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium mb-4">{valuesData?.badge || 'What Drives Us'}</span>
            <h2 className="font-display text-5xl md:text-6xl font-medium tracking-tighter mb-4">{valuesData?.title || 'Our Core Values'}</h2>
            <p className="text-text-active text-lg max-w-3xl leading-relaxed mx-auto">{valuesData?.description || 'The principles that guide our work every day.'}</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(valuesItems.length ? valuesItems : [
              { key: 'velocity', title: 'Velocity', body: 'Deliver rapidly without sacrificing quality. We optimize for impact and clarity.' },
              { key: 'ownership', title: 'Ownership', body: 'Treat problems as our own. We are accountable from idea to handover.' },
              { key: 'craft', title: 'Craftsmanship', body: 'Build with care, precision, and empathy for users and maintainers.' },
              { key: 'transparency', title: 'Transparency', body: 'Communicate clearly. Share progress, trade-offs, and decisions openly.' }
            ]).map((v: { key: string; title: string; body: string }, i: number) => (
              <ScrollReveal key={v.key} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="h-full p-6 rounded-2xl bg-white border border-accent/20 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-purple-500/20 border border-accent/30 text-accent">
                    {v.key === 'velocity' && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 3L4 14h7l-1 7 9-11h-7z"/></svg>
                    )}
                    {v.key === 'ownership' && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"/><circle cx="12" cy="12" r="9" strokeWidth="2"/></svg>
                    )}
                    {v.key === 'craft' && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h6l2 3h10M7 7l3 10m-3-10l-4 9m7 1h9"/></svg>
                    )}
                    {v.key === 'transparency' && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" strokeWidth="2"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h8M12 8v8"/></svg>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{v.title}</h3>
                  <p className="text-text-active/80 leading-relaxed">{v.body}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: How We Started (timeline) */}
      <section className="py-32 md:py-40">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <ScrollReveal className="mb-12 text-center">
            <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium mb-4">{timelineData?.badge || 'Our Journey'}</span>
            <h2 className="font-display text-5xl md:text-6xl font-medium tracking-tighter">{timelineData?.title || 'How We Started'}</h2>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-purple-500 to-accent" aria-hidden="true"></div>
            <div className="space-y-12">
              {(timelineItems.length ? timelineItems : [
                { year: '2022', text: 'Our studio was founded on a simple premise: software development could be faster, smarter, and more aligned with business goals.' },
                { year: '2023', text: 'We built an automated pipeline of specialized AI agents and eliminated friction and delays in traditional development.' },
                { year: '2024', text: 'We focused on solving complex problems and delivering exceptional products with expert oversight and AI acceleration.' }
              ]).map((n: { year: string; text: string }, i: number) => (
                <ScrollReveal key={n.year} delay={i * 0.1}>
                  <div className={`relative grid md:grid-cols-2 gap-8 items-center ${i % 2 === 0 ? '' : 'md:text-right'}`}>
                    <div className={`pl-8 ${i % 2 === 0 ? 'md:pl-0 md:pr-12' : 'md:pl-12 md:order-2'}`}>
                      <div className="inline-block px-4 py-2 rounded-full mb-3 shadow-lg border border-accent/30 bg-white/80 text-sm font-bold text-text-active">
                        {n.year}
                      </div>
                      <p className="text-text-active leading-relaxed text-lg">{n.text}</p>
                    </div>
                    <div className={i % 2 === 0 ? 'md:order-2' : ''}>
                      <div className="hidden md:block"></div>
                    </div>
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-accent rounded-full border-4 border-white shadow-lg transform -translate-x-1/2"></div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Meet the Team */}
      <section className="py-32 md:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal className="mb-6 text-center">
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tighter">{t('about.team.title')}</h2>
            <p className="text-text-active/80">{t('about.team.text')}</p>
          </ScrollReveal>
          <LayoutGroup>
            <motion.div layout className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10">
              <AnimatePresence>
                {[
                  { name: 'architect', role: 'specification agent', src: `${import.meta.env.BASE_URL}agents/architect.webp` },
                  { name: 'cashier', role: 'payments agent', src: `${import.meta.env.BASE_URL}agents/cashier.webp` },
                  { name: 'conveyor', role: 'CI-CD agent', src: `${import.meta.env.BASE_URL}agents/conveyor.webp` },
                  { name: 'foundry', role: 'backend / API agent', src: `${import.meta.env.BASE_URL}agents/foundry.webp` },
                  { name: 'gatekeeper', role: 'auth / roles agent', src: `${import.meta.env.BASE_URL}agents/gatekeeper.webp` },
                  { name: 'ledger', role: 'database agent', src: `${import.meta.env.BASE_URL}agents/ledger.webp` },
                  { name: 'lighthouse', role: 'SEO / AEO agent', src: `${import.meta.env.BASE_URL}agents/lighthouse.webp` },
                  { name: 'scout', role: 'research agent', src: `${import.meta.env.BASE_URL}agents/scout.webp` },
                  { name: 'smith', role: 'front‑end agent', src: `${import.meta.env.BASE_URL}agents/smith.webp` },
                  { name: 'stylist', role: 'UI/UX agent', src: `${import.meta.env.BASE_URL}agents/stylist.webp` },
                ].map(member => (
                  <motion.div key={member.name} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: [0.22,1,0.36,1] as const }} className="text-center">
                    <div className="rounded-xl p-1 bg-white/60 border border-line shadow-sm inline-block w-full">
                      <img src={member.src} alt={`${member.name} - ${member.role}`} className="w-full aspect-square object-cover rounded-lg border border-line" />
                    </div>
                    <p className="font-medium mt-3 capitalize">{member.name}</p>
                    <p className="text-sm text-text-active/70">{member.role}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </div>
      </section>

      {/* Section 5: Why Companies Choose WHITEWEAVER */}
      <section className="pb-24 md:pb-32 bg-gradient-to-b from-accent/5 to-transparent">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <ScrollReveal className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium mb-4">{whyData?.badge || 'Why Choose Us'}</span>
            <h2 className="font-display text-5xl md:text-6xl font-medium tracking-tighter">{whyData?.title || 'Why Companies Choose WHITEWEAVER'}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {(whyItems.length ? whyItems : [
              { key: '01', title: 'Proven Methodology', text: 'A clear, repeatable pipeline that combines AI acceleration with expert engineering oversight.' },
              { key: '02', title: 'Expert Team', text: 'Multi-disciplinary specialists in engineering, AI, and product who own outcomes—not just tasks.' },
              { key: '03', title: 'Speed & Quality', text: 'AI-accelerated delivery without compromising production-ready code, performance, or maintainability.' },
              { key: '04', title: 'Full Ownership', text: 'You retain complete code ownership and receive documentation and handover for smooth operation.' }
            ]).map((r: { key: string; title: string; text: string }, i: number) => (
              <ScrollReveal key={r.key} delay={i * 0.1}>
                <motion.div
                  whileHover={{ x: 8 }}
                  className="flex gap-4 p-6 rounded-2xl bg-white border border-accent/20 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/80 border border-accent/30 text-text-active text-sm font-bold shadow-lg">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-2">{r.title}</h3>
                    <p className="text-text-active/80 leading-relaxed">{r.text}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tighter">{t('about.cta.title')}</h2>
            <p className="mt-4 text-text-active/80 leading-7">{t('about.cta.text')}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.05} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button to="/contact">{t('about.cta.start')}</Button>
            <Button to="/work" variant="secondary">{t('about.cta.work')}</Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Mini‑FAQ */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <ScrollReveal className="mb-4"><h2 className="font-display text-4xl md:text-5xl font-medium tracking-tighter">{faqTitle}</h2></ScrollReveal>
          <div className="divide-y divide-line">
            {localizedFaqs.slice(0,4).map((f, i) => (
              <details key={i} className="py-3">
                <summary className="cursor-pointer select-none text-text-active/90">{f.question}</summary>
                <p className="mt-2 text-text-active/80 leading-7">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
