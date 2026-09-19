import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

const projectRoot = new URL('../', import.meta.url);

test('Panzonato pages live only below the exhibition namespace', async () => {
  let legacyEntries = [];
  try { legacyEntries = await readdir(new URL('src/pages/[locale]/', projectRoot), { recursive: true }); }
  catch (error) { if (error?.code !== 'ENOENT') throw error; }
  assert.deepEqual(legacyEntries.filter(entry => entry.endsWith('.astro')), []);
  const requiredPages = [
    'index.astro', 'about.astro',
    'archive/index.astro', 'archive/[slug].astro',
    'chapters/index.astro', 'chapters/[slug].astro',
    'collections/index.astro', 'collections/[id].astro',
    'people/index.astro', 'people/[slug].astro',
    'stories/index.astro', 'stories/[id].astro',
  ];
  for (const page of requiredPages) {
    const source = await readFile(new URL(`src/pages/panzonato/[locale]/${page}`, projectRoot), 'utf8');
    assert.ok(source.length > 0, page);
  }
});

test('chapter links cannot regress to the legacy locale roots', async () => {
  for (const locale of ['en', 'pt-br']) {
    const directory = new URL(`src/content/chapters/${locale}/`, projectRoot);
    for (const file of await readdir(directory)) {
      if (!file.endsWith('.md')) continue;
      const markdown = await readFile(new URL(file, directory), 'utf8');
      assert.doesNotMatch(markdown, /\]\(\/(?:en|pt-br)\//, `${locale}/${file}`);
    }
  }
});
