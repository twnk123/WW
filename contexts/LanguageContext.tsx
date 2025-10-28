import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en';

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
  const [language] = useState<Language>('en');

  const setLanguage = (lang: Language) => {
    // Language is now fixed to English only
  };

  // Update HTML lang attribute
  useEffect(() => {
    document.documentElement.lang = 'en';
  }, []);

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
        line1: 'Launch your MVP in 3 days',
        line2: 'not 3 months.',
        subtitle: 'When automation meets software development. Fraction of agency cost. Money-back guarantee.',
        mobileTitle: 'Launch your MVP in 3 days not 3 months.',
        startBuild: 'Get a 15-min Strategy Session',
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
        title: 'Build Process',
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
        title: 'Frequently Asked Questions',
        subtitle: 'Everything you need to know about building your own website.',
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
        emailPlaceholder: 'your@email.com',
        inquiryType: {
          order: 'Order',
          question: 'Question'
        }
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
  }
};
