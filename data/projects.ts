
import type { Project } from '../types';

export const projects: Project[] = [
  {
    slug: 'alpine-roast',
    title: 'Alpine Roast Cafe',
    tag: '€250 Package Reference',
    client: 'Local Coffee Shop',
    expertise: ['Responsive Design', 'SEO Optimization', 'Basic Animations'],
    date: '2024',
    coverImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&h=800&fit=crop'
    ],
    description: 'A clean, professional website for a local coffee shop. This project showcases what our €250 package includes: responsive design, essential pages, contact forms, and basic SEO setup. Perfect for small businesses looking to establish their online presence.',
    mission: 'To create an inviting digital experience that captures the warmth and quality of Alpine Roast Cafe, driving foot traffic and building customer loyalty through a professional web presence.',
    liveUrl: 'https://alpine-roast-cafe.vercel.app/'
  },
  {
    slug: 'voltsure',
    title: 'VoltSure',
    tag: '€500 Package Reference',
    client: 'Energy Solutions Provider',
    expertise: ['Advanced Features', 'Custom Graphics', 'Performance Optimization'],
    date: '2024',
    coverImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&h=800&fit=crop'
    ],
    description: 'A modern, feature-rich website for an energy solutions company. This €500 package reference includes advanced animations, interactive elements, multi-page layout, and enhanced SEO. Ideal for growing businesses needing professional features.',
    mission: 'To establish VoltSure as a trusted leader in sustainable energy solutions through a sophisticated web presence that communicates innovation, reliability, and environmental responsibility.',
    liveUrl: 'https://volt-sure.vercel.app/'
  },
  {
    slug: 'gympro',
    title: 'GymPro',
    tag: '€750 Package Reference',
    client: 'Fitness Center Chain',
    expertise: ['Booking System', 'Member Portal', 'Class Schedules', 'Advanced Animations'],
    date: '2024',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=1200&h=800&fit=crop'
    ],
    description: 'A comprehensive fitness website showcasing our €750 package capabilities. Features include class scheduling, trainer profiles, membership plans, and interactive elements. Perfect for businesses requiring complex functionality and user engagement.',
    mission: 'To create a motivating digital experience that drives membership growth, streamlines class bookings, and builds a strong fitness community through an engaging, feature-rich platform.',
    liveUrl: 'https://gym-pro-oqwj.vercel.app/'
  },
  {
    slug: 'keje-stari',
    title: 'Keje Stari',
    tag: '€1,100 Package Reference',
    client: 'Luxury Fashion Collective',
    expertise: ['Custom Design', 'Ecommerce Experience', 'Interactive Lookbooks', 'Multi-language', 'Headless CMS'],
    date: '2024',
    coverImage: '/projects/kejestari-cover.webp',
    images: [
      '/projects/kejestari-1.webp',
      '/projects/kejestari-2.webp',
      '/projects/kejestari-3.webp'
    ],
    description: 'A premium fashion ecommerce experience demonstrating our €1,100 package. This build includes immersive lookbooks, product storytelling, multilingual content, and a headless CMS that keeps collections, drops, and campaigns up to date.',
    mission: 'To translate Keje Stari\'s avant-garde fashion identity into a digital flagship that spotlights collections, supports seamless shopping journeys, and scales with seasonal campaigns.',
    liveUrl: 'https://keje-stari.vercel.app/'
  },
];
