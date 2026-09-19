import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { validateManifest } from './media-lib.mjs';
const locales = ['en','pt-br'];
function localized(value, label) {
  if (!value || locales.some(locale => typeof value[locale] !== 'string' || !value[locale].trim())) throw new Error(`Missing localized text: ${label}`);
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
  const eventIds = new Set();
  for (const event of catalog.events || []) {
    if (!/^[a-z0-9-]+$/.test(event.id) || eventIds.has(event.id)) throw new Error(`Invalid or duplicate event ID: ${event.id}`);
    eventIds.add(event.id);
    if (!event.year?.trim() || !['origins','crossing','brazil','generations','return'].includes(event.chapterKey)) throw new Error(`Incomplete timeline event: ${event.id}`);
    localized(event.title,`${event.id}.title`); localized(event.description,`${event.id}.description`);
    if (!event.sourceIds?.length) throw new Error(`Unsourced timeline event: ${event.id}`);
    event.sourceIds.forEach(id => ref('sources',id,event.id));
  }
  // Reject accidentally copied local paths and embedded archive binaries.
  const serialized = JSON.stringify({catalog,manifest});
  if (/(?:\/Users\/|\/home\/|[A-Z]:\\\\|data:image\/|file:\/\/)/.test(serialized)) throw new Error('Private path or embedded media in public metadata');
  return { mode, media: manifest.length, sources: catalog.sources.length, people: catalog.people.length, places: catalog.places.length };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const catalog = JSON.parse(await readFile('src/data/catalog.json','utf8'));
  const manifest = JSON.parse(await readFile('src/data/media.json','utf8'));
  const mode = process.env.PUBLICATION_MODE || 'preview';
  if (!['preview','published'].includes(mode)) throw new Error(`Invalid PUBLICATION_MODE: ${mode}`);
  console.log(validateCatalog(catalog,manifest,mode));
}
