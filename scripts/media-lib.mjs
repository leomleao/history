import { createHash } from 'node:crypto';
import { readFile, realpath, stat, lstat } from 'node:fs/promises';
import { resolve, relative, isAbsolute, sep } from 'node:path';
export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
export function assertPublicPath(path) {
  if (typeof path !== 'string' || !/^[a-z0-9][a-z0-9._/-]*$/.test(path) || path.split('/').some(p => p === '..' || p === '.' || !p) || isAbsolute(path)) {
    throw new Error(`Unsafe media path: ${path}`);
  }
  if (!/^(?:[a-z0-9-]+\/)+[a-z0-9-]+-[a-f0-9]{12}-\d+\.webp$/.test(path)) throw new Error(`Media filename is not content-versioned: ${path}`);
  return path;
}
export function validateManifest(manifest) {
  if (!Array.isArray(manifest) || !manifest.length) throw new Error('Media manifest must be a non-empty array');
  const ids = new Set(), paths = new Set();
  for (const record of manifest) {
    if (!/^[a-z0-9-]+$/.test(record.id) || ids.has(record.id)) throw new Error(`Invalid or duplicate media ID: ${record.id}`);
    ids.add(record.id);
    if (!['preview','published','draft'].includes(record.publication)) throw new Error(`Invalid publication: ${record.id}`);
    for (const field of ['alt','caption','credit','rights']) for (const locale of ['en','pt-br']) {
      if (typeof record[field]?.[locale] !== 'string' || !record[field][locale].trim()) throw new Error(`Missing ${field}.${locale}: ${record.id}`);
    }
    if (!Array.isArray(record.variants) || !record.variants.length) throw new Error(`Missing variants: ${record.id}`);
    const widths = new Set();
    for (const v of record.variants) {
      assertPublicPath(v.path);
      if (paths.has(v.path)) throw new Error(`Duplicate media path: ${v.path}`);
      paths.add(v.path);
      if (![v.width,v.height,v.bytes].every(n => Number.isSafeInteger(n) && n > 0) || widths.has(v.width)) throw new Error(`Invalid media dimensions: ${v.path}`);
      widths.add(v.width);
      if (!/^[a-f0-9]{64}$/.test(v.sha256) || !v.path.includes(`-${v.sha256.slice(0,12)}-${v.width}.`)) throw new Error(`Invalid media checksum or filename: ${v.path}`);
    }
    if ('input' in record || 'originalPath' in record) throw new Error(`Private ingest reference in manifest: ${record.id}`);
  }
  return manifest;
}
export async function validateMediaFiles(manifest, root) {
  validateManifest(manifest);
  const canonicalRoot = await realpath(root);
  let bytes = 0, files = 0;
  for (const record of manifest.filter(m => m.publication !== 'draft')) for (const variant of record.variants) {
    const path = resolve(canonicalRoot, variant.path);
    const canonical = await realpath(path);
    const within = relative(canonicalRoot, canonical);
    if (within.startsWith(`..${sep}`) || within === '..' || isAbsolute(within) || (await lstat(path)).isSymbolicLink()) throw new Error(`Media escaped published folder: ${variant.path}`);
    const metadata = await stat(path);
    if (!metadata.isFile() || metadata.size !== variant.bytes) throw new Error(`Media size mismatch: ${variant.path}`);
    const buffer = await readFile(path);
    if (sha256(buffer) !== variant.sha256) throw new Error(`Media checksum mismatch: ${variant.path}`);
    const { default: sharp } = await import('sharp');
    const image = await sharp(buffer).metadata();
    if (image.width !== variant.width || image.height !== variant.height || image.format !== 'webp') throw new Error(`Media dimensions/format mismatch: ${variant.path}`);
    files++; bytes += variant.bytes;
  }
  return { files, bytes };
}
