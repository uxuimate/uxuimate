import { existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const { SITE_URL } = await import('../src/constants/siteSeo.js');
const { SITEMAP_ENTRIES } = await import('../src/constants/sitemapPaths.js');

function locForPath(path) {
  if (path === '/') {
    return `${SITE_URL}/`;
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

const lastmod = new Date().toISOString().split('T')[0];

const body = SITEMAP_ENTRIES.map(
  e => `  <url>
    <loc>${locForPath(e.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

const publicPath = resolve(root, 'public', 'sitemap.xml');
const distPath = resolve(root, 'dist', 'sitemap.xml');

writeFileSync(publicPath, xml, 'utf8');

if (existsSync(resolve(root, 'dist'))) {
  writeFileSync(distPath, xml, 'utf8');
}
