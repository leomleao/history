import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import sharp from 'sharp';
import { sha256, validateManifest } from './media-lib.mjs';

function argument(name) {
  const index = process.argv.indexOf(name);
  if (index < 0 || !process.argv[index + 1]) throw new Error(`Missing ${name}`);
  return resolve(process.argv[index + 1]);
}

const sourceRoot = argument('--source-root');
const certificate = argument('--certificate');
const outputRoot = resolve(process.env.MEDIA_ROOT || 'media/published/exhibition');
const manifestPath = resolve('src/data/media.json');
const previewRights = {
  en: 'Archival document reproduced for local research preview; repository reproduction terms remain under review.',
  'pt-br': 'Documento arquivístico reproduzido para prévia local de pesquisa; os termos de reprodução do acervo permanecem em análise.',
};
const records = [
  {
    id: 'panzonato-hospedaria-1891', sourceId: 'panzonato-hospedaria-1891',
    input: join(sourceRoot, 'hospedaria_bras_1891_panzonato_entry.png'),
    role: 'family-evidence', publication: 'preview', focalPoint: 'center center',
    alt: {
      en: 'Handwritten 1891 hostel register rows name Giuseppe, Fosca and six children beside the steamship Colombo.',
      'pt-br': 'Linhas manuscritas do livro de 1891 nomeiam Giuseppe, Fosca e seis filhos ao lado do vapor Colombo.',
    },
    caption: {
      en: 'Original 1891 register, book 031, page 283: the Panzonato household and the Colombo. This close-up does not show the destination columns.',
      'pt-br': 'Livro original de 1891, nº 031, página 283: a família Panzonato e o Colombo. Este recorte não mostra as colunas de destino.',
    },
    credit: {
      en: 'Museu da Imigração / Arquivo Público do Estado de São Paulo, Livro 031, p. 283; detail of the original scan.',
      'pt-br': 'Museu da Imigração / Arquivo Público do Estado de São Paulo, Livro 031, p. 283; detalhe do scan original.',
    },
    rights: previewRights,
  },
  {
    id: 'hospedaria-page-1891', sourceId: 'hospedaria-page-1891',
    input: join(sourceRoot, 'L031_283_matricula_hospedaria_bras_1891.jpg'),
    role: 'family-evidence', publication: 'preview', focalPoint: 'center 70%',
    alt: {
      en: 'Full two-page spread of the 1891 immigrant hostel register, with the Panzonato household near the bottom.',
      'pt-br': 'Página dupla completa do livro da Hospedaria de 1891, com a família Panzonato perto da margem inferior.',
    },
    caption: {
      en: 'Full original spread, book 031, page 283. The Panzonato rows sit near the bottom; Colombo and Tietê are visible across the spread.',
      'pt-br': 'Página dupla original, livro 031, página 283. As linhas Panzonato ficam perto do rodapé; Colombo e Tietê aparecem ao longo da página.',
    },
    credit: {
      en: 'Museu da Imigração / Arquivo Público do Estado de São Paulo, Livro 031, p. 283; original page scan.',
      'pt-br': 'Museu da Imigração / Arquivo Público do Estado de São Paulo, Livro 031, p. 283; scan da página original.',
    },
    rights: previewRights,
  },
  {
    id: 'panzonato-desembarque-certificate-2002', sourceId: 'panzonato-desembarque-certificate-2002',
    input: certificate,
    role: 'family-evidence', publication: 'preview', focalPoint: 'center center',
    alt: {
      en: 'The 2002 certified extract types the eight family names, Rio de Janeiro provenance, Colombo and Tietê destination.',
      'pt-br': 'A certidão de 2002 datilografa os oito nomes, a procedência Rio de Janeiro, o Colombo e o destino Tietê.',
    },
    caption: {
      en: 'Certified extract issued in 2002 from the 1891 hostel record. It explicitly prints Rio de Janeiro as provenance and gives Giuseppe’s age as 35.',
      'pt-br': 'Certidão emitida em 2002 a partir do livro de 1891. Ela registra explicitamente Rio de Janeiro como procedência e informa 35 anos para Giuseppe.',
    },
    credit: {
      en: 'Memorial do Imigrante, certificate 11262, issued 26 February 2002; family archive copy.',
      'pt-br': 'Memorial do Imigrante, certidão 11262, emitida em 26 de fevereiro de 2002; cópia do arquivo familiar.',
    },
    rights: previewRights,
  },
];

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
for (const record of records) {
  const metadata = await sharp(record.input).rotate().metadata();
  const width = metadata.autoOrient?.width ?? metadata.width;
  if (!width) throw new Error(`Could not read dimensions for ${record.id}`);
  const widths = [...new Set([480, 960, 1600, 2400, width].filter(candidate => candidate <= width))].sort((a, b) => a - b);
  const variants = [];
  for (const candidate of widths) {
    const { data, info } = await sharp(record.input).rotate().resize({ width: candidate, withoutEnlargement: true }).webp({ quality: 86, effort: 5 }).toBuffer({ resolveWithObject: true });
    const checksum = sha256(data);
    const path = `${record.id}/${record.id}-${checksum.slice(0, 12)}-${info.width}.webp`;
    await mkdir(dirname(join(outputRoot, path)), { recursive: true });
    await writeFile(join(outputRoot, path), data);
    variants.push({ path, width: info.width, height: info.height, bytes: data.length, sha256: checksum });
  }
  const { input, ...publicRecord } = record;
  const existing = manifest.findIndex(item => item.id === record.id);
  if (existing >= 0) manifest[existing] = { ...publicRecord, variants };
  else manifest.push({ ...publicRecord, variants });
}

validateManifest(manifest);
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Integrated ${records.length} original-register and certificate images.`);
