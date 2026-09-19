import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import sharp from 'sharp';
import { sha256, validateManifest } from './media-lib.mjs';

const sourceRootIndex = process.argv.indexOf('--source-root');
if (sourceRootIndex < 0 || !process.argv[sourceRootIndex + 1]) {
  throw new Error('Usage: node scripts/integrate-voyage-context-media.mjs --source-root /path/to/historical_sources');
}

const sourceRoot = resolve(process.argv[sourceRootIndex + 1]);
const outputRoot = resolve(process.env.MEDIA_ROOT || 'media/published/exhibition');
const manifestPath = resolve('src/data/media.json');

const records = [
  {
    id: 'genoa-port-noack-1892', sourceId: 'genoa-port-noack-1892', input: 'ports_1891/genoa_porto_nuovo_1892_noack.png', role: 'context', focalPoint: '50% 52%',
    alt: { en: 'Genoa New Port in 1892, with steamships, quays and the passenger pier.', 'pt-br': 'Porto Nuovo de Gênova em 1892, com vapores, cais e a ponte de passageiros.' },
    caption: { en: 'Genoa New Port in September 1892, photographed by Alfred Noack. Period context, not a record of the family\'s departure.', 'pt-br': 'Porto Nuovo de Gênova em setembro de 1892, fotografado por Alfred Noack. Contexto de época, não registro do embarque da família.' },
    credit: { en: 'Alfred Noack, no. 6918; public-domain image via Wikimedia Commons.', 'pt-br': 'Alfred Noack, nº 6918; imagem em domínio público via Wikimedia Commons.' },
  },
  {
    id: 'lisbon-cais-do-sodre-1890', sourceId: 'lisbon-cais-do-sodre-1890', input: 'ports_1891/lisbon_cais_do_sodre_1890.jpg', role: 'context', focalPoint: '50% 52%',
    alt: { en: 'The riverside and railway station at Cais do Sodre in Lisbon around 1890.', 'pt-br': 'A frente ribeirinha e a estação do Cais do Sodré, em Lisboa, por volta de 1890.' },
    caption: { en: 'Cais do Sodré and the Tagus waterfront around 1890–1895. The Colombo line called at Lisbon; this exact call remains unverified for the family.', 'pt-br': 'Cais do Sodré e a frente do Tejo por volta de 1890–1895. A linha do Colombo fazia escala em Lisboa; esta escala exata não está comprovada para a família.' },
    credit: { en: 'Lisbon Municipal Archive context; public-domain image via Wikimedia Commons.', 'pt-br': 'Contexto do Arquivo Municipal de Lisboa; imagem em domínio público via Wikimedia Commons.' },
  },
  {
    id: 'cape-verde-porto-grande-1890', sourceId: 'cape-verde-porto-grande-1890', input: 'ports_1891/cape_verde_mindelo_postcard_1890.jpg', role: 'context', focalPoint: '50% 48%',
    alt: { en: 'Historic view of Porto Grande bay at Mindelo, São Vicente, with small craft and the mountainous shore.', 'pt-br': 'Vista histórica da baía do Porto Grande, em Mindelo, São Vicente, com pequenas embarcações e o relevo costeiro.' },
    caption: { en: 'Porto Grande at Mindelo around 1890–1900. A Cape Verde coaling call is a route reconstruction, not documented for this voyage.', 'pt-br': 'Porto Grande, em Mindelo, por volta de 1890–1900. A escala carvoeira em Cabo Verde é uma reconstrução da rota, não documentada para esta viagem.' },
    credit: { en: 'Historic postcard; public-domain image via Wikimedia Commons.', 'pt-br': 'Postal histórico; imagem em domínio público via Wikimedia Commons.' },
  },
  {
    id: 'rio-port-customs-ferrez', sourceId: 'rio-port-customs-ferrez', input: 'ports_1891/rio_de_janeiro_porto_alfandega_ferrez.jpg', role: 'context', focalPoint: '51% 52%',
    alt: { en: 'Rio de Janeiro Customs House and harbour seen from Gamboa, with ships in Guanabara Bay.', 'pt-br': 'Alfândega e porto do Rio de Janeiro vistos da Gamboa, com navios na Baía de Guanabara.' },
    caption: { en: 'Rio Customs House and harbour from Gamboa, c. 1885–1890. A period view of the port named as the family\'s provenance.', 'pt-br': 'Alfândega e porto do Rio vistos da Gamboa, c. 1885–1890. Uma vista de época do porto indicado como procedência da família.' },
    credit: { en: 'Marc Ferrez / Instituto Moreira Salles, 0072137cx012-01; public-domain image via Wikimedia Commons.', 'pt-br': 'Marc Ferrez / Instituto Moreira Salles, 0072137cx012-01; imagem em domínio público via Wikimedia Commons.' },
  },
  {
    id: 'santos-valongo-ferrez', sourceId: 'santos-valongo-ferrez', input: 'ports_1891/santos_valongo_trapiches_ferrez.jpg', role: 'context', focalPoint: '50% 55%',
    alt: { en: 'The estuary and wooden wharves of Valongo and Paquetá at Santos in the late nineteenth century.', 'pt-br': 'O estuário e os trapiches de madeira do Valongo e Paquetá, em Santos, no fim do século XIX.' },
    caption: { en: 'The wooden wharves at Santos, c. 1880–1890. They show the port environment, but the family\'s exact landing place and date remain inferred.', 'pt-br': 'Os trapiches de madeira de Santos, c. 1880–1890. Mostram o ambiente portuário, mas o local e a data exatos do desembarque da família permanecem inferidos.' },
    credit: { en: 'Marc Ferrez / Instituto Moreira Salles, 0071824cx113-03; public-domain image via Wikimedia Commons.', 'pt-br': 'Marc Ferrez / Instituto Moreira Salles, 0071824cx113-03; imagem em domínio público via Wikimedia Commons.' },
  },
  {
    id: 'riachuelo-ferrez-1891', sourceId: 'riachuelo-ferrez-1891', input: 'revolta_armada_1891/riachuelo_ferrez_ims.jpg', role: 'context', focalPoint: '50% 53%',
    alt: { en: 'The Brazilian battleship Riachuelo at anchor, photographed by Marc Ferrez.', 'pt-br': 'O encouraçado brasileiro Riachuelo fundeado, fotografado por Marc Ferrez.' },
    caption: { en: 'The battleship Riachuelo, flagship of the 23 November 1891 naval revolt in Guanabara Bay.', 'pt-br': 'O encouraçado Riachuelo, capitânia do levante naval de 23 de novembro de 1891 na Baía de Guanabara.' },
    credit: { en: 'Marc Ferrez / Instituto Moreira Salles; public-domain image via Wikimedia Commons.', 'pt-br': 'Marc Ferrez / Instituto Moreira Salles; imagem em domínio público via Wikimedia Commons.' },
  },
  {
    id: 'deodoro-da-fonseca-1891', sourceId: 'deodoro-da-fonseca-1891', input: 'revolta_armada_1891/deodoro_da_fonseca_1891.png', role: 'context', focalPoint: '50% 22%',
    alt: { en: 'Formal 1891 portrait of President Deodoro da Fonseca.', 'pt-br': 'Retrato formal de 1891 do presidente Deodoro da Fonseca.' },
    caption: { en: 'Deodoro da Fonseca in 1891. He dissolved Congress on 3 November and resigned on 23 November.', 'pt-br': 'Deodoro da Fonseca em 1891. Dissolveu o Congresso em 3 de novembro e renunciou em 23 de novembro.' },
    credit: { en: 'Brazilian National Archive attribution; public-domain image via Wikimedia Commons.', 'pt-br': 'Atribuição ao Arquivo Nacional; imagem em domínio público via Wikimedia Commons.' },
  },
  {
    id: 'custodio-de-mello-1891', sourceId: 'custodio-de-mello-1891', input: 'revolta_armada_1891/custodio_de_mello_1891.png', role: 'context', focalPoint: '50% 22%',
    alt: { en: 'Portrait of Rear Admiral Custódio José de Melo in naval uniform.', 'pt-br': 'Retrato do contra-almirante Custódio José de Melo em uniforme naval.' },
    caption: { en: 'Custódio José de Melo, leader of the naval movement that forced Deodoro\'s resignation.', 'pt-br': 'Custódio José de Melo, líder do movimento naval que forçou a renúncia de Deodoro.' },
    credit: { en: 'Historic portrait; public-domain image via Wikimedia Commons.', 'pt-br': 'Retrato histórico; imagem em domínio público via Wikimedia Commons.' },
  },
  {
    id: 'floriano-peixoto-1891', sourceId: 'floriano-peixoto-1891', input: 'revolta_armada_1891/floriano_peixoto_1891.jpg', role: 'context', focalPoint: '50% 24%',
    alt: { en: 'Formal 1891 portrait of Floriano Peixoto.', 'pt-br': 'Retrato formal de 1891 de Floriano Peixoto.' },
    caption: { en: 'Floriano Peixoto in 1891. He assumed the presidency on 23 November and revoked Decree no. 641.', 'pt-br': 'Floriano Peixoto em 1891. Assumiu a Presidência em 23 de novembro e revogou o Decreto nº 641.' },
    credit: { en: 'Presidency of the Republic attribution; public-domain image via Wikimedia Commons.', 'pt-br': 'Atribuição à Presidência da República; imagem em domínio público via Wikimedia Commons.' },
  },
].map((record) => ({
  ...record,
  publication: 'preview',
  rights: {
    en: 'Public domain. Reproduced here as contextual historical evidence; source attribution retained.',
    'pt-br': 'Domínio público. Reproduzida aqui como evidência histórica contextual; atribuição da fonte preservada.',
  },
}));

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
for (const record of records) {
  const original = join(sourceRoot, record.input);
  const metadata = await sharp(original).rotate().metadata();
  const width = metadata.autoOrient?.width ?? metadata.width;
  if (!width) throw new Error(`Could not read dimensions for ${record.id}`);
  const widths = [...new Set([480, 960, 1600, 2400, width].filter((candidate) => candidate <= width))].sort((a, b) => a - b);
  const variants = [];
  for (const candidate of widths) {
    const { data, info } = await sharp(original).rotate().resize({ width: candidate, withoutEnlargement: true }).webp({ quality: 84, effort: 5 }).toBuffer({ resolveWithObject: true });
    const checksum = sha256(data);
    const path = `${record.id}/${record.id}-${checksum.slice(0, 12)}-${info.width}.webp`;
    await mkdir(dirname(join(outputRoot, path)), { recursive: true });
    await writeFile(join(outputRoot, path), data);
    variants.push({ path, width: info.width, height: info.height, bytes: data.length, sha256: checksum });
  }
  const publicRecord = { ...record, variants };
  delete publicRecord.input;
  const existing = manifest.findIndex((item) => item.id === record.id);
  if (existing >= 0) manifest[existing] = publicRecord;
  else manifest.push(publicRecord);
}

validateManifest(manifest);
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Integrated ${records.length} voyage-context images into ${manifestPath}`);
