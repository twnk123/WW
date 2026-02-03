import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import Seo from '../components/Seo';
import { blogArticles } from '../data/blogArticles';

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(blogArticles.map(a => a.category)))];

  // Sort by date (newest first)
  const sortedArticles = [...blogArticles].sort((a, b) =>
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  const pillarArticles = sortedArticles.filter(a => a.isPillar);
  const clusterArticles = sortedArticles.filter(a => !a.isPillar);

  const filteredArticles = selectedCategory === 'All'
    ? clusterArticles
    : clusterArticles.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-bg">
      <Seo
        title="Blog | MVP Development Insights & Startup Resources | WHITEWEAVER"
        description="Expert insights on MVP development, startup validation, web development costs, and building successful products. Learn from 50+ launches."
        canonical="/blog"
        alternates={[
          { hrefLang: 'en', href: '/blog' },
          { hrefLang: 'x-default', href: '/blog' },
        ]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: window.location.origin + '/blog' },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'WHITEWEAVER Blog',
            description: 'Expert insights on MVP development and startup success',
            url: window.location.origin + '/blog',
            publisher: {
              '@type': 'Organization',
              name: 'WHITEWEAVER',
              logo: {
                '@type': 'ImageObject',
                url: window.location.origin + '/logo.png'
              }
            }
          }
        ]}
      />

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tight">
              Blog
            </h1>
            <p className="text-xl md:text-2xl text-text-active/60 max-w-3xl font-light">
              Practical insights on building MVPs, validating ideas, and launching startups fast
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pillar Pages Section */}
      {pillarArticles.length > 0 && (
        <section className="pb-16">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <ScrollReveal>
              <div className="mb-8">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Complete Guides</h2>
                <p className="text-lg text-text-active/60">Comprehensive resources covering everything you need to know</p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6">
              {pillarArticles.map((article, index) => (
                <ScrollReveal key={article.slug} delay={index * 0.1}>
                  <Link to={`/blog/${article.slug}`}>
                    <motion.article
                      className="group h-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0E5F63]/5 to-white border-2 border-[#0E5F63]/20"
                      whileHover={{ y: -4, borderColor: 'rgba(14, 95, 99, 0.4)' }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-[#0E5F63] to-[#0a4446] text-white uppercase tracking-wider">
                            Pillar Page
                          </span>
                          <span className="text-sm text-text-active/50">{article.readTime}</span>
                        </div>

                        <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-3 group-hover:text-[#0E5F63] transition-colors">
                          {article.title}
                        </h3>

                        <p className="text-base md:text-lg text-text-active/70 mb-4 leading-relaxed">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center gap-2 text-[#0E5F63] font-medium text-sm group-hover:gap-3 transition-all">
                          <span>Read guide</span>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="pb-8">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <ScrollReveal>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-[#0E5F63] text-white'
                      : 'bg-white border border-gray-200 hover:border-[#0E5F63] text-text-active/70'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="grid gap-12">
            {filteredArticles.map((article, index) => (
              <ScrollReveal key={article.slug} delay={index * 0.05}>
                <Link to={`/blog/${article.slug}`}>
                  <motion.article
                    className="group grid md:grid-cols-[200px_1fr] gap-8 items-start"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="space-y-1 text-sm text-text-active/50 md:pt-1">
                      <div className="font-medium text-text-active/70">{article.publishDateFormatted}</div>
                      <div>{article.readTime}</div>
                      {article.updatedDate && article.updatedDate !== article.publishDate && (
                        <div className="text-[#0E5F63] font-medium text-xs">
                          Updated {article.updatedDateFormatted}
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[#0E5F63]/10 text-[#0E5F63]">
                          {article.category}
                        </span>
                        {article.tags.slice(0, 2).map(tag => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-text-active/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight group-hover:text-[#0E5F63] transition-colors">
                        {article.title}
                      </h2>

                      <p className="text-base md:text-lg text-text-active/70 leading-relaxed">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center gap-2 text-[#0E5F63] font-medium text-sm group-hover:gap-3 transition-all">
                        <span>Read article</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </motion.article>
                </Link>

                {index < filteredArticles.length - 1 && (
                  <div className="border-t border-gray-100 mt-12"></div>
                )}
              </ScrollReveal>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-text-active/50">No articles found in this category</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
