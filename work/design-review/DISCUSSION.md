# History website — design discussion

Status: concrete revised plan and Panzonato design study prepared; awaiting final assumption review. PLAN.md now contains the draft proposal. Agy's original is preserved in PLAN.agy-original.md in this directory. The production website has not been implemented.

## Brief

Review Agy's PLAN.md, improve the concept, visual direction, content approach, and architecture. Research agents will gather the underlying material. Present discarded design directions and use grillme to settle consequential decisions before implementation.

Scope correction from the user: focus on the Panzonato website now. Another agent is creating Cardross. This work must not design, implement, or impose technical requirements on Cardross. The independent-exhibition concept remains useful context; detailed portal work is deferred.

## Findings from inspection

- Agy's original PLAN.md was principally a migration checklist: a portal, a long family page, and a Cardross teaser. It specified decoration before audience and visitor journeys.
- Its source preservation requirement is worth retaining. Both source research workspaces remain read-only.
- Four proposed font families, ornamental small caps, gold outlines, a crest, status badges, and record counts risk overwhelming the stories.
- The existing family page contains useful narrative material, but its nine chapters mix narrative episodes with reference tools such as a family tree, chronology, and archive.
- The existing hero line about carrying nothing but children and courage is an example of emotive copy that needs evidence or replacement; it should not be migrated automatically.
- The copied image named assets/cardross/cardross_estate.webp depicts a night sky and trees, not a clear house portrait. Filenames are insufficient for art direction. Asset selection should depend on actual image inspection and captions.
- The copied catalog includes living relatives and civil documents. The user selected public exhibitions with curated material only; research holdings stay outside the website.
- Asset compression estimates in PLAN.md are unverified. Eventual performance acceptance should measure page delivery and interaction, not total repository size.

## Current concept

User-selected structure: independent exhibitions sharing an entrance. Each exhibition has its own visual identity and navigation. The initial shared-journal proposal is superseded as the overall site structure; its visual study remains a useful candidate for the family exhibition.

The active concept is a standalone Panzonato exhibition for a curious newcomer, using selective immersion. The proposed warm documentary direction remains subject to the interview. The shared gallery is background context, and Cardross belongs to the user's other agent.

Story pages lead with a concrete scene, object, or question; evidence and wider context sit close to the passage they explain. A footnote can reveal an original without losing reading position. An archive record also gets its own shareable page.

## Directions considered

1. Living journal — initially recommended for the whole site; now a candidate for the family exhibition following the independent-exhibitions decision. Spacious typography, warm paper, documentary images, restrained red and landscape green. Drawback: needs strong image selection and editing.
2. Gilded museum — discard as the global design: solemn but ceremonious; weak fit for ordinary family lives. Borrow a sense of care and permanence.
3. Cinematic epic — discard as the global design: memorable entrance but difficult to skim, revisit, and extend. Borrow occasional immersive chapter openings.
4. Family scrapbook — discard as the global design: affectionate but faux aging can confuse evidence and decoration, and weakens the estate investigation. Borrow small personal annotations.

The discussion mockup is design-directions.html. Its editorial copy and the name “traces” are placeholders. It is response material, not a production implementation.

## Architectural proposals to settle after the experience

- A self-contained Panzonato layout, navigation, and visual system. Do not make this project depend on Cardross components, data, build tools, or deployment decisions. A future link can connect it to the shared entrance.
- Panzonato stories link to people, places, events, sources, and media using stable identifiers. Model what this exhibition needs; a cross-project platform is not required.
- Public exhibition only in the first version: build pages from an explicit publishing collection, not by copying the entire research holdings into a public assets directory. No accounts or private vault are in scope.
- Research material flows through a reviewed publishing collection before becoming pages. Research agents should eventually supply structured records with source references, uncertainty, captions, rights, and publication status; they should not own layout files.
- Keep narrative writing separate from UI translations. English and Brazilian Portuguese should have shareable locale URLs and equivalent-page language links, rather than replacing the rendered story through a client dictionary.
- Prefer static reading pages, with interactive maps, document inspection, and family exploration loading only where useful. Select a supported Astro version at implementation time rather than preserving a stale version pin.
- Preserve original scans. Generate reading-sized image variants separately; allow suitable larger images where inspecting handwriting requires them. An 1800px global ceiling does not cover every viewing purpose.
- Self-host a static website image on the user's Docker server. Keep archive binaries in ignored local folders and separate persistent server storage. Only selected public files are mounted read-only by the web service; application builds consume versioned media metadata instead of image/document binaries.
- Build a representative slice first: collection entrance → story → linked evidence → return to reading, in both languages and on mobile. Use it to validate the design before migrating all chapters.

Official implementation references checked during review:

- https://docs.astro.build/en/guides/internationalization/
- https://docs.astro.build/en/guides/content-collections/
- https://docs.astro.build/en/concepts/islands/

## Decision tree

Settled by the user: the primary audience is a curious newcomer, with no family connection. Stories should captivate first, with research within reach.

Settled by the user: independent exhibitions — a shared entrance followed by distinct visual worlds and navigation for each history.

Settled by the user: selective immersion — freely navigable, beautifully composed pages with a few exceptional interactions. Reading and exploration remain available independently of animation.

Settled by the user: public exhibitions only, containing selected stories and evidence. Research holdings remain outside the website; no private archive or account system is required.

Settled by the user: focus this work on Panzonato; another agent is creating Cardross.

Settled by the user: self-host on their Docker server and keep media uncommitted in a separate folder. This supersedes the Vercel hosting assumption and the proposed bundled-media pipeline.

After the narrative-spine question, the user twice asked to proceed where work stopped without selecting a numbered option. Migration and its aftermath were explicitly carried forward as a working assumption, not recorded as an explicit user selection. The concrete proposal now makes the consequences reviewable.

The user accepted the planning direction and requested implementation through Agy or cheaper agents coordinated with Orca, local Docker testing, and a final review. Their explicit next gate is a quick disposable HTML design preview for approval before production coding. A veto reopens the relevant design branch.

## Assumption ledger — open to veto

- Source folders remain read-only: preserve research originals and the existing safety requirement.
- English and Brazilian Portuguese remain in scope: retain the stated bilingual requirement until challenged.
- The original assumption that both exhibitions belong in this agent's concept exploration is superseded by the user's Panzonato-only scope correction.
- “traces” is a working wordmark only: a concrete mockup needs a label; naming is reversible.
- Mockup headlines are sample editorial copy: they test tone and hierarchy, not historical findings.
- Two type families replace four in the proposed direction: clearer hierarchy and a more coherent visual voice; exact fonts remain reversible.
- The prior shared-repository/deployment assumption is withdrawn: Cardross is owned by another agent, and its technical setup is outside this scope.
- Reserve a simple link back to a future shared entrance: preserve the agreed independent-exhibition relationship without designing the portal now.
- One signature interaction for Panzonato in the first version: focus design and production effort on a memorable, useful experience; additional interactions can follow later.
- Natural scrolling, direct chapter links, keyboard operation, reduced-motion support, and useful static fallbacks: selective immersion should preserve visitor control and access to the history.
- A chapter-linked voyage route is a candidate Panzonato interaction, pending the narrative choice and suitable research assets. Cardross interaction proposals are withdrawn from this agent's scope.
- The discussion visual uses an existing contextual Genoa photograph: sufficient to compare composition without commissioning new imagery or doing research.
- Migration provides the narrative spine; third-person documentary writing with occasional attributed notes provides the voice: follows the recommendation before the user's instruction to proceed and remains subject to veto.
- Five separately addressable chapters plus a short overview: supports skimming, deeper reading, sharing, and moderate page weight.
- The detailed palette uses paper, ink, iron red, and midnight blue with Newsreader and DM Sans as provisional type choices: establishes the Panzonato identity while keeping all naming and styling editable.
- Initial people exploration uses portraits and a compact family outline; complex graph navigation and global search are deferred: keep the newcomer experience focused.
- Static Astro with file-based validated content remains the working application architecture. Vercel is superseded by the user's Docker server. Nginx is the reversible default static server; final proxy/domain integration belongs to deployment.
- Existing assets remain where they are to preserve current references, with new ignored media/originals and media/published folders for media preparation. Versioned metadata and a separate published-folder validation step connect the static build to server storage.
- PLAN.md has now been rewritten as a reviewable draft; the original is preserved. No production setup, publication, or deployment has occurred.

The Panzonato-specific design study is panzonato-exhibition.html. RESEARCH_HANDOFF.md defines a proposed contribution contract, without starting or delegating research.

Following the hosting correction, .gitignore and .dockerignore exclude archive/media folders and design-study HTML with embedded archival images. The existing approximately 110 MB assets collection was untracked and has not been moved. MEDIA_STORAGE.md records the local/server boundary, development URL contract, and planned release sequence. No Docker application has been built or deployed.

Design-study verification: inspected the desktop composition and the 320px browser viewport; corrected a stage-selector overflow. Verified chapter selection, associated image/title changes, image loading, and evidence disclosure. The final narrow layout has matching content and scroll widths. These checks cover the discussion study, not the future production site's acceptance criteria. PLAN.md local references resolve, and the inline study is below the 1 MB response limit.

The planning interview is complete with the user's acceptance. The next deliverable is a disposable HTML preview in `work/panzonato-prototype/`, served locally with Docker. Production website coding follows the user's visual approval; research content is still provisional and Cardross remains outside this work.

The disposable preview is ready at http://localhost:18774, built by an Orca-supervised GPT-5.6-Luna worker after Agy's CLI stopped at sign-in. Coordinator review led to full-image evidence fitting and larger reading text. Desktop, tablet-width, mobile, image selection, and dialog checks passed; the selected media remains outside Git and the image. See `work/panzonato-prototype/REVIEW.md`. The user's requested visual approval remains pending.

Second-preview feedback: the user likes the font choices and colours and asks for more interaction, more animation, and a nicer overall look. Remove upward/diagonal arrow decorations. Preserve the visual identity while adding richer chapter selection, animated journey stages, one-shot editorial reveals, and photograph inspection. This feedback authorizes iteration of the disposable preview; it does not yet approve starting production.

The second preview is complete and reviewed: stronger opening photography, chapter images, a moving journey marker, actual photograph crossfades, one-shot reveals, reading progress, and full-image zoom. The coordinator corrected state isolation and image fitting after the Orca worker completed. Reduced-motion, rapid selection, and responsive layout were checked; detailed evidence and browser-tool limitations are recorded in the prototype review file. Await the user's visual feedback.

## 19 September 2026 — design approval and implementation

The user approved the refined disposable preview: “looks good proceed”. Begin the real bilingual Panzonato implementation, retain the approved design and motion, coordinate cheaper coding agents through Orca, and test locally in Docker. Media remains separate and uncommitted. Historical content remains provisional for the research agents.
