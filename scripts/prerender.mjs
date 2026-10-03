import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, resolve, dirname } from 'node:path';
import puppeteer from 'puppeteer';

const DIST = resolve('dist');
const PORT = 4173;
const ROUTES = ['/', '/about', '/services', '/quote', '/hub', '/testimonials'];

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.xml': 'application/xml', '.txt': 'text/plain',
  '.webmanifest': 'application/manifest+json', '.woff2': 'font/woff2',
};

async function main() {
  const template = await readFile(join(DIST, 'index.html'));

  const server = createServer(async (req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const ext = extname(pathname);
    const file = join(DIST, pathname);
    if (ext && file.startsWith(DIST) && existsSync(file)) {
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(await readFile(file));
    } else if (ext) {
      res.writeHead(404);
      res.end();
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(template);
    }
  });
  await new Promise((r) => server.listen(PORT, r));

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const route of ROUTES) {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (r) => {
      const u = r.url();
      if (u.includes('googletagmanager') || u.includes('google-analytics')) r.abort();
      else r.continue();
    });
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('cookieAccepted', 'true');
    });
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(
      () => (document.querySelector('main')?.children.length ?? 0) > 0,
      { timeout: 15000 }
    );

    // Reviews load from Supabase after the page mounts: wait until they are in the DOM
    if (route === '/testimonials') {
      await page.waitForSelector('[data-testimonials-ready]', { timeout: 15000 });
    }

    // Home gets a little longer so the testimonials strip can load
    await new Promise((r) => setTimeout(r, route === '/' ? 1500 : 500));

    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.querySelectorAll('script[src*="googletagmanager"]').forEach((el) => el.remove());
      // drop static index.html tags that Helmet has already replaced
      const key = (el) => el.getAttribute('property') || el.getAttribute('name') || el.getAttribute('rel');
      const tags = [...document.head.querySelectorAll('meta[name],meta[property],link[rel="canonical"]')];
      const managed = new Set(tags.filter((t) => t.hasAttribute('data-rh')).map(key));
      tags.filter((t) => !t.hasAttribute('data-rh') && managed.has(key(t))).forEach((t) => t.remove());
    });

    const out = route === '/' ? join(DIST, 'index.html') : join(DIST, route, 'index.html');
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, await page.content());
    console.log(`prerendered ${route}`);
    await page.close();
  }

  await browser.close();
  server.close();
  process.exit(0);
}

main().catch((err) => {
  console.warn('Prerender failed, shipping the plain SPA instead:', err.message);
  process.exit(0);
});
