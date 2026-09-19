# Panzonato animated voyage, timeline and archive review — 19 September 2026

The subsequent shared entrance and `/panzonato/{locale}/` migration are reviewed in [HISTORY_LANDING_REVIEW.md](HISTORY_LANDING_REVIEW.md). The legacy URLs in this earlier report now redirect to the corresponding Panzonato pages.

The expanded exhibition is running at **http://localhost:18775/en/** and **http://localhost:18775/pt-br/**. Start with the [animated Atlantic crossing](http://localhost:18775/en/#crossing-voyage), explore the [interwoven historical timeline](http://localhost:18775/en/#timeline), or start with [Fosca and six children at sea](http://localhost:18775/en/stories/fosca-six-children-at-sea/), then follow the crossing chapter or explore the historical collections. The approved typography, palette, motion, and image inspection remain in use.

## What changed

- **The supplied historical map now carries an animated Genoa–Santos crossing inside “Eight names. One crossing.”** A tilted atlas plate, overhead steamship and traced route sit beside the eight-person roster. Play/Pause, Replay, a progress scrubber, four port stops and a flat view work in both languages. The original 1903 scan remains unchanged and separate; its responsive Atlantic crop has an archive entry and clear historical framing.
- **The family chronology now sits within the wider history.** Flooding, grain competition, taxation, global coffee demand, recruitment, passage subsidies, shipping and abolition each have a dated entry, a concrete consequence and source links. Family / Wider world filters work in both editions, with complete reading available without JavaScript.
- **Fosca leads the homepage's new narrative section.** Her six children's names and recorded ages make the ordinary demands of care at sea tangible. The story identifies this as a conditional historical reconstruction, grounded in the household record and period sources.
- **Nine stories in both languages:** Fosca, the Colombo, three attributed interview excerpts, an emigrant's letter, a passage ticket, Venice in 1891, and the eight-name family entry. Original quotations retain their attribution; useful translations open through native keyboard-accessible disclosures.
- **Deeper origins, crossing, and Brazil chapters**, using the user-selected historical monograph as the narrative arc and checking individual claims against stronger evidence. The crossing is about 1,030 words per edition; origins and Brazil are about 800–850. The other two chapters continue through the generations and return visits.
- **33 historical media additions**, bringing that edition to 64 distinct items: the actual Colombo photographed after its 1901 refit, old tickets and dossier sheets, Venice, shipboard scenes, the immigrant hostel, agricultural work, and Capivari. The supplied atlas adds a 65th media item; fourteen timeline references and the atlas bring the source catalog to 97.
- **Six historical collections with 47 unique image placements.** Venice, at sea, passage papers, arrival, work, and Capivari each have a distinct cover and ordered image essay. No image repeats within or across these collections. All nine story entrances have different lead images; the homepage imagery and selectable chapter leads remain distinct.
- **270 static pages** across English and Portuguese, with equivalent-language links, source citations, related chapters, and onward navigation. Ten historic profiles and 25 expandable timeline moments are available: 12 family milestones and 13 historical events.

The source notes distinguish the family's documented dates and places from the wider immigrant experience. The 1891 entry records Rio de Janeiro as provenance and Tietê as destination; exact boarding port, passage duration, assigned accommodation, and health at sea remain unestablished. The Colombo image is explicitly dated 1901. The displayed family entry is the 2002 certified extract of the 1891 record. Interview and letter writers are not presented as Panzonato relatives.

## Checkpoint and repository boundaries

The previous edition was committed as **`d6b4c0a` — Build bilingual Panzonato exhibition with audited archive** before this expansion. The local signing attempt failed because GPG could not launch pinentry; the checkpoint used a one-off unsigned commit without changing Git configuration. This expansion is the next local checkpoint. No Git push occurred.

All 46 baseline source objects and all 31 baseline media objects were preserved exactly during integration. Source fragments were merged additively by ID. Images and documents remain in ignored external media storage, excluded from Git, the Docker build context, and the application image. The original research repository was read only. Cardross was outside scope.

## Orca task outcomes

Implementation used Orca-coordinated GPT-5.6 Sol workers. Every task settled successfully; reused terminals transferred to a fresh dispatch, then were released. The final reclaimable-worker query returned no workers and no active dispatch remained.

| Task | Outcome and evidence |
| --- | --- |
| Initial stories and testimony | Succeeded. Seven bilingual stories and the Costantin source, with primary transcription checks, in `work/implementation/living-archive/EDITORIAL_REPORT.md`. |
| Historical media expansion | Succeeded. 33 visually inspected additions, six collections, 33 additive visual sources, preserved baseline metadata, and 168 validated derivatives. Evidence in `MEDIA_REPORT.md` and `MEDIA_EVIDENCE.json`. |
| Family narrative expansion | Succeeded. Two further stories and six rewritten chapter editions, checked family facts and exact quotations, with Rossini and Ongania source references. Evidence in `FAMILY_NARRATIVE_REPORT.md`. |
| Image repetition correction | Succeeded. Nine distinct story leads, five distinct chapter leads per locale, and no chapter lead duplicated in its gallery. Recorded in the narrative report's final section. |
| Frontend and integration | Succeeded. New bilingual story/collection routes, early Fosca entrance, translated excerpts, source lists, responsive layouts, publication/reference validation, and additive integration. Evidence in `FRONTEND_REPORT.md`. |

The historical timeline used a separate Orca run with three successful tasks:

| Task | Outcome and evidence |
| --- | --- |
| Historical timeline content | Succeeded. Added the initial dated context and source records; verified Italian and Brazilian sources. |
| Interwoven timeline interface | Succeeded. Bilingual filters, counts, all citations, stable date sorting, native disclosures, phone layouts and validation; `work/implementation/historical-timeline/FRONTEND_REPORT.md`. |
| Historical consequence and source review | Succeeded. Added world coffee demand, made consequences concrete, corrected shared date labels and the flood reference, and preserved the earlier 82 sources and 12 family events; `work/implementation/historical-timeline/CONTENT_REPORT.md`. |

The content terminal was reused for the review task. Both terminals were then released; no active dispatch or reclaimable worker remained.

The animated-map work used four successful Orca tasks across three GPT-5.6 Sol workers:

| Task | Outcome and evidence |
| --- | --- |
| Historical map preparation | Succeeded. Original preserved, four content-hashed derivatives and a visually calibrated sea corridor; `work/implementation/animated-voyage/MEDIA_REPORT.md`. |
| Voyage interface | Succeeded. Bilingual component, calibrated animation, progressive controls and source framing; `FRONTEND_REPORT.md`. |
| Visual polish | Succeeded. Bounded atlas scene, meaningful tilt, overhead ship, usable phone scrubber and visibility-gated playback; `POLISH_REPORT.md`. |
| Image lifecycle correction | Succeeded. Persistent image event handling, cached-failure detection and recovery after responsive source changes; `IMAGE_LIFECYCLE_REPORT.md`. |

The coordinator integrated the map source/media records, excluded the download folder from Git and Docker, and reviewed the production build independently. The final visual check also found a fallback layer showing through the tilted map: it now renders only in the explicit error state. The last browser pass verified successful image recovery visually and through DOM checks. All dispatches settled; the reused terminal transferred to its final task and was released. No active dispatch or reclaimable worker remains.

The detailed worker reports remain under ignored `work/implementation/living-archive/`. The coordinator reviewed the prose, source joins, captions, implementation, and complete local Docker experience independently. Earlier repository audit reports remain under `work/implementation/research-audit/`; [ARCHIVE_AUDIT.md](ARCHIVE_AUDIT.md) records the broader 193-item holdings audit.

## Verification

| Check | Result |
| --- | --- |
| Docker production build | Passed: 270 pages and 6,174 internal links/fragments verified |
| Astro / TypeScript | Zero errors, warnings, or hints |
| Automated unit checks | All 18 passed |
| Client script | 5,876 bytes gzip |
| External media | 172 WebP variants, 24,651,704 bytes; dimensions, sizes, and SHA-256 checksums verified |
| Earlier story/collection browser checks | 79 passed: both editions of every story and collection, unique imagery, source navigation, original/translation controls, document zoom, Escape, focus/scroll restoration, and no-JavaScript reading |
| Historical timeline browser checks | 46 passed: EN/PT event counts, ordered chronology, all three filters, pressed states and live counts, keyboard disclosures, every citation/related chapter, flood source navigation, reduced motion, no-JavaScript reading and no uncaught errors |
| Historical timeline responsive checks | 20 passed: both languages at 360/768/1440px with all disclosures expanded and every filter, plus 200% enlarged text at 360px; no horizontal overflow or clipped tested content |
| Animated voyage interaction checks | 53 passed: both locales, viewport autoplay, pause, keyboard scrub, all four port jumps/context, tilt/flat, replay, offscreen suspend/resume, completion without looping, source links, reduced motion, no-JavaScript and missing-image behavior; hidden-document lifecycle exercised with an explicit visibility-state simulation |
| Animated voyage layout checks | 29 passed: both locales at 360/768/1440px, actual loaded map visibility, contained controls, 44px buttons, readable labels, usable phone scrubber, bounded desktop card and 200% Portuguese text |
| Map image lifecycle | Six passed: pending lazy image, load after scrolling, real 404 fallback, successful retry, stale-error clearing and later source change preserving port context |
| Existing interaction regression | 31 passed: chapter previews, place changes, timeline, archive filters/search, family links, document viewer, reduced motion, and no-JavaScript fallbacks |
| Earlier whole-site responsive checks | 45 page/viewport combinations at 360, 768, and 1440 pixels; no horizontal overflow or clipped tested headings/navigation |
| Earlier whole-site enlarged text | Four Portuguese layouts at 200% root text and 360px width; no horizontal overflow |
| Browser errors | No uncaught errors during the interaction checks |
| Container | Healthy; UID 101; read-only root; selected media mounted read-only; loopback port 18775 |
| HTTP | EN/PT pages 200; unknown routes and raw archive paths 404; media directory listing denied; range request 206; immutable media caching |
| Git boundaries | No archive image, PDF, video, ZIP, raw-media folder, or research folder among tracked/unignored candidates; `git diff --check` clean |

Visual inspection covered the animated map in English and Portuguese at desktop and phone widths, with the actual image visible, the eight-person roster preserved, and controls usable. The final map card is about 873px tall at 1440×1000; the phone scrubber is about 257px wide. Earlier visual inspection also covered the English and Portuguese timeline at desktop and phone widths, including the expanded flood entry. Earlier inspection covered the desktop and phone homepage, Fosca story, story index, collections index, ship collection, and Portuguese passage-paper collection. Source lists use compact citations rather than repeating large images; text-only stories are not styled as invented quotations. Navigation says “Continue reading”; no recording is implied where only a transcript exists.

## Loading measurement

The following measurement is from the preceding stories/collections edition, before the timeline and animated-voyage expansions. Chromium against local Docker, three cold-cache runs: 360×800 CSS pixels, DPR 2, CPU slowdown ×4, 150 ms latency, 1.6 Mbps download, and 0.75 Mbps upload. LCP readings were **2,184 ms, 2,188 ms, and 2,192 ms**; median **2.19 seconds**. CLS was **0.0148** in each run. Each initial view requested eight resources and transferred approximately 564 KB. These are local lab measurements, not production-server or physical-handset measurements.

Browser scripts and detailed results are in ignored `work/implementation/animated-voyage/`, `work/implementation/historical-timeline/`, `work/implementation/living-archive/` and `output/playwright/`. The Docker preview remains running for review. Media remains separate and uncommitted. This is still the local preview edition; the existing publication gate continues to reject unreviewed records.
