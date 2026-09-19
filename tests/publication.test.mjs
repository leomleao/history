import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, writeFile, mkdir, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import { isPartialIsoDate, validateCatalog, validateLivingArchive } from '../scripts/validate-catalog.mjs';
import { assertPublicPath, validateMediaFiles, sha256 } from '../scripts/media-lib.mjs';
const catalog = JSON.parse(await readFile(new URL('../src/data/catalog.json',import.meta.url),'utf8'));
const manifest = JSON.parse(await readFile(new URL('../src/data/media.json',import.meta.url),'utf8'));
async function readLivingArchive() {
  const features = JSON.parse(await readFile(new URL('../src/data/features.json',import.meta.url),'utf8'));
  const collections = JSON.parse(await readFile(new URL('../src/data/collections.json',import.meta.url),'utf8'));
  return { features, collections };
}
test('preview edition validates without access to media binaries', () => assert.equal(validateCatalog(catalog,manifest).media,manifest.length));
test('text sources do not require invented illustrative media', () => { const c=structuredClone(catalog);c.sources.push({id:'text-reference',publication:'preview',kind:'reference',title:{en:'Text','pt-br':'Texto'},description:{en:'Text','pt-br':'Texto'},citation:{en:'Text','pt-br':'Texto'},repository:{en:'Archive','pt-br':'Arquivo'},locator:''});assert.doesNotThrow(() => validateCatalog(c,manifest)); });
test('timeline claims must resolve every referenced visible source', () => { const c=structuredClone(catalog);c.events=[{id:'test',year:'1891',kind:'family',sortDate:'1891-12',chapterKey:'crossing',title:{en:'Arrival','pt-br':'Chegada'},description:{en:'Arrival','pt-br':'Chegada'},sourceIds:[catalog.sources[0].id,'missing']}];assert.throws(() => validateCatalog(c,manifest),/Unknown sources/); });
test('timeline accepts only real ISO dates at supported partial precision', () => {
  for (const value of ['1850','1882-09','1888-05-13']) assert.equal(isPartialIsoDate(value),true,value);
  for (const value of ['1882-9','1888-02-30','1888-13','1888-05-13T00:00:00Z']) assert.equal(isPartialIsoDate(value),false,value);
  const c=structuredClone(catalog);c.events[0].sortDate='1888-02-30';assert.throws(() => validateCatalog(c,manifest),/Invalid timeline sortDate/);
});
test('timeline kinds and bilingual context fields are required', () => {
  const invalidKind=structuredClone(catalog);invalidKind.events[0].kind='world';assert.throws(() => validateCatalog(invalidKind,manifest),/Invalid timeline kind/);
  const context=structuredClone(catalog);context.events[0].kind='context';context.events[0].scope={en:'Veneto','pt-br':'Vêneto'};context.events[0].impact={en:'Context','pt-br':''};assert.throws(() => validateCatalog(context,manifest),/Missing localized text/);
});
test('timeline validation does not assume a fixed event count', () => {
  const c=structuredClone(catalog);const extra=structuredClone(c.events[0]);extra.id='additional-family-event';c.events.push(extra);assert.doesNotThrow(() => validateCatalog(c,manifest));
});
test('unreviewed edition cannot build as published', () => assert.throws(() => validateCatalog(catalog,manifest,'published'),/Unpublished/));
test('unresolved source references stop a build', () => { const m=structuredClone(manifest);m[0].sourceId='missing';assert.throws(() => validateCatalog(catalog,m),/Unknown sources/); });
test('draft dependencies cannot leak through preview records', () => { const c=structuredClone(catalog);c.sources[0].publication='draft';assert.throws(() => validateCatalog(c,manifest),/Unpublished/); });
test('relationship assertions require relevant source IDs', () => {const c=structuredClone(catalog);c.people[0].relationships=[{personId:c.people[1].id,label:{en:'Spouse','pt-br':'Cônjuge'},sourceIds:[]}];assert.throws(() => validateCatalog(c,manifest),/Unsourced relationship/);});
test('translation gaps fail before rendering', () => {const m=structuredClone(manifest);delete m[0].alt['pt-br'];assert.throws(() => validateCatalog(catalog,m),/Missing alt.pt-br/);});
test('public metadata rejects private filesystem references', () => {const c=structuredClone(catalog);c.sources[0].citation.en='/Users/research/private.txt';assert.throws(() => validateCatalog(c,manifest),/Private path/);});
test('media URLs reject path traversal and unversioned names', () => {for(const p of ['../private.webp','/etc/passwd','a/%2e%2e/file.webp','a/../private.webp','a/one.webp']) assert.throws(() => assertPublicPath(p));});
test('media filenames must identify the actual declared checksum', () => {const m=structuredClone(manifest);m[0].variants[0].sha256='0'.repeat(64);assert.throws(() => validateCatalog(catalog,m),/checksum/);});
test('release validation checks bytes, dimensions, checksum and symlink containment', async () => {
  const root=await mkdtemp(join(tmpdir(),'panzonato-media-'));
  try {
    const buffer=await sharp({create:{width:12,height:8,channels:3,background:'#a84632'}}).webp().toBuffer();
    const sum=sha256(buffer), path=`fixture/fixture-${sum.slice(0,12)}-12.webp`;
    const m=[{...structuredClone(manifest[0]),id:'fixture',variants:[{path,width:12,height:8,bytes:buffer.length,sha256:sum}]}];
    await mkdir(join(root,'fixture'));await writeFile(join(root,path),buffer);
    assert.deepEqual(await validateMediaFiles(m,root),{files:1,bytes:buffer.length});
    const bad=structuredClone(m);bad[0].variants[0].height=9;await assert.rejects(validateMediaFiles(bad,root),/dimensions/);
    const changed=Buffer.from(buffer);changed[changed.length-1]^=1;await writeFile(join(root,path),changed);await assert.rejects(validateMediaFiles(m,root),/checksum/);
    await rm(join(root,path));await assert.rejects(validateMediaFiles(m,root),/ENOENT/);
    await writeFile(join(root,'outside.webp'),buffer);await symlink(join(root,'outside.webp'),join(root,path));await assert.rejects(validateMediaFiles(m,root),/escaped/);
  } finally { await rm(root,{recursive:true,force:true}); }
});
test('living archive stories and collections resolve bilingual evidence', async () => {
  const { features, collections } = await readLivingArchive();
  assert.deepEqual(validateLivingArchive(catalog,manifest,features,collections), { features: features.length, collections: collections.length, collectionMedia: collections.reduce((sum, collection) => sum + collection.mediaIds.length, 0) });
});
test('historical collection imagery cannot repeat between essays', async () => {
  const { features, collections } = await readLivingArchive();
  const changed = structuredClone(collections);
  const replaceAt = changed[1].mediaIds.findIndex(id => id !== changed[1].coverMediaId);
  changed[1].mediaIds[replaceAt] = changed[0].mediaIds[0];
  assert.throws(() => validateLivingArchive(catalog,manifest,features,changed), /repeated across collections/);
});
test('quote attribution must remain bilingual and source-backed', async () => {
  const { features, collections } = await readLivingArchive();
  const changed = structuredClone(features);
  const quoted = changed.find(feature => feature.quote);
  assert.ok(quoted);
  delete quoted.quote.citation['pt-br'];
  assert.throws(() => validateLivingArchive(catalog,manifest,changed,collections), /Missing localized text/);
});
