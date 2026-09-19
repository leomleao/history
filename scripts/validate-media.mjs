import { readFile } from 'node:fs/promises';
import { validateMediaFiles } from './media-lib.mjs';
const root = process.argv[2] || process.env.MEDIA_ROOT || 'media/published/exhibition';
const exhibition = JSON.parse(await readFile('src/data/media.json','utf8'));
const history = JSON.parse(await readFile('src/data/history-media.json','utf8'));
console.log(await validateMediaFiles([...exhibition, ...history], root));
