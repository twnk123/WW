import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FAQ } from '../types';

interface AccordionProps {
  items: FAQ[];
}

const AccordionItem: React.FC<{
  item: FAQ;
  isOpen: boolean;
  onClick: () => void;
}> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-line py-6">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-lg font-medium">{item.question}</h3>
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            // FIX: Add 'as const' to prevent a TypeScript type complexity error with framer-motion's easing array.
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-text-active/80">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          isOpen={index === openIndex}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;