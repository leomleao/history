# Panzonato — research-to-website handoff

This is a proposed input contract for later implementation. Research gathering remains with the user's research agents. No data collection is requested or performed by this document.

## Division of responsibility

Research work produces evidence, relationships, captions, and qualified findings. Website work turns a selected, reviewed subset into narrative and exploration. Research agents do not need to write presentation components, choose layouts, or copy entire folders into public assets.

Keep source workspaces read-only from the website workflow. Export to a separate incoming area; only reviewed text and public metadata become site build inputs. The user selected Docker hosting with media outside Git and the application image. See [MEDIA_STORAGE.md](../../MEDIA_STORAGE.md).

## A useful research contribution

For each proposed story item, supply:

- A stable ID and record type: person, place, event, source, or media.
- The supported statement, with language identified.
- Source references precise enough to inspect: URL or repository/call number, relevant page or image region, and transcription where useful.
- A qualification: documented, attributed memory, contextual material, interpretation, disputed, or unresolved. Explain the qualification in words; do not manufacture a numerical confidence score.
- Related stable IDs. Preserve spelling variants as aliases rather than creating duplicate people automatically.
- Dates with their actual precision: exact, approximate, range, or unknown.
- A proposed publication state. Newly received material is unreviewed until explicitly selected.

## Media

Supply the local original reference, source attribution, known rights/credit requirements, a proposed caption, an accessible description, and the image's role: family evidence, historical context, contemporary field photograph, or explicitly labeled illustration. A scenic image is not evidence that the family was present in it.

Record usable resolution and any suggested detail region without overwriting the original. Only selected public derivatives and permitted facsimiles should be copied into the website's published asset set. Documents may require a publication-specific redacted copy; leave that decision visible for review.

Store binaries in the ignored media folders or the configured external media root. The existing ignored `assets/` collection stays in place. The serving container will mount only `media/published/` (or its server equivalent), never the whole archive or originals folder. Do not add research media to `src/assets/` or `public/`.

Commit only reviewed, public metadata: stable IDs, relative public paths, variant sizes, dimensions, checksums, captions, credits, rights, and publication status. Keep absolute original file paths and private notes in an ignored ingest index. The media preparation step and the site build are separate operations.

## Narrative opportunities

Tag material with a proposed chapter: the world left behind, the crossing, life in Brazil, through generations, or looking back. These are editorial containers, not requirements to force every finding into a predetermined story.

Flag a concrete object, contrast, discovery, or open question that could make the item interesting to a newcomer. Do not invent motives or connective events to make a chapter work. Separate wider historical context from an assertion about a named individual.

## Translation

Keep factual IDs stable across languages. Supply language and translation status separately. Original-language transcriptions remain distinct from translations and editorial summaries. EN and PT-BR page editions can be prepared after the underlying account is settled.

## Publication validation

The later build should reject missing IDs, broken references, unpublished dependencies, public media without required credit/caption fields, and public URLs that point into incoming research or private source directories. A separate release check must verify published files and checksums against the media manifest. The public output should not contain research logs, unselected documents, or local filesystem paths.

This contract defines what the website can consume. It does not itself approve any existing file for publication.

## Implemented entry points

The site is now implemented. Chapter editions live in `src/content/chapters/en/` and `src/content/chapters/pt-br/`, with their frontmatter schema in `src/content.config.ts`. Keep each chapter's stable `key` identical across editions.

Selected people, places, and image sources live in `src/data/catalog.json`; source/media IDs are checked during the build. The public media manifest is `src/data/media.json`. Actual binaries and the private ingest index stay in the ignored external media folder. See `MEDIA_STORAGE.md` for the preparation and release commands.

The current fixtures are `publication: preview` and translations are `provisional`. Publication builds require `published` records and `reviewed` chapter translations. Use the existing record shapes and localized EN/PT-BR fields when replacing fixtures. Unknown IDs, draft dependencies, missing media variants, or unsourced relationship assertions fail validation. The current place selector introduces contextual images; do not treat it as a verified itinerary.
