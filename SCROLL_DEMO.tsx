/**
 * SCROLL FEATURES DEMO PAGE
 *
 * This is a demo page showcasing all scroll features.
 * You can add this as a route to test all scroll capabilities.
 *
 * To use:
 * 1. Import in App.tsx: const ScrollDemo = lazy(() => import('./SCROLL_DEMO'));
 * 2. Add route: <Route path="/scroll-demo" element={<ScrollDemo />} />
 * 3. Visit: http://localhost:3000/scroll-demo
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SmoothScrollLink } from './components/SmoothScrollLink';
import { scrollToElement, getScrollProgress, smoothScrollTo } from './utils/scrollUtils';
import { ScrollProgress } from './components/ScrollProgress';
import { ScrollSpeedController } from './components/ScrollSpeedController';

const ScrollDemo: React.FC = () => {
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setProgress(getScrollProgress() * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text-active">
      {/* Scroll Progress Bar */}
      <ScrollProgress color="#3f4144" height={4} />

      {/* Optional Speed Controller */}
      <ScrollSpeedController />

      {/* Hero Section */}
      <section id="top" className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-display font-bold mb-6"
          >
            Smooth Scroll Demo
          </motion.h1>
          <p className="text-xl text-text-active/70 mb-8">
            Testing all scroll features and animations
          </p>

          {/* Quick Navigation */}
          <div className="flex flex-wrap gap-4 justify-center">
            <SmoothScrollLink
              to="#features"
              className="px-6 py-3 bg-text-active text-bg rounded-full hover:scale-105 transition-transform"
            >
              View Features
            </SmoothScrollLink>
            <SmoothScrollLink
              to="#animations"
              duration={1500}
              className="px-6 py-3 border border-text-active rounded-full hover:scale-105 transition-transform"
            >
              See Animations
            </SmoothScrollLink>
            <SmoothScrollLink
              to="#bottom"
              offset={0}
              duration={2000}
              className="px-6 py-3 border border-text-active rounded-full hover:scale-105 transition-transform"
            >
              Jump to Bottom
            </SmoothScrollLink>
          </div>

          {/* Scroll Progress Display */}
          <div className="mt-12 p-6 bg-button-bg rounded-2xl">
            <p className="text-sm text-text-active/60 mb-2">Scroll Progress</p>
            <div className="text-4xl font-display font-bold">
              {progress.toFixed(1)}%
            </div>
            <div className="mt-4 h-2 bg-line rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-text-active"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="min-h-screen flex items-center justify-center px-6 bg-button-bg">
        <div className="max-w-4xl">
          <h2 className="text-5xl font-display font-bold mb-12 text-center">
            Scroll Features
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'CSS Smooth Scroll',
                description: 'Native browser smooth scrolling with scroll-behavior: smooth',
                icon: '🎯'
              },
              {
                title: 'Scroll Progress',
                description: 'Visual indicator at the top showing scroll position',
                icon: '📊'
              },
              {
                title: 'Scroll to Top',
                description: 'Animated button appears after scrolling 400px',
                icon: '⬆️'
              },
              {
                title: 'Custom Scrollbar',
                description: 'Styled scrollbar matching your brand colors',
                icon: '🎨'
              },
              {
                title: 'Smooth Links',
                description: 'Anchor links with custom easing and duration',
                icon: '🔗'
              },
              {
                title: 'Speed Control',
                description: 'Optional widget to adjust scroll speed',
                icon: '⚡'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-bg rounded-2xl"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-display font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-active/70">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Programmatic Scroll Examples */}
          <div className="mt-12 p-8 bg-bg rounded-2xl">
            <h3 className="text-2xl font-display font-bold mb-6">
              Programmatic Scrolling
            </h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => smoothScrollTo({ top: 0, duration: 1000 })}
                className="px-6 py-3 bg-text-active text-bg rounded-full hover:scale-105 transition-transform"
              >
                Scroll to Top (Fast)
              </button>
              <button
                onClick={() => smoothScrollTo({ top: document.body.scrollHeight, duration: 2000 })}
                className="px-6 py-3 bg-text-active text-bg rounded-full hover:scale-105 transition-transform"
              >
                Scroll to Bottom (Slow)
              </button>
              <button
                onClick={() => scrollToElement('#animations', 100, 1500)}
                className="px-6 py-3 border border-text-active rounded-full hover:scale-105 transition-transform"
              >
                Go to Animations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Animations Section */}
      <section id="animations" className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl">
          <h2 className="text-5xl font-display font-bold mb-12 text-center">
            Scroll Animations
          </h2>

          <div className="space-y-32">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                className="p-12 bg-button-bg rounded-2xl"
              >
                <h3 className="text-3xl font-display font-bold mb-4">
                  Animation Block {i + 1}
                </h3>
                <p className="text-text-active/70 text-lg">
                  This element animates as you scroll. Try scrolling up and down to see
                  the animation trigger multiple times (once: false).
                </p>
                <div className="mt-6 h-2 bg-line rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-text-active"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section id="bottom" className="min-h-screen flex items-center justify-center px-6 bg-button-bg">
        <div className="max-w-4xl text-center">
          <h2 className="text-5xl font-display font-bold mb-6">
            You Made It! 🎉
          </h2>
          <p className="text-xl text-text-active/70 mb-8">
            Notice the scroll-to-top button in the bottom-left corner?
          </p>

          <div className="space-y-6">
            <SmoothScrollLink
              to="#top"
              className="inline-block px-8 py-4 bg-text-active text-bg rounded-full hover:scale-105 transition-transform text-lg"
            >
              Back to Top
            </SmoothScrollLink>

            <div className="p-6 bg-bg rounded-2xl">
              <h3 className="text-2xl font-display font-bold mb-4">
                Implementation Notes
              </h3>
              <ul className="text-left space-y-2 text-text-active/70">
                <li>✅ CSS smooth scrolling active</li>
                <li>✅ Custom scrollbar styled</li>
                <li>✅ Scroll-to-top button functional</li>
                <li>✅ Scroll progress bar visible</li>
                <li>✅ Reduced motion support</li>
                <li>✅ Mobile-friendly</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollDemo;
