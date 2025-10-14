// Create a 404.html as a copy of index.html so GitHub Pages
// can serve the SPA bundle on deep links when not using HashRouter.
// Safe no-op for HashRouter; keeps future options open.

const fs = require('fs');
const path = require('path');

const distDir = path.resolve(process.cwd(), 'dist');
const indexPath = path.join(distDir, 'index.html');
const notFoundPath = path.join(distDir, '404.html');

try {
  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, notFoundPath);
    console.log('Created dist/404.html for GitHub Pages fallback');
  } else {
    console.warn('dist/index.html not found; skipping 404.html creation');
  }
} catch (err) {
  console.error('Failed to create 404.html:', err);
  process.exitCode = 1;
}

