import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { gzipSync } from 'node:zlib';
const root = resolve('dist');
async function walk(dir) { return (await Promise.all((await readdir(dir,{withFileTypes:true})).map(e => e.isDirectory() ? walk(resolve(dir,e.name)) : resolve(dir,e.name)))).flat(); }
const files = await walk(root);
const htmlFiles = files.filter(f => f.endsWith('.html'));
if (htmlFiles.length < 30) throw new Error(`Incomplete exhibition: only ${htmlFiles.length} HTML files`);
const site = new URL(process.env.SITE_URL || 'http://localhost:18775');
const media = JSON.parse(await readFile('src/data/media.json','utf8'));
const features = JSON.parse(await readFile('src/data/features.json','utf8'));
const collections = JSON.parse(await readFile('src/data/collections.json','utf8'));
const knownMedia = new Set(media.flatMap(m => m.variants.map(v => `/media/${v.path}`)));
const htmlByPath = new Map();
for (const file of htmlFiles) htmlByPath.set(file, await readFile(file,'utf8'));
for (const locale of ['en','pt-br']) {
  for (const path of [`/${locale}/stories/index.html`, `/${locale}/collections/index.html`, ...features.map(feature => `/${locale}/stories/${feature.id}/index.html`), ...collections.map(collection => `/${locale}/collections/${collection.id}/index.html`)]) {
    if (![...htmlByPath.keys()].some(file => file === resolve(root, `.${path}`))) throw new Error(`Missing living archive route: ${path}`);
  }
}
function attr(tag,name) { return tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`,'i'))?.[1]; }
function localFile(url) {
  const path = decodeURIComponent(url.pathname);
  return resolve(root, `.${path.endsWith('/') ? path+'index.html' : path}`);
}
let checkedLinks = 0;
for (const [file, html] of htmlByPath) {
  const path = '/'+relative(root,file).replace(/index\.html$/,'');
  const page = new URL(path,site);
  if (/(?:\/Users\/|\/home\/|file:\/\/|data:image\/|family_history_catalog|leo family history)/i.test(html)) throw new Error(`Private data in ${path}`);
  if (/[↗↖↑]/.test(html)) throw new Error(`Unwanted arrow in ${path}`);
  if ((path.startsWith('/en/') || path.startsWith('/pt-br/'))) {
    const expected = path.startsWith('/en/') ? 'en' : 'pt-BR';
    if (attr(html.match(/<html\b[^>]*>/i)?.[0] || '', 'lang')?.toLowerCase() !== expected.toLowerCase()) throw new Error(`Wrong page language: ${path}`);
    if ((html.match(/<h1\b/g) || []).length !== 1) throw new Error(`Expected one page heading: ${path}`);
    if (!/rel="canonical"/.test(html) || !/hreflang="en"/.test(html) || !/hreflang="pt-BR"/i.test(html)) throw new Error(`Missing equivalent metadata: ${path}`);
    if ((process.env.PUBLICATION_MODE || 'preview') === 'preview' && !/content="noindex[^"']*/.test(html)) throw new Error(`Preview is indexable: ${path}`);
  }
  for (const match of html.matchAll(/<(?:a|link|script|img|source)\b[^>]*>/gi)) {
    const tag = match[0];
    for (const raw of [attr(tag,'href'),attr(tag,'src'),...(attr(tag,'srcset') || '').split(',').map(s => s.trim().split(/\s+/)[0])].filter(Boolean)) {
      const url = new URL(raw.replaceAll('&amp;','&'),page);
      if (url.origin !== site.origin || !['http:','https:'].includes(url.protocol)) continue;
      if (url.pathname.startsWith('/media/')) {
        if (!knownMedia.has(url.pathname)) throw new Error(`Unknown media URL in ${path}: ${raw}`);
        continue;
      }
      const target = localFile(url);
      if (!target.startsWith(root+'/')) throw new Error(`Unsafe output link: ${raw}`);
      let info;
      try { info = await stat(target); } catch { throw new Error(`Broken link in ${path}: ${raw}`); }
      if (!info.isFile()) throw new Error(`Not a file in ${path}: ${raw}`);
      if (url.hash && target.endsWith('.html')) {
        const linked = htmlByPath.get(target) || await readFile(target,'utf8');
        const id = decodeURIComponent(url.hash.slice(1));
        if (!linked.includes(`id="${id}"`)) throw new Error(`Broken fragment in ${path}: ${raw}`);
      }
      checkedLinks++;
    }
  }
}
const mediaFiles = files.filter(f => /\.(?:jpe?g|webp|avif|png|tiff|pdf|mp4)$/i.test(f));
if (mediaFiles.length) throw new Error('Archive media was bundled into site output');
const jsBytes = (await Promise.all(files.filter(f => f.endsWith('.js')).map(async f => gzipSync(await readFile(f)).length))).reduce((a,b) => a+b,0);
if (jsBytes > 100_000) throw new Error(`JavaScript exceeds compressed budget: ${jsBytes} bytes`);
console.log(`Verified ${htmlFiles.length} pages, ${checkedLinks} local links, ${jsBytes} bytes gzip JavaScript; no bundled archive media.`);
