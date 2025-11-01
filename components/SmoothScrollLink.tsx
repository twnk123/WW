import React from 'react';
import { scrollToElement } from '../utils/scrollUtils';

interface SmoothScrollLinkProps {
  /** Target element ID (with or without #) */
  to: string;
  /** Offset from top in pixels. Default: 100 */
  offset?: number;
  /** Animation duration in ms. Default: 1000 */
  duration?: number;
  /** Link children */
  children: React.ReactNode;
  /** Additional class names */
  className?: string;
  /** Click callback */
  onClick?: () => void;
}

/**
 * Link component that smoothly scrolls to an element on the page
 * Usage: <SmoothScrollLink to="#features">View Features</SmoothScrollLink>
 */
export const SmoothScrollLink: React.FC<SmoothScrollLinkProps> = ({
  to,
  offset = 100,
  duration = 1000,
  children,
  className = '',
  onClick
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const targetId = to.startsWith('#') ? to : `#${to}`;
    scrollToElement(targetId, offset, duration);

    onClick?.();
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
};
