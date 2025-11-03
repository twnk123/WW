
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import Accordion from '../components/Accordion';
import { plans } from '../data/plans';
import { useLanguage } from '../contexts/LanguageContext';
import { plansTranslations } from '../data/plansTranslations';
import type { FAQ } from '../types';
import Seo from '../components/Seo';
import { plans as basePlans } from '../data/plans';

const PlansPage: React.FC = () => {
    const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
    const { t } = useLanguage();

    // Get translated plans
    const translatedPlans = plansTranslations.en.plans;
    const heroHeading = t('plans.heroHeading') as string;
    const planButtons = t('plans.planCard') as { cta: string };
    const comparison = t('plans.comparison') as {
        title: string;
        subtitle: string;
        feature: string;
        rows: Array<{ name: string; starter: string; core: string; pro: string; scale: string }>;
        link?: string;
    };
    const comparisonRows = comparison.rows ?? [];
    const viewDetailsText = comparison.link ?? (t('plans.viewDetails') as string);
    const planStats = t('plans.stats') as Array<{ value: string; label: string }>;
    const planFaq = t('plans.faq') as {
        title: string;
        subtitle: string;
        items: Array<FAQ | { q: string; a: string }>
    };
    const planFaqItems: FAQ[] = (planFaq.items ?? []).map((item) => {
        if ('question' in item && 'answer' in item) {
            return item;
        }
        return {
            question: item.q,
            answer: item.a,
        };
    });
    const planCta = t('plans.cta') as { title: string; subtitle: string; primary: string; secondary: string };

    return (
        <div className="min-h-screen bg-bg overflow-hidden">
            <Seo
                title={`Web Development Pricing | MVP Packages from €200 | WHITEWEAVER`}
                description={`Transparent, fixed-price web development for startups. Packages from €200-€2,200. MVP, e-commerce, custom apps. 5-day delivery. Money-back guarantee. No hidden fees.`}
                canonical="/plans"
                type="product"
                alternates={[
                  { hrefLang: 'en', href: '/plans' },
                  
                  { hrefLang: 'x-default', href: '/plans' },
                ]}
                jsonLd={[
                  {
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                      { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
                      { '@type': 'ListItem', position: 2, name: String(t('plans.title')), item: window.location.origin + '/plans' },
                    ],
                  },
                  {
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: (planFaqItems || []).slice(0, 8).map(f => ({
                      '@type': 'Question',
                      name: f.question,
                      acceptedAnswer: { '@type': 'Answer', text: f.answer },
                    })),
                  },
                  ...basePlans.map((p) => {
                    const priceMatch = (p.price || '').match(/([\d,.]+)/);
                    const price = priceMatch ? priceMatch[1].replace(',', '') : undefined;
                    return {
                      '@context': 'https://schema.org',
                      '@type': 'Product',
                      name: p.name,
                      description: p.description,
                      offers: price ? {
                        '@type': 'Offer',
                        price: price,
                        priceCurrency: 'EUR',
                        url: window.location.origin + '/plans',
                        availability: 'https://schema.org/InStock',
                      } : undefined,
                    };
                  }),
                ]}
            />
            {/* Hero Section with gradient background */}
            <section className="relative h-screen flex items-center justify-center">
                {/* Animated gradient background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-button-bg/20" />
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            background: [
                                'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                                'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                                'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                            ],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 w-full">
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
                            className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6"
                        >
                            {t('plans.title')}
                        </motion.span>
                        <h1 className="font-display text-[clamp(3rem,10vw,8rem)] md:text-[clamp(4rem,12vw,10rem)] font-normal tracking-[0.02em] leading-[0.85] uppercase mb-6 md:mb-8">
                            {heroHeading}
                        </h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="text-lg md:text-xl text-text-active max-w-3xl mx-auto"
                        >
                            {t('plans.subtitle')}
                        </motion.p>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div 
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </section>

            {/* Pricing Cards Section */}
            <section className="py-24 md:py-32 relative">
                <div className="max-w-[1600px] mx-auto px-6 md:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {plans.map((plan, index) => {
                            const isPopular = index === 1;
                            const isPremium = index === 2;
                            const hasDiscount = index >= 1;
                            const discountPercent = index === 1 ? 0.30 : 0.50;
                            const originalPrice = parseInt(plan.price.replace(/[^0-9]/g, ''));
                            const discountedPrice = index === 1 ? 700 : Math.round(originalPrice * (1 - discountPercent));

                            return (
                                <ScrollReveal key={plan.name} delay={index * 0.1}>
                                    <div className="relative">
                                        {hasDiscount && (
                                            <div className="absolute -top-3 -right-3 z-20">
                                                <div className="relative">
                                                    <div className="bg-gradient-to-br from-red-500 to-red-600 text-white px-4 py-2 rounded-lg shadow-xl transform rotate-3">
                                                        <div className="font-bold text-sm">{Math.round(discountPercent * 100)}% OFF</div>
                                                        <div className="text-xs opacity-90">Founding Clients</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {isPopular && (
                                            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                                                <span className="px-4 py-1 bg-accent text-black text-xs font-semibold rounded-full whitespace-nowrap shadow-lg" style={{ border: '2px solid #0E5F63' }}>
                                                    Most Popular
                                                </span>
                                            </div>
                                        )}

                                        <motion.div
                                            whileHover={{ y: -8 }}
                                            transition={{ duration: 0.3 }}
                                            className="relative h-full rounded-2xl p-7 flex flex-col bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
                                            style={{ border: '1px solid #0E5F63' }}
                                        >
                                            <div className="mb-4">
                                                <h3 className="font-display text-3xl font-medium tracking-tight mb-1">
                                                    {plan.name}
                                                </h3>
                                                <p className="text-sm text-text-active leading-relaxed">
                                                    {plan.description}
                                                </p>
                                            </div>

                                            <div className="mb-6">
                                                {hasDiscount ? (
                                                    <div className="flex items-baseline gap-3">
                                                        <span className="font-display text-4xl font-bold tracking-tight text-red-600">
                                                            €{discountedPrice}
                                                        </span>
                                                        <span className="font-display text-2xl font-medium tracking-tight text-text-active/40 line-through">
                                                            {plan.price}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="font-display text-4xl font-bold tracking-tight">
                                                        {plan.price}
                                                    </span>
                                                )}
                                            </div>

                                            <ul className="space-y-2 mb-8 flex-1">
                                                {plan.features.map((feature, i) => (
                                                    <motion.li
                                                        key={i}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: 0.1 + i * 0.05 }}
                                                        className="flex items-start gap-2 text-sm text-text-active"
                                                    >
                                                        <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span>{feature}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>

                                            <Button to="/contact" variant="navbar" className="w-full">
                                                {planButtons.cta}
                                            </Button>
                                        </motion.div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>

                    {/* View Full Details Link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="text-center mt-12"
                    >
                        <button 
                            onClick={() => document.getElementById('comparison')?.scrollIntoView({ behavior: 'smooth' })}
                            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                        >
                            <span>{viewDetailsText}</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Feature Comparison Table */}
            <section id="comparison" className="py-24 md:py-32 bg-gradient-to-b from-transparent via-accent/5 to-transparent">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <ScrollReveal className="text-center mb-16">
                        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                            {comparison.title}
                        </h2>
                        <p className="text-lg text-text-active">
                            {comparison.subtitle}
                        </p>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="overflow-x-auto">
                            <table className="w-full table-fixed">
                                <thead>
                                    <tr className="border-b border-line">
                                        <th className="text-left py-4 px-6 text-text-active font-medium w-1/4">{comparison.feature}</th>
                                        {plans.map((plan, planIndex) => {
                                            const hasDiscount = planIndex >= 1;
                                            const discountPercent = planIndex === 1 ? 0.30 : 0.50;
                                            const originalPrice = parseInt(plan.price.replace(/[^0-9]/g, ''));
                                            const discountedPrice = planIndex === 1 ? 700 : Math.round(originalPrice * (1 - discountPercent));

                                            return (
                                                <th key={plan.name} className="text-center py-4 px-6 w-1/4">
                                                    <div className="font-display text-lg font-medium">{plan.name}</div>
                                                    {hasDiscount ? (
                                                        <div className="text-red-600 font-bold">€{discountedPrice}</div>
                                                    ) : (
                                                        <div className="text-accent font-bold">{plan.price}</div>
                                                    )}
                                                </th>
                                            );
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonRows.map((row, index) => (
                                        <motion.tr
                                            key={row.name}
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border-b border-accent/10 hover:bg-gradient-to-r hover:from-accent/5 hover:to-purple-500/5 transition-all duration-300"
                                        >
                                            <td className="py-4 px-6 text-text-active font-medium">{row.name}</td>
                                            <td className="text-center py-4 px-6">{row.starter}</td>
                                            <td className="text-center py-4 px-6">{row.pro}</td>
                                            <td className="text-center py-4 px-6">{row.scale}</td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        {planStats.map((stat, index) => (
                            <ScrollReveal key={stat.label} delay={index * 0.1}>
                                <div className="space-y-2">
                                    <div className="font-display text-4xl font-bold text-accent">{stat.value}</div>
                                    <div className="text-text-active">{stat.label}</div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 md:py-32 bg-gradient-to-b from-accent/5 to-transparent">
                <div className="max-w-3xl mx-auto px-6 md:px-10">
                    <ScrollReveal className="text-center mb-16">
                        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                            {planFaq.title}
                        </h2>
                        <p className="text-lg text-text-active">
                            {planFaq.subtitle}
                        </p>
                    </ScrollReveal>
                    <ScrollReveal>
                        <Accordion items={planFaqItems} />
                    </ScrollReveal>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 md:py-32">
                <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
                    <ScrollReveal>
                        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                            {planCta.title}
                        </h2>
                        <p className="text-lg md:text-xl text-text-active mb-8">
                            {planCta.subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button to="/contact" variant="primary" size="lg">
                                {planCta.primary}
                            </Button>
                            <Button to="/work" variant="secondary" size="lg">
                                {planCta.secondary}
                            </Button>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
};

export default PlansPage;
