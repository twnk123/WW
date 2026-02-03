/**
 * Utility functions for scroll behavior
 */

export interface ScrollToOptions {
  /** Target Y position */
  top: number;
  /** Animation duration in ms. Default: 1000 */
  duration?: number;
  /** Easing function. Default: 'easeInOutCubic' */
  easing?: EasingFunction;
  /** Callback when scroll completes */
  onComplete?: () => void;
}

export type EasingFunction =
  | 'linear'
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic';

const easingFunctions: Record<EasingFunction, (t: number) => number> = {
  linear: (t) => t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => --t * t * t + 1,
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
};

/**
 * Smooth scroll to a specific position
 */
export const smoothScrollTo = (options: ScrollToOptions): void => {
  const {
    top,
    duration = 1000,
    easing = 'easeInOutCubic',
    onComplete
  } = options;

  const start = window.scrollY;
  const distance = top - start;
  const startTime = performance.now();
  const easingFn = easingFunctions[easing];

  const scroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easingFn(progress);

    window.scrollTo(0, start + distance * easeProgress);

    if (progress < 1) {
      requestAnimationFrame(scroll);
    } else {
      onComplete?.();
    }
  };

  requestAnimationFrame(scroll);
};

/**
 * Scroll to an element smoothly
 */
export const scrollToElement = (
  element: HTMLElement | string,
  offset: number = 0,
  duration: number = 1000
): void => {
  const target = typeof element === 'string'
    ? document.querySelector(element) as HTMLElement
    : element;

  if (!target) {
    console.warn('Scroll target not found:', element);
    return;
  }

  const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

  smoothScrollTo({
    top: targetPosition,
    duration,
    easing: 'easeInOutCubic'
  });
};

/**
 * Get current scroll progress (0 to 1)
 */
export const getScrollProgress = (): number => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return docHeight > 0 ? scrollTop / docHeight : 0;
};

/**
 * Lock scroll (useful for modals)
 */
export const lockScroll = (): void => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollbarWidth}px`;
};

/**
 * Unlock scroll
 */
export const unlockScroll = (): void => {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};

/**
 * Detect scroll direction
 */
let lastScrollY = 0;
export const getScrollDirection = (): 'up' | 'down' | null => {
  const currentScrollY = window.scrollY;

  if (currentScrollY === lastScrollY) return null;

  const direction = currentScrollY > lastScrollY ? 'down' : 'up';
  lastScrollY = currentScrollY;

  return direction;
};

/**
 * Throttle scroll events
 */
export const throttleScroll = (callback: () => void, delay: number = 100): (() => void) => {
  let timeoutId: number | null = null;
  let lastRan = 0;

  return () => {
    const now = Date.now();

    if (now - lastRan >= delay) {
      callback();
      lastRan = now;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback();
        lastRan = Date.now();
      }, delay - (now - lastRan));
    }
  };
};

/**
 * Check if element is in viewport
 */
export const isInViewport = (element: HTMLElement, offset: number = 0): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -offset &&
    rect.left >= -offset &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
  );
};
