import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import Seo from '../components/Seo';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    category: 'General',
    question: 'What is an MVP and why do I need one?',
    answer: 'An MVP (Minimum Viable Product) is the simplest version of your product that delivers core value to users. You need one to test your idea with real users before investing months and tens of thousands of dollars in full development. MVPs let you validate demand, gather feedback, and iterate quickly—without burning your runway.'
  },
  {
    category: 'General',
    question: 'How is WHITEWEAVER different from other development agencies?',
    answer: 'Traditional agencies charge $20,000-$80,000 and take 3-6 months. We deliver production-ready MVPs in 5 days for $275-$2,400. We use AI-powered development for speed, with expert developers ensuring quality. You get fixed pricing, complete code ownership, and a money-back guarantee if we miss the deadline.'
  },
  {
    category: 'General',
    question: 'Do you really build MVPs in 5 days?',
    answer: 'Yes. Our average delivery time is 3.5 days. We use a proven system: 10 specialized AI agents handle repetitive coding (authentication, CRUD operations, UI components) while expert developers handle architecture, business logic, and quality control. This combination gives you 10x speed without compromising quality.'
  },
  {
    category: 'Pricing',
    question: 'How much does it cost to build an MVP?',
    answer: 'Our pricing is fixed and transparent: Starter ($275) for simple landing pages, Pro ($1,200) for functional MVPs with authentication and database, Scale ($2,400) for complex apps with integrations and advanced features. No hidden fees, no hourly rates, no surprises.'
  },
  {
    category: 'Pricing',
    question: 'What\'s included in each plan?',
    answer: 'Starter includes 2-5 pages, contact form, responsive design. Pro adds user authentication, database, CRUD operations, payment integration, and email notifications. Scale includes everything in Pro plus third-party API integrations, real-time features, admin panel, and advanced search. See our Plans page for full details.'
  },
  {
    category: 'Pricing',
    question: 'Are there any hidden costs or monthly fees?',
    answer: 'No hidden costs in development. You pay once for the build. However, you\'ll need hosting ($20-100/month depending on traffic), domain ($12/year), and payment processing fees if using Stripe (2.9% + $0.30 per transaction). We help you set these up and choose the most cost-effective options.'
  },
  {
    category: 'Process',
    question: 'What happens after I place an order?',
    answer: 'Within 24 hours, we schedule a kickoff call to understand your requirements. Day 1-2: We finalize specifications and architecture. Day 3-4: Development and testing. Day 5: Final review, deployment, and handoff with full documentation. You\'re involved in daily updates and can request changes during development.'
  },
  {
    category: 'Process',
    question: 'Can I see progress during development?',
    answer: 'Yes. You get daily progress updates via email or Slack. We deploy to a staging environment so you can see and test the app as we build it. You can request changes and provide feedback throughout the process—not just at the end.'
  },
  {
    category: 'Process',
    question: 'What if I need changes after delivery?',
    answer: 'Minor bug fixes and tweaks are free for 7 days after delivery. Need new features or major changes? We offer post-launch support at $275-500/month, or you can hire any developer since you own the code. We provide full documentation so anyone can maintain and extend your app.'
  },
  {
    category: 'Technical',
    question: 'What tech stack do you use?',
    answer: 'We primarily use React (TypeScript) for frontend, Node.js for backend, and PostgreSQL for database. This stack is proven, scalable, and has massive community support. If your project requires specific technologies (Python, MongoDB, etc.), we can accommodate that—just let us know upfront.'
  },
  {
    category: 'Technical',
    question: 'Will I own the code?',
    answer: 'Yes. 100% code ownership transfers to you upon final payment. You get the complete source code, database, deployment credentials, and documentation. No vendor lock-in, no licensing fees, no ongoing dependencies on us. You can hire any developer to maintain or extend it.'
  },
  {
    category: 'Technical',
    question: 'Can you integrate with third-party services?',
    answer: 'Yes. We commonly integrate Stripe (payments), SendGrid (emails), Twilio (SMS), Google Maps, social logins (Google, GitHub), and many other APIs. If your MVP requires specific integrations, mention them when ordering and we\'ll confirm feasibility and include them in the quote.'
  },
  {
    category: 'Technical',
    question: 'Is the code production-ready or just a prototype?',
    answer: 'Production-ready. We don\'t build prototypes or demos. Every MVP we deliver is fully functional, tested, secure, and ready for real users. This includes proper authentication, error handling, responsive design, email notifications, and deployment to your chosen hosting platform.'
  },
  {
    category: 'Technical',
    question: 'Where will my app be hosted?',
    answer: 'We deploy to your preferred platform: Vercel, Railway, Render, AWS, or others. We recommend Vercel for most projects (free tier handles thousands of users). You own the hosting account and pay hosting costs directly—we never bill you for hosting markup.'
  },
  {
    category: 'Support',
    question: 'What if you can\'t deliver in 5 days?',
    answer: 'You get your money back. No questions asked. This has never happened in 50+ projects because we scope realistically and only accept projects we can deliver. If scope changes mid-project, we discuss timeline adjustments with you before proceeding.'
  },
  {
    category: 'Support',
    question: 'Do you offer ongoing support and maintenance?',
    answer: 'Yes. Post-launch support packages start at $275/month for bug fixes and minor updates, up to $500/month for feature additions and scaling support. Alternatively, you can self-maintain (you own the code) or hire any developer.'
  },
  {
    category: 'Support',
    question: 'Can you help me scale after MVP launch?',
    answer: 'Absolutely. Many clients return to add features, optimize performance, or scale infrastructure as they grow. We\'ve helped MVPs go from 10 users to 10,000+ users. We can also connect you with specialists for marketing, analytics, or funding if needed.'
  },
  {
    category: 'Validation',
    question: 'I have an idea but I\'m not sure if it will work. Should I build an MVP?',
    answer: 'Start with validation first. Create a landing page, drive traffic, collect emails, and talk to potential users. If you get 10-20% email signups and people say they\'d pay, then build an MVP. We can help you validate before building—don\'t skip this step.'
  },
  {
    category: 'Validation',
    question: 'What if my idea changes during development?',
    answer: 'Minor changes are fine—we\'re flexible. Major scope changes (adding core features, changing the entire concept) may require additional time and cost. We discuss this upfront and adjust the plan together. Communication is key.'
  },
  {
    category: 'Validation',
    question: 'Can you help me refine my idea before building?',
    answer: 'Yes. During the kickoff call, we ask tough questions to clarify your vision, identify core features, and cut unnecessary complexity. Many founders come with 20 features in mind—we help you focus on the 3-5 that actually matter for launch.'
  }
];

const categories = ['All', ...Array.from(new Set(faqs.map(f => f.category)))];

const FAQPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFAQs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(f => f.category === selectedCategory);

  return (
    <div className="min-h-screen bg-bg">
      <Seo
        title="FAQ | Frequently Asked Questions | WHITEWEAVER"
        description="Everything you need to know about MVP development, pricing, process, and guarantees. Get answers to common questions about building your startup with WHITEWEAVER."
        canonical="/faq"
        alternates={[
          { hrefLang: 'en', href: '/faq' },
          { hrefLang: 'x-default', href: '/faq' },
        ]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
              { '@type': 'ListItem', position: 2, name: 'FAQ', item: window.location.origin + '/faq' },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
              }
            }))
          }
        ]}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-text-active/70 max-w-2xl mx-auto">
              Everything you need to know about building your MVP with WHITEWEAVER
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-8">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <ScrollReveal>
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setOpenIndex(null);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-[#0E5F63] text-white'
                      : 'bg-white border border-line hover:border-[#0E5F63]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ List */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <motion.div
                  className="bg-white rounded-xl border border-line overflow-hidden"
                  initial={false}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-display text-lg md:text-xl font-semibold pr-8">
                      {faq.question}
                    </span>
                    <motion.svg
                      className="w-6 h-6 flex-shrink-0 text-[#0E5F63]"
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6">
                          <p className="text-text-active/70 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <ScrollReveal>
            <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#0E5F63]/10 to-transparent border border-[#0E5F63]/20 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Still have questions?
              </h2>
              <p className="text-text-active/70 mb-8 max-w-2xl mx-auto">
                We're here to help. Schedule a free consultation or send us an email—we typically respond within 2 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://calendly.com/tonklis-vodopivec/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-[#0E5F63] text-white rounded-lg font-medium hover:bg-[#0E5F63]/90 transition-colors"
                >
                  Schedule a Call
                </a>
                <a
                  href="/contact"
                  className="inline-block px-6 py-3 bg-white border-2 border-[#0E5F63] text-[#0E5F63] rounded-lg font-medium hover:bg-[#0E5F63]/5 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
