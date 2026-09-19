import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, writeFile, mkdir, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import { validateCatalog } from '../scripts/validate-catalog.mjs';
import { assertPublicPath, validateMediaFiles, sha256 } from '../scripts/media-lib.mjs';
const catalog = JSON.parse(await readFile(new URL('../src/data/catalog.json',import.meta.url),'utf8'));
const manifest = JSON.parse(await readFile(new URL('../src/data/media.json',import.meta.url),'utf8'));
test('preview edition validates without access to media binaries', () => assert.equal(validateCatalog(catalog,manifest).media,manifest.length));
test('text sources do not require invented illustrative media', () => { const c=structuredClone(catalog);c.sources.push({id:'text-reference',publication:'preview',kind:'reference',title:{en:'Text','pt-br':'Texto'},description:{en:'Text','pt-br':'Texto'},citation:{en:'Text','pt-br':'Texto'},repository:{en:'Archive','pt-br':'Arquivo'},locator:''});assert.doesNotThrow(() => validateCatalog(c,manifest)); });
test('timeline claims must resolve to a visible source', () => { const c=structuredClone(catalog);c.events=[{id:'test',year:'1891',chapterKey:'crossing',title:{en:'Arrival','pt-br':'Chegada'},description:{en:'Arrival','pt-br':'Chegada'},sourceIds:['missing']}];assert.throws(() => validateCatalog(c,manifest),/Unknown sources/); });
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
