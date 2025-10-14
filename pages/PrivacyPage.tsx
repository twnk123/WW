import React from 'react';
import Seo from '../components/Seo';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen py-24 md:py-32">
      <Seo title="Privacy Policy — WHITEWEAVER Studio" description="Placeholder privacy policy page." canonical="/privacy" />
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <h1 className="font-display text-4xl md:text-5xl mb-6">Privacy Policy</h1>
        <p className="text-text-active/80">This placeholder privacy page indicates no personal data collection beyond user-initiated contact.</p>
      </div>
    </div>
  );
};

export default PrivacyPage;
