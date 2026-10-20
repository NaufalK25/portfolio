// Write real HTML for every route after `vite build` + `vite build --ssr`:
// dist/index.html, dist/work/<slug>/index.html, dist/404.html, sitemap.xml, robots.txt.
// Each page gets its own title, description, canonical, Open Graph and JSON-LD.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
const ssr = path.resolve('dist-ssr');
const { render, projects, site } = await import(pathToFileURL(path.join(ssr, 'entry-server.js')).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const json = o => JSON.stringify(o).replace(/</g, '\\u003c');

const person = {
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  sameAs: ['https://github.com/NaufalK25', 'https://www.linkedin.com/in/muhammad-naufal-kateni/', 'https://x.com/NaufalK2511']
};

function head(route, meta) {
  const url = `${site.url}${route === '/' ? '/' : route}`;
  const ld =
    meta.kind === 'project'
      ? {
          '@context': 'https://schema.org',
          '@type': 'SoftwareSourceCode',
          name: meta.project.name,
          description: meta.project.description,
          codeRepository: meta.project.repo,
          programmingLanguage: meta.project.stacks,
          dateCreated: meta.project.created,
          author: person
        }
      : { '@context': 'https://schema.org', ...person };
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    meta.kind === '404' ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${meta.kind === 'project' ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${site.url}/og.png" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${esc(`${site.name}, ${site.role}`)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${site.url}/og.png" />`,
    meta.kind === '404' ? '' : `<script type="application/ld+json">${json(ld)}</script>`
  ];
  return tags.filter(Boolean).join('\n    ');
}

function write(route, file) {
  const { html, meta } = render(route);
  const page = template.replace('<!--head-->', head(route, meta)).replace('<!--app-html-->', html);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page);
  return meta;
}

const routes = ['/', ...projects.map(p => `/work/${p.slug}`)];
for (const r of routes) write(r, path.join(dist, r, 'index.html'));
write('/404', path.join(dist, '404.html'));

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map(r => `  <url><loc>${site.url}${r}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`
);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
fs.rmSync(ssr, { recursive: true, force: true });
console.log(`prerender: ${routes.length} routes + 404.html, sitemap.xml, robots.txt`);
