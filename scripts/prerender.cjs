const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const puppeteer = require('puppeteer');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const VITE_BIN = path.join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js');
const PORT = 4199;

function getProjectSlugs() {
  try {
    const src = fs.readFileSync(path.join(ROOT, 'data', 'projects.ts'), 'utf8');
    const slugs = [...src.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);
    return Array.from(new Set(slugs));
  } catch {
    return [];
  }
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

async function saveHTML(browser, baseUrl, route, siteUrl) {
  const page = await browser.newPage();
  const url = baseUrl + route;
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  let html = await page.content();
  if (siteUrl && siteUrl !== baseUrl) {
    html = html.split(baseUrl).join(siteUrl.replace(/\/$/, ''));
  }
  let outPath;
  if (route === '/') {
    outPath = path.join(DIST, 'index.html');
  } else {
    const folder = path.join(DIST, route.replace(/^\//, ''));
    ensureDir(folder);
    outPath = path.join(folder, 'index.html');
  }
  fs.writeFileSync(outPath, html, 'utf8');
  await page.close();
  console.log('Prerendered', route);
}

async function main() {
  const preview = spawn(process.execPath, [VITE_BIN, 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  await new Promise((resolve, reject) => {
    const onData = (data) => {
      const s = String(data);
      if (s.includes('Local:')) resolve();
    };
    preview.stdout.on('data', onData);
    preview.stderr.on('data', (d) => process.stderr.write(d));
    setTimeout(() => reject(new Error('vite preview did not start in time')), 15000);
  }).catch((e) => {
    console.error(e);
  });

  const baseUrl = `http://localhost:${PORT}`;
  const siteUrl = process.env.SITE_URL || process.env.VITE_SITE_URL || '';
  const routes = ['/', '/work', '/services', '/diy', '/plans', '/about', '/contact', '/privacy', '/terms'];
  const slugs = getProjectSlugs();
  slugs.forEach((s) => routes.push(`/work/${s}`));

  const browser = await puppeteer.launch({ headless: 'new' });
  for (const r of routes) {
    try {
      await saveHTML(browser, baseUrl, r, siteUrl);
    } catch (e) {
      console.error('Failed to prerender', r, e);
    }
  }
  await browser.close();

  preview.kill();
  console.log('Prerender complete.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
