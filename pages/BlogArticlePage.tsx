import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import TableOfContents from '../components/TableOfContents';
import RelatedArticles from '../components/RelatedArticles';
import { blogArticles } from '../data/blogArticles';

const BlogArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-[#0E5F63] underline">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  const showTOC = article.tableOfContents && article.tableOfContents.length > 0;

  return (
    <div className="min-h-screen bg-bg">
      <Seo
        title={`${article.title} | WHITEWEAVER Blog`}
        description={article.excerpt}
        canonical={`/blog/${article.slug}`}
        alternates={[
          { hrefLang: 'en', href: `/blog/${article.slug}` },
          { hrefLang: 'x-default', href: `/blog/${article.slug}` },
        ]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: window.location.origin + '/blog' },
              { '@type': 'ListItem', position: 3, name: article.title, item: window.location.origin + `/blog/${article.slug}` },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: article.title,
            description: article.excerpt,
            datePublished: article.publishDate,
            dateModified: article.updatedDate || article.publishDate,
            author: {
              '@type': 'Organization',
              name: 'WHITEWEAVER'
            },
            publisher: {
              '@type': 'Organization',
              name: 'WHITEWEAVER',
              logo: {
                '@type': 'ImageObject',
                url: window.location.origin + '/logo.png'
              }
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': window.location.origin + `/blog/${article.slug}`
            },
            keywords: article.tags.join(', ')
          }
        ]}
      />

      {/* Article Header */}
      <article className="pt-32 pb-16 md:pt-40">
        <div className={`${showTOC ? 'max-w-7xl' : 'max-w-4xl'} mx-auto px-6 md:px-10`}>
          <Link to="/blog" className="inline-flex items-center gap-2 text-text-active/50 mb-12 hover:text-[#0E5F63] transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          <div className={showTOC ? 'grid lg:grid-cols-[1fr_280px] gap-12 items-start' : ''}>
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                {/* Category & Pillar Badge */}
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#0E5F63]/10 text-[#0E5F63]">
                    {article.category}
                  </span>
                  {article.isPillar && (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-[#0E5F63] to-[#0a4446] text-white uppercase tracking-wider">
                      Pillar Page
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                  {article.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-text-active/50 pt-4 border-t border-gray-100">
                  <time dateTime={article.publishDate} className="font-medium text-text-active/70">
                    Published {article.publishDateFormatted}
                  </time>
                  {article.updatedDate && article.updatedDate !== article.publishDate && (
                    <>
                      <span>•</span>
                      <time dateTime={article.updatedDate} className="font-medium text-[#0E5F63]">
                        Updated {article.updatedDateFormatted}
                      </time>
                    </>
                  )}
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>

              {/* Article Content */}
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Related Articles */}
              {article.relatedArticles && article.relatedArticles.length > 0 && (
                <RelatedArticles articleSlugs={article.relatedArticles} currentSlug={article.slug} />
              )}

              <style>{`
                .article-content {
                  font-size: 1.0625rem;
                  line-height: 1.75;
                  color: rgba(0, 0, 0, 0.85);
                  max-width: 680px;
                }

                .article-content h2 {
                  font-family: var(--font-display);
                  font-size: 1.875rem;
                  font-weight: 700;
                  line-height: 1.25;
                  margin-top: 3rem;
                  margin-bottom: 1.25rem;
                  letter-spacing: -0.025em;
                  color: rgba(0, 0, 0, 0.95);
                  scroll-margin-top: 100px;
                }

                .article-content h3 {
                  font-family: var(--font-display);
                  font-size: 1.375rem;
                  font-weight: 700;
                  line-height: 1.35;
                  margin-top: 2.25rem;
                  margin-bottom: 0.875rem;
                  letter-spacing: -0.015em;
                  color: rgba(0, 0, 0, 0.9);
                  scroll-margin-top: 100px;
                }

                .article-content p {
                  margin-bottom: 1.5rem;
                  line-height: 1.75;
                }

                .article-content p + p {
                  margin-top: 1.5rem;
                }

                .article-content p strong {
                  font-weight: 600;
                  color: rgba(0, 0, 0, 0.95);
                }

                .article-content ul,
                .article-content ol {
                  margin: 1.75rem 0;
                  padding-left: 1.75rem;
                  line-height: 1.75;
                }

                .article-content li {
                  margin-bottom: 0.625rem;
                  padding-left: 0.375rem;
                }

                .article-content li p {
                  margin-bottom: 0.5rem;
                }

                .article-content ul {
                  list-style-type: disc;
                }

                .article-content ul li::marker {
                  color: #0E5F63;
                }

                .article-content ol {
                  list-style-type: decimal;
                }

                .article-content ol li::marker {
                  color: #0E5F63;
                  font-weight: 600;
                }

                .article-content a {
                  color: #0E5F63;
                  text-decoration: none;
                  font-weight: 500;
                  border-bottom: 1px solid rgba(14, 95, 99, 0.3);
                  transition: all 0.2s;
                }

                .article-content a:hover {
                  border-bottom-color: #0E5F63;
                  color: #0a4446;
                }

                .article-content blockquote {
                  border-left: 3px solid #0E5F63;
                  padding: 1rem 0 1rem 1.5rem;
                  margin: 2rem 0;
                  background: rgba(14, 95, 99, 0.03);
                  border-radius: 0 0.375rem 0.375rem 0;
                  font-style: normal;
                  color: rgba(0, 0, 0, 0.75);
                  font-size: 1.0625rem;
                }

                .article-content blockquote p {
                  margin-bottom: 0;
                }

                .article-content hr {
                  border: none;
                  border-top: 1px solid rgba(0, 0, 0, 0.1);
                  margin: 3rem 0;
                }

                @media (max-width: 768px) {
                  .article-content {
                    font-size: 1rem;
                    max-width: 100%;
                  }

                  .article-content h2 {
                    font-size: 1.625rem;
                    margin-top: 2.5rem;
                    margin-bottom: 1rem;
                  }

                  .article-content h3 {
                    font-size: 1.25rem;
                    margin-top: 2rem;
                    margin-bottom: 0.75rem;
                  }

                  .article-content p {
                    margin-bottom: 1.25rem;
                  }
                }
              `}</style>

              {/* CTA */}
              <div className="mt-20 p-10 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                <div className="max-w-xl">
                  <h3 className="font-display text-3xl font-bold mb-4">Ready to build your MVP?</h3>
                  <p className="text-lg text-text-active/70 mb-8 leading-relaxed">
                    Turn your idea into a production-ready application in 5 days. Fixed pricing, money-back guarantee.
                  </p>
                  <a
                    href="https://calendly.com/tonklis-vodopivec/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-4 bg-[#0E5F63] text-white rounded-xl font-semibold hover:bg-[#0E5F63]/90 transition-all hover:scale-105"
                  >
                    Schedule a Call →
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Table of Contents - Desktop Only */}
            {showTOC && (
              <aside className="hidden lg:block">
                <TableOfContents items={article.tableOfContents!} />
              </aside>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogArticlePage;
