#!/usr/bin/env node
/* Measure Largest Contentful Paint (LCP) for a page using Puppeteer.
   Usage: node scripts/check_lcp.js <url>
*/
import puppeteer from 'puppeteer';

const url = process.argv[2] || 'http://localhost:3000/';

async function measureLCP(u) {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const page = await browser.newPage();
    // allow some time for client-side rendering
    await page.goto(u, { waitUntil: 'networkidle2', timeout: 30000 }).catch(() => null);
    // give the page a little extra time to produce LCP entries
    await page.waitForTimeout(1500);

    // Try to read LCP entries from the Performance Timeline
    const lcp = await page.evaluate(() => {
      try {
        const entries = performance.getEntriesByType('largest-contentful-paint') || [];
        if (!entries.length) return null;
        const last = entries[entries.length - 1];
        return {
          renderTime: last.renderTime ?? null,
          startTime: last.startTime ?? null,
          size: last.size ?? null,
          url: last.url ?? null,
          element: last.element ? (last.element.tagName + (last.element.id ? ('#' + last.element.id) : '')) : null,
        };
      } catch (e) {
        return { error: String(e) };
      }
    });

    // As a fallback, try to compute LCP from a PerformanceObserver if none present yet
    if (!lcp) {
      const observed = await page.evaluate(() => new Promise((resolve) => {
        try {
          const po = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const last = entries[entries.length - 1];
            po.disconnect();
            resolve({ renderTime: last?.renderTime ?? null, startTime: last?.startTime ?? null, size: last?.size ?? null, url: last?.url ?? null });
          });
          po.observe({ type: 'largest-contentful-paint', buffered: true });
          // wait at most 2s for an entry
          setTimeout(() => { try { po.disconnect(); } catch {} ; resolve(null); }, 2000);
        } catch (e) { resolve({ error: String(e) }); }
      }));
      return observed || null;
    }

    return lcp;
  } finally {
    await browser.close();
  }
}

measureLCP(url).then((res) => {
  console.log(JSON.stringify({ url, measured_at: new Date().toISOString(), lcp: res }, null, 2));
}).catch((e) => {
  console.error('Error measuring LCP:', e);
  process.exitCode = 1;
});
