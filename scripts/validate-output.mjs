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
const historyMedia = JSON.parse(await readFile('src/data/history-media.json','utf8'));
const features = JSON.parse(await readFile('src/data/features.json','utf8'));
const collections = JSON.parse(await readFile('src/data/collections.json','utf8'));
const knownMedia = new Set([...media, ...historyMedia].flatMap(m => m.variants.map(v => `/media/${v.path}`)));
const htmlByPath = new Map();
for (const file of htmlFiles) htmlByPath.set(file, await readFile(file,'utf8'));
for (const legacyLocale of ['en', 'pt-br']) {
  if (files.some(file => relative(root, file).split('/')[0] === legacyLocale)) throw new Error(`Legacy route output must not exist: /${legacyLocale}/`);
}
for (const locale of ['en','pt-br']) {
  for (const path of [`/panzonato/${locale}/index.html`, `/panzonato/${locale}/stories/index.html`, `/panzonato/${locale}/collections/index.html`, ...features.map(feature => `/panzonato/${locale}/stories/${feature.id}/index.html`), ...collections.map(collection => `/panzonato/${locale}/collections/${collection.id}/index.html`)]) {
    if (![...htmlByPath.keys()].some(file => file === resolve(root, `.${path}`))) throw new Error(`Missing living archive route: ${path}`);
  }
}
function attr(tag,name) { return tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`,'i'))?.[1]; }
function localFile(url) {
  const path = decodeURIComponent(url.pathname);
  return resolve(root, `.${path.endsWith('/') ? path+'index.html' : path}`);
}
function metadataLinks(html) {
  const linkTags = [...html.matchAll(/<link\b[^>]*>/gi)].map(match => match[0]);
  const canonicalTag = linkTags.find(tag => attr(tag, 'rel')?.toLowerCase() === 'canonical');
  const alternateTags = linkTags.filter(tag => attr(tag, 'rel')?.toLowerCase() === 'alternate');
  return {
    canonicalHref: canonicalTag && attr(canonicalTag, 'href'),
    alternates: new Map(alternateTags.map(tag => [attr(tag, 'hreflang')?.toLowerCase(), attr(tag, 'href')])),
  };
}
for (const hub of [
  { path: '/', lang: 'en', counterpart: '/home/pt-br/' },
  { path: '/home/pt-br/', lang: 'pt-BR', counterpart: '/' },
]) {
  const html = htmlByPath.get(localFile(new URL(hub.path, site)));
  if (!html) throw new Error(`Missing history hub route: ${hub.path}`);
  if (attr(html.match(/<html\b[^>]*>/i)?.[0] || '', 'lang')?.toLowerCase() !== hub.lang.toLowerCase()) throw new Error(`Wrong hub page language: ${hub.path}`);
  if ((html.match(/<h1\b/g) || []).length !== 1) throw new Error(`Expected one hub page heading: ${hub.path}`);
  const { canonicalHref, alternates } = metadataLinks(html);
  const canonical = canonicalHref && new URL(canonicalHref, site);
  if (!canonical || canonical.origin !== site.origin || canonical.pathname !== hub.path) throw new Error(`Wrong hub canonical URL: ${hub.path}`);
  const expectedAlternates = new Map([['en', '/'], ['pt-br', '/home/pt-br/']]);
  for (const [hreflang, expectedPath] of expectedAlternates) {
    const href = alternates.get(hreflang);
    const alternate = href && new URL(href, site);
    if (!alternate || alternate.origin !== site.origin || alternate.pathname !== expectedPath) throw new Error(`Wrong hub ${hreflang} alternate URL: ${hub.path}`);
  }
  const counterpartHtml = htmlByPath.get(localFile(new URL(hub.counterpart, site)));
  if (!counterpartHtml) throw new Error(`Missing reciprocal hub alternate: ${hub.path}`);
  const reciprocalHref = metadataLinks(counterpartHtml).alternates.get(hub.lang.toLowerCase());
  const reciprocal = reciprocalHref && new URL(reciprocalHref, site);
  if (!reciprocal || reciprocal.origin !== site.origin || reciprocal.pathname !== hub.path) throw new Error(`Wrong reciprocal hub alternate: ${hub.path}`);
  if ((process.env.PUBLICATION_MODE || 'preview') === 'preview' && !/content="noindex[^"']*/.test(html)) throw new Error(`Preview hub is indexable: ${hub.path}`);
}
let checkedLinks = 0;
for (const [file, html] of htmlByPath) {
  const path = '/'+relative(root,file).replace(/index\.html$/,'');
  const page = new URL(path,site);
  if (/(?:\/Users\/|file:\/\/|data:image\/|family_history_catalog|leo family history)/i.test(html) || /["'=]\/home\/(?!pt-br(?:\/|["']))[^"'<>\s]+/i.test(html)) throw new Error(`Private data in ${path}`);
  if (/[↗↖↑]/.test(html)) throw new Error(`Unwanted arrow in ${path}`);
  if (/(?:["']|&quot;)\/(?:en|pt-br)\//i.test(html)) throw new Error(`Stale legacy internal route in ${path}`);
  const exhibitionRoute = path.match(/^\/panzonato\/(en|pt-br)\//);
  if (exhibitionRoute) {
    const locale = exhibitionRoute[1];
    const expected = locale === 'en' ? 'en' : 'pt-BR';
    if (attr(html.match(/<html\b[^>]*>/i)?.[0] || '', 'lang')?.toLowerCase() !== expected.toLowerCase()) throw new Error(`Wrong page language: ${path}`);
    if ((html.match(/<h1\b/g) || []).length !== 1) throw new Error(`Expected one page heading: ${path}`);
    const { canonicalHref, alternates } = metadataLinks(html);
    if (!canonicalHref || new URL(canonicalHref, site).pathname !== path) throw new Error(`Wrong canonical URL: ${path}`);
    const otherLocale = locale === 'en' ? 'pt-br' : 'en';
    const otherHreflang = locale === 'en' ? 'pt-br' : 'en';
    const alternateHref = alternates.get(otherHreflang);
    const alternatePath = alternateHref && new URL(alternateHref, site).pathname;
    if (!alternatePath?.startsWith(`/panzonato/${otherLocale}/`)) throw new Error(`Wrong localized alternate URL: ${path}`);
    const counterpartPath = path.replace(`/panzonato/${locale}/`, `/panzonato/${otherLocale}/`);
    const translatedChapterDetail = /^\/panzonato\/(?:en|pt-br)\/chapters\/[^/]+\/$/.test(path);
    if (!translatedChapterDetail && alternatePath !== counterpartPath) throw new Error(`Localized alternate does not match counterpart path: ${path}`);
    const alternateHtml = htmlByPath.get(localFile(new URL(alternateHref, site)));
    const reciprocalTags = [...(alternateHtml?.matchAll(/<link\b[^>]*>/gi) ?? [])].map(match => match[0]);
    const reciprocal = reciprocalTags.find(tag => attr(tag, 'rel')?.toLowerCase() === 'alternate' && attr(tag, 'hreflang')?.toLowerCase() === (locale === 'en' ? 'en' : 'pt-br'));
    if (!alternateHtml || !reciprocal || new URL(attr(reciprocal, 'href'), site).pathname !== path) throw new Error(`Localized alternate is not reciprocal: ${path}`);
    const defaultHref = alternates.get('x-default');
    const expectedDefault = locale === 'en' ? path : alternatePath;
    if (!defaultHref || new URL(defaultHref, site).pathname !== expectedDefault) throw new Error(`Wrong x-default URL: ${path}`);
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
