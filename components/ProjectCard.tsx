import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Project } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  const cardVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      // FIX: Add 'as const' to prevent a TypeScript type complexity error with framer-motion's easing array.
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
    },
  };

  return (
    <motion.div variants={cardVariants}>
        <motion.div whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }} transition={{ duration: 0.22 }}>
            <Link to={`/work/${project.slug}`} className="block">
                <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden mb-4">
                    <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-between items-center text-sm mb-1">
                    <p className="bg-button-bg text-text-active px-2 py-1 rounded">{project.tag}</p>
                    <p className="text-text-active/70">{t('home.featured.viewWork')}</p>
                </div>
                <h3 className="font-display text-2xl font-medium text-text-active">{project.title}</h3>
            </Link>
        </motion.div>
    </motion.div>
  );
};

export default ProjectCard;