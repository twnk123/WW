import React from 'react';
import Seo from '../components/Seo';
import termsRaw from '../Terms.txt?raw';

const normalizeLegalText = (text: string) =>
  text
    .replace(/\r\n/g, '\n')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2014/g, '--')
    .replace(/\u2013/g, '-')
    .trim();

const TermsPage: React.FC = () => {
  const normalized = normalizeLegalText(termsRaw);
  const sections = normalized
    .split(/\n{2,}/)
    .map(section => section.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen py-24 md:py-32">
      <Seo
        title="Terms of Service | WHITEWEAVER Studio"
        description="Review the full WHITEWEAVER Studio terms and conditions covering services, payments, project scope, responsibilities, and legal notices."
        canonical="/terms"
        alternates={[
          { hrefLang: 'en', href: '/terms' },
          { hrefLang: 'x-default', href: '/terms' },
        ]}
      />
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <h1 className="font-display text-4xl md:text-5xl mb-6">Terms and Conditions</h1>
        <article className="space-y-6 text-base leading-relaxed text-text-active/80 whitespace-pre-wrap">
          {sections.map((section, index) => {
            const lines = section.split('\n');
            return (
              <p key={index} className="whitespace-pre-wrap">
                {lines.map((line, lineIndex) => (
                  <React.Fragment key={lineIndex}>
                    {line}
                    {lineIndex < lines.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            );
          })}
        </article>
      </div>
    </div>
  );
};

export default TermsPage;

