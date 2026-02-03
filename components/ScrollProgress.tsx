import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressProps {
  /** Color of the progress bar. Default: 'currentColor' */
  color?: string;
  /** Height of the progress bar in pixels. Default: 3 */
  height?: number;
  /** Position of the bar. Default: 'top' */
  position?: 'top' | 'bottom';
  /** Z-index of the bar. Default: 100 */
  zIndex?: number;
}

/**
 * Animated scroll progress indicator
 * Shows how far down the page the user has scrolled
 */
export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  color = 'currentColor',
  height = 3,
  position = 'top',
  zIndex = 100
}) => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{
        scaleX,
        backgroundColor: color,
        height: `${height}px`,
        position: 'fixed',
        [position]: 0,
        left: 0,
        right: 0,
        transformOrigin: '0%',
        zIndex
      }}
    />
  );
};
