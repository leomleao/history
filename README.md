# Panzonato

A bilingual family-history exhibition: five chapters, people, and a selected archive. Astro renders complete English and Brazilian Portuguese editions. Progressive interactions add animated chapter previews, a place explorer, an expandable timeline, searchable archive filters, and full-image inspection. Family profiles link generations through cited relationships.

This is the approved design implemented as a **local preview**. The exhibition draws on a full local archive audit, with primary family records separated from historical context and contemporary return photographs. Translations and publication rights still need final editorial review. Preview builds are marked `noindex`; `PUBLICATION_MODE=published` rejects unreviewed records. Cardross is a separate project.

The expanded edition presents 31 distinct media items, 46 sources, ten historic profiles, and twelve timeline moments. The [archive audit](ARCHIVE_AUDIT.md) documents 193 distinct items in the broader holdings and the corrections made during selection.

## Run the local Docker edition

Requires Docker Desktop / Compose. Default URL: **http://localhost:18775/en/** (Portuguese: **http://localhost:18775/pt-br/**).

```sh
npm ci
npm run media:validate
# Once the separate published media folder is available:
docker compose up -d --build
```

The container binds to loopback for local testing. The approved disposable reference remains on port 18774, independently of this application.

Media is **not in Git, the Docker build context, or the application image**. The checkout builds without it; image display requires a separate read-only mount. By default that is `media/published/exhibition/`. On another machine, transfer that folder independently, or set `MEDIA_ROOT` in `.env` to your server's published-media directory. Do not point it at the original archive.

Copy `.env.example` to `.env` to override the port, media directory, site origin, or publication mode. `SITE_URL` controls canonical and language-alternate links at build time. Use a reverse proxy on your server for the final hostname/TLS. No public deployment or Git push is part of this local implementation.

## Develop and verify

Node 22.12+ (Node 24 recommended):

```sh
npm ci
npm run dev          # Astro at localhost:4321; /media proxies to Docker on 18775
npm run check        # Astro / TypeScript diagnostics
npm test             # Publication boundaries, references, translation, media integrity
npm run build        # Validates metadata, types, pages, links and JavaScript budget
npm run media:validate
```

`npm run build` requires only versioned text and manifest metadata. It verifies generated internal links and fragments, equivalent-language metadata, page language, absence of archive binaries/private paths, and a 100 KB gzip JavaScript ceiling. Browser review notes are in [REVIEW.md](REVIEW.md).

## Edit the exhibition

- `src/content/chapters/{en,pt-br}/*.md`: chapter prose and validated frontmatter. Keep the same stable `key` in both editions; their URL slugs may differ. Each chapter needs a distinct lead image and a non-repeating `galleryIds` selection.
- `src/data/catalog.json`: selected people, places, and sources. Relationships and timeline events require source references. Sources may be illustrated records or text-only references; uncertain dates belong in evidence notes, not invented precision.
- `src/data/media.json`: public metadata and checksums for separate content-versioned media variants. Never add original filesystem paths here.
- `src/lib/ui.ts`: localized interface copy.
- `src/styles/global.css`: the approved paper/ink/red/blue visual system and responsive layouts.
- `src/scripts/exhibition.ts`: optional interactions. All reading and record routes remain usable without JavaScript.

Incoming research remains outside these public build inputs. See [the research handoff](work/design-review/RESEARCH_HANDOFF.md), [the plan](PLAN.md), and [media operations](MEDIA_STORAGE.md).

## Prepare selected media

Preparation is an explicit offline operation using Sharp, never part of a website build. The local ignored `media/ingest.json` names the chosen input files and their intended public metadata; its `input` paths are relative to that file. The script strips image metadata, preserves the original separately, writes responsive WebP variants without enlargement, and emits a manifest with dimensions, sizes, and SHA-256 checksums.

```sh
npm run media:prepare -- --input media/ingest.json --output media/published/exhibition --manifest src/data/media.json
npm run media:validate
```

Keep old content-versioned files while releases that reference them can be rolled back. Back up media independently of the repository. Before publication, review the narrative, translations, source credits, and rights; mark those records `published`, mark translations `reviewed`, validate the media on the server, and build with `PUBLICATION_MODE=published` and the real `SITE_URL`.

## Fonts

Newsreader and DM Sans are self-hosted from locked Fontsource packages. Their OFL licenses are included under `public/licenses/` and linked from About. No third-party font request is needed to read the site.
