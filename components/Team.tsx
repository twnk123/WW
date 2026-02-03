import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { teamMembers } from '../data/teamMembers';
import ScrollReveal from './ScrollReveal';

const Team: React.FC = () => {
  const [expandedBios, setExpandedBios] = useState<Record<string, boolean>>({});

  const toggleBio = (name: string) => {
    setExpandedBios(prev => ({ ...prev, [name]: !prev[name] }));
  };

  // Separate leadership from engineers
  const leadership = teamMembers.filter(member => member.order <= 2).sort((a, b) => a.order - b.order);
  const engineers = teamMembers.filter(member => member.order > 2).sort((a, b) => a.order - b.order);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <ScrollReveal>
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight mb-4 text-center">
            Meet the Team
          </h2>
          <p className="text-lg text-text-active/70 text-center mb-12 max-w-2xl mx-auto">
            Strategy, design, and engineering expertise to turn your idea into a profitable product
          </p>
        </ScrollReveal>

        {/* Leadership - Larger Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {leadership.map((member, index) => (
            <ScrollReveal key={member.name} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="relative group bg-white p-8 rounded-2xl border border-line hover:border-[#0E5F63] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0E5F63]/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />

                <div className="relative">
                  {/* Larger Circular Image for Leadership */}
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-4 mx-auto">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const initials = member.name.split(' ').map(n => n[0]).join('');
                        e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96"%3E%3Ccircle fill="%230E5F63" cx="48" cy="48" r="48"/%3E%3Ctext fill="white" font-size="36" font-weight="600" font-family="system-ui" x="50%25" y="50%25" text-anchor="middle" dy=".35em"%3E${initials}%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                  </div>

                  {/* Name & Role */}
                  <h3 className="font-display text-xl font-semibold mb-1 text-text-active text-center">
                    {member.name}
                  </h3>
                  <p className="text-[#0E5F63] font-medium text-sm mb-4 text-center">
                    {member.role}
                  </p>

                  {/* Bio - Expandable */}
                  <div className="relative">
                    <p className={`text-text-active/70 text-sm leading-relaxed ${!expandedBios[member.name] ? 'line-clamp-3' : ''}`}>
                      {member.bio}
                    </p>
                    {member.bio.length > 150 && (
                      <button
                        onClick={() => toggleBio(member.name)}
                        className="text-[#0E5F63] hover:text-[#0E5F63]/80 text-xs font-medium mt-2 transition-colors"
                      >
                        {expandedBios[member.name] ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </div>

                  {/* LinkedIn Link */}
                  {member.linkedIn && (
                    <a
                      href={member.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#0E5F63] hover:text-[#0E5F63]/80 transition-colors mt-4 text-xs justify-center w-full"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      Connect on LinkedIn
                    </a>
                  )}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Engineers - Smaller Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {engineers.map((member, index) => (
            <ScrollReveal key={member.name} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="relative group bg-white p-6 rounded-2xl border border-line hover:border-[#0E5F63] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0E5F63]/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />

                <div className="relative">
                  {/* Medium Circular Image for Engineers */}
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 mb-4 mx-auto">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const initials = member.name.split(' ').map(n => n[0]).join('');
                        e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Ccircle fill="%230E5F63" cx="40" cy="40" r="40"/%3E%3Ctext fill="white" font-size="30" font-weight="600" font-family="system-ui" x="50%25" y="50%25" text-anchor="middle" dy=".35em"%3E${initials}%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                  </div>

                  {/* Name & Role */}
                  <h4 className="font-display text-lg font-semibold mb-1 text-text-active text-center">
                    {member.name}
                  </h4>
                  <p className="text-[#0E5F63] font-medium text-xs mb-3 text-center">
                    {member.role}
                  </p>

                  {/* Bio - Expandable */}
                  <div className="relative">
                    <p className={`text-text-active/70 text-sm leading-relaxed ${!expandedBios[member.name] ? 'line-clamp-4' : ''}`}>
                      {member.bio}
                    </p>
                    {member.bio.length > 120 && (
                      <button
                        onClick={() => toggleBio(member.name)}
                        className="text-[#0E5F63] hover:text-[#0E5F63]/80 text-xs font-medium mt-2 transition-colors block w-full text-center"
                      >
                        {expandedBios[member.name] ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </div>

                  {/* LinkedIn Link */}
                  {member.linkedIn && (
                    <a
                      href={member.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#0E5F63] hover:text-[#0E5F63]/80 transition-colors mt-4 text-xs justify-center w-full"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      Connect on LinkedIn
                    </a>
                  )}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
