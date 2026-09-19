# Shared history entrance and Panzonato routes — review

Reviewed locally on 19 September 2026. The shared entrance is implemented, with Panzonato available and Cardross explicitly **In progress**. The independent Cardross application was not changed.

## Open the local site

| Page | URL |
| --- | --- |
| History entrance | http://localhost:18775/ |
| Entrada em português | http://localhost:18775/home/pt-br/ |
| Panzonato, English | http://localhost:18775/panzonato/en/ |
| Panzonato, português | http://localhost:18775/panzonato/pt-br/ |
| Panzonato language choice | http://localhost:18775/panzonato/ |

Chapters, stories, people, collections and archive pages are directly addressable beneath `/panzonato/{locale}/`. Legacy `/en/` and `/pt-br/` links receive a permanent 308 redirect to their corresponding exhibition paths. Query strings and browser section fragments survive. Redirects use relative locations so Docker's internal port does not leak into public URLs.

## Design and media

The shared entrance uses an independent layout with the approved Newsreader / DM Sans fonts, warm paper palette, two historical photographs, finite entrance motion, and ordinary navigation. Panzonato has a native link; Cardross has a noninteractive availability label and explanation. Image credits open through a native disclosure. The page loads no client JavaScript.

The Cardross cover is the archive's 1862 house photograph, `AST-000110`, with attribution from `SRC-000012`. Three stripped, content-hashed derivatives remain in ignored external media storage, alongside the exhibition media. The source image was verified against its catalog checksum and left unchanged. The public metadata lives in an independent history manifest; Cardross records were not added to the Panzonato archive.

The first browser review found that the main action was below the desktop viewport and enlarged text caused overflow. A focused agent pass reduced spacing and the closing note, constrained intrinsic image sizes, and allowed narrow-screen text/header reflow. The coordinator repeated the checks against the rebuilt Docker site and visually inspected the final desktop, phone, and enlarged-text pages in both editions.

## Orca implementation outcomes

Run: `run_f3ed8b8c2401`. Four GPT-5.6 Sol workers, with one terminal reused for a fresh review-fix task. Requested and effective model settings matched on each fresh launch. Every task settled successfully, and every actual worker terminal was released; the original routing dispatch's retained bookkeeping row has no resource after reuse.

| Task | Outcome and evidence |
| --- | --- |
| Shared entrance — `task_96d04c01503c` | Succeeded. Dedicated bilingual layout, real images, pending Cardross, and ordinary Panzonato navigation. `work/implementation/history-landing/frontend-report.md`. |
| Panzonato route migration — `task_57df654b1c50` | Succeeded. Namespaced static pages, internal links, alternate-language metadata, Nginx redirects, and Astro development middleware. `routing-report.md`. |
| Cardross photograph — `task_2920699c5140` | Succeeded. Verified original, three external derivatives, bilingual attribution, publication gate, and shared-root media validation. `media-report.md`. |
| Landing layout polish — `task_6043598bb128` | Succeeded. Earlier desktop action, compact project note, mobile and enlarged-text reflow, and contextual Panzonato image caption. `polish-report.md`, followed by the coordinator's final Docker browser checks. |
| Routing validation review — `task_c51f7efb40dd` | Succeeded. Hub metadata checks, accurate translated-chapter handling, and useful route guards. Removed permanent boat hash assertions so future boat work remains possible. `routing-report.md`. |

All worker reports above are under ignored `work/implementation/history-landing/`. No unresolved implementation blocker remains.

## Coordinator verification

| Check | Result |
| --- | --- |
| Final Docker build | 272 static pages; 6,725 internal links/fragments validated |
| Astro / TypeScript | Zero errors, warnings or hints |
| Unit tests | 20 passed |
| Media integrity | 175 WebP variants; 24,930,770 bytes; hashes, dimensions, sizes and containment verified |
| Landing and navigation browser checks | 95 passed across EN/PT, including direct navigation, Back, language changes, pending Cardross, image loading, credits, reduced motion and no-JavaScript use |
| Responsive review | Both editions at 360, 768 and 1440 pixels; no horizontal overflow, minimum 44 px entrance targets, desktop action within 1440×900, and 200% root text at 360 px |
| Existing exhibition browser regression | 79 passed under the new namespace: stories, collections, unique images, source navigation, translated interview disclosure, image viewer, zoom, Escape, focus restoration and no-JavaScript reading |
| HTTP boundaries | Old links redirect; direct archive page returns 200; unavailable Cardross, unknown routes and raw assets return 404; media directory listing returns 403 |
| Browser errors | No uncaught errors during the landing and exhibition regression checks |
| Client JavaScript | No script on the entrance; 7,036 gzip bytes across the entire static site |
| Git boundaries | Media, original research and local review artifacts remain ignored; whitespace checks pass |

The boat's runtime script, CSS and route-data file remain byte-identical to the user's committed versions at `25d148e`. The only voyage-component edit imports the shared route helper and updates its two source-link expressions for the new namespace. Existing narrative changes in this task are limited to internal Markdown link destinations.

A supplemental animation smoke check loaded the map, preserved the roster, exercised the port controls, and confirmed the new source-link destinations. Its explicit playback-progress assertions did not pass consistently during automated scrolling; a separate Portuguese playback attempt did advance. The cause was not established, and no boat behavior was changed. This observation is separate from the passing landing/navigation and story/collection checks above; the smoke logs remain in `work/implementation/history-landing/browser-voyage*.log` for the ongoing boat work.

Browser scripts, detailed results and HTTP observations are in `work/implementation/history-landing/`; screenshots are in `output/playwright/history-hub-*`. The Docker preview remains running. This remains the noindex preview edition with the existing publication-review boundaries. The landing implementation and subsequent home-server deployment documentation are committed together; no public deployment or Git push was performed.
