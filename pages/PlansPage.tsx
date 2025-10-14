
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
    const [billingCycle, setBillingCycle] = useState<'project' | 'monthly'>('project');
    const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
    const { t, language } = useLanguage();
    
    // Get translated plans
    const translatedPlans = plansTranslations[language].plans;
    const billingToggle = t('plans.billingToggle') as {
        project: string;
        monthly: string;
        projectSuffix: string;
        monthlySuffix: string;
    };
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
                title={`${t('plans.title')} — WHITEWEAVER Studio`}
                description={t('plans.subtitle') as string}
                canonical="/plans"
                type="product"
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
                            className="text-lg md:text-xl text-text-active max-w-3xl mx-auto mb-8"
                        >
                            {t('plans.subtitle')}
                        </motion.p>

                        {/* Billing Toggle */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="inline-flex items-center gap-4 p-1 bg-gradient-to-r from-accent/10 to-purple-500/10 border border-accent/20 rounded-full"
                        >
                            <button
                                onClick={() => setBillingCycle('project')}
                                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                                    billingCycle === 'project' 
                                        ? 'bg-accent text-white' 
                                        : 'text-text-active hover:bg-accent/10'
                                }`}
                            >
                                {billingToggle.project}
                            </button>
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                                    billingCycle === 'monthly' 
                                        ? 'bg-accent text-white' 
                                        : 'text-text-active hover:bg-accent/10'
                                }`}
                            >
                                {billingToggle.monthly}
                            </button>
                        </motion.div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {plans.map((plan, index) => {
                            const translatedPlan = translatedPlans[index] ?? {
                                name: plan.name,
                                description: plan.description,
                                features: plan.features
                            };
                            const isPopular = index === 1; // Core plan is most popular
                            const isPremium = index === 3; // Scale plan

                            return (
                                <motion.div
                                    key={plan.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    onHoverStart={() => setHoveredPlan(index)}
                                    onHoverEnd={() => setHoveredPlan(null)}
                                    className="relative"
                                >
                                    {isPopular && (
                                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                                            <span className="px-4 py-1 bg-accent text-black text-xs font-semibold rounded-full whitespace-nowrap shadow-lg">
                                                {t('plans.mostPopular')}
                                            </span>
                                        </div>
                                    )}

                                    <motion.div
                                        whileHover={{ y: -8 }}
                                        transition={{ duration: 0.3 }}
                                        className={`relative h-full rounded-2xl p-7 flex flex-col ${
                                            isPremium 
                                                ? 'bg-gradient-to-br from-accent/10 to-button-bg border-accent/30' 
                                                : isPopular
                                                ? 'bg-gradient-to-br from-white to-accent/5 border-accent/20'
                                                : 'bg-white border-accent/10'
                                        } border ${hoveredPlan === index ? 'shadow-2xl' : 'shadow-lg'} transition-all duration-300`}
                                    >
                                        {/* Plan Header */}
                                        <div className="mb-4">
                                            <h3 className="font-display text-xl font-medium tracking-tight mb-1">
                                                {translatedPlan.name}
                                            </h3>
                                            <p className="text-xs text-text-active leading-relaxed">
                                                {translatedPlan.description}
                                            </p>
                                        </div>

                                        {/* Price */}
                                        <div className="mb-6">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={billingCycle}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="flex items-baseline gap-2"
                                                >
                                                    <span className="font-display text-4xl font-bold tracking-tight">
                                                        {billingCycle === 'project' ? plan.price : `€${Math.round(parseInt(plan.price.slice(1)) * 0.15)}`}
                                                    </span>
                                                    <span className="text-accent text-xs font-medium">
                                                        {billingCycle === 'project' ? billingToggle.projectSuffix : billingToggle.monthlySuffix}
                                                    </span>
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>

                                        {/* Features - Show all features */}
                                        <ul className="space-y-2 mb-8 flex-1">
                                            {translatedPlan.features.map((feature, i) => {
                                                if (!feature || feature.includes('💡') || !feature.trim()) return null;

                                                const trimmedFeature = feature.trimStart();
                                                const normalizedLower = trimmedFeature.toLowerCase();
                                                const optionalMarkers = ['Optional', 'Optional Extra', 'Dodatna možnost', 'Po želji'];
                                                const chooseMarkers = ['Choose', 'Pick', 'Izberi', 'Izberite'];

                                                const isOptional = optionalMarkers.some(marker => normalizedLower.startsWith(marker.toLowerCase()));
                                                const hasUpgrade = feature.includes('→');
                                                const isSubItem = feature.startsWith('  ');
                                                const isChooseHeader = chooseMarkers.some(marker => normalizedLower.startsWith(marker.toLowerCase()));
                                                
                                                return (
                                                    <motion.li 
                                                        key={i}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: 0.1 + i * 0.05 }}
                                                        className={`
                                                            ${!isSubItem ? 'flex items-start gap-2' : 'ml-6'}
                                                            ${isOptional ? 'mt-2 p-2 bg-purple-500/5 rounded-md' : ''}
                                                            ${hasUpgrade ? 'text-accent font-medium' : 'text-text-active'}
                                                            ${isSubItem ? 'text-[11px] text-text-active/80' : 'text-xs'}
                                                            ${isChooseHeader ? 'font-medium' : ''}
                                                        `}
                                                    >
                                                        {!isOptional && !isSubItem && !isChooseHeader && (
                                                            <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                        <span>{feature}</span>
                                                    </motion.li>
                                                );
                                            }).filter(Boolean)}
                                        </ul>

                                        {/* CTA Button */}
                                        <Button 
                                            to="/contact" 
                                            variant={isPremium ? 'primary' : isPopular ? 'secondary' : 'secondary'}
                                            className="w-full"
                                        >
                                            {planButtons.cta}
                                        </Button>

                                        {/* Hover effect glow */}
                                        {hoveredPlan === index && (
                                            <motion.div
                                                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/10 to-purple-500/10 pointer-events-none"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            />
                                        )}
                                    </motion.div>
                                </motion.div>
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
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-line">
                                        <th className="text-left py-4 px-4 text-text-active font-medium">{comparison.feature}</th>
                                        {plans.map((plan, planIndex) => {
                                            const translatedPlan = translatedPlans[planIndex] ?? { name: plan.name };
                                            return (
                                                <th key={plan.name} className="text-center py-4 px-4">
                                                    <div className="font-display text-lg font-medium">{translatedPlan.name}</div>
                                                    <div className="text-accent font-bold">{plan.price}</div>
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
                                            <td className="py-4 px-4 text-text-active font-medium">{row.name}</td>
                                            <td className="text-center py-4 px-4">{row.starter}</td>
                                            <td className="text-center py-4 px-4">{row.core}</td>
                                            <td className="text-center py-4 px-4">{row.pro}</td>
                                            <td className="text-center py-4 px-4">{row.scale}</td>
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
