import React from 'react';
import Seo from '../components/Seo';
import privacyRaw from '../Privacy.txt?raw';

const normalizeLegalText = (text: string) =>
  text
    .replace(/\r\n/g, '\n')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2014/g, '--')
    .replace(/\u2013/g, '-')
    .trim();

const PrivacyPage: React.FC = () => {
  const normalized = normalizeLegalText(privacyRaw);
  const sections = normalized
    .split(/\n{2,}/)
    .map(section => section.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen py-24 md:py-32">
      <Seo
        title="Privacy Policy | WHITEWEAVER Studio"
        description="Understand how WHITEWEAVER Studio collects, uses, and protects personal data in line with GDPR and EU regulations."
        canonical="/privacy"
        alternates={[
          { hrefLang: 'en', href: '/privacy' },
          { hrefLang: 'x-default', href: '/privacy' },
        ]}
      />
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <h1 className="font-display text-4xl md:text-5xl mb-6">Privacy Policy</h1>
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

export default PrivacyPage;

