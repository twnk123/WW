import type { Plan, AddOn } from '../types';

// Whiteweaver Generous Pricing (USD)
export const plans: Plan[] = [
  {
    name: 'Starter',
    price: '$275',
    description: 'Perfect for: "I just need customers to find me online"',
    features: [
      '2-page website',
      'Contact form',
      'Click-to-call/WhatsApp integration',
      '1 revision round',
      '24-hour delivery',
      'AI-powered site search (optional)',
    ],
  },
  {
    name: 'Pro',
    price: '$1,200',
    description: 'Perfect for: "I need customers to log in OR buy things online"',
    features: [
      '8-page website',
      'User login or online store (choose one)',
      'Alert notifications & site editing access',
      '2 revision rounds',
      'Google Maps integration & AI search visibility',
      '2–3 day delivery',
      '1 month of free updates included',
    ],
  },
  {
    name: 'Scale',
    price: '$2,400',
    description: 'Perfect for: "I want a complete online business system"',
    features: [
      '12-page website',
      'Full user login & admin dashboard',
      'All payment methods supported',
      'Customer management tools',
      '3 revision rounds',
      '3–5 day delivery',
      'Full Google Maps & AI search visibility',
      '1 month of free updates & training included',
    ],
  },
];

// Popular add-ons for all packages
export const addOns: AddOn[] = [
  {
    name: 'Product Database Connection',
    price: '+$165',
    description: 'We\'ll connect a database to handle unlimited products beyond the 12-item showcase',
    applicableTo: ['Pro', 'Scale'],
  },
  {
    name: 'Additional Pages',
    price: '+$35 per page',
    description: 'We\'ll add extra pages beyond your package limit',
    applicableTo: ['Starter', 'Core', 'Pro', 'Scale'],
  },
  {
    name: 'Multi-Language Setup',
    price: '+$220',
    description: 'We\'ll set up your site in multiple languages with language switcher',
    applicableTo: ['Core', 'Pro', 'Scale'],
  },
  {
    name: 'Online Booking Integration',
    price: '+$110',
    description: 'We\'ll add a booking system for appointments or reservations',
    applicableTo: ['Core', 'Pro', 'Scale'],
  },
  {
    name: 'AI Search Optimization',
    price: '+$100',
    description: 'We\'ll optimize your site to appear in ChatGPT, Google AI, and voice searches',
    applicableTo: ['Starter', 'Core'],
  },
];
