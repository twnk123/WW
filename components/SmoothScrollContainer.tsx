import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform, useScroll } from 'framer-motion';

interface SmoothScrollContainerProps {
  children: React.ReactNode;
  /** Enable smooth scrolling. Default: true */
  enabled?: boolean;
  /** Scroll speed (0.5 = slow, 1 = normal, 2 = fast). Default: 1 */
  speed?: number;
  /** Spring stiffness (higher = snappier). Default: 100 */
  stiffness?: number;
  /** Spring damping (higher = less bounce). Default: 20 */
  damping?: number;
  /** Spring mass (higher = heavier feel). Default: 0.5 */
  mass?: number;
}

/**
 * Container component that provides smooth scrolling using Framer Motion springs
 * NOTE: This approach uses transform which can cause issues with fixed positioning
 * Use CSS scroll-behavior for simpler implementation
 */
export const SmoothScrollContainer: React.FC<SmoothScrollContainerProps> = ({
  children,
  enabled = true,
  speed = 1,
  stiffness = 100,
  damping = 20,
  mass = 0.5
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const { scrollY } = useScroll();

  const smoothY = useSpring(scrollY, {
    stiffness,
    damping,
    mass
  });

  const y = useTransform(smoothY, (value) => {
    return enabled ? -value * speed : -scrollY.get();
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateHeight = () => {
      if (containerRef.current) {
        setContentHeight(containerRef.current.scrollHeight);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [children]);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Spacer to maintain scroll height */}
      <div style={{ height: contentHeight }} />

      {/* Fixed container with smooth transform */}
      <motion.div
        ref={containerRef}
        style={{
          y,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          willChange: 'transform'
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
