import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { validateManifest } from './media-lib.mjs';
const locales = ['en','pt-br'];
function localized(value, label) {
  if (!value || locales.some(locale => typeof value[locale] !== 'string' || !value[locale].trim())) throw new Error(`Missing localized text: ${label}`);
}
export function isPartialIsoDate(value) {
  if (typeof value !== 'string' || !/^\d{4}(?:-(?:0[1-9]|1[0-2])(?:-(?:0[1-9]|[12]\d|3[01]))?)?$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  if (day === undefined) return true;
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}
export function validateCatalog(catalog, manifest, mode = 'preview') {
  validateManifest(manifest);
  const groups = { media: manifest, sources: catalog.sources, people: catalog.people, places: catalog.places };
  const maps = {};
  for (const [kind, records] of Object.entries(groups)) {
    if (!Array.isArray(records)) throw new Error(`Missing record collection: ${kind}`);
    maps[kind] = new Map();
    for (const record of records) {
      if (!/^[a-z0-9-]+$/.test(record.id) || maps[kind].has(record.id)) throw new Error(`Invalid or duplicate ${kind} ID: ${record.id}`);
      if (!['draft','preview','published'].includes(record.publication)) throw new Error(`Invalid publication: ${record.id}`);
      maps[kind].set(record.id,record);
    }
  }
  function ref(kind,id,owner) {
    const record = maps[kind].get(id);
    if (!record) throw new Error(`Unknown ${kind} reference ${id} in ${owner}`);
    if (record.publication === 'draft' || (mode === 'published' && record.publication !== 'published')) throw new Error(`Unpublished ${kind} reference ${id} in ${owner}`);
    return record;
  }
  for (const [kind, records] of Object.entries(groups)) for (const record of records.filter(r => r.publication !== 'draft')) {
    ref(kind,record.id,record.id);
    if (kind === 'media') {
      const source = ref('sources',record.sourceId,record.id);
      if (source.mediaId !== record.id) throw new Error(`Mismatched source/media pair: ${record.id}`);
      if (mode === 'published' && /not.*verified|under review|ainda não|em revisão/i.test(record.rights.en + record.credit.en)) throw new Error(`Unreviewed rights or credit: ${record.id}`);
    }
    if (kind === 'sources') {
      if (record.mediaId) ref('media',record.mediaId,record.id);
      for (const key of ['title','description','citation','repository']) localized(record[key],`${record.id}.${key}`);
      for (const key of ['category','transcript','evidenceNote']) if (record[key]) localized(record[key],`${record.id}.${key}`);
      if (!['context','field','record','reference'].includes(record.kind)) throw new Error(`Unknown source kind: ${record.id}`);
      if (record.locator) {
        let locator;
        try { locator = new URL(record.locator); } catch { throw new Error(`Unsafe source locator: ${record.id}`); }
        if (!['http:', 'https:'].includes(locator.protocol) || locator.username || locator.password) throw new Error(`Unsafe source locator: ${record.id}`);
      }
    }
    if (kind === 'people') {
      if (!record.name?.trim() || !Array.isArray(record.aliases) || !Array.isArray(record.chapterKeys)) throw new Error(`Incomplete person: ${record.id}`);
      localized(record.summary,`${record.id}.summary`);
      if (locales.some(l => !Array.isArray(record.biography?.[l]) || record.biography[l].some(s => typeof s !== 'string'))) throw new Error(`Missing biography: ${record.id}`);
      for (const relation of record.relationships || []) {
        ref('people',relation.personId,record.id); localized(relation.label,`${record.id}.relationship`);
        if (!relation.sourceIds?.length) throw new Error(`Unsourced relationship: ${record.id}`);
        relation.sourceIds.forEach(id => ref('sources',id,record.id));
      }
    }
    if (kind === 'places') { localized(record.name,`${record.id}.name`); localized(record.description,`${record.id}.description`); }
    for (const id of record.sourceIds || []) ref('sources',id,record.id);
  }
  if (!Array.isArray(catalog.events)) throw new Error('Missing record collection: events');
  const eventIds = new Set();
  for (const event of catalog.events) {
    if (!/^[a-z0-9-]+$/.test(event.id) || eventIds.has(event.id)) throw new Error(`Invalid or duplicate event ID: ${event.id}`);
    eventIds.add(event.id);
    if (!event.year?.trim() || !['origins','crossing','brazil','generations','return'].includes(event.chapterKey)) throw new Error(`Incomplete timeline event: ${event.id}`);
    if (!['family','context'].includes(event.kind)) throw new Error(`Invalid timeline kind: ${event.id}`);
    if (!isPartialIsoDate(event.sortDate)) throw new Error(`Invalid timeline sortDate: ${event.id}`);
    localized(event.title,`${event.id}.title`); localized(event.description,`${event.id}.description`);
    if (event.kind === 'context') {
      localized(event.scope,`${event.id}.scope`);
      localized(event.impact,`${event.id}.impact`);
    }
    if (!Array.isArray(event.sourceIds) || !event.sourceIds.length) throw new Error(`Unsourced timeline event: ${event.id}`);
    event.sourceIds.forEach(id => ref('sources',id,event.id));
  }
  // Reject accidentally copied local paths and embedded archive binaries.
  const serialized = JSON.stringify({catalog,manifest});
  if (/(?:\/Users\/|\/home\/|[A-Z]:\\\\|data:image\/|file:\/\/)/.test(serialized)) throw new Error('Private path or embedded media in public metadata');
  return { mode, media: manifest.length, sources: catalog.sources.length, people: catalog.people.length, places: catalog.places.length };
}
export function validateLivingArchive(catalog, manifest, features, collections, mode = 'preview') {
  validateCatalog(catalog, manifest, mode);
  if (!Array.isArray(features) || !features.length) throw new Error('Expected living archive stories');
  if (!Array.isArray(collections) || !collections.length) throw new Error('Expected historical collections');
  const sourceIds = new Set(catalog.sources.filter(record => record.publication !== 'draft').map(record => record.id));
  const mediaIds = new Set(manifest.filter(record => record.publication !== 'draft').map(record => record.id));
  const chapterKeys = new Set(['origins','crossing','brazil','generations','return']);
  const ids = new Set();
  for (const feature of features) {
    if (!/^[a-z0-9-]+$/.test(feature.id) || ids.has(feature.id)) throw new Error(`Invalid or duplicate feature ID: ${feature.id}`);
    ids.add(feature.id);
    if (feature.publication === 'draft' || (mode === 'published' && feature.publication !== 'published')) throw new Error(`Unpublished feature: ${feature.id}`);
    if (!['interview','letter','object','essay'].includes(feature.kind) || !chapterKeys.has(feature.chapterKey)) throw new Error(`Incomplete feature: ${feature.id}`);
    for (const key of ['title','dek','period','attribution','context']) localized(feature[key],`${feature.id}.${key}`);
    if (!feature.paragraphs || locales.some(locale => !Array.isArray(feature.paragraphs[locale]) || !feature.paragraphs[locale].length || feature.paragraphs[locale].some(value => typeof value !== 'string' || !value.trim()))) throw new Error(`Missing localized paragraphs: ${feature.id}`);
    if (!Array.isArray(feature.sourceIds) || !feature.sourceIds.length) throw new Error(`Story has no sources: ${feature.id}`);
    feature.sourceIds.forEach(id => { if (!sourceIds.has(id)) throw new Error(`Unknown story source ${id} in ${feature.id}`); });
    if (!Array.isArray(feature.mediaIds) || new Set(feature.mediaIds).size !== feature.mediaIds.length || new Set(feature.sourceIds).size !== feature.sourceIds.length) throw new Error(`Duplicate story references: ${feature.id}`);
    feature.mediaIds.forEach(id => { if (!mediaIds.has(id)) throw new Error(`Unknown story media ${id} in ${feature.id}`); });
    if (feature.quote) {
      if (!feature.quote.original?.trim() || !feature.quote.originalLang?.trim()) throw new Error(`Quote lacks original text or language: ${feature.id}`);
      for (const key of ['translation','speaker','citation']) localized(feature.quote[key],`${feature.id}.quote.${key}`);
      if (!feature.sourceIds.length) throw new Error(`Attributed quote has no source: ${feature.id}`);
    }
  }
  const collectionIds = new Set();
  const usedMedia = new Set();
  for (const collection of collections) {
    if (!/^[a-z0-9-]+$/.test(collection.id) || collectionIds.has(collection.id)) throw new Error(`Invalid or duplicate collection: ${collection.id}`);
    collectionIds.add(collection.id);
    for (const key of ['title','description','period']) localized(collection[key],`${collection.id}.${key}`);
    if (!chapterKeys.has(collection.chapterKey)) throw new Error(`Unknown collection chapter: ${collection.id}`);
    if (!Array.isArray(collection.mediaIds) || collection.mediaIds.length < 6 || new Set(collection.mediaIds).size !== collection.mediaIds.length) throw new Error(`Collection needs at least six distinct items: ${collection.id}`);
    if (!collection.mediaIds.includes(collection.coverMediaId)) throw new Error(`Collection cover must be in its sequence: ${collection.id}`);
    for (const id of collection.mediaIds) {
      if (!mediaIds.has(id)) throw new Error(`Unknown collection media ${id} in ${collection.id}`);
      if (usedMedia.has(id)) throw new Error(`Media repeated across collections: ${id}`);
      usedMedia.add(id);
    }
  }
  const serialized = JSON.stringify({features,collections});
  if (/(?:\/Users\/|\/home\/|[A-Z]:\\\\|data:image\/|file:\/\/)/.test(serialized)) throw new Error('Private path or embedded media in living archive metadata');
  return { features: features.length, collections: collections.length, collectionMedia: usedMedia.size };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const catalog = JSON.parse(await readFile('src/data/catalog.json','utf8'));
  const manifest = JSON.parse(await readFile('src/data/media.json','utf8'));
  const features = JSON.parse(await readFile('src/data/features.json','utf8'));
  const collections = JSON.parse(await readFile('src/data/collections.json','utf8'));
  const mode = process.env.PUBLICATION_MODE || 'preview';
  if (!['preview','published'].includes(mode)) throw new Error(`Invalid PUBLICATION_MODE: ${mode}`);
  console.log({ ...validateCatalog(catalog,manifest,mode), ...validateLivingArchive(catalog,manifest,features,collections,mode) });
}
