# History — the shared entrance

**Status: implemented and verified in local Docker.** The user requested a pending Cardross entrance and direct Panzonato URLs under `/panzonato/{locale}/`. Those decisions supersede the earlier route and availability proposals below. See [the implementation review](HISTORY_LANDING_REVIEW.md) for agent outcomes and validation evidence.

This page introduces two independent exhibitions: Panzonato family history and Cardross House and Estate. It develops the shared-entrance decision recorded in [the discussion](work/design-review/DISCUSSION.md), without replacing [the Panzonato plan](PLAN.md). The Cardross exhibition remains owned by its existing agent. Current work on the boat is outside this plan.

## 1. The concept

**Two large visual invitations, composed like the opening spread of a book.**

The visitor should immediately understand that one exhibition follows a family and the other explores a place. Both deserve equal prominence. The page should feel personal, carefully researched, and inviting to someone who knows neither history.

Keep the shared entrance short: an introduction, two exhibition entrances, and a small project note. The deeper storytelling begins after the visitor chooses.

## 2. Page composition and proposed copy

### A quiet header

Working wordmark: **History**. Place the English / Português language switch opposite it. There is no exhibition-specific navigation here: chapters, people, and archives belong inside their respective sites.

### A memorable introduction

**Lives leave traces.**

“Follow a family from Italy to Brazil, or explore the history of Cardross House and its landscape.”

Set the headline in a large Newsreader face, with generous space and a short supporting line. On a typical desktop, the introduction and both entrance buttons should fit in the first viewport.

### Two exhibition entrances

| Element | Panzonato | Cardross |
| --- | --- | --- |
| Small location line | Italy · Brazil | Menteith · Scotland |
| Title | Panzonato | Cardross |
| Description | Eight names in an arrival record. Generations of lives beyond it. | A house, a landscape, and the people who shaped them. |
| Main action | **Explore Panzonato history** | **In progress** — a noninteractive status until the exhibition is ready |
| Image direction | An authentic historical photograph connected to the exhibition, with a carefully chosen documentary detail | A verified view of the house or estate landscape, selected with the Cardross agent |
| Accent | Existing iron red | Muted woodland green, used only on this shared entrance |

These are two broad editorial panels with real image area, substantial titles, and visible buttons. Use a fine central rule and generous gutters rather than rounded dashboard cards. Keep text and buttons on solid paper so their readability does not depend on the photographs.

The Panzonato panel uses one native link styled as its button. Hovering or focusing that link can activate the associated visual treatment. Cardross has a visible, noninteractive status and a short explanation that its exhibition is being prepared. Avoid duplicate keyboard stops, nested links, click-only panel containers, or a link to an unavailable Cardross site.

### A small closing note

“Two independent histories, explored through photographs, maps, documents, and the traces people leave behind.”

Add a discreet image-credits disclosure and authorship credit once supplied. The page does not need a featured-story feed, statistics, a combined chronology, or a search interface at this stage.

All copy above is proposed English copy. Prepare an equivalent Brazilian Portuguese edition before implementation review; retain the names Panzonato and Cardross in both languages.

## 3. Art direction and interaction

Preserve the approved **Newsreader / DM Sans** typography and warm paper, dark ink palette. Let the exhibitions' imagery provide the distinction. Each destination retains its own visual identity after navigation.

- **On entry:** a single, short reveal of the introduction and the two panels, roughly 400–600 ms overall. Content remains visible if JavaScript fails.
- **On hover or keyboard focus:** a gentle image enlargement, no more than about 2%, and a modest change in the button and accent rule. Nothing shifts the surrounding layout.
- **Documentary detail:** if suitable material exists, reveal a small, accurately captioned detail within the image area: handwriting for Panzonato, an estate-map detail for Cardross. This is optional decoration; it never conceals essential information or adds a third navigation choice.
- **On navigation:** use ordinary browser navigation immediately. Do not make readers wait for an exit animation or depend on animation support between separate sites.
- **On touch screens:** keep descriptions and actions visible. Touch users receive the complete experience without hover.
- **Reduced motion:** render the finished composition with static images. No automatic image cycling, continuous drifting, custom cursor, or looping background animation.

No upward or diagonal arrow decorations. No ship animation on the shared entrance; the crossing remains a discovery within Panzonato.

### Image selection

Visually inspect both candidates before choosing crops. Earlier notes warn that the existing file named `cardross_estate.webp` shows a night sky and trees, not a clear house portrait; its filename is not sufficient evidence for using it as the entrance image.

Use genuine selected material, with dates, context, and credit available. A contemporary view must be identified as contemporary. Avoid repeating Panzonato's opening image if another strong historical image can give the entrance its own identity. Keep originals and responsive derivatives in the separate, ignored media folder; version only metadata and code.

## 4. Mobile composition

Stack Panzonato and Cardross in that order, with equal title size, button treatment, and image proportions. Keep the introduction compact and each image relatively shallow; one exhibition must not occupy an entire screen before the other becomes discoverable.

Use at least 44 px touch targets, clear keyboard focus, ordinary document scrolling, and comfortable text wrapping at 360 px. At 200% text size, let the page grow naturally. Do not force a fixed-height hero or truncate descriptions to preserve the desktop composition.

## 5. Architecture and routing

Implement the entrance as a small static Astro page in this repository. It connects the exhibitions through links; it does not import Cardross components, data, build tools, or deployment configuration.

Replace the former Panzonato language chooser at `/` with the shared entrance. Give the exhibition its own namespace, and redirect legacy links to their equivalents:

| Destination | Proposed route or configuration |
| --- | --- |
| Shared entrance, English | `/` |
| Shared entrance, Portuguese | `/home/pt-br/` |
| Panzonato, English | `/panzonato/en/` |
| Panzonato, Portuguese | `/panzonato/pt-br/` |
| Panzonato language entrance | `/panzonato/` |
| Legacy exhibition links | `/en/**` and `/pt-br/**` redirect to the same path under `/panzonato/` |
| Cardross | In progress; no destination link until its independent exhibition is ready |

Use a small exhibition registry containing each exhibition's ID, localized title and description, availability, destination URLs when available, and cover-media ID. A future Cardross destination can use an independent hostname. Only add its actual URLs and supported languages when the exhibition is ready.

Create a dedicated `HistoryLayout.astro` and scoped landing styles. The current `BaseLayout.astro` adds Panzonato branding, its navigation, a reading-progress bar, and exhibition JavaScript; the entrance should have its own lightweight layout. Reuse font files and a small set of visual tokens without restyling the exhibition.

Add an unobtrusive **All histories** link inside Panzonato during implementation, and offer the same return-link URL to the Cardross agent. This is a navigation contract, not a requirement to change Cardross's internal architecture.

Keep the existing Docker setup and separate read-only media mount. Local and production links must be configured independently so a public build cannot accidentally send readers to localhost. Preserve the existing preview `noindex` policy. Extend output checks to cover the new hub's language, canonical links, media references, and navigation.

## 6. Directions considered and discarded

| Direction | Why it is not the recommendation |
| --- | --- |
| Full-screen split with two cinematic background videos | Strong atmosphere, but heavier media and constant motion compete with the simple choice. Still photography gives both histories room to breathe. |
| Interactive globe connecting Italy, Brazil, and Scotland | Suggests a geographic or historical connection that has not been established, and makes choosing a story harder. |
| Archive dashboard with search, filters, and record counts | Useful deeper inside an exhibition; gives a newcomer little reason to care about either story. |
| Elaborate desk with scattered photographs and documents | Can feel intimate, but overlaps, rotations, and decorative aging make the two destinations less clear, especially on phones. |

The recommended opening spread retains atmosphere and tactile archival detail while making the two main actions obvious.

## 7. Delivery and review

1. Select and visually verify the two cover images. The Cardross archive's `AST-000110`, credited through `SRC-000012`, is an 1862 photograph of the house; keep its derivatives separate from the Panzonato archive manifest.
2. Implement the approved composition through Orca-coordinated workers. The user's approval authorizes implementation directly; a further disposable-preview approval is not required.
3. Implement the dedicated layout, Panzonato link, pending Cardross panel, localized copy, and return navigation. Migrate the exhibition routes and preserve legacy links. In the voyage component, only source-link routing expressions may change; preserve its design, script, geometry, and styles.
4. Verify in local Docker: the Panzonato button reaches the correct edition, Cardross is clearly pending, legacy links redirect correctly, language choices behave as labeled, browser Back works, media loads, and the page remains usable without JavaScript and with reduced motion.
5. Check 360 px, tablet, and desktop layouts; keyboard access; 200% text size; metadata; and the existing Panzonato navigation. Reuse the project's build and validation commands. No new runtime library is needed for this page.

**Complete when:** the coordinator has reviewed desktop and mobile rendering, verified direct and legacy Panzonato navigation, confirmed Cardross's pending state, and checked that the boat implementation is preserved. The Cardross application itself remains outside this work.
