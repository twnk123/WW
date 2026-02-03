import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import { useLanguage } from '../contexts/LanguageContext';
import Seo from '../components/Seo';
import { aiAgents } from '../data/aiAgents';
import { teamMembers } from '../data/teamMembers';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedBios, setExpandedBios] = useState<Record<string, boolean>>({});

  const stats = [
    { value: '50+', label: 'Projects Delivered in 2024' },
    { value: '98%', label: 'Client Satisfaction Rate' },
    { value: '<5', label: 'Days Average Delivery' },
    { value: '100%', label: 'Money-Back Guarantee' }
  ];

  const differentiators = [
    {
      title: 'Speed Without Compromise',
      description: 'We deliver production-ready MVPs in under 5 days. Not prototypes. Not demos. Full-stack applications ready to scale.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Money-Back Guarantee',
      description: 'We stand behind our work. If we don\'t deliver your MVP in under 5 days, you get your money back. No questions asked.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Transparent Pricing',
      description: 'Three clear packages: $275, $1,200, $2,400. No hidden fees. No hourly rates. You know exactly what you\'re paying for.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'AI + Human Expertise',
      description: 'We combine AI-powered automation with expert oversight. Fast execution, consistent quality, and code you can maintain.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ];

  const credentials = [
    { label: 'Technologies', value: 'React, Node.js, TypeScript, Next.js, PostgreSQL' },
    { label: 'Experience', value: '5+ years in web development' },
    { label: 'Delivery Model', value: 'Fixed-price packages with guaranteed timelines' },
    { label: 'Code Quality', value: 'Production-ready, documented, and maintainable' }
  ];

  const guarantees = [
    {
      title: '5-Day Delivery Guarantee',
      description: 'Your MVP delivered in under 5 days or your money back.'
    },
    {
      title: 'Quality Guarantee',
      description: 'Production-ready code that follows best practices and is fully documented.'
    },
    {
      title: 'Ownership Guarantee',
      description: 'You own 100% of the code, design, and intellectual property.'
    },
    {
      title: 'Support Guarantee',
      description: '1 month of free updates included with Pro and Scale packages.'
    }
  ];

  const faqs = [
    {
      question: 'How can you deliver so fast?',
      answer: 'We use AI-powered automation for repetitive tasks (code generation, testing, deployment) combined with expert human oversight for architecture, design decisions, and quality control. This lets us compress months of work into days without sacrificing quality.'
    },
    {
      question: 'Who owns the code you produce?',
      answer: 'You do. 100%. All code, designs, and intellectual property created for your project belong to you. We provide clean, documented code that your team can maintain and build upon.'
    },
    {
      question: 'What if I need changes after delivery?',
      answer: 'Pro and Scale packages include 1 month of free updates. For additional changes, you can purchase hourly support or book another package. We\'re here to support your growth.'
    },
    {
      question: 'Do you work with startups outside Europe?',
      answer: 'Yes. We work with clients worldwide. All communication happens in English, and we accommodate different time zones for calls and updates.'
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-bg">
      <Seo
        title="About WHITEWEAVER | AI-Powered Web Development Team"
        description="Meet the AI-powered team building production-ready MVPs in 5 days. 10 specialized AI agents + expert oversight. 50+ startups launched. Money-back guarantee. Global service."
        canonical="/about"
        alternates={[
          { hrefLang: 'en', href: '/about' },
          { hrefLang: 'x-default', href: '/about' },
        ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
            { '@type': 'ListItem', position: 2, name: 'About', item: window.location.origin + '/about' },
          ],
        }}
      />

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl"
            style={{ backgroundColor: '#0E5F63' }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl"
            style={{ backgroundColor: 'rgba(14, 95, 99, 0.6)' }}
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
            <h1 className="font-display text-[clamp(3rem,10vw,8rem)] md:text-[clamp(4rem,12vw,10rem)] font-normal tracking-[0.02em] leading-[0.85] uppercase mb-6 md:mb-8 bg-gradient-to-br from-text-active to-[#0E5F63] bg-clip-text text-transparent">
              WE BUILD. YOU SCALE. NO EXCUSES.
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl text-text-active max-w-3xl mx-auto leading-relaxed"
            >
              Traditional agencies take months. DIY platforms give you mediocre results. We deliver production-ready MVPs in under 5 days with a money-back guarantee.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                Why We Exist
              </h2>
              <div className="space-y-4 text-lg text-text-active leading-relaxed">
                <p>
                  We saw a problem: Startups with great ideas were stuck. Traditional agencies charged €20,000+ and took 3-6 months. DIY platforms gave them cookie-cutter templates that looked amateur.
                </p>
                <p>
                  There had to be a better way. So we built it.
                </p>
                <p>
                  By combining AI automation with expert oversight, we compress months of work into days—without sacrificing quality. You get production-ready code, transparent pricing, and a guarantee we stand behind.
                </p>
                <p className="font-medium" style={{ color: '#0E5F63' }}>
                  Our mission: Make professional web development accessible to every startup, at a price they can afford, delivered at a speed that matters.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-white shadow-lg" style={{ border: '1px solid #0E5F63' }}>
                  <div className="text-4xl font-bold mb-2" style={{ color: '#0E5F63' }}>10x</div>
                  <div className="text-text-active">Faster than traditional agencies</div>
                </div>
                <div className="p-6 rounded-xl bg-white shadow-lg" style={{ border: '1px solid #0E5F63' }}>
                  <div className="text-4xl font-bold mb-2" style={{ color: '#0E5F63' }}>80%</div>
                  <div className="text-text-active">Lower cost than hiring full-time</div>
                </div>
                <div className="p-6 rounded-xl bg-white shadow-lg" style={{ border: '1px solid #0E5F63' }}>
                  <div className="text-4xl font-bold mb-2" style={{ color: '#0E5F63' }}>100%</div>
                  <div className="text-text-active">Code ownership from day one</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-transparent via-[rgba(14,95,99,0.05)] to-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              The Numbers Speak
            </h2>
            <p className="text-lg text-text-active">
              Results that prove we mean business
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.1}>
                <div className="text-center p-6 rounded-2xl bg-white shadow-lg" style={{ border: '1px solid #0E5F63' }}>
                  <div className="font-display text-5xl md:text-6xl font-bold mb-2" style={{ color: '#0E5F63' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-active">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {credentials.map((cred, index) => (
              <ScrollReveal key={cred.label} delay={index * 0.1}>
                <div className="p-6 rounded-xl bg-white shadow-sm" style={{ border: '1px solid #0E5F63' }}>
                  <div className="font-medium text-sm mb-2" style={{ color: '#0E5F63' }}>{cred.label}</div>
                  <div className="text-text-active">{cred.value}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How We're Different */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              How We're Different
            </h2>
            <p className="text-lg text-text-active max-w-3xl mx-auto">
              Four reasons why startups choose WHITEWEAVER over traditional agencies and DIY platforms
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {differentiators.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="p-8 rounded-2xl bg-white shadow-lg"
                  style={{ border: '1px solid #0E5F63' }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(14, 95, 99, 0.1)', color: '#0E5F63' }}>
                    {item.icon}
                  </div>
                  <h3 className="font-display text-2xl font-medium mb-3">{item.title}</h3>
                  <p className="text-text-active leading-relaxed">{item.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Guarantees */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-transparent via-[rgba(14,95,99,0.05)] to-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              Our Guarantees
            </h2>
            <p className="text-lg text-text-active">
              We stand behind our work. Here's what you can count on.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {guarantees.map((guarantee, index) => (
              <ScrollReveal key={guarantee.title} delay={index * 0.1}>
                <div className="p-6 rounded-xl bg-white shadow-sm" style={{ border: '1px solid #0E5F63' }}>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#0E5F63' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="font-medium text-lg mb-2">{guarantee.title}</h3>
                      <p className="text-text-active">{guarantee.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              How We Deliver in 5 Days
            </h2>
            <p className="text-lg text-text-active">
              A systematic, proven process that gets results
            </p>
          </ScrollReveal>

          <div className="space-y-6">
            {[
              { day: 'Day 1', title: 'Kickoff & Specifications', description: 'We analyze your requirements, competitors, and user needs. Define features, tech stack, and create detailed specifications.' },
              { day: 'Day 2', title: 'Design & Architecture', description: 'UI/UX design, database schema, API structure, and authentication flow. All decisions documented and approved.' },
              { day: 'Day 3-4', title: 'Development & Integration', description: 'AI-powered code generation with expert oversight. Front-end, back-end, database, and third-party integrations built and tested.' },
              { day: 'Day 5', title: 'Testing & Deployment', description: 'Final testing, bug fixes, performance optimization, and deployment. Your MVP goes live with full documentation.' }
            ].map((step, index) => (
              <ScrollReveal key={step.day} delay={index * 0.1}>
                <div className="flex gap-6 p-6 rounded-xl bg-white shadow-sm" style={{ border: '1px solid #0E5F63' }}>
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: '#0E5F63' }}>
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1" style={{ color: '#0E5F63' }}>{step.day}</div>
                    <h3 className="font-display text-xl font-medium mb-2">{step.title}</h3>
                    <p className="text-text-active leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-transparent via-[rgba(14,95,99,0.05)] to-transparent">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          {/* Section Header */}
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-center">
              Meet the Team
            </h2>
            <p className="text-lg text-text-active text-center mb-12 max-w-2xl mx-auto">
              Strategy, design, and engineering expertise to turn your idea into a profitable product
            </p>
          </ScrollReveal>

          {/* Leadership - Larger Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {teamMembers.filter(member => member.order <= 2).sort((a, b) => a.order - b.order).map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="relative group bg-white p-8 rounded-2xl border border-line hover:border-[#0E5F63] transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#0E5F63]/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />

                  <div className="relative">
                    {/* Larger Circular Image for Leadership */}
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-4 mx-auto">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const initials = member.name.split(' ').map(n => n[0]).join('');
                          e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96"%3E%3Ccircle fill="%230E5F63" cx="48" cy="48" r="48"/%3E%3Ctext fill="white" font-size="36" font-weight="600" font-family="system-ui" x="50%25" y="50%25" text-anchor="middle" dy=".35em"%3E${initials}%3C/text%3E%3C/svg%3E`;
                        }}
                      />
                    </div>

                    {/* Name & Role */}
                    <h3 className="font-display text-xl font-semibold mb-1 text-text-active text-center">
                      {member.name}
                    </h3>
                    <p className="text-[#0E5F63] font-medium text-sm mb-4 text-center">
                      {member.role}
                    </p>

                    {/* Bio - Expandable */}
                    <div className="relative">
                      <p className={`text-text-active/70 text-sm leading-relaxed ${!expandedBios[member.name] ? 'line-clamp-3' : ''}`}>
                        {member.bio}
                      </p>
                      {member.bio.length > 150 && (
                        <button
                          onClick={() => setExpandedBios(prev => ({ ...prev, [member.name]: !prev[member.name] }))}
                          className="text-[#0E5F63] hover:text-[#0E5F63]/80 text-xs font-medium mt-2 transition-colors"
                        >
                          {expandedBios[member.name] ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </div>

                    {/* LinkedIn Link */}
                    {member.linkedIn && (
                      <a
                        href={member.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#0E5F63] hover:text-[#0E5F63]/80 transition-colors mt-4 text-xs justify-center w-full"
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        Connect on LinkedIn
                      </a>
                    )}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Engineers - Smaller Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.filter(member => member.order > 2).sort((a, b) => a.order - b.order).map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="relative group bg-white p-6 rounded-2xl border border-line hover:border-[#0E5F63] transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#0E5F63]/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />

                  <div className="relative">
                    {/* Medium Circular Image for Engineers */}
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 mb-4 mx-auto">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const initials = member.name.split(' ').map(n => n[0]).join('');
                          e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Ccircle fill="%230E5F63" cx="40" cy="40" r="40"/%3E%3Ctext fill="white" font-size="30" font-weight="600" font-family="system-ui" x="50%25" y="50%25" text-anchor="middle" dy=".35em"%3E${initials}%3C/text%3E%3C/svg%3E`;
                        }}
                      />
                    </div>

                    {/* Name & Role */}
                    <h4 className="font-display text-lg font-semibold mb-1 text-text-active text-center">
                      {member.name}
                    </h4>
                    <p className="text-[#0E5F63] font-medium text-xs mb-3 text-center">
                      {member.role}
                    </p>

                    {/* Bio - Expandable */}
                    <div className="relative">
                      <p className={`text-text-active/70 text-sm leading-relaxed ${!expandedBios[member.name] ? 'line-clamp-4' : ''}`}>
                        {member.bio}
                      </p>
                      {member.bio.length > 120 && (
                        <button
                          onClick={() => setExpandedBios(prev => ({ ...prev, [member.name]: !prev[member.name] }))}
                          className="text-[#0E5F63] hover:text-[#0E5F63]/80 text-xs font-medium mt-2 transition-colors block w-full text-center"
                        >
                          {expandedBios[member.name] ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </div>

                    {/* LinkedIn Link */}
                    {member.linkedIn && (
                      <a
                        href={member.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#0E5F63] hover:text-[#0E5F63]/80 transition-colors mt-4 text-xs justify-center w-full"
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        Connect on LinkedIn
                      </a>
                    )}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              What We Stand For
            </h2>
            <p className="text-lg text-text-active">
              The principles that guide everything we do
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: 'Speed',
                description: 'Time is your most valuable resource. We deliver in days, not months.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: 'Quality',
                description: 'Fast doesn\'t mean sloppy. Every line of code is production-ready.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'Transparency',
                description: 'No hidden fees. No surprises. You know exactly what you\'re getting.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )
              },
              {
                title: 'Accountability',
                description: 'We back our work with a money-back guarantee. That\'s confidence.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              }
            ].map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1}>
                <div className="p-6 rounded-xl bg-white shadow-sm h-full" style={{ border: '1px solid #0E5F63' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(14, 95, 99, 0.1)', color: '#0E5F63' }}>
                    {value.icon}
                  </div>
                  <h3 className="font-display text-xl font-medium mb-2">{value.title}</h3>
                  <p className="text-text-active text-sm leading-relaxed">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              What Clients Say
            </h2>
            <p className="text-lg text-text-active">
              Real feedback from real founders
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "I couldn't believe they actually delivered in 4 days. The code quality is better than what I got from a €15k agency project.",
                author: "Sarah M.",
                role: "Founder, SaaS Startup"
              },
              {
                quote: "The money-back guarantee made me feel safe trying them out. Didn't need it though—they delivered exactly what they promised.",
                author: "James K.",
                role: "E-commerce Business Owner"
              },
              {
                quote: "Finally, transparent pricing that makes sense. No hourly rates, no scope creep. Just clear packages and fast delivery.",
                author: "Maria L.",
                role: "Tech Entrepreneur"
              }
            ].map((testimonial, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="p-6 rounded-xl bg-white shadow-lg h-full flex flex-col" style={{ border: '1px solid #0E5F63' }}>
                  <p className="text-text-active leading-relaxed mb-6 flex-grow">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-text-active/70">{testimonial.role}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-transparent via-[rgba(14,95,99,0.05)] to-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              Meet Our 10 AI Agents
            </h2>
            <p className="text-lg text-text-active max-w-3xl mx-auto">
              Each agent specializes in a specific part of development. Together, they compress months of work into days while maintaining production-grade quality.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {aiAgents.map((agent, index) => (
              <ScrollReveal key={agent.name} delay={index * 0.05}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 rounded-2xl bg-white shadow-lg text-center h-full flex flex-col"
                  style={{ border: '1px solid #0E5F63' }}
                >
                  {/* Agent Image */}
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Agent Name */}
                  <h3 className="font-display text-lg font-semibold mb-1">{agent.name}</h3>

                  {/* Agent Role */}
                  <p className="text-xs font-medium mb-3" style={{ color: '#0E5F63' }}>
                    {agent.role}
                  </p>

                  {/* Agent Description */}
                  <p className="text-text-active/70 text-xs leading-relaxed flex-grow">
                    {agent.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center mt-12">
            <p className="text-text-active/70 max-w-2xl mx-auto">
              These AI agents work 24/7 under expert human oversight, ensuring your MVP is built with speed, quality, and precision.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <div className="rounded-xl bg-white shadow-sm overflow-hidden" style={{ border: '1px solid #0E5F63' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-medium text-lg pr-4">{faq.question}</h3>
                    <svg
                      className="w-5 h-5 flex-shrink-0 transition-transform"
                      style={{
                        color: '#0E5F63',
                        transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-text-active leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
          <ScrollReveal>
            <div className="rounded-2xl p-12 md:p-20" style={{
              background: 'linear-gradient(to bottom right, rgba(14, 95, 99, 0.1), rgba(14, 95, 99, 0.05))',
              border: '1px solid #0E5F63'
            }}>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                Ready to Build Your MVP?
              </h2>
              <p className="text-lg md:text-xl text-text-active mb-8 max-w-2xl mx-auto">
                Let's turn your idea into a production-ready application in under 5 days. Money-back guarantee.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://calendly.com/tonklis-vodopivec/30min" target="_blank" rel="noopener noreferrer">
                  <Button variant="navbar" size="lg">Get a Strategy Session</Button>
                </a>
                <Button to="/work" variant="navbar" size="lg">See Our Work</Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
