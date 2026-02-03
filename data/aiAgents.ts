export interface AIAgent {
  name: string;
  role: string;
  description: string;
  image: string;
}

export const aiAgents: AIAgent[] = [
  {
    name: 'Architect',
    role: 'System Design',
    description: 'Plans the technical architecture, database schema, and API structure. Ensures your MVP is built on a solid foundation that can scale.',
    image: '/agents/architect.webp'
  },
  {
    name: 'Gatekeeper',
    role: 'Authentication & Security',
    description: 'Handles user authentication, authorization, and security protocols. Protects your application from vulnerabilities.',
    image: '/agents/gatekeeper.webp'
  },
  {
    name: 'Stylist',
    role: 'UI/UX Design',
    description: 'Creates beautiful, responsive interfaces that users love. Focuses on user experience and visual consistency.',
    image: '/agents/stylist.webp'
  },
  {
    name: 'Smith',
    role: 'Backend Development',
    description: 'Builds robust server-side logic, APIs, and business logic. The engine that powers your application.',
    image: '/agents/smith.webp'
  },
  {
    name: 'Foundry',
    role: 'Frontend Development',
    description: 'Crafts interactive user interfaces with React and modern frameworks. Brings designs to life with clean, performant code.',
    image: '/agents/foundry.webp'
  },
  {
    name: 'Ledger',
    role: 'Database Management',
    description: 'Designs and optimizes database structures, queries, and data relationships. Ensures fast, reliable data storage.',
    image: '/agents/ledger.webp'
  },
  {
    name: 'Scout',
    role: 'Testing & QA',
    description: 'Runs automated tests, catches bugs, and ensures quality. Your application works flawlessly before launch.',
    image: '/agents/scout.webp'
  },
  {
    name: 'Conveyor',
    role: 'Deployment & CI/CD',
    description: 'Handles deployments, server setup, and continuous integration. Gets your MVP live and keeps it running smoothly.',
    image: '/agents/conveyor.webp'
  },
  {
    name: 'Lighthouse',
    role: 'Performance Optimization',
    description: 'Monitors and optimizes application performance, load times, and resource usage. Keeps your app fast and efficient.',
    image: '/agents/lighthouse.webp'
  },
  {
    name: 'Cashier',
    role: 'Payment Integration',
    description: 'Integrates payment processors like Stripe, handles transactions, and manages billing. Helps you get paid.',
    image: '/agents/cashier.webp'
  }
];
