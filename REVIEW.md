# Panzonato expanded exhibition review — 19 September 2026

The expanded exhibition is running locally at **http://localhost:18775/en/** and **http://localhost:18775/pt-br/**. It retains the approved typography, palette, motion, and image inspection, while replacing the original small fixture set with material from the repository. The disposable design reference remains on port 18774.

## What changed

- **Five substantive chapters in both languages**, following Gambarare, the eight-person household in the Colombo entry, life in Capivari, later generations, and the 2023–2024 return photographs. Chapter bodies are approximately 465–550 words each, with citations, distinct leads, supporting galleries, and related people.
- **31 distinct selected media items and 46 sources**, spanning family documents, period illustrations, maritime scenes, work, railways, and return photographs. The homepage's nine image placements are distinct; the five chapter leads are distinct. Source lists use citations rather than duplicating gallery thumbnails.
- **Ten historic profiles**, grouped by generation and connected through sourced relationship links. No unrelated period group is presented as a family portrait.
- **Twelve expandable timeline moments** with direct chapter and source links. The arrival roster introduces Giuseppe, Fosca, and six children by name and age.
- **Searchable archive with four source types**: 15 family records, 17 historical-context sources, six return-visit sources, and eight text references. Search ignores accents, combines with filters, and has a useful empty state. All records remain visible without JavaScript.
- **134 static pages**, including both complete language editions and equivalent-language navigation. The larger archive remains external to the application image.

The repository audit resolved 780 physical representations into **193 distinct archival items** and visually inspected 104 images. [ARCHIVE_AUDIT.md](ARCHIVE_AUDIT.md) records the scope, category totals, corrected captions, and documentary findings.

## Orca task outcomes

Three GPT-5.6 Sol workers were coordinated through Orca, with their terminals reused for implementation and then released. Every dispatched task succeeded; no task remains blocked or pending.

| Task | Outcome and evidence |
| --- | --- |
| Historical narrative audit | Succeeded. Forty bilingual facts and fifty chapter opportunities, with source references and disputed claims, in local HISTORY.md and history-facts.json. |
| Genealogy audit | Succeeded. Ten historic profiles, family relationships, twelve timeline moments, and record-level corrections in local PEOPLE.md and people-facts.json. |
| Media and catalog audit | Succeeded. 193 distinct items, 104 visual inspections, catalog-link reconciliation, and exhibition selections in local MEDIA.md, media-inventory.json, and selected-media.json. |
| Chapter implementation | Succeeded. Ten bilingual chapter files with citations, unique leads, and supporting galleries; HISTORY_IMPLEMENTED.md records the delivery. |
| People and source implementation | Succeeded. Integrated profiles, relationships, sources, places, and timeline data; PEOPLE_IMPLEMENTED.md records the checks. |
| Media implementation | Succeeded. 31 curated media items and 96 validated derivatives, with corrected captions and an external ingest index; MEDIA_IMPLEMENTED.md records preparation. |
| Final narrative polish | Succeeded. All ten chapters rewritten around people, places, documents, and work; frontmatter/reference validation and zero Astro diagnostics reported in HISTORY_POLISHED.md. |

Detailed worker reports and Orca receipts remain under ignored `work/implementation/research-audit/`. The coordinator integrated the page components, validated source joins, refined metadata, and performed the independent browser/Docker review. Orca's final reclaimable-worker query returned none.

## Verification

| Check | Result |
| --- | --- |
| Astro / TypeScript | Zero errors, warnings, or hints |
| Production Docker build | 134 pages; 3,046 internal links and fragments validated |
| Unit checks | All 12 passed: publication boundaries, text-only sources, sourced timeline/relationships, translations, private paths, path traversal, checksums, dimensions, missing files, and symlink containment |
| Client script | 3,706 bytes gzip; below the 100 KB budget |
| External media | 96 content-versioned files, 11,930,890 bytes; dimensions, byte sizes, and SHA-256 checksums verified |
| Browser interaction checks | 31 passed, including five chapter previews, three place states, timeline links, all filters, search, family links, document inspection, focus/scroll restoration, reduced motion, and no-JavaScript fallbacks; five final checks also passed for the selected preview image, focus return, card typography, generations gallery, and reproduction caption |
| Responsive layouts | 36 page/viewport combinations at 360, 768, and 1440 pixels; no horizontal overflow or clipped tested headings/navigation |
| Enlarged text | Portuguese home, archive, and person profile at 200% root text and 360px width; no horizontal overflow |
| JavaScript disabled | Five chapter links, substantive chapter prose, all 46 archive records, and direct full-document image access work |
| Browser errors | No uncaught errors during the interaction review |
| Container | Healthy; UID 101; read-only root; only selected published media mounted, read-only; loopback port 18775 |
| HTTP | EN/PT-BR home 200; unknown routes/media and raw archive paths 404; media directory listing denied; range request 206; immutable caching for content-versioned media |
| Repository boundaries | No archive images, PDFs, videos, ZIPs, raw research, or media folders among tracked/unignored files |

Desktop and mobile screenshots cover the opening, chapter selector, place explorer, timeline, collection cards, people, chapter, and source pages. Visual review corrected an inherited heading selector that enlarged collection card titles. It also clarified that the displayed immigration facsimile is the **2002 certified extract of the 1891 record**, rather than the original ledger sheet. Opening-date wording for the Hospedaria was checked against the [Museu da Imigração's account of its first arrivals in 1887](https://museudaimigracao.org.br/exposicoes/temporarias/hospedaria-130).

The document-close check waits for the native dialog's asynchronous `close` event before assessing restored scroll position. A diagnostic confirmed exact restoration after that event; no artificial delay was added to the application.

## Loading measurement

Chromium against local Docker, three cold-cache runs: 360×800 CSS pixels, DPR 2, CPU slowdown ×4, 150 ms latency, 1.6 Mbps download, and 0.75 Mbps upload. LCP readings were **2,156 ms, 2,180 ms, and 2,156 ms**; median **2.16 seconds**. CLS was **0.049** in each run. Each initial view requested eight resources, transferring approximately 385 KB. These are local lab measurements, not measurements of a production server or physical handset.

Screenshots and detailed CLI results remain in ignored `output/playwright/`. The refreshed exhibition is open in Orca's browser.

## Remaining publication work

This is a local preview with substantially expanded, sourced content. Final translation and reproduction-rights review remain before public release; `PUBLICATION_MODE=published` rejects unreviewed records. Original research holdings were read only. Full modern descendant records and the handwritten tree containing living relatives were not published as facsimiles. Media remains separate and uncommitted. No public deployment or Git push occurred.
