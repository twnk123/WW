import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'sl';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'sl' ? 'sl' : 'en') as Language;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // Update HTML lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): any => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    // Return the value as-is (can be string, array, or object)
    return value !== undefined ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations: Record<Language, any> = {
  en: {
    nav: {
      work: 'Work',
      services: 'Services',
      diy: 'DIY',
      plans: 'Plans',
      about: 'About',
      contact: 'Contact',
      privacy: 'Privacy',
      terms: 'Terms'
    },
    home: {
      hero: {
        line1: 'from idea to reality',
        line2: 'fast',
        subtitle: 'WHEN AUTOMATION MEETS SOFTWARE DEVELOPMENT',
        mobileTitle: 'from idea to reality fast',
        startBuild: 'Start a build',
        seeHow: 'See how it works'
      },
      featured: {
        title: 'Featured Work',
        viewAll: 'See all projects',
        viewWork: 'View work'
      },
      services: {
        title: 'Automated from idea to deployment',
        subtitle: 'Our proprietary multi-agent pipeline compresses months of work into days. We automate everything from spec generation to coding and deployment, ensuring pixel-perfect results with superhuman speed.',
        button: 'Our Services'
      },
      testimonials: {
        title: 'What Clients Say'
      },
      pricing: {
        title: 'Flexible Plans',
        subtitle: 'Transparent pricing for projects of all sizes. Choose a plan to get started.',
        choosePlan: 'Choose Plan',
        viewAll: 'View all plans & FAQs'
      },
      cta: {
        viewWork: 'View Our Work',
        seePlans: 'See Plans & Pricing',
        buildTogether: "Let's build together",
        startProject: 'Start a project'
      }
    },
    work: {
      title: 'OUR WORK',
      subtitle: 'Live examples showcasing our package tiers. Each site represents what\'s possible at different price points.',
      getInTouch: 'Get in touch',
      packageExamples: 'Package Examples',
      viewCaseStudy: 'View case study',
      haveProject: 'Have a project in mind?',
      letsWork: "Let's work together",
      filter: {
        all: 'All',
        web: 'Web Apps',
        mobile: 'Mobile',
        branding: 'Branding'
      },
      viewLive: 'View Live Site',
      viewCase: 'View Case Study'
    },
    project: {
      loading: 'Loading project...',
      details: 'Project Details',
      services: 'Services',
      timeline: 'Timeline',
      category: 'Category',
      viewLiveSite: 'View Live Site',
      startSimilar: 'Start a similar project',
      challenge: 'The Challenge',
      approach: 'Our Approach',
      visualJourney: 'Visual Journey',
      previousProject: 'Previous Project',
      nextProject: 'Next Project',
      viewAllWork: 'View All Work',
      client: 'Client',
      year: 'Year'
    },
    services: {
      title: 'OUR SERVICES',
      subtitle: 'We combine expert engineering with cutting-edge AI automation to deliver exceptional software at unprecedented speed.',
      whatWeBuild: 'What We Build',
      whatWeBuildSubtitle: 'From concept to production, we handle every aspect of modern software development.',
      ourProcess: 'Our Process',
      ourProcessSubtitle: 'A proven 5-step methodology that delivers exceptional results every time.',
      whyChooseUs: 'Why Choose Us?',
      whyChooseUsSubtitle: 'The perfect balance of AI speed and human expertise.',
      faq: 'Frequently Asked Questions',
      faqSubtitle: 'Everything you need to know about working with us.',
      whatsNext: "What's Next",
      whatsNextSubtitle: 'Expanding our services to bring you even more powerful solutions. Get early access when these launch.',
      comingSoon: 'COMING SOON',
      joinWaitlist: 'Join the Waitlist',
      beFirst: 'Be the first to know when these services launch',
      readyToBuild: 'Ready to Build Something Amazing?',
      readyToBuildSubtitle: "Let's discuss how our AI-powered development can transform your next project.",
      startProject: 'Start Your Project',
      viewPlans: 'View Plans',
      marquee: 'Build Fast • Ship Quality • Scale Effortlessly • AI-Powered • Expert-Driven •',
      
      cards: {
        web: {
          title: 'Web Applications',
          subtitle: 'Full-Stack Development',
          description: 'From simple landing pages to complex enterprise systems. Modern frameworks, responsive design, and AI-powered features.',
          features: [
            'React/Next.js frontend development',
            'Node.js & serverless backends',
            'Progressive Web Apps (PWA)',
            'Real-time applications',
            'API development & integration'
          ]
        },
        mobile: {
          title: 'Mobile Apps',
          subtitle: 'iOS & Android Development',
          description: 'Native and cross-platform mobile applications. Beautiful UI/UX, seamless performance, and deep system integrations.',
          features: [
            'Native iOS development (Swift)',
            'Native Android development (Kotlin)',
            'Cross-platform with React Native',
            'App Store & Play Store deployment',
            'Push notifications & in-app purchases'
          ]
        },
        ai: {
          title: 'AI Automation',
          subtitle: 'Intelligent Solutions',
          description: 'Streamline operations, reduce manual work, and gain insights through machine learning and AI integration.',
          features: [
            'Custom AI model integration',
            'Natural language processing',
            'Computer vision solutions',
            'Predictive analytics',
            'Intelligent chatbots & assistants'
          ]
        },
        strategy: {
          title: 'AI Strategy',
          subtitle: 'Strategic Guidance',
          description: 'Expert consulting on AI adoption, technology selection, and implementation roadmaps for maximum ROI.',
          features: [
            'AI readiness assessment',
            'Technology stack planning',
            'Implementation roadmaps',
            'Team training & upskilling',
            'Performance optimization'
          ]
        }
      },
      
      process: {
        deliverables: 'Deliverables:',
        keyFeatures: 'Key Features:',
        steps: [
          {
            number: '01',
            title: 'Discovery & Analysis',
            description: 'We dive deep into your business requirements, technical constraints, and success metrics. Our AI-assisted analysis identifies optimization opportunities.',
            deliverables: [
              'Requirements documentation',
              'Technical assessment report',
              'Risk analysis & mitigation',
              'Success metrics definition',
              'Project timeline & budget',
              'Stakeholder alignment'
            ]
          },
          {
            number: '02',
            title: 'Architecture & Design',
            description: 'AI-generated system architecture with expert validation ensures optimal scalability and performance from day one.',
            deliverables: [
              'System architecture diagrams',
              'Database design & schemas',
              'API specifications',
              'UI/UX wireframes',
              'Security architecture',
              'Technology stack selection'
            ]
          },
          {
            number: '03',
            title: 'Rapid Development',
            description: 'Multi-agent AI pipeline accelerates coding while expert engineers ensure quality and handle complex integrations.',
            deliverables: [
              'Feature implementation',
              'API development',
              'Database setup',
              'Third-party integrations',
              'Code documentation',
              'Version control setup'
            ]
          },
          {
            number: '04',
            title: 'Quality Assurance',
            description: 'Comprehensive automated testing combined with expert validation ensures production-ready quality.',
            deliverables: [
              'Automated test suites',
              'Performance testing',
              'Security validation',
              'Cross-browser testing',
              'Load testing results',
              'Bug fixes & optimization'
            ]
          },
          {
            number: '05',
            title: 'Deploy & Optimize',
            description: 'Production deployment with monitoring, analytics, and ongoing optimization for peak performance.',
            deliverables: [
              'Production deployment',
              'Monitoring setup',
              'Analytics integration',
              'Performance optimization',
              'Documentation & training',
              'Support & maintenance plan'
            ]
          }
        ]
      },
      
      comparison: {
        feature: 'Feature',
        aiOnly: 'AI Only',
        traditional: 'Traditional Dev',
        ourApproach: 'Our Approach',
        speedToMarket: 'Speed to Market',
        codeQuality: 'Code Quality',
        customSolutions: 'Custom Solutions',
        cost: 'Cost',
        scalability: 'Scalability',
        security: 'Security',
        values: {
          speedAI: 'Days',
          speedTraditional: 'Months',
          speedOur: 'Days with Quality',
          qualityAI: 'Variable',
          qualityTraditional: 'High',
          qualityOur: 'Consistently High',
          customAI: 'Limited',
          customTraditional: 'Full',
          customOur: 'Full Flexibility',
          costAI: 'Low',
          costTraditional: 'High',
          costOur: 'Optimized',
          scaleAI: 'Uncertain',
          scaleTraditional: 'Proven',
          scaleOur: 'Proven & Fast',
          securityAI: 'Basic',
          securityTraditional: 'Enterprise',
          securityOur: 'Enterprise-grade'
        }
      },
      
      upcoming: {
        mobile: {
          title: 'Mobile Apps',
          description: 'Native iOS and Android apps with stunning UI and seamless performance',
          features: [
            'Swift & Kotlin development',
            'Cross-platform with React Native',
            'App Store optimization'
          ]
        },
        ai: {
          title: 'AI Automation',
          description: 'Intelligent automation solutions powered by cutting-edge AI technology',
          features: [
            'Custom AI models',
            'Process automation',
            'Predictive analytics'
          ]
        },
        strategy: {
          title: 'AI Strategy',
          description: 'Expert consulting to transform your business with AI implementation',
          features: [
            'AI readiness assessment',
            'Implementation roadmaps',
            'Team training'
          ]
        }
      },
      
      faqs: [
        {
          q: 'How long does it take to build a website?',
          a: 'Delivery timelines vary by project complexity. Check our pricing page for detailed estimates for each tier. Generally, projects range from 1-2 days for simple sites and 3-5 days for complex projects. Our AI-accelerated development process ensures fast delivery without compromising quality.'
        },
        {
          q: "What's included in a typical website project?",
          a: 'Every project includes responsive design, SEO optimization, performance tuning, content management, analytics integration, and deployment. We also provide documentation and training for managing your site.'
        },
        {
          q: 'Do you work with existing websites?',
          a: 'Yes, we can redesign, optimize, or add new features to your existing website. We work with all major platforms and can migrate sites to modern frameworks for better performance and maintainability.'
        },
        {
          q: 'How much does a custom website cost?',
          a: 'Website projects typically range from €250 for simple sites to €1,100 for more complex projects. We provide detailed quotes based on your specific requirements and can work within your budget constraints.'
        },
        {
          q: 'Will my website be mobile-friendly?',
          a: 'Absolutely. All our websites are built mobile-first with responsive design that looks perfect on phones, tablets, and desktops. We test on all major devices and browsers to ensure consistency.'
        },
        {
          q: 'Can you help with content and SEO?',
          a: 'Yes, we provide content strategy, copywriting, and comprehensive SEO optimization. This includes meta tags, structured data, sitemap generation, and performance optimization for better search rankings.'
        },
        {
          q: 'What about website maintenance after launch?',
          a: 'We offer ongoing maintenance packages that include updates, security monitoring, performance optimization, and content updates. You can also manage content yourself with the CMS we set up.'
        },
        {
          q: 'Do you provide hosting services?',
          a: 'We help you choose the best hosting solution for your needs and handle the deployment. We work with all major providers like Vercel, Netlify, AWS, and can recommend based on your traffic and budget.'
        }
      ]
    },
    diy: {
      title: 'DIY DEVELOPMENT',
      subtitle: 'Build professional websites without the agency price tag. Modern stack, clear guides, full ownership.',
      stats: {
        buildTime: { value: '1-2 days', label: 'Average Build Time' },
        ownership: { value: '100%', label: 'Code Ownership' },
        performance: { value: 'A+', label: 'Performance Score' }
      },
      choosePath: {
        title: 'Choose Your Path',
        subtitle: 'Tweak an existing site or build from scratch. Either route gets you a professional website you fully own.'
      },
      tabs: {
        modify: 'Modify Existing Site',
        build: 'Build From Scratch'
      },
      quickStart: {
        clone: {
          icon: '🚀',
          title: 'Clone & Launch',
          description: 'Spin up your development environment in minutes with our quick-start guide.'
        },
        customize: {
          icon: '🎨',
          title: 'Customize the Design',
          description: 'Adjust colors, typography, and layouts using our design system tokens.'
        },
        deploy: {
          icon: '📦',
          title: 'Deploy Live',
          description: 'Ship to production with a single command using GitHub Pages or Vercel.'
        }
      },
      commonMods: {
        title: 'Common Updates',
        updateContent: {
          title: 'Refresh Content & Copy',
          steps: ['Edit text inside component files', 'Update meta descriptions', 'Swap in new images and media']
        },
        addSection: {
          title: 'Add a New Section',
          steps: ['Import the component', 'Place it in the page layout', 'Configure props and data']
        },
        createPage: {
          title: 'Create a New Page',
          steps: ['Create the component file', 'Add the route in App.tsx', 'Link it from navigation']
        },
        stepsLabel: 'Steps:',
        exampleLabel: 'Example:'
      },
      buildProcess: {
        title: 'Proces Gradnje',
        steps: [
          {
            title: 'Setup Development Environment',
            description: 'Install Node.js, configure your editor, and set up version control.',
            time: '30 mins'
          },
          {
            title: 'Initialize Project',
            description: 'Create React app with Vite, install dependencies, configure build tools.',
            time: '20 mins'
          },
          {
            title: 'Design System',
            description: 'Set up color tokens, typography, spacing system, and component library.',
            time: '45 mins'
          },
          {
            title: 'Build Core Pages',
            description: 'Create routing, build homepage, add navigation, implement responsive layout.',
            time: '2 hours'
          },
          {
            title: 'Add Interactivity',
            description: 'Implement animations, form handling, and dynamic content loading.',
            time: '1 hour'
          },
          {
            title: 'Optimize & Deploy',
            description: 'Compress assets, configure SEO, run performance tests, deploy to production.',
            time: '1 hour'
          }
        ]
      },
      techStack: {
        title: 'Modern Tech Stack',
        items: [
          { name: 'React 19', category: 'Framework', description: 'Component-driven UI' },
          { name: 'TypeScript', category: 'Language', description: 'Type-safe code' },
          { name: 'Vite', category: 'Build Tool', description: 'Blazing-fast builds' },
          { name: 'Tailwind CSS', category: 'Styling', description: 'Utility-first CSS' }
        ]
      },
      quickStartCommands: {
        title: 'Quick Start Commands',
        create: { title: '1. Create the Project' },
        install: { title: '2. Install Dependencies' },
        start: { title: '3. Start Development' }
      },
      comparison: {
        title: 'Pick Your Approach',
        visual: {
          title: 'Visual Builder Path',
          pros: [
            'No coding required',
            'Launch in hours',
            'Hosting included'
          ],
          cons: [
            'Monthly subscription',
            'Limited customization'
          ],
          button: 'Explore Builders →'
        },
        code: {
          title: 'Code-First Path',
          pros: [
            'Full control',
            'No vendor lock-in',
            'One-time costs',
            'Unlimited features'
          ],
          cons: [
            'Learning curve'
          ],
          button: 'Start Coding →'
        }
      },
      examples: {
        title: 'Built with Our Stack',
        subtitle: 'Real-world sites created by makers using our guides and components.',
        items: [
          { title: 'Creative Agency', category: 'Portfolio' },
          { title: 'SaaS Landing Page', category: 'Marketing' },
          { title: 'Ecommerce Store', category: 'Commerce' },
          { title: 'Blog Platform', category: 'Content' },
          { title: 'Documentation', category: 'Technical' },
          { title: 'Restaurant', category: 'Local Business' }
        ],
        metrics: {
          score: 'Score',
          load: 'Load Time',
          size: 'Bundle Size'
        }
      },
      faq: {
        title: 'Pogosto Zastavljena Vprašanja',
        subtitle: 'Vse, kar morate vedeti o gradnji lastne spletne strani.',
        items: [
          {
            q: 'What technical skills do I need?',
            a: 'Basic HTML and CSS knowledge helps, but our guides are beginner-friendly. You will learn React, TypeScript, and modern web development practices as you build.'
          },
          {
            q: 'How much does it cost to run a DIY website?',
            a: 'Domain: $10-15/year. Hosting: Free with GitHub Pages or Netlify for static sites, or $20/month for more advanced features. Total: $10-250/year depending on your needs.'
          },
          {
            q: 'Can I use this for commercial projects?',
            a: 'Yes! The code is yours to use for any purpose. Build client sites, SaaS products, or your business website without restrictions.'
          },
          {
            q: 'What about mobile responsiveness?',
            a: 'All our components are mobile-first by design. Your site will look great on phones, tablets, and desktops without extra work.'
          },
          {
            q: 'How do I handle forms and user data?',
            a: 'Start with form endpoints like Formspree or Netlify Forms. As you grow, integrate with services like Supabase or build your own backend.'
          },
          {
            q: 'Is SEO included?',
            a: 'Yes! Built-in meta tags, semantic HTML, sitemap generation, and structured data. Your site will be search-engine friendly from day one.'
          },
          {
            q: 'How often should I update dependencies?',
            a: 'Check monthly for security updates, quarterly for minor versions. Use tools like Dependabot to automate the process.'
          },
          {
            q: 'Can I add e-commerce features?',
            a: 'Absolutely! Integrate Stripe, PayPal, or Shopify Buy Button. Start simple with payment links, then build full checkout flows as needed.'
          }
        ]
      },
      marquee: 'Build • Deploy • Iterate • Own Your Code • Build • Deploy • Iterate • Own Your Code •',
      cta: {
        title: 'Ready to Build?',
        subtitle: 'Start with our free templates and guides. Build something amazing in hours, not weeks.',
        button: 'Get Started Free'
      },
      copyCode: 'Copy Code',
      copied: 'Copied!'
    },
    plans: {
      title: 'Simple Pricing',
      subtitle: 'Choose the package that fits your needs. Every website is mobile-friendly, fast, and ready to grow with your business.',
      heroHeading: 'PRICING PLANS',
      mostPopular: 'Most Popular',
      selectPlan: 'Select Plan',
      billingToggle: {
        project: 'One-Time Project',
        monthly: 'Monthly Maintenance',
        projectSuffix: 'project',
        monthlySuffix: '/month'
      },
      planCard: {
        cta: 'Get Started'
      },
      viewDetails: 'Compare all features',
      comparison: {
        title: 'Compare Features',
        subtitle: "See what's included in each plan",
        feature: 'Features',
        pages: 'Number of Pages',
        design: 'Custom Design',
        responsive: 'Mobile Responsive',
        seo: 'SEO Optimized',
        speed: 'Speed Optimized',
        forms: 'Contact Forms',
        maps: 'Map Integration',
        gallery: 'Photo Gallery',
        database: 'Product Database',
        cms: 'Content Management',
        booking: 'Booking System',
        multilang: 'Multi-Language',
        aiSearch: 'AI Search',
        support: 'Support & Updates',
        rows: [
          { name: 'Pages Included', starter: '2 pages', core: '5 pages', pro: '8 pages', scale: '12 pages' },
          { name: 'Delivery Time', starter: '24 hours', core: '1-2 days', pro: '2-3 days', scale: '3-5 days' },
          { name: 'Revision Rounds', starter: '1', core: '2', pro: '4', scale: '5' },
          { name: 'Contact Form', starter: '✓', core: '✓', pro: '✓', scale: '✓' },
          { name: 'Found on Google', starter: '✓', core: '✓', pro: '✓', scale: '✓' },
          { name: 'Found on Maps & AI', starter: '—', core: '✓', pro: '✓', scale: '✓' },
          { name: 'Customer Login', starter: '—', core: '—', pro: 'Optional', scale: '✓' },
          { name: 'Online Shop', starter: '—', core: '—', pro: 'Up to 12 items', scale: 'Unlimited' },
          { name: 'Accept Payments', starter: '—', core: '—', pro: 'Optional', scale: '✓' },
          { name: 'Admin Dashboard', starter: '—', core: '—', pro: '—', scale: '✓' },
          { name: 'Edit Content Yourself', starter: '—', core: '—', pro: '✓', scale: '✓' },
          { name: 'Free Updates Period', starter: '—', core: '—', pro: '1 month', scale: '1 month' },
          { name: 'Special Features (Maps, Gallery, etc.)', starter: '—', core: 'Choose 2', pro: 'All included', scale: 'All included' }
        ]
      },
      stats: [
        { value: '24h', label: 'Average Delivery' },
        { value: '100%', label: 'Client Satisfaction' },
        { value: '50+', label: 'Projects Delivered' },
        { value: '€250', label: 'Starting Price' }
      ],
      faq: {
        title: 'Frequently Asked Questions',
        subtitle: 'Everything you need to know about our pricing',
        items: [
          {
            question: 'What does "AI-driven, multi-agent pipeline" mean?',
            answer: 'It means we use a series of specialized AI agents that handle different stages of development—from research and creating specifications to writing and deploying code. This automates the repetitive parts of software development, making the process faster and more efficient.'
          },
          {
            question: 'Who owns the code that you produce?',
            answer: 'You do. All intellectual property and code generated for your project is 100% owned by you. We provide clean, scalable, and well-documented code that your team can build upon.'
          },
          {
            question: 'How quickly can you deliver a project?',
            answer: "Our automation studio compresses months of traditional product work into days or weeks, depending on the project's complexity. We can deliver an MVP significantly faster than a typical agency."
          },
          {
            question: 'What kind of technologies do you use?',
            answer: 'We are technology-agnostic and use the best tools for the job. Our expertise includes modern frameworks like React, Next.js, and Vue, as well as robust backend technologies. The core of our process is our proprietary prompt engineering and agentic coding framework.'
          }
        ]
      },
      cta: {
        title: 'Ready to Start Your Project?',
        subtitle: 'Get a custom quote or choose a plan that fits your needs',
        primary: 'Get Custom Quote',
        secondary: 'View Our Work'
      },
      starter: {
        name: 'Starter',
        description: 'Perfect for new businesses or simple projects that need a professional online presence quickly.'
      },
      core: {
        name: 'Core',
        description: 'Ideal for established businesses that want a polished website with room to grow.'
      },
      pro: {
        name: 'Pro',
        description: 'For businesses ready to scale with advanced features and a larger web presence.'
      },
      scale: {
        name: 'Scale',
        description: 'Complete solution for businesses that need maximum flexibility and extensive content.'
      },
      addOns: {
        title: 'Add-Ons',
        subtitle: 'Expand your website with these optional features'
      }
    },
    contact: {
      badge: 'Get In Touch',
      title: 'CONTACT US',
      subtitle: "Have a project in mind? Let's talk. Fill out the form or reach out to us directly.",
      details: {
        title: 'Contact Details',
        email: 'Email',
        response: 'We typically respond within 24 hours. For urgent inquiries, please mention it in your message.'
      },
      form: {
        name: 'Name',
        email: 'Email',
        package: 'Package Interested In',
        packagePlaceholder: 'Select a package',
        details: 'Project Details',
        detailsPlaceholder: 'Tell us about your project...',
        send: 'Send Message',
        namePlaceholder: 'Your name',
        emailPlaceholder: 'your@email.com'
      }
    },
    about: {
      badge: 'About Whiteweaver Studio',
      title: 'We are Whiteweaver',
      subtitle: 'A modern software studio that combines expert engineering with AI automation to deliver production-ready results—fast.',
      mission: {
        title: 'Our Mission',
        text: 'We exist to eliminate the friction in software development. Traditional development is slow, expensive, and unpredictable. We built an automated pipeline of specialized AI agents that handle repetitive tasks while our expert engineers focus on architecture, security, and delivering exceptional products.'
      },
      stats: {
        projects: 'Projects Completed',
        satisfaction: 'Client Satisfaction',
        speed: 'Faster Delivery',
        support: 'Support Available',
        quality: 'Code Quality'
      },
      values: {
        badge: 'Our Values',
        title: 'What We Stand For',
        description: 'The principles that guide our work every day.',
        items: [
          {
            key: 'velocity',
            title: 'Velocity',
            body: 'Deliver rapidly without sacrificing quality. We optimize for impact and clarity.'
          },
          {
            key: 'ownership',
            title: 'Ownership',
            body: 'Treat problems as our own. We are accountable from idea to handover.'
          },
          {
            key: 'craft',
            title: 'Craftsmanship',
            body: 'Build with care, precision, and empathy for users and maintainers.'
          },
          {
            key: 'transparency',
            title: 'Transparency',
            body: 'Communicate clearly. Share progress, trade-offs, and decisions openly.'
          }
        ],
        speed: {
          title: 'Speed Without Compromise',
          text: 'AI acceleration means faster delivery, but never at the cost of quality, security, or maintainability.'
        },
        quality: {
          title: 'Production-Ready Quality',
          text: 'Every line of code is reviewed by expert engineers. We ship software that works in production from day one.'
        },
        transparency: {
          title: 'Radical Transparency',
          text: 'You get full visibility into our process, progress, and decisions. No black boxes, no surprises.'
        },
        ownership: {
          title: 'You Own Everything',
          text: 'Complete code ownership, documentation, and knowledge transfer. No vendor lock-in, ever.'
        }
      },
      timeline: {
        badge: 'Our Journey',
        title: 'How We Started',
        items: [
          {
            year: '2022',
            text: 'Our studio was founded on a simple premise: software development could be faster, smarter, and more aligned with business goals.'
          },
          {
            year: '2023',
            text: 'We built an automated pipeline of specialized AI agents and eliminated friction and delays in traditional development.'
          },
          {
            year: '2024',
            text: 'We focused on solving complex problems and delivering exceptional products with expert oversight and AI acceleration.'
          }
        ],
        year2022: 'Our studio was founded on a simple premise: software development could be faster, smarter, and more aligned with business goals.',
        year2023: 'We built an automated pipeline of specialized AI agents and eliminated friction and delays in traditional development.',
        year2024: 'We focused on solving complex problems and delivering exceptional products with expert oversight and AI acceleration.'
      },
      team: {
        badge: 'The Team',
        title: 'Who We Are',
        text: "We're a lean, distributed team of senior engineers, AI specialists, and product experts. Every member has shipped production software at scale and understands the difference between code that works and code that lasts."
      },
      why: {
        badge: 'Why Choose Us',
        title: 'Why Companies Choose WHITEWEAVER',
        methodology: {
          title: 'Proven Methodology',
          text: 'A clear, repeatable pipeline that combines AI acceleration with expert engineering oversight.'
        },
        experts: {
          title: 'Expert Team',
          text: 'Multi‑disciplinary specialists in engineering, AI, and product who own outcomes—not just tasks.'
        },
        speedQuality: {
          title: 'Speed & Quality',
          text: 'AI‑accelerated delivery without compromising production‑ready code, performance, or maintainability.'
        },
        ownership: {
          title: 'Full Ownership',
          text: 'You retain complete code ownership and receive documentation and handover for smooth operation.'
        }
      },
      faq: {
        title: 'FAQ',
        items: [
          {
            question: 'What does "AI-driven, multi-agent pipeline" mean?',
            answer: 'It means we use a series of specialized AI agents that handle different stages of development—from research and creating specifications to writing and deploying code. This automates the repetitive parts of software development, making the process faster and more efficient.'
          },
          {
            question: 'Who owns the code that you produce?',
            answer: 'You do. All intellectual property and code generated for your project is 100% owned by you. We provide clean, scalable, and well-documented code that your team can build upon.'
          },
          {
            question: 'How quickly can you deliver a project?',
            answer: "Our automation studio compresses months of traditional product work into days or weeks, depending on the project's complexity. We can deliver an MVP significantly faster than a typical agency."
          },
          {
            question: 'What kind of technologies do you use?',
            answer: 'We are technology-agnostic and use the best tools for the job. Our expertise includes modern frameworks like React, Next.js, and Vue, as well as robust backend technologies. The core of our process is our proprietary prompt engineering and agentic coding framework.'
          }
        ]
      },
      cta: {
        title: "Let's build together",
        text: 'We combine expert engineering with AI automation to deliver production‑ready results—fast.',
        start: 'Start Your Project',
        work: 'See Our Work'
      }
    },
    footer: {
      tagline: 'Building the future, one project at a time.',
      pages: 'Pages',
      social: 'Social',
      rights: 'All rights reserved.',
      copyright: '© 2025 WHITEWEAVER Studio. All rights reserved.'
    }
  },
  sl: {
    nav: {
      work: 'Projekti',
      services: 'Storitve',
      diy: 'Naredi Sam',
      plans: 'Paketi',
      about: 'O Nas',
      contact: 'Kontakt',
      privacy: 'Zasebnost',
      terms: 'Pogoji'
    },
    home: {
      hero: {
        line1: 'od ideje do izvedbe',
        line2: 'hitro',
        subtitle: 'KO SE AVTOMATIZACIJA SREČA Z RAZVOJEM PROGRAMSKE OPREME',
        mobileTitle: 'od ideje do izvedbe hitro',
        startBuild: 'Začni gradnjo',
        seeHow: 'Poglej kako deluje'
      },
      featured: {
        title: 'Izbrani Projekti',
        viewAll: 'Poglej vse projekte',
        viewWork: 'Poglej delo'
      },
      services: {
        title: 'Avtomatizirano od ideje do implementacije',
        subtitle: 'Naša lastniška večagentska veriga stisne mesece dela v dneve. Avtomatiziramo vse od ustvarjanja specifikacij do kodiranja in namestitve, ter zagotavljamo popolne rezultate z nadčloveško hitrostjo.',
        button: 'Naše Storitve'
      },
      testimonials: {
        title: 'Kaj Pravijo Stranke'
      },
      pricing: {
        title: 'Prilagodljivi Paketi',
        subtitle: 'Pregledna cenitev za projekte vseh velikosti. Izberite paket za začetek.',
        choosePlan: 'Izberi Paket',
        viewAll: 'Poglej vse pakete & pogosta vprašanja'
      },
      cta: {
        viewWork: 'Oglejte Si Naše Delo',
        seePlans: 'Oglejte Pakete in Cene',
        buildTogether: 'Gradimo skupaj',
        startProject: 'Začni projekt'
      }
    },
    work: {
      title: 'NAŠI PROJEKTI',
      subtitle: 'Primeri v živo, ki prikazujejo naše cenovne pakete. Vsaka stran predstavlja, kaj je mogoče pri različnih cenovnih točkah.',
      getInTouch: 'Stopite v stik',
      packageExamples: 'Primeri Paketov',
      viewCaseStudy: 'Oglej študijo primera',
      haveProject: 'Imate projekt v mislih?',
      letsWork: 'Sodelujmo skupaj',
      filter: {
        all: 'Vse',
        web: 'Spletne Aplikacije',
        mobile: 'Mobilne',
        branding: 'Blagovne Znamke'
      },
      viewLive: 'Oglej Si Spletno Stran',
      viewCase: 'Oglej Si Študijo Primera'
    },
    project: {
      loading: 'Nalaganje projekta...',
      details: 'Podrobnosti Projekta',
      services: 'Storitve',
      timeline: 'Časovnica',
      category: 'Kategorija',
      viewLiveSite: 'Oglej Spletno Stran',
      startSimilar: 'Začni podoben projekt',
      challenge: 'Izziv',
      approach: 'Naš Pristop',
      visualJourney: 'Vizualna Pot',
      previousProject: 'Prejšnji Projekt',
      nextProject: 'Naslednji Projekt',
      viewAllWork: 'Oglej Vse Projekte',
      client: 'Stranka',
      year: 'Leto'
    },
    services: {
      title: 'NAŠE STORITVE',
      subtitle: 'Združujemo strokovno inženirstvo z najsodobnejšo AI avtomatizacijo za zagotavljanje izjemne programske opreme z neprekosljivo hitrostjo.',
      whatWeBuild: 'Kaj Gradimo',
      whatWeBuildSubtitle: 'Od koncepta do produkcije obvladujemo vsak vidik modernega razvoja programske opreme.',
      ourProcess: 'Naš Proces',
      ourProcessSubtitle: 'Preizkušena 5-stopenjska metodologija, ki vsakič zagotavlja izjemne rezultate.',
      whyChooseUs: 'Zakaj Izbrati Nas?',
      whyChooseUsSubtitle: 'Popolno ravnovesje med AI hitrostjo in človeško strokovnostjo.',
      faq: 'Pogosto Zastavljena Vprašanja',
      faqSubtitle: 'Vse, kar morate vedeti o sodelovanju z nami.',
      whatsNext: 'Kaj Sledi',
      whatsNextSubtitle: 'Širimo naše storitve, da vam ponudimo še močnejše rešitve. Pridobite zgodnji dostop ob lansiranju.',
      comingSoon: 'KMALU NA VOLJO',
      joinWaitlist: 'Pridružite se Čakalnemu Seznamu',
      beFirst: 'Bodite prvi, ki boste izvedeli, ko se te storitve lansirajo',
      readyToBuild: 'Pripravljeni Zgraditi Nekaj Neverjetnega?',
      readyToBuildSubtitle: 'Pogovoriva se, kako lahko naš AI-pognan razvoj preoblikuje vaš naslednji projekt.',
      startProject: 'Začnite Svoj Projekt',
      viewPlans: 'Oglejte si Pakete',
      marquee: 'Gradimo Hitro • Dostavljamo Kakovost • Enostavno Skaliranje • AI-Poganjano • Strokovno Vodeno •',
      
      cards: {
        web: {
          title: 'Spletne Aplikacije',
          subtitle: 'Celostni Razvoj',
          description: 'Od preprostih vstopnih strani do kompleksnih podjetniških sistemov. Moderni ogrodja, odziven dizajn in AI-podprte funkcije.',
          features: [
            'React/Next.js frontend razvoj',
            'Node.js & brezstrežniške zaledne rešitve',
            'Progresivne spletne aplikacije (PWA)',
            'Aplikacije v realnem času',
            'API razvoj & integracija'
          ]
        },
        mobile: {
          title: 'Mobilne Aplikacije',
          subtitle: 'iOS & Android Razvoj',
          description: 'Izvorne in večplatformske mobilne aplikacije. Čudovit UI/UX, brezhibno delovanje in globoke sistemske integracije.',
          features: [
            'Izvorni iOS razvoj (Swift)',
            'Izvorni Android razvoj (Kotlin)',
            'Večplatformski razvoj z React Native',
            'Objava v App Store & Play Store',
            'Potisna obvestila & nakupi v aplikaciji'
          ]
        },
        ai: {
          title: 'AI Avtomatizacija',
          subtitle: 'Inteligentne Rešitve',
          description: 'Poenostavite operacije, zmanjšajte ročno delo in pridobite vpoglede preko strojnega učenja in AI integracije.',
          features: [
            'Integracija AI modelov po meri',
            'Obdelava naravnega jezika',
            'Rešitve računalniškega vida',
            'Napovedna analitika',
            'Inteligentni klepetalniki & asistenti'
          ]
        },
        strategy: {
          title: 'AI Strategija',
          subtitle: 'Strateško Svetovanje',
          description: 'Strokovno svetovanje o AI sprejetju, izbiri tehnologije in načrtih implementacije za maksimalen ROI.',
          features: [
            'Ocena AI pripravljenosti',
            'Načrtovanje tehnološkega sklada',
            'Načrti implementacije',
            'Usposabljanje & izpopolnjevanje ekipe',
            'Optimizacija zmogljivosti'
          ]
        }
      },
      
      process: {
        deliverables: 'Rezultati:',
        keyFeatures: 'Ključne Funkcije:',
        steps: [
          {
            number: '01',
            title: 'Odkritje & Analiza',
            description: 'Poglobimo se v vaše poslovne zahteve, tehnične omejitve in meritve uspeha. Naša AI-podprta analiza identificira priložnosti za optimizacijo.',
            deliverables: [
              'Dokumentacija zahtev',
              'Poročilo tehnične ocene',
              'Analiza & blažitev tveganj',
              'Opredelitev meril uspeha',
              'Časovnica & proračun projekta',
              'Uskladitev deležnikov'
            ]
          },
          {
            number: '02',
            title: 'Arhitektura & Dizajn',
            description: 'AI-generirana sistemska arhitektura s strokovno validacijo zagotavlja optimalno skalabilnost in zmogljivost od prvega dne.',
            deliverables: [
              'Diagrami sistemske arhitekture',
              'Dizajn & sheme podatkovnih baz',
              'API specifikacije',
              'UI/UX wireframe-i',
              'Varnostna arhitektura',
              'Izbira tehnološkega sklada'
            ]
          },
          {
            number: '03',
            title: 'Hiter Razvoj',
            description: 'Večagentska AI veriga pospešuje kodiranje, medtem ko strokovni inženirji zagotavljajo kakovost in upravljajo kompleksne integracije.',
            deliverables: [
              'Implementacija funkcij',
              'API razvoj',
              'Nastavitev podatkovne baze',
              'Integracije tretjih oseb',
              'Dokumentacija kode',
              'Nastavitev nadzora verzij'
            ]
          },
          {
            number: '04',
            title: 'Zagotavljanje Kakovosti',
            description: 'Celovito avtomatizirano testiranje v kombinaciji s strokovno validacijo zagotavlja produkcijsko pripravljeno kakovost.',
            deliverables: [
              'Avtomatizirani testni paketi',
              'Testiranje zmogljivosti',
              'Validacija varnosti',
              'Testiranje med brskalniki',
              'Rezultati testiranja obremenitve',
              'Popravki napak & optimizacija'
            ]
          },
          {
            number: '05',
            title: 'Namestitev & Optimizacija',
            description: 'Produkcijska namestitev s spremljanjem, analitiko in stalnim optimiziranjem za vrhunsko zmogljivost.',
            deliverables: [
              'Produkcijska namestitev',
              'Nastavitev spremljanja',
              'Integracija analitike',
              'Optimizacija zmogljivosti',
              'Dokumentacija & usposabljanje',
              'Načrt podpore & vzdrževanja'
            ]
          }
        ]
      },
      
      comparison: {
        feature: 'Funkcija',
        aiOnly: 'Samo AI',
        traditional: 'Tradicionalni Razvoj',
        ourApproach: 'Naš Pristop',
        speedToMarket: 'Hitrost Do Trga',
        codeQuality: 'Kakovost Kode',
        customSolutions: 'Prilagojene Rešitve',
        cost: 'Stroški',
        scalability: 'Skalabilnost',
        security: 'Varnost',
        values: {
          speedAI: 'Dnevi',
          speedTraditional: 'Meseci',
          speedOur: 'Dnevi s Kakovostjo',
          qualityAI: 'Spremenljiva',
          qualityTraditional: 'Visoka',
          qualityOur: 'Dosledno Visoka',
          customAI: 'Omejena',
          customTraditional: 'Popolna',
          customOur: 'Popolna Fleksibilnost',
          costAI: 'Nizki',
          costTraditional: 'Visoki',
          costOur: 'Optimizirani',
          scaleAI: 'Negotova',
          scaleTraditional: 'Preizkušena',
          scaleOur: 'Preizkušena & Hitra',
          securityAI: 'Osnovna',
          securityTraditional: 'Podjetniška',
          securityOur: 'Podjetniški Razred'
        }
      },
      
      upcoming: {
        mobile: {
          title: 'Mobilne Aplikacije',
          description: 'Izvorne iOS in Android aplikacije z osupljivim UI in brezhibnim delovanjem',
          features: [
            'Swift & Kotlin razvoj',
            'Večplatformski razvoj z React Native',
            'Optimizacija App Store'
          ]
        },
        ai: {
          title: 'AI Avtomatizacija',
          description: 'Inteligentne avtomatizacijske rešitve poganjane z najsodobnejšo AI tehnologijo',
          features: [
            'AI modeli po meri',
            'Avtomatizacija procesov',
            'Napovedna analitika'
          ]
        },
        strategy: {
          title: 'AI Strategija',
          description: 'Strokovno svetovanje za preoblikovanje vašega podjetja z AI implementacijo',
          features: [
            'Ocena AI pripravljenosti',
            'Načrti implementacije',
            'Usposabljanje ekipe'
          ]
        }
      },
      
      faqs: [
        {
          q: 'Koliko časa traja izdelava spletne strani?',
          a: 'Čas dostave se razlikuje glede na kompleksnost projekta. Na naši ceninski strani preverite podrobne ocene za vsak nivo. Na splošno se projekti gibljejo od 1-2 dni za preproste strani do 3-5 dni za kompleksne projekte. Naš AI-pospešen razvojni proces zagotavlja hitro dostavo brez kompromisov pri kakovosti.'
        },
        {
          q: 'Kaj je vključeno v tipičen spletni projekt?',
          a: 'Vsak projekt vključuje odziven dizajn, SEO optimizacijo, optimizacijo zmogljivosti, upravljanje vsebine, integracijo analitike in namestitev. Zagotavljamo tudi dokumentacijo in usposabljanje za upravljanje vaše strani.'
        },
        {
          q: 'Ali delate z obstoječimi spletnimi stranmi?',
          a: 'Da, lahko preoblikujemo, optimiziramo ali dodamo nove funkcije vaši obstoječi spletni strani. Delamo z vsemi glavnimi platformami in lahko migiramo strani na moderna ogrodja za boljšo zmogljivost in vzdržljivost.'
        },
        {
          q: 'Koliko stane spletna stran po meri?',
          a: 'Spletni projekti se običajno gibljejo od 250 € za preproste strani do 1.100 € za bolj kompleksne projekte. Zagotavljamo podrobne ponudbe na podlagi vaših specifičnih zahtev in lahko delamo v okviru vaših proračunskih omejitev.'
        },
        {
          q: 'Ali bo moja spletna stran prijazna mobilnim napravam?',
          a: 'Absolutno. Vse naše spletne strani so zgrajene z mobilnimi napravami v mislih z odzivnim dizajnom, ki izgleda popolno na telefonih, tablicah in namiznih računalnikih. Testiramo na vseh glavnih napravah in brskalnikih za zagotavljanje doslednosti.'
        },
        {
          q: 'Ali lahko pomagate z vsebino in SEO?',
          a: 'Da, zagotavljamo strategijo vsebine, pisanje besedil in celovito SEO optimizacijo. To vključuje meta oznake, strukturirane podatke, generiranje sitemap in optimizacijo zmogljivosti za boljše uvrstitve v iskanju.'
        },
        {
          q: 'Kaj pa vzdrževanje spletne strani po lansiranju?',
          a: 'Ponujamo stalne pakete vzdrževanja, ki vključujejo posodobitve, varnostni nadzor, optimizacijo zmogljivosti in posodobitve vsebine. Vsebino lahko upravljate tudi sami s CMS-jem, ki ga nastavimo.'
        },
        {
          q: 'Ali nudite storitve gostovanja?',
          a: 'Pomagamo vam izbrati najboljšo rešitev gostovanja za vaše potrebe in obvladamo namestitev. Delamo z vsemi glavnimi ponudniki, kot so Vercel, Netlify, AWS, in lahko priporočamo glede na vaš promet in proračun.'
        }
      ]
    },
    diy: {
      title: 'NAREDI SAM RAZVOJ',
      subtitle: 'Gradite profesionalne spletne strani brez agencijske cene. Moderen sklad, jasni vodniki, polno lastništvo.',
      stats: {
        buildTime: { value: '1-2 dni', label: 'Povprečni Čas Gradnje' },
        ownership: { value: '100%', label: 'Lastništvo Kode' },
        performance: { value: 'A+', label: 'Ocena Zmogljivosti' }
      },
      choosePath: {
        title: 'Izberite Svojo Pot',
        subtitle: 'Spremeni obstoječo stran ali gradi od začetka. Obe poti vodita do profesionalne spletne strani, ki je v celoti vaša.'
      },
      tabs: {
        modify: 'Spremeni Obstoječo Stran',
        build: 'Gradi Od Začetka'
      },
      quickStart: {
        clone: {
          icon: '🚀',
          title: 'Kloniraj & Zaženi',
          description: 'Pripravite svoje razvojno okolje v minutah z našim hitrim priročnikom.'
        },
        customize: {
          icon: '🎨',
          title: 'Prilagodi Dizajn',
          description: 'Spremeni barve, pisave in postavitve z uporabo žetonov našega dizajnerskega sistema.'
        },
        deploy: {
          icon: '📦',
          title: 'Objavi V Živo',
          description: 'Potisni v produkcijo z enim ukazom z uporabo GitHub Pages ali Vercel.'
        }
      },
      commonMods: {
        title: 'Pogoste Spremembe',
        updateContent: {
          title: 'Posodobi Vsebino & Besedilo',
          steps: ['Uredi besedilo v datotekah komponent', 'Posodobi meta opise', 'Osveži slike in medije']
        },
        addSection: {
          title: 'Dodaj Nov Razdelek',
          steps: ['Uvozi komponento', 'Dodaj na postavitev strani', 'Konfiguriraj lastnosti in podatke']
        },
        createPage: {
          title: 'Ustvari Novo Stran',
          steps: ['Ustvari datoteko komponente', 'Dodaj pot v App.tsx', 'Poveži iz navigacije']
        },
        stepsLabel: 'Koraki:',
        exampleLabel: 'Primer:'
      },
      buildProcess: {
        title: 'Proces Gradnje',
        steps: [
          {
            title: 'Nastavi Razvojno Okolje',
            description: 'Namesti Node.js, konfiguriraj svoj urejevalnik in nastavi nadzor verzij.',
            time: '30 min'
          },
          {
            title: 'Inicializiraj Projekt',
            description: 'Ustvari React aplikacijo z Vite, namesti odvisnosti, konfiguriraj orodja za gradnjo.',
            time: '20 min'
          },
          {
            title: 'Dizajnerski Sistem',
            description: 'Nastavi barvne žetone, tipografijo, sistem razmikov in knjižnico komponent.',
            time: '45 min'
          },
          {
            title: 'Gradi Osnovne Strani',
            description: 'Ustvari usmerjanje, gradi domačo stran, dodaj navigacijo, implementiraj odzivno postavitev.',
            time: '2 uri'
          },
          {
            title: 'Dodaj Interaktivnost',
            description: 'Implementiraj animacije, obdelavo obrazcev in dinamično nalaganje vsebine.',
            time: '1 ura'
          },
          {
            title: 'Optimiziraj & Objavi',
            description: 'Stisni sredstva, konfiguriraj SEO, izvedi teste zmogljivosti, objavi v produkcijo.',
            time: '1 ura'
          }
        ]
      },
      techStack: {
        title: 'Moderen Tehnološki Sklad',
        items: [
          { name: 'React 19', category: 'Ogrodje', description: 'Komponenten UI' },
          { name: 'TypeScript', category: 'Jezik', description: 'Tipsko varna koda' },
          { name: 'Vite', category: 'Orodje Za Gradnjo', description: 'Bliskovito hitre gradnje' },
          { name: 'Tailwind CSS', category: 'Oblikovanje', description: 'CSS prve uporabnosti' }
        ]
      },
      quickStartCommands: {
        title: 'Hiter Začetek',
        create: { title: '1. Ustvari Projekt' },
        install: { title: '2. Namesti Odvisnosti' },
        start: { title: '3. Začni Razvoj' }
      },
      comparison: {
        title: 'Izberi Svoj Pristop',
        visual: {
          title: 'Pot Vizualnega Graditelja',
          pros: [
            'Kodiranje ni potrebno',
            'Objava v urah',
            'Vgrajeno gostovanje'
          ],
          cons: [
            'Mesečna naročnina',
            'Omejena prilagoditev'
          ],
          button: 'Razišči Graditelje →'
        },
        code: {
          title: 'Pot Kode Najprej',
          pros: [
            'Popoln nadzor',
            'Brez vezave na ponudnika',
            'Enkratni stroški',
            'Neomejene funkcije'
          ],
          cons: [
            'Krivulja učenja'
          ],
          button: 'Začni Kodiranje →'
        }
      },
      examples: {
        title: 'Zgrajeno Z Našim Skladom',
        subtitle: 'Resnične spletne strani, ki so jih zgradili razvijalci z uporabo naših vodnikov in komponent.',
        items: [
          { title: 'Kreativna Agencija', category: 'Portfelj' },
          { title: 'SaaS Vstopna Stran', category: 'Marketing' },
          { title: 'E-trgovina', category: 'Trgovina' },
          { title: 'Blog Platforma', category: 'Vsebina' },
          { title: 'Dokumentacija', category: 'Tehnično' },
          { title: 'Restavracija', category: 'Lokalni Posel' }
        ],
        metrics: {
          score: 'Ocena',
          load: 'Nalaganje',
          size: 'Velikost'
        }
      },
      faq: {
        title: 'Pogosto Zastavljena Vprašanja',
        subtitle: 'Vse, kar morate vedeti o gradnji lastne spletne strani.',
        items: [
          {
            q: 'Katere tehnične veščine potrebujem?',
            a: 'Osnovno znanje HTML in CSS pomaga, vendar so naši vodniki prijazni začetnikom. Med gradnjo se boste naučili React, TypeScript in moderne prakse spletnega razvoja.'
          },
          {
            q: 'Koliko stane izvajanje DIY spletne strani?',
            a: 'Domena: $10-15/leto. Gostovanje: Brezplačno z GitHub Pages ali Netlify za statične strani, ali $20/mesec za naprednejše funkcije. Skupaj: $10-250/leto odvisno od vaših potreb.'
          },
          {
            q: 'Ali lahko to uporabim za komercialne projekte?',
            a: 'Da! Koda je vaša za uporabo za katerikoli namen. Gradite strani za stranke, SaaS izdelke ali spletno stran vašega podjetja brez omejitev.'
          },
          {
            q: 'Kaj pa odzivnost na mobilnih napravah?',
            a: 'Vse naše komponente so oblikovane z mobilnim pristopom najprej. Vaša stran bo izgledala odlično na telefonih, tablicah in namizjih brez dodatnega dela.'
          },
          {
            q: 'Kako obdelam obrazce in uporabniške podatke?',
            a: 'Začnite s končnimi točkami obrazcev, kot sta Formspree ali Netlify Forms. Ko rastete, integrirajte s storitvami, kot je Supabase, ali zgradite lastno zaledje.'
          },
          {
            q: 'Ali je SEO vključen?',
            a: 'Da! Vgrajene meta oznake, semantični HTML, generiranje zemljevida strani in strukturirani podatki. Vaša stran bo prijazna iskalnim strojem od prvega dne.'
          },
          {
            q: 'Kako pogosto naj posodobim odvisnosti?',
            a: 'Preverite mesečno za varnostne posodobitve, četrtletno za manjše različice. Uporabite orodja, kot je Dependabot, za avtomatizacijo procesa.'
          },
          {
            q: 'Ali lahko dodam funkcije e-trgovine?',
            a: 'Absolutno! Integrirajte Stripe, PayPal ali Shopify Buy Button. Začnite preprosto s plačilnimi povezavami, nato gradite popolne postopke nakupovanja po potrebi.'
          }
        ]
      },
      marquee: 'Gradi • Objavi • Iteraj • Lastništvo Kode • Gradi • Objavi • Iteraj • Lastništvo Kode •',
      cta: {
        title: 'Pripravljen Graditi?',
        subtitle: 'Začnite z našimi brezplačnimi predlogami in vodniki. Zgradite nekaj neverjetnega v urah, ne tednih.',
        button: 'Začni Brezplačno'
      },
      copyCode: 'Kopiraj Kodo',
      copied: 'Kopirano!'
    },
    plans: {
      title: 'Preprosta Cenitev',
      subtitle: 'Izberite paket, ki ustreza vašim potrebam. Vsaka spletna stran je prilagojena mobilnim napravam, hitra in pripravljena rasti z vašim podjetjem.',
      heroHeading: 'CENITEV',
      mostPopular: 'Najbolj Priljubljen',
      selectPlan: 'Izberi Paket',
      billingToggle: {
        project: 'Enkratni projekt',
        monthly: 'Mesečno vzdrževanje',
        projectSuffix: 'projekt',
        monthlySuffix: '/mesec'
      },
      planCard: {
        cta: 'Začni'
      },
      viewDetails: 'Primerjaj vse funkcije',
      comparison: {
        title: 'Primerjaj funkcije',
        subtitle: 'Oglejte si, kaj vključuje posamezen paket',
        feature: 'Funkcije',
        pages: 'Število Strani',
        design: 'Prilagojena Zasnova',
        responsive: 'Prilagojeno Mobilnim Napravam',
        seo: 'Optimizirano za SEO',
        speed: 'Optimizirano za Hitrost',
        forms: 'Kontaktni Obrazci',
        maps: 'Integracija Zemljevidov',
        gallery: 'Foto Galerija',
        database: 'Baza Izdelkov',
        cms: 'Upravljanje Vsebine',
        booking: 'Sistem Rezervacij',
        multilang: 'Večjezičnost',
        aiSearch: 'AI Iskanje',
        support: 'Podpora in Posodobitve',
        rows: [
          { name: 'Vključene strani', starter: '2 strani', core: '5 strani', pro: '8 strani', scale: '12 strani' },
          { name: 'Čas dostave', starter: '24 ur', core: '1-2 dni', pro: '2-3 dni', scale: '3-5 dni' },
          { name: 'Krogi popravkov', starter: '1', core: '2', pro: '4', scale: '5' },
          { name: 'Kontaktni obrazec', starter: '✓', core: '✓', pro: '✓', scale: '✓' },
          { name: 'Najdeni na Google', starter: '✓', core: '✓', pro: '✓', scale: '✓' },
          { name: 'Najdeni na Maps & AI', starter: '—', core: '✓', pro: '✓', scale: '✓' },
          { name: 'Prijava strank', starter: '—', core: '—', pro: 'Po želji', scale: '✓' },
          { name: 'Spletna trgovina', starter: '—', core: '—', pro: 'Do 12 izdelkov', scale: 'Neomejeno' },
          { name: 'Sprejemanje plačil', starter: '—', core: '—', pro: 'Po želji', scale: '✓' },
          { name: 'Admin nadzorna plošča', starter: '—', core: '—', pro: '—', scale: '✓' },
          { name: 'Samostojno urejanje vsebine', starter: '—', core: '—', pro: '✓', scale: '✓' },
          { name: 'Obdobje brezplačnih posodobitev', starter: '—', core: '—', pro: '1 mesec', scale: '1 mesec' },
          { name: 'Posebne funkcije (zemljevidi, galerija ...)', starter: '—', core: 'Izberi 2', pro: 'Vse vključeno', scale: 'Vse vključeno' }
        ]
      },
      stats: [
        { value: '24h', label: 'Povprečen čas dostave' },
        { value: '100%', label: 'Zadovoljstvo strank' },
        { value: '50+', label: 'Zaključeni projekti' },
        { value: '€250', label: 'Začetna cena' }
      ],
      faq: {
        title: 'Pogosta vprašanja',
        subtitle: 'Vse, kar morate vedeti o naši cenitvi',
        items: [
          {
            q: 'Kaj pomeni "AI-gnana večagentska veriga"?',
            a: 'Pomeni, da uporabljamo niz specializiranih AI agentov, ki pokrivajo različne faze razvoja — od raziskave in priprave specifikacij do pisanja in namestitve kode. Na ta način avtomatiziramo ponavljajoče se naloge in pospešimo celoten proces razvoja.'
          },
          {
            q: 'Kdo je lastnik kode, ki jo ustvarite?',
            a: 'Vi. Vsa intelektualna lastnina in koda, ustvarjena za vaš projekt, je 100 % v vaši lasti. Predamo čisto, razširljivo in dobro dokumentirano kodo, na kateri lahko vaša ekipa gradi naprej.'
          },
          {
            q: 'Kako hitro lahko dostavite projekt?',
            a: 'Naš avtomatiziran studio tradicionalno večmesečno delo skrajša na dneve ali tedne, odvisno od zahtevnosti projekta. MVP lahko dostavimo bistveno hitreje kot običajna agencija.'
          },
          {
            q: 'Katere tehnologije uporabljate?',
            a: 'Nismo vezani na določen nabor orodij in vedno izberemo najboljšo tehnologijo za nalogo. Obvladamo sodobna ogrodja, kot so React, Next.js in Vue, ter zmogljive zaledne tehnologije. Jedro procesa je naša lastna veriga agentov in napredno pripravljeni pozivi.'
          }
        ]
      },
      cta: {
        title: 'Pripravljeni začeti projekt?',
        subtitle: 'Pridobite ponudbo po meri ali izberite paket, ki ustreza vašim potrebam',
        primary: 'Pridobi ponudbo',
        secondary: 'Oglejte si naše delo'
      },
      starter: {
        name: 'Začetni',
        description: 'Popoln za nova podjetja ali preproste projekte, ki potrebujejo profesionalno spletno prisotnost hitro.'
      },
      core: {
        name: 'Osnovni',
        description: 'Idealen za uveljavljena podjetja, ki želijo uglajeno spletno stran z možnostjo rasti.'
      },
      pro: {
        name: 'Profesionalni',
        description: 'Za podjetja, pripravljena na širitev z naprednimi funkcijami in večjo spletno prisotnostjo.'
      },
      scale: {
        name: 'Obsežni',
        description: 'Celotna rešitev za podjetja, ki potrebujejo maksimalno prilagodljivost in obsežno vsebino.'
      },
      addOns: {
        title: 'Dodatki',
        subtitle: 'Razširite svojo spletno stran s temi izbirnimi funkcijami'
      }
    },
    contact: {
      badge: 'Stopite v Stik',
      title: 'KONTAKTIRAJTE NAS',
      subtitle: 'Imate projekt v mislih? Pogovorimo se. Izpolnite obrazec ali nas kontaktirajte neposredno.',
      details: {
        title: 'Kontaktni Podatki',
        email: 'E-pošta',
        response: 'Običajno odgovorimo v 24 urah. Za nujne poizvedbe to omenite v svojem sporočilu.'
      },
      form: {
        name: 'Ime',
        email: 'E-pošta',
        package: 'Paket, Ki Vas Zanima',
        packagePlaceholder: 'Izberite paket',
        details: 'Podrobnosti Projekta',
        detailsPlaceholder: 'Povejte nam o svojem projektu...',
        send: 'Pošlji Sporočilo',
        namePlaceholder: 'Vaše ime',
        emailPlaceholder: 'vasa@eposta.si'
      }
    },
    about: {
      badge: 'O Whiteweaver Studio',
      title: 'Mi smo Whiteweaver',
      subtitle: 'Moderni razvojni studio, ki združuje strokovno inženirstvo z AI avtomatizacijo za hitro dostavo proizvodnih rezultatov.',
      mission: {
        title: 'Naše Poslanstvo',
        text: 'Obstajamo, da bi odpravili trenje v razvoju programske opreme. Tradicionalni razvoj je počasen, drag in nepredvidljiv. Zgradili smo avtomatizirano verigo specializiranih AI agentov, ki opravljajo ponavljajoče se naloge, medtem ko se naši strokovni inženirji osredotočajo na arhitekturo, varnost in dostavo izjemnih izdelkov.'
      },
      stats: {
        projects: 'Zaključeni projekti',
        satisfaction: 'Zadovoljstvo strank',
        speed: 'Hitrejša dostava',
        support: 'Podpora 24/7',
        quality: 'Kakovost kode'
      },
      values: {
        badge: 'Naše Vrednote',
        title: 'Kaj Zastopamo',
        description: 'Načela, ki nas vodijo vsak dan.',
        items: [
          {
            key: 'velocity',
            title: 'Hitrost',
            body: 'Dostavljamo hitro brez žrtvovanja kakovosti. Optimiziramo za učinek in jasnost.'
          },
          {
            key: 'ownership',
            title: 'Lastništvo',
            body: 'Težave obravnavamo kot svoje. Odgovorni smo od ideje do predaje.'
          },
          {
            key: 'craft',
            title: 'Mojstrstvo',
            body: 'Gradimo s skrbnostjo, natančnostjo in empatijo do uporabnikov ter vzdrževalcev.'
          },
          {
            key: 'transparency',
            title: 'Preglednost',
            body: 'Komuniciramo jasno. Napredek, kompromise in odločitve delimo odprto.'
          }
        ],
        speed: {
          title: 'Hitrost Brez Kompromisov',
          text: 'AI pospešitev pomeni hitrejšo dostavo, vendar nikoli na račun kakovosti, varnosti ali vzdržljivosti.'
        },
        quality: {
          title: 'Produkcijska Kakovost',
          text: 'Vsaka vrstica kode je pregledana s strani strokovnih inženirjev. Dostavljamo programsko opremo, ki deluje v produkciji od prvega dne.'
        },
        transparency: {
          title: 'Radikalna Preglednost',
          text: 'Dobite popoln vpogled v naš proces, napredek in odločitve. Brez črnih škatel, brez presenečenj.'
        },
        ownership: {
          title: 'Vse Je Vaše',
          text: 'Popolna lastništvo kode, dokumentacija in prenos znanja. Brez vezave na ponudnika, nikoli.'
        }
      },
      timeline: {
        badge: 'Naša Pot',
        title: 'Kako Smo Začeli',
        items: [
          {
            year: '2022',
            text: 'Naš studio je bil ustanovljen na preprosti premisi: razvoj programske opreme bi lahko bil hitrejši, pametnejši in bolj usklajen s poslovnimi cilji.'
          },
          {
            year: '2023',
            text: 'Zgradili smo avtomatizirano verigo specializiranih AI agentov in odpravili trenje ter zamude pri tradicionalnem razvoju.'
          },
          {
            year: '2024',
            text: 'Osredotočili smo se na reševanje zapletenih problemov in dostavo izjemnih izdelkov s strokovno kontrolo in AI pospeškom.'
          }
        ],
        year2022: 'Naš studio je bil ustanovljen na preprosti premisi: razvoj programske opreme bi lahko bil hitrejši, pametnejši in bolj usklajen s poslovnimi cilji.',
        year2023: 'Zgradili smo avtomatizirano verigo specializiranih AI agentov in odpravili trenje ter zamude pri tradicionalnem razvoju.',
        year2024: 'Osredotočili smo se na reševanje zapletenih problemov in dostavo izjemnih izdelkov s strokovno kontrolo in AI pospeškom.'
      },
      team: {
        badge: 'Ekipa',
        title: 'Kdo Smo',
        text: 'Smo vitka, distribuirana ekipa senior inženirjev, AI strokovnjakov in produktnih strokovnjakov. Vsak član je dostavil produkcijsko programsko opremo v velikem obsegu in razume razliko med kodo, ki deluje, in kodo, ki zdrži.'
      },
      why: {
        badge: 'Zakaj Izbrati Nas',
        title: 'Zakaj Podjetja Izberejo WHITEWEAVER',
        methodology: {
          title: 'Preverjena Metodologija',
          text: 'Jasna, ponovljiva veriga, ki združuje AI pospešek s strokovno inženirsko kontrolo.'
        },
        experts: {
          title: 'Strokovna Ekipa',
          text: 'Multidisciplinarni strokovnjaki za inženirstvo, AI in izdelke, ki prevzemajo lastništvo rezultatov—ne le nalog.'
        },
        speedQuality: {
          title: 'Hitrost in Kakovost',
          text: 'AI-pospešena dostava brez kompromisov pri produkcijski kodi, zmogljivosti ali vzdržljivosti.'
        },
        ownership: {
          title: 'Popolno Lastništvo',
          text: 'Obdržite popolno lastništvo kode in prejmete dokumentacijo ter predajo za nemoteno delovanje.'
        }
      },
      faq: {
        title: 'Pogosta vprašanja',
        items: [
          {
            question: 'Kaj pomeni »AI-poganjana, večagentska veriga«?',
            answer: 'Pomeni, da uporabljamo niz specializiranih AI agentov, ki pokrivajo različne faze razvoja — od raziskave in priprave specifikacij do pisanja in nameščanja kode. Tako avtomatiziramo ponavljajoče se dele razvoja programske opreme in proces naredimo hitrejši ter učinkovitejši.'
          },
          {
            question: 'Kdo je lastnik kode, ki jo ustvarite?',
            answer: 'Vi. Vsa intelektualna lastnina in koda, ustvarjena za vaš projekt, je 100 % v vaši lasti. Predamo čisto, razširljivo in dobro dokumentirano kodo, na kateri lahko vaša ekipa nadaljuje z delom.'
          },
          {
            question: 'Kako hitro lahko dostavite projekt?',
            answer: 'Naš avtomatiziran studio večmesečno tradicionalno delo skrči na dneve ali tedne, odvisno od zahtevnosti projekta. MVP lahko dostavimo bistveno hitreje kot tipična agencija.'
          },
          {
            question: 'Katere tehnologije uporabljate?',
            answer: 'Nismo vezani na posamezno tehnologijo in vedno izberemo najboljše orodje za nalogo. Obvladamo moderna ogrodja, kot so React, Next.js in Vue, ter zmogljive zaledne tehnologije. Jedro našega procesa je lastna veriga pozivov in agentov za pisanje kode.'
          }
        ]
      },
      cta: {
        title: 'Gradimo skupaj',
        text: 'Združujemo strokovno inženirstvo z AI avtomatizacijo za hitro dostavo proizvodnih rezultatov.',
        start: 'Začnite Svoj Projekt',
        work: 'Oglejte Si Naše Delo'
      }
    },
    footer: {
      tagline: 'Gradimo prihodnost, en projekt naenkrat.',
      pages: 'Strani',
      social: 'Družbeni Mediji',
      rights: 'Vse pravice pridržane.',
      copyright: '© 2025 WHITEWEAVER Studio. Vse pravice pridržane.'
    }
  }
};
