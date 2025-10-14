import React from 'react';
import Seo from '../components/Seo';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen py-24 md:py-32">
      <Seo title="Terms of Service — WHITEWEAVER Studio" description="Placeholder terms page." canonical="/terms" />
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <h1 className="font-display text-4xl md:text-5xl mb-6">Terms of Service</h1>
        <p className="text-text-active/80">These placeholder terms provide no contractual obligations; the site is presented for demonstration purposes only.</p>
      </div>
    </div>
  );
};

export default TermsPage;
