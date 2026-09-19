import manifest from '../data/history-media.json';

export type HistoryMediaLocale = 'en' | 'pt-br';
type Publication = 'preview' | 'published' | 'draft';
type Localized = Record<HistoryMediaLocale, string>;

interface HistoryMediaVariant {
  path: string;
  width: number;
  height: number;
  bytes: number;
  sha256: string;
}

interface HistoryMediaRecord {
  id: string;
  sourceId: string;
  assetId: string;
  publication: Publication;
  role: string;
  alt: Localized;
  caption: Localized;
  credit: Localized;
  rights: Localized;
  focalPoint: string;
  sourceUrl: string;
  variants: HistoryMediaVariant[];
}

const mediaRecords = manifest as HistoryMediaRecord[];
const publicationMode = process.env.PUBLICATION_MODE === 'published' ? 'published' : 'preview';

function requireVisible(record: HistoryMediaRecord | undefined, id: string) {
  if (!record) throw new Error(`Unknown history media reference: ${id}`);
  if (record.publication === 'draft' || (publicationMode === 'published' && record.publication !== 'published')) {
    throw new Error(`Unpublished history media reference: ${id}`);
  }
  return record;
}

function mediaUrlPrefix() {
  const prefix = (process.env.MEDIA_URL_PREFIX || '/media/').replace(/\/?$/, '/');
  if (prefix !== '/media/' && !prefix.startsWith('https://')) {
    throw new Error('MEDIA_URL_PREFIX must be /media/ or an HTTPS origin');
  }
  return prefix;
}

export function getHistoryMedia(id: string, locale: HistoryMediaLocale) {
  const media = requireVisible(mediaRecords.find(record => record.id === id), id);
  const variants = [...media.variants].sort((a, b) => a.width - b.width);
  const largest = variants.at(-1);
  if (!largest) throw new Error(`No history media variants: ${id}`);
  const prefix = mediaUrlPrefix();

  return {
    id: media.id,
    src: prefix + largest.path,
    srcset: variants.map(variant => `${prefix}${variant.path} ${variant.width}w`).join(', '),
    width: largest.width,
    height: largest.height,
    alt: media.alt[locale],
    caption: media.caption[locale],
    credit: media.credit[locale],
    rights: media.rights[locale],
    sourceUrl: media.sourceUrl,
    focalPoint: media.focalPoint,
  };
}

export type HistoryMediaView = ReturnType<typeof getHistoryMedia>;
