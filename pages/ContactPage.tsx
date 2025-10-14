
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';
import Seo from '../components/Seo';

const ContactPage: React.FC = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        package: '',
        details: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMessage('');

        try {
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            if (!serviceId || !templateId || !publicKey) {
                throw new Error('EmailJS configuration is missing. Please check your .env file.');
            }

            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                package: formData.package,
                message: formData.details,
                to_email: 'support@whiteweaver.com'
            };

            // Debug: Log what we're sending
            console.log('Sending email with data:', templateParams);

            await emailjs.send(
                serviceId,
                templateId,
                templateParams,
                publicKey
            );

            setStatus('success');
            setFormData({ name: '', email: '', package: '', details: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error: any) {
            console.error('Failed to send email:', error);
            setStatus('error');
            setErrorMessage(error.text || error.message || 'Failed to send message. Please try again.');

            // Reset error message after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <div className="min-h-screen overflow-hidden bg-gradient-to-b from-transparent via-accent/5 to-transparent">
            <Seo
                title={`${t('contact.title')} — WHITEWEAVER Studio`}
                description={t('contact.subtitle')}
                canonical="/contact"
                jsonLd={{
                  '@context': 'https://schema.org',
                  '@type': 'BreadcrumbList',
                  itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
                    { '@type': 'ListItem', position: 2, name: String(t('nav.contact')), item: window.location.origin + '/contact' },
                  ],
                }}
            />
            {/* Hero Section - Above the fold */}
            <section className="h-screen flex items-center justify-center relative overflow-hidden">
                {/* Animated gradient background */}
                <div className="absolute inset-0 opacity-30">
                    <motion.div
                        className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent rounded-full blur-3xl"
                        animate={{
                            x: [0, 100, 0],
                            y: [0, 50, 0],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500 rounded-full blur-3xl"
                        animate={{
                            x: [0, -50, 0],
                            y: [0, -100, 0],
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 w-full relative z-10">
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
                            className="inline-block px-6 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-accent/20"
                        >
                            {t('contact.badge')}
                        </motion.span>
                        <h1 className="font-display text-[clamp(3rem,10vw,8rem)] md:text-[clamp(4rem,12vw,10rem)] font-normal tracking-[0.02em] leading-[0.85] uppercase mb-6 md:mb-8 bg-gradient-to-br from-text-active to-accent bg-clip-text text-transparent">
                            {t('contact.title')}
                        </h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="text-lg md:text-xl text-text-active max-w-3xl mx-auto leading-relaxed"
                        >
                            {t('contact.subtitle')}
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <section className="pb-24 md:pb-32 relative">
                <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 items-start">
                    <ScrollReveal>
                        <div className="sticky top-8">
                            <div className="bg-gradient-to-br from-white to-accent/5 border border-accent/20 p-10 rounded-3xl shadow-2xl">
                                <h3 className="font-display text-3xl font-medium tracking-tighter mb-8 bg-gradient-to-br from-text-active to-accent bg-clip-text text-transparent">{t('contact.details.title')}</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-purple-500/20 border border-accent/30 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <strong className="text-text-active font-semibold block mb-1">{t('contact.details.email')}</strong>
                                            <a href="mailto:support@whiteweaver.com" className="text-accent hover:text-accent/80 transition-colors">
                                                support@whiteweaver.com
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-accent/20">
                                    <p className="text-text-active/80 text-sm leading-relaxed">
                                        {t('contact.details.response')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <ScrollReveal>
                            <div>
                                <label className="block text-sm font-medium text-text-active mb-2">{t('contact.form.name')} *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={t('contact.form.namePlaceholder')}
                                    required
                                    disabled={status === 'sending'}
                                    className="w-full bg-white border border-accent/20 p-4 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={0.1}>
                            <div>
                                <label className="block text-sm font-medium text-text-active mb-2">{t('contact.form.email')} *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={t('contact.form.emailPlaceholder')}
                                    required
                                    disabled={status === 'sending'}
                                    className="w-full bg-white border border-accent/20 p-4 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2}>
                            <div>
                                <label className="block text-sm font-medium text-text-active mb-2">{t('contact.form.package')} *</label>
                                <select
                                    name="package"
                                    value={formData.package}
                                    onChange={handleChange}
                                    required
                                    disabled={status === 'sending'}
                                    className="w-full bg-white border border-accent/20 p-4 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <option value="">{t('contact.form.packagePlaceholder')}</option>
                                    <option value="starter">Starter - €250</option>
                                    <option value="core">Core - €500</option>
                                    <option value="pro">Pro - €750</option>
                                    <option value="scale">Scale - €1,100</option>
                                    <option value="custom">Custom Project</option>
                                </select>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={0.3}>
                            <div>
                                <label className="block text-sm font-medium text-text-active mb-2">{t('contact.form.details')} *</label>
                                <textarea
                                    name="details"
                                    value={formData.details}
                                    onChange={handleChange}
                                    placeholder={t('contact.form.detailsPlaceholder')}
                                    rows={6}
                                    required
                                    disabled={status === 'sending'}
                                    className="w-full bg-white border border-accent/20 p-4 rounded-xl focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                                ></textarea>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.4}>
                            <motion.button
                                type="submit"
                                disabled={status === 'sending'}
                                whileHover={status !== 'sending' ? { scale: 1.02 } : {}}
                                whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                                className="w-full bg-gradient-to-r from-accent to-purple-500 hover:from-accent/90 hover:to-purple-500/90 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {status === 'sending' ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    t('contact.form.send')
                                )}
                            </motion.button>
                        </ScrollReveal>

                        {/* Success/Error Messages */}
                        <AnimatePresence>
                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl flex items-center gap-3"
                                >
                                    <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold">Message sent successfully!</p>
                                        <p className="text-sm">We'll get back to you within 24 hours.</p>
                                    </div>
                                </motion.div>
                            )}

                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl flex items-center gap-3"
                                >
                                    <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold">Failed to send message</p>
                                        <p className="text-sm">{errorMessage}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
