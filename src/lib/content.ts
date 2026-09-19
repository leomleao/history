import { getCollection, type CollectionEntry } from 'astro:content';
import catalog from '../data/catalog.json';
import manifest from '../data/media.json';
export const locales = ['en', 'pt-br'] as const;
export type Locale = typeof locales[number];
export type Localized<T = string> = Record<Locale, T>;
export type Publication = 'preview' | 'published' | 'draft';
export const publicationMode = process.env.PUBLICATION_MODE === 'published' ? 'published' : 'preview';
export const isPreview = publicationMode === 'preview';
export function otherLocale(locale: Locale): Locale { return locale === 'en' ? 'pt-br' : 'en'; }
export function route(locale: Locale, kind: 'home' | 'chapters' | 'people' | 'archive' | 'about' = 'home', slug = '') {
  return `/${locale}/${kind === 'home' ? '' : `${kind}/${slug ? `${slug}/` : ''}`}`;
}
export interface Variant { path: string; width: number; height: number; bytes: number; sha256: string }
export interface MediaRecord {
  id: string; sourceId: string; publication: Publication; role: string;
  alt: Localized; caption: Localized; credit: Localized; rights: Localized;
  variants: Variant[]; focalPoint: string;
}
export interface SourceRecord {
  id: string; mediaId?: string; publication: Publication;
  title: Localized; description: Localized; citation: Localized;
  repository: Localized; locator: string; kind: 'context' | 'field' | 'record' | 'reference';
  category?: Localized; date?: string; transcript?: Localized; evidenceNote?: Localized;
}
export interface PersonRecord {
  id: string; name: string; aliases: string[]; publication: Publication;
  dates?: string; generation?: 'roots' | 'crossing' | 'brazil';
  summary: Localized; biography: Localized<string[]>; chapterKeys: string[];
  sourceIds: string[]; relationships: { personId: string; label: Localized; sourceIds: string[] }[];
}
export interface TimelineRecord {
  id: string; year: string; title: Localized; description: Localized;
  chapterKey: string; sourceIds: string[];
}
export interface PlaceRecord {
  id: string; name: Localized; publication: Publication; sourceIds: string[];
  description: Localized;
}
const mediaRecords = manifest as MediaRecord[];
const sourceRecords = catalog.sources as SourceRecord[];
const personRecords = catalog.people as PersonRecord[];
const placeRecords = catalog.places as PlaceRecord[];
function requireVisible<T extends { id: string; publication: Publication }>(record: T | undefined, id: string): T {
  if (!record) throw new Error(`Unknown content reference: ${id}`);
  if (record.publication === 'draft' || (publicationMode === 'published' && record.publication !== 'published')) throw new Error(`Unpublished content reference: ${id}`);
  return record;
}
export function getMedia(id: string, locale: Locale) {
  const media = requireVisible(mediaRecords.find(record => record.id === id), id);
  const variants = [...media.variants].sort((a, b) => a.width - b.width);
  const largest = variants.at(-1);
  if (!largest) throw new Error(`No media variants: ${id}`);
  const prefix = (process.env.MEDIA_URL_PREFIX || '/media/').replace(/\/?$/, '/');
  if (prefix !== '/media/' && !prefix.startsWith('https://')) throw new Error('MEDIA_URL_PREFIX must be /media/ or an HTTPS origin');
  const source = requireVisible(sourceRecords.find(record => record.id === media.sourceId), media.sourceId);
  return { id, src: prefix + largest.path, srcset: variants.map(v => `${prefix}${v.path} ${v.width}w`).join(', '),
    width: largest.width, height: largest.height, alt: media.alt[locale], caption: media.caption[locale],
    credit: media.credit[locale], rights: media.rights[locale], focalPoint: media.focalPoint,
    title: source.title[locale], description: source.description[locale], sourceId: source.id,
    href: route(locale, 'archive', source.id), role: media.role };
}
export type MediaView = ReturnType<typeof getMedia>;
export function getAllMedia(locale: Locale) {
  return mediaRecords.filter(m => m.publication !== 'draft').map(m => getMedia(m.id, locale));
}
export function getTimeline(locale: Locale) {
  return ((catalog as unknown as { events?: TimelineRecord[] }).events ?? []).map(event => ({
    ...event, title: event.title[locale], description: event.description[locale],
  }));
}
export function getSources(locale: Locale) {
  return sourceRecords.filter(s => s.publication !== 'draft').map(source => {
    requireVisible(source, source.id);
    return { ...source, title: source.title[locale], description: source.description[locale],
      citation: source.citation[locale], repository: source.repository[locale],
      category: source.category?.[locale], transcript: source.transcript?.[locale], evidenceNote: source.evidenceNote?.[locale],
      media: source.mediaId ? getMedia(source.mediaId, locale) : undefined, href: route(locale, 'archive', source.id) };
  });
}
export function getPeople(locale: Locale) {
  return personRecords.filter(p => p.publication !== 'draft').map(person => {
    requireVisible(person, person.id);
    return { ...person, summary: person.summary[locale], biography: person.biography[locale],
      relationships: person.relationships.map(r => ({ ...r, label: r.label[locale] })),
      href: route(locale, 'people', person.id) };
  });
}
export function getPlaces(locale: Locale) {
  return placeRecords.filter(p => p.publication !== 'draft').map(place => {
    requireVisible(place, place.id);
    return { ...place, name: place.name[locale], description: place.description[locale] };
  });
}
export type Chapter = { entry: CollectionEntry<'chapters'>; data: CollectionEntry<'chapters'>['data']; href: string; media: MediaView };
export async function getChapters(locale: Locale): Promise<Chapter[]> {
  const entries = await getCollection('chapters', ({ data }) => data.locale === locale && data.publication !== 'draft');
  const keys = new Set(entries.map(e => e.data.key));
  const slugs = new Set(entries.map(e => e.data.slug));
  const orders = new Set(entries.map(e => e.data.order));
  if (entries.length !== 5 || keys.size !== 5 || slugs.size !== 5 || orders.size !== 5) throw new Error(`Expected five unique chapters in ${locale}`);
  if (new Set(entries.map(e => e.data.mediaId)).size !== 5) throw new Error(`Each ${locale} chapter needs its own lead image`);
  for (const person of personRecords.filter(p => p.publication !== 'draft')) for (const key of person.chapterKeys) if (!keys.has(key)) throw new Error(`Unknown chapter ${key} on person ${person.id}`);
  return entries.sort((a, b) => a.data.order - b.data.order).map(entry => {
    requireVisible({ id: entry.id, publication: entry.data.publication }, entry.id);
    if (!isPreview && entry.data.translation !== 'reviewed') throw new Error(`Unreviewed translation: ${entry.id}`);
    for (const id of entry.data.sourceIds) requireVisible(sourceRecords.find(r => r.id === id), id);
    for (const id of entry.data.personIds) requireVisible(personRecords.find(r => r.id === id), id);
    for (const id of entry.data.placeIds) requireVisible(placeRecords.find(r => r.id === id), id);
    const galleryIds = entry.data.galleryIds;
    if (new Set(galleryIds).size !== galleryIds.length || galleryIds.includes(entry.data.mediaId)) throw new Error(`Repeated chapter imagery: ${entry.id}`);
    const media = getMedia(entry.data.mediaId, locale);
    const gallery = galleryIds.map(id => getMedia(id, locale));
    const sourceIds = [...new Set([...entry.data.sourceIds, media.sourceId, ...gallery.map(m => m.sourceId)])];
    return { entry, data: { ...entry.data, sourceIds }, href: route(locale, 'chapters', entry.data.slug), media };
  });
}
export async function equivalentChapter(key: string, locale: Locale) {
  const chapter = (await getChapters(locale)).find(c => c.data.key === key);
  if (!chapter) throw new Error(`Missing ${locale} chapter translation: ${key}`);
  return chapter.href;
}
