import React from 'react';
import Seo from '../components/Seo';

const ImprintPage: React.FC = () => {
  return (
    <div className="min-h-screen py-24 md:py-32">
      <Seo
        title="Imprint — WHITEWEAVER Studio"
        description="Placeholder legal notice page."
        canonical="/imprint"
        alternates={[
          { hrefLang: 'en', href: '/imprint' },
          { hrefLang: 'sl', href: '/imprint?lang=sl' },
          { hrefLang: 'x-default', href: '/imprint' },
        ]}
      />
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <h1 className="font-display text-4xl md:text-5xl mb-6">Imprint</h1>
        <p className="text-text-active/80">This placeholder legal notice provides basic ownership identification without company-specific details.</p>
      </div>
    </div>
  );
};

export default ImprintPage;
