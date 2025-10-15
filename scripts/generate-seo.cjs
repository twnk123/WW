const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SRC_PROJECTS = path.join(ROOT, 'data', 'projects.ts');

const SITE_URL = process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://whiteweaver.com';

function getSlugs() {
  try {
    const src = fs.readFileSync(SRC_PROJECTS, 'utf8');
    const matches = [...src.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);
    return Array.from(new Set(matches));
  } catch (e) {
    return [];
  }
}

function writeSitemap() {
  const slugs = getSlugs();
  const pages = ['/', '/work', '/services', '/diy', '/plans', '/about', '/contact', '/privacy', '/terms'];
  const projectUrls = slugs.map(s => `/work/${s}`);
  const urls = [...pages, ...projectUrls];
  // Include Slovenian variants using query param ?lang=sl
  const slUrls = urls.map(u => `${u}${u.includes('?') ? '&' : '?'}lang=sl`);
  const allUrls = [...urls, ...slUrls];
  const now = new Date().toISOString();
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    allUrls.map(u => `  <url><loc>${SITE_URL.replace(/\/$/, '')}${u}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join('\n') +
    `\n</urlset>`;
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), body, 'utf8');
}

function writeRobots() {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL.replace(/\/$/, '')}/sitemap.xml\n`;
  fs.writeFileSync(path.join(DIST, 'robots.txt'), body, 'utf8');
}

if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });
writeSitemap();
writeRobots();
console.log('Generated dist/sitemap.xml and dist/robots.txt');
