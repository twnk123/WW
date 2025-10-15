import React, { useEffect } from 'react';

type SeoProps = {
  title?: string;
  description?: string;
  canonical?: string; // absolute or path starting with /
  image?: string;
  type?: 'website' | 'article' | 'product' | 'profile' | 'music' | 'video.other';
  jsonLd?: Record<string, any> | Record<string, any>[];
  alternates?: Array<{ hrefLang: string; href: string }>;
};

const ensureTag = (selector: string, create: () => HTMLElement) => {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el as HTMLElement;
};

const absoluteUrl = (url?: string) => {
  if (!url) return undefined;
  try {
    if (url.startsWith('http')) return url;
    const base = window.location.origin;
    return new URL(url, base).toString();
  } catch {
    return undefined;
  }
};

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  canonical,
  image,
  type = 'website',
  jsonLd,
  alternates,
}) => {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      const metaDesc = ensureTag('meta[name="description"]', () => {
        const m = document.createElement('meta');
        m.setAttribute('name', 'description');
        return m;
      });
      metaDesc.setAttribute('content', description);
    }

    const url = absoluteUrl(canonical || window.location.pathname + window.location.search);

    const setMeta = (name: string, content?: string) => {
      if (!content) return;
      const meta = ensureTag(`meta[property="${name}"]`, () => {
        const m = document.createElement('meta');
        m.setAttribute('property', name);
        return m;
      });
      meta.setAttribute('content', content);
    };

    const setNameMeta = (name: string, content?: string) => {
      if (!content) return;
      const meta = ensureTag(`meta[name="${name}"]`, () => {
        const m = document.createElement('meta');
        m.setAttribute('name', name);
        return m;
      });
      meta.setAttribute('content', content);
    };

    const linkCanonical = ensureTag('link[rel="canonical"]', () => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      return l;
    });
    if (url) linkCanonical.setAttribute('href', url);

    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:type', type);
    setMeta('og:url', url);
    setMeta('og:image', absoluteUrl(image));
    setMeta('og:site_name', 'WHITEWEAVER Studio');

    // Basic locale inference from saved language
    try {
      const savedLang = localStorage.getItem('language');
      const ogLocale = savedLang === 'sl' ? 'sl_SI' : 'en_US';
      setMeta('og:locale', ogLocale);
    } catch {}

    setNameMeta('twitter:card', image ? 'summary_large_image' : 'summary');
    setNameMeta('twitter:title', title);
    setNameMeta('twitter:description', description);
    setNameMeta('twitter:image', absoluteUrl(image));

    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(n => n.remove());
    if (alternates && alternates.length) {
      alternates.forEach(a => {
        const link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', a.hrefLang);
        link.setAttribute('href', absoluteUrl(a.href) || a.href);
        document.head.appendChild(link);
      });
    }

    document.head.querySelectorAll('script[data-jsonld="1"]').forEach(n => n.remove());
    if (jsonLd) {
      const payloads = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      payloads.forEach(obj => {
        const s = document.createElement('script');
        s.type = 'application/ld+json';
        s.setAttribute('data-jsonld', '1');
        s.text = JSON.stringify(obj);
        document.head.appendChild(s);
      });
    }
  }, [title, description, canonical, image, type, JSON.stringify(jsonLd), JSON.stringify(alternates)]);

  return null;
};

export default Seo;
