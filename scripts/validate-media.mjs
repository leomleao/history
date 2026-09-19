import { readFile } from 'node:fs/promises';
import { validateMediaFiles } from './media-lib.mjs';
const root = process.argv[2] || process.env.MEDIA_ROOT || 'media/published/exhibition';
const manifest = JSON.parse(await readFile('src/data/media.json','utf8'));
console.log(await validateMediaFiles(manifest,root));
