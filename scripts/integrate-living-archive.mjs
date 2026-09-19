import { readFile, writeFile } from 'node:fs/promises';

const paths = {
  catalog: 'src/data/catalog.json',
  collections: 'src/data/collections.json',
  editorial: 'work/implementation/living-archive/editorial-sources.json',
  visual: 'work/implementation/living-archive/visual-sources.json',
  collectionFragment: 'work/implementation/living-archive/collections.json',
};

async function json(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

const [catalog, editorial, visual, collections] = await Promise.all([
  json(paths.catalog), json(paths.editorial), json(paths.visual), json(paths.collectionFragment),
]);

if (!Array.isArray(catalog.sources) || !Array.isArray(editorial) || !Array.isArray(visual) || !Array.isArray(collections)) {
  throw new Error('Living archive integration inputs must contain arrays');
}

const fragments = [...editorial, ...visual];
const fragmentIds = new Set();
for (const record of fragments) {
  if (!record?.id || fragmentIds.has(record.id)) throw new Error(`Duplicate or missing source fragment ID: ${record?.id}`);
  fragmentIds.add(record.id);
}

const existingIds = new Set(catalog.sources.map(record => record.id));
const additions = fragments.filter(record => !existingIds.has(record.id));
catalog.sources.push(...additions);

await Promise.all([
  writeFile(paths.catalog, `${JSON.stringify(catalog, null, 2)}\n`),
  writeFile(paths.collections, `${JSON.stringify(collections, null, 2)}\n`),
]);

console.log(JSON.stringify({ existingSourcesPreserved: existingIds.size, newSources: additions.length, totalSources: catalog.sources.length, collections: collections.length }, null, 2));
