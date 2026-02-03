import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogArticles, BlogArticle } from '../data/blogArticles';

interface RelatedArticlesProps {
  articleSlugs: string[];
  currentSlug: string;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articleSlugs, currentSlug }) => {
  const relatedArticles = articleSlugs
    .map(slug => blogArticles.find(a => a.slug === slug))
    .filter((a): a is BlogArticle => a !== undefined && a.slug !== currentSlug);

  if (relatedArticles.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-gray-100">
      <h3 className="font-display text-2xl font-bold mb-8">Related Articles</h3>
      <div className="grid gap-6">
        {relatedArticles.map((article) => (
          <Link key={article.slug} to={`/blog/${article.slug}`}>
            <motion.div
              className="group p-6 rounded-xl border border-gray-100 hover:border-[#0E5F63]/20 hover:shadow-lg transition-all bg-white"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start gap-4">
                {article.isPillar && (
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#0E5F63]/10 text-[#0E5F63] uppercase tracking-wider">
                    Pillar
                  </span>
                )}
                <div className="flex-1">
                  <h4 className="font-display text-lg font-bold mb-2 group-hover:text-[#0E5F63] transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-sm text-text-active/70 mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-text-active/50">
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span>{article.category}</span>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-[#0E5F63] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
