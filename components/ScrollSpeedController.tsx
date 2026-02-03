import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ScrollSpeed = 'slow' | 'normal' | 'fast';

interface ScrollSpeedConfig {
  label: string;
  speed: number;
  smoothness: number;
  description: string;
}

const scrollConfigs: Record<ScrollSpeed, ScrollSpeedConfig> = {
  slow: {
    label: 'Slow',
    speed: 0.5,
    smoothness: 0.08,
    description: 'Cinematic, smooth scrolling'
  },
  normal: {
    label: 'Normal',
    speed: 1,
    smoothness: 0.12,
    description: 'Balanced scrolling'
  },
  fast: {
    label: 'Fast',
    speed: 1.5,
    smoothness: 0.18,
    description: 'Responsive, quick scrolling'
  }
};

/**
 * Visual UI component to let users control scroll speed
 * Shows a floating widget that can be toggled
 */
export const ScrollSpeedController: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState<ScrollSpeed>('normal');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Load saved preference
    const saved = localStorage.getItem('scroll-speed') as ScrollSpeed;
    if (saved && scrollConfigs[saved]) {
      setCurrentSpeed(saved);
    }

    // Show after a delay
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSpeedChange = (speed: ScrollSpeed) => {
    setCurrentSpeed(speed);
    localStorage.setItem('scroll-speed', speed);

    // Apply CSS scroll behavior
    const config = scrollConfigs[speed];
    document.documentElement.style.scrollBehavior =
      speed === 'normal' ? 'smooth' : 'auto';

    // Dispatch custom event for other components to listen to
    window.dispatchEvent(new CustomEvent('scrollSpeedChange', {
      detail: {
        speed: config.speed,
        smoothness: config.smoothness
      }
    }));

    setIsOpen(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-3 bg-text-active text-bg rounded-2xl shadow-2xl p-4 w-64"
          >
            <div className="mb-3">
              <p className="text-sm font-medium mb-1">Scroll Speed</p>
              <p className="text-xs opacity-70">Choose your preferred scrolling experience</p>
            </div>

            <div className="space-y-2">
              {Object.entries(scrollConfigs).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => handleSpeedChange(key as ScrollSpeed)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    currentSpeed === key
                      ? 'bg-bg text-text-active'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{config.label}</span>
                    {currentSpeed === key && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs opacity-70 mt-1">{config.description}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-text-active text-bg p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Scroll speed settings"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      </motion.button>
    </div>
  );
};
