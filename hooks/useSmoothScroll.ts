import { useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for smooth scroll behavior
 * @param options Configuration options for smooth scrolling
 */
interface SmoothScrollOptions {
  /** Enable/disable smooth scrolling. Default: true */
  enabled?: boolean;
  /** Scroll speed multiplier (0.1 = slow, 1 = normal, 2 = fast). Default: 1 */
  speed?: number;
  /** Smoothness factor (0-1, higher = smoother but heavier). Default: 0.1 */
  smoothness?: number;
  /** Enable momentum scrolling. Default: false */
  momentum?: boolean;
}

export const useSmoothScroll = (options: SmoothScrollOptions = {}) => {
  const {
    enabled = true,
    speed = 1,
    smoothness = 0.1,
    momentum = false
  } = options;

  const currentScrollY = useRef(0);
  const targetScrollY = useRef(0);
  const rafId = useRef<number | null>(null);
  const velocity = useRef(0);
  const isScrolling = useRef(false);

  const lerp = useCallback((start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  }, []);

  const updateScroll = useCallback(() => {
    if (!enabled) {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      return;
    }

    const diff = targetScrollY.current - currentScrollY.current;
    const distance = Math.abs(diff);

    // Stop animating if we're very close to target
    if (distance < 0.5) {
      currentScrollY.current = targetScrollY.current;
      window.scrollTo(0, currentScrollY.current);
      isScrolling.current = false;
      return;
    }

    // Apply momentum if enabled
    if (momentum) {
      velocity.current = lerp(velocity.current, diff * 0.05, smoothness);
      currentScrollY.current += velocity.current;
    } else {
      currentScrollY.current = lerp(currentScrollY.current, targetScrollY.current, smoothness);
    }

    window.scrollTo(0, currentScrollY.current);
    isScrolling.current = true;

    rafId.current = requestAnimationFrame(updateScroll);
  }, [enabled, smoothness, momentum, lerp]);

  useEffect(() => {
    if (!enabled) return;

    let ticking = false;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const delta = e.deltaY * speed;
      targetScrollY.current += delta;

      // Clamp to valid scroll range
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollY.current = Math.max(0, Math.min(targetScrollY.current, maxScroll));

      if (!ticking) {
        ticking = true;
        if (!isScrolling.current) {
          updateScroll();
        }
      }

      setTimeout(() => { ticking = false; }, 100);
    };

    const handleTouchStart = () => {
      targetScrollY.current = window.scrollY;
      currentScrollY.current = window.scrollY;
    };

    const handleResize = () => {
      currentScrollY.current = window.scrollY;
      targetScrollY.current = window.scrollY;
    };

    // Initialize
    currentScrollY.current = window.scrollY;
    targetScrollY.current = window.scrollY;

    // Add listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('resize', handleResize);

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [enabled, speed, updateScroll]);

  return {
    currentScroll: currentScrollY.current,
    targetScroll: targetScrollY.current,
    isScrolling: isScrolling.current
  };
};
