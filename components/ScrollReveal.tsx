import React from 'react';
import { motion, useInView, useReducedMotion, Variants } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, className, delay = 0, once = true }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        // FIX: Add 'as const' to prevent a TypeScript type complexity error with framer-motion's easing array.
        ease: [0.22, 1, 0.36, 1] as const,
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;