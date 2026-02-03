import React from 'react';
import { motion, useInView, useReducedMotion, Variants } from 'framer-motion';

type AnimatedTextProps = {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
  // Control the animation unit. "word" keeps normal spacing,
  // "char" animates each character without forcing extra spaces.
  by?: 'word' | 'char';
};

// FIX: To prevent a TypeScript complexity error, variants are defined outside the component.
// The complex nested transition for the `color` property was causing the type inference to become
// too complex. It has been removed to simplify the type. The color will still animate
// with the parent's transition settings.
const wordVariants: Variants = {
  hidden: {
    y: 30,
    opacity: 0,
    color: 'var(--text-inactive)',
  },
  visible: {
    y: 0,
    opacity: 1,
    color: 'var(--text-active)',
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const reducedMotionWordVariants: Variants = {
  ...wordVariants,
  hidden: {
    y: 0,
    opacity: 1,
    color: 'var(--text-inactive)',
  },
};

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  el: Wrapper = 'p',
  className,
  once = true,
  by = 'word',
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once });
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: by === 'char' ? 0.04 : 0.08,
      },
    },
  };

  // FIX: Assigning the variants to a variable before using it in JSX helps TypeScript
  // avoid a "type too complex" error with framer-motion's complex types.
  const currentWordVariants = shouldReduceMotion ? reducedMotionWordVariants : wordVariants;

  // FIX: Pre-calculating the list of word elements helps simplify type inference within the JSX tree,
  // preventing a "type too complex" error from TypeScript.
  const content = by === 'word'
    ? text.split(' ').map((word, i) => (
        <motion.span key={i} variants={currentWordVariants} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))
    : Array.from(text).map((ch, i) => {
        if (ch === ' ') {
          return <span key={i} className="inline-block">&nbsp;</span>;
        }
        return (
          <motion.span key={i} variants={currentWordVariants} className="inline-block">
            {ch}
          </motion.span>
        );
      });

  // FIX: By creating the animated content as a separate element, we can simplify the JSX tree
  // that TypeScript needs to analyze. Attaching the `ref` here instead of on the dynamic `Wrapper`
  // component avoids a "type too complex" error.
  const animatedContent = (
    <motion.span
      ref={ref}
      aria-hidden
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {content}
    </motion.span>
  );

  return (
    <Wrapper className={className}>
      <span className="sr-only">{text}</span>
      {animatedContent}
    </Wrapper>
  );
};

export default AnimatedText;
