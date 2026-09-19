import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname, basename } from 'node:path';
import sharp from 'sharp';
import { sha256, validateManifest } from './media-lib.mjs';
function option(name, fallback) { const at = process.argv.indexOf(name); return at < 0 ? fallback : process.argv[at + 1]; }
const inputPath = resolve(option('--input','media/ingest.json'));
const output = resolve(option('--output',process.env.MEDIA_ROOT || 'media/published/exhibition'));
const manifestPath = resolve(option('--manifest','src/data/media.json'));
const records = JSON.parse(await readFile(inputPath, 'utf8'));
const result = [];
for (const record of records) {
  if (!/^[a-z0-9-]+$/.test(record.id)) throw new Error('Invalid input media ID');
  const original = resolve(dirname(inputPath), record.input);
  const metadata = await sharp(original).rotate().metadata();
  const dimension = metadata.autoOrient?.width ?? metadata.width;
  if (!dimension || !['jpeg','png','webp','tiff','heif','avif'].includes(metadata.format)) throw new Error(`Unsupported input image: ${record.id}`);
  const widths = [...new Set([480,960,1600,2400,dimension].filter(n => n <= dimension))].sort((a,b) => a-b);
  // Preserve the source for inspection at its actual size; never enlarge originals.
  const variants = [];
  for (const width of widths) {
    const { data, info } = await sharp(original).rotate().resize({width,withoutEnlargement:true}).webp({quality:84,effort:5}).toBuffer({resolveWithObject:true});
    const checksum = sha256(data);
    const path = `${record.id}/${record.id}-${checksum.slice(0,12)}-${info.width}.webp`;
    await mkdir(dirname(resolve(output,path)), {recursive:true});
    await writeFile(resolve(output,path), data);
    variants.push({path,width:info.width,height:info.height,bytes:data.length,sha256:checksum});
  }
  // Explicit allow-list: private paths and ingest notes never enter the public manifest.
  const { id,sourceId,publication,role,alt,caption,credit,rights,focalPoint } = record;
  result.push({id,sourceId,publication,role,alt,caption,credit,rights,focalPoint,variants});
}
validateManifest(result);
await mkdir(dirname(manifestPath), {recursive:true});
await writeFile(manifestPath,JSON.stringify(result,null,2)+'\n');
console.log(`Prepared ${result.length} images; wrote ${basename(manifestPath)}. Media remains outside the application.`);
