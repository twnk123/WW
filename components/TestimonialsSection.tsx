import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../data/testimonials';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-8">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <div className="p-6 rounded-lg border border-line bg-button-bg">
              <div className="flex items-center gap-3 mb-4">
                <img src={t.avatar} alt={`${t.author} avatar`} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-medium">{t.author}</p>
                  <p className="text-sm text-text-active/70">{t.company}</p>
                </div>
              </div>
              <p className="text-text-active/90">“{t.quote}”</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;

