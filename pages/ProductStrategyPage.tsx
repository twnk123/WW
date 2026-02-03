import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import Seo from '../components/Seo';

const ProductStrategyPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const problems = [
    {
      title: 'Building Features Nobody Wants',
      description: 'You spend months building features based on assumptions, only to find out customers do not care about them.',
      stat: '42%',
      statLabel: 'of startups fail because there is no market need'
    },
    {
      title: 'Wasting Budget on the Wrong Solution',
      description: 'You build a complex solution when customers would have paid for something 10x simpler.',
      stat: '€50K+',
      statLabel: 'average wasted on unvalidated features'
    },
    {
      title: 'Launching Too Late',
      description: 'You take 6-12 months building a "perfect" product while competitors validate and iterate faster.',
      stat: '67%',
      statLabel: 'of founders regret not launching sooner'
    }
  ];

  const whatYouGet = [
    {
      title: 'Market & Competitor Analysis',
      description: 'We analyze your market, identify gaps, and determine what customers actually want—not what you think they want.',
      deliverables: ['Competitor landscape map', 'Market opportunity analysis', 'Customer pain point identification']
    },
    {
      title: 'ICP Definition & User Research',
      description: 'We help you define your Ideal Customer Profile and validate demand before you write a single line of code.',
      deliverables: ['ICP persona document', 'Customer interview insights', 'Demand validation report']
    },
    {
      title: 'Feature Prioritization Framework',
      description: 'We help you decide what to build first, what to build later, and what to skip entirely.',
      deliverables: ['MVP feature roadmap', 'Priority matrix', 'Development timeline']
    },
    {
      title: 'Go-to-Market Strategy',
      description: 'We map out how you will acquire your first 100 customers and turn them into paying users.',
      deliverables: ['Launch checklist', 'Customer acquisition plan', 'Pricing strategy']
    }
  ];

  const process = [
    {
      day: 'Days 1-2',
      title: 'Discovery & Research',
      tasks: ['Stakeholder interviews', 'Market & competitor analysis', 'User pain point identification', 'Existing solution review']
    },
    {
      day: 'Days 3-4',
      title: 'Strategy Definition',
      tasks: ['ICP definition', 'Feature prioritization', 'MVP scope definition', 'Success metrics & KPIs']
    },
    {
      day: 'Day 5',
      title: 'Validation & Planning',
      tasks: ['Customer interviews', 'Landing page test (optional)', 'Go-to-market roadmap', 'Final strategy delivery']
    }
  ];

  const faqs = [
    {
      question: 'Why do I need product strategy before building?',
      answer: 'Most startups fail because they build the wrong thing—not because they build it badly. Product strategy ensures you are solving a real problem for real customers before you spend months and thousands of euros on development. It saves you time, money, and prevents the heartbreak of launching something nobody wants.'
    },
    {
      question: 'How is this different from just building an MVP?',
      answer: 'Building an MVP without product strategy is like driving without a map. You will build something, but it might not solve the right problem. Product strategy validates your idea, defines your target customer, and ensures your MVP actually addresses a real market need. We help you build the right thing, not just build something fast.'
    },
    {
      question: 'What if I already have a clear idea?',
      answer: 'Most founders think they have a clear idea—until they talk to customers. Product strategy uncovers hidden assumptions, identifies blind spots, and often reveals that customers would pay for something simpler (or different) than what you planned. Even if your idea is solid, we help you prioritize features and avoid scope creep.'
    },
    {
      question: 'Can I combine this with MVP development?',
      answer: 'Absolutely. In fact, that is the ideal approach. We recommend starting with product strategy (5 days), validating demand, then moving directly into MVP development (another 5 days). This ensures you build something people actually want. We offer a bundled package with a discount.'
    },
    {
      question: 'Who runs the product strategy process?',
      answer: 'Daniel (Jaekyung) Lee, our Head of Product Strategy & UX, leads the process. He has years of experience in product design, user research, and go-to-market strategy with established companies. His job is to make sure you do not waste time building the wrong thing.'
    },
    {
      question: 'What happens after the 5 days?',
      answer: 'You get a complete product strategy document including: validated ICP, prioritized feature list, MVP roadmap, go-to-market plan, and customer acquisition strategy. You can use this to build with us, hire a dev team, or build it yourself. You own everything.'
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-bg">
      <Seo
        title="Product Strategy Services | Validate Before You Build | WHITEWEAVER"
        description="Avoid the #1 MVP killer: building the wrong thing. Our product strategy service validates demand, defines your ICP, and ensures you build something customers actually want. 5-day delivery."
        canonical="/product-strategy"
        alternates={[
          { hrefLang: 'en', href: '/product-strategy' },
          { hrefLang: 'x-default', href: '/product-strategy' },
        ]}
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block px-4 py-2 bg-[#0E5F63]/10 rounded-full text-[#0E5F63] text-sm font-medium mb-6"
            >
              Stop Wasting Time Building the Wrong Thing
            </motion.div>
            <h1 className="font-display text-[clamp(2.5rem,8vw,6rem)] font-medium tracking-tight leading-[0.9] mb-6 bg-gradient-to-br from-text-active to-[#0E5F63] bg-clip-text text-transparent">
              Validate Your Idea<br />Before You Build
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-text-active/80 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Most startups fail because they build something nobody wants. We help you validate demand, define your ideal customer, and create a roadmap that turns ideas into revenue—before you waste months on the wrong features.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a href="https://calendly.com/tonklis-vodopivec/30min" target="_blank" rel="noopener noreferrer">
                <Button variant="navbar" size="lg">Book Strategy Call</Button>
              </a>
              <Button to="/plans" variant="navbar" size="lg">See Pricing</Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-transparent via-[rgba(14,95,99,0.05)] to-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              The #1 Reason Startups Fail
            </h2>
            <p className="text-lg text-text-active max-w-3xl mx-auto">
              It is not technical problems. It is not lack of funding. It is building something the market does not want.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <ScrollReveal key={problem.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 rounded-2xl bg-white shadow-lg border border-[#0E5F63] h-full"
                >
                  <div className="text-5xl font-bold mb-2" style={{ color: '#0E5F63' }}>
                    {problem.stat}
                  </div>
                  <div className="text-sm text-text-active/70 mb-4">{problem.statLabel}</div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-text-active">
                    {problem.title}
                  </h3>
                  <p className="text-text-active/70 leading-relaxed">
                    {problem.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              What You Get
            </h2>
            <p className="text-lg text-text-active max-w-3xl mx-auto">
              A complete product strategy roadmap delivered in 5 days
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {whatYouGet.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <div className="p-8 rounded-2xl bg-white shadow-sm border border-line">
                  <h3 className="font-display text-2xl font-semibold mb-3 text-text-active">
                    {item.title}
                  </h3>
                  <p className="text-text-active/70 mb-6 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm font-medium mb-2" style={{ color: '#0E5F63' }}>
                      Deliverables:
                    </div>
                    {item.deliverables.map((deliverable, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0E5F63' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-text-active/80">{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-transparent via-[rgba(14,95,99,0.05)] to-transparent">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              Our 5-Day Process
            </h2>
            <p className="text-lg text-text-active">
              From fuzzy idea to validated strategy in one week
            </p>
          </ScrollReveal>

          <div className="space-y-6">
            {process.map((step, index) => (
              <ScrollReveal key={step.day} delay={index * 0.1}>
                <div className="flex gap-6 p-8 rounded-2xl bg-white shadow-sm border border-line">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-white text-xl" style={{ backgroundColor: '#0E5F63' }}>
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="text-sm font-medium mb-1" style={{ color: '#0E5F63' }}>{step.day}</div>
                    <h3 className="font-display text-2xl font-semibold mb-4 text-text-active">{step.title}</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {step.tasks.map((task, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0E5F63' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-text-active/80">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              Who This Is For
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal>
              <div className="p-8 rounded-2xl bg-white shadow-sm border border-[#0E5F63]">
                <div className="text-3xl mb-4">✅</div>
                <h3 className="font-display text-xl font-semibold mb-4 text-text-active">
                  Perfect For:
                </h3>
                <ul className="space-y-3">
                  {[
                    'First-time founders with an idea but unsure where to start',
                    'Founders who have built an MVP but are not getting traction',
                    'Teams pivoting and need to validate a new direction',
                    'Anyone who wants to avoid wasting 6 months building the wrong thing'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0E5F63' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-text-active/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="p-8 rounded-2xl bg-white shadow-sm border border-line">
                <div className="text-3xl mb-4">❌</div>
                <h3 className="font-display text-xl font-semibold mb-4 text-text-active">
                  Not For:
                </h3>
                <ul className="space-y-3">
                  {[
                    'Founders who already have validated demand and paying customers',
                    'Teams with a proven product looking to add features',
                    'People who just want to build something for fun (no problem!)',
                    'Anyone expecting us to validate an idea without your involvement'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-text-active/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-text-active/60">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-transparent via-[rgba(14,95,99,0.05)] to-transparent">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              Common Questions
            </h2>
          </ScrollReveal>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <div className="rounded-xl bg-white shadow-sm overflow-hidden border border-line">
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
                      <p className="text-text-active/70 leading-relaxed">{faq.answer}</p>
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
                Ready to Validate Your Idea?
              </h2>
              <p className="text-lg md:text-xl text-text-active mb-8 max-w-2xl mx-auto">
                Stop guessing. Start building something customers actually want. Book a free 15-minute strategy call.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://calendly.com/tonklis-vodopivec/30min" target="_blank" rel="noopener noreferrer">
                  <Button variant="navbar" size="lg">Book Free Call</Button>
                </a>
                <Button to="/contact" variant="navbar" size="lg">Contact Us</Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default ProductStrategyPage;
