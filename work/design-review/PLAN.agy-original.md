# Historical Archive Portal — Master Plan & Architecture

This document defines the comprehensive implementation plan, architectural design, and operational guidelines for the **History Archive Portal** repository (`dev/history`), configured for static edge deployment on **Vercel**.

---

## 1. Executive Summary & Core Requirements

* **Primary Objective:** Build a modern, editorial web portal showcasing multi-lineage family histories and regional archival research.
* **Front Portal:** Landing page that acts as an archive hub allowing visitors to choose between sub-histories:
  1. **My Family History:** *The Panzonato Odyssey* (Active chronicle).
  2. **Cardross Estate & House:** Historical, topographical, and architectural investigation (Active research / Coming Soon status).
  3. **Extensibility:** Architecture ready to add future lineages, branches, and regional histories.
* **Internationalization (i18n):**
  * Initial scope: **English (`en`)** and **Brazilian Portuguese (`pt-BR`)**.
  * Auto-detection based on visitor's browser preferred languages (`navigator.languages`).
  * Persistent language toggle with `localStorage` memory across page transitions.
  * Designed to easily support additional languages (e.g., Italian) in the future.
* **Design Identity:** **Option A (Archival Editorial / Museum Grade)**:
  * Atmospheric warm obsidian and aged linen palette (`#100f0d`, `#171512`, `#f4efe6`, `#c9a85c` antique gold accents).
  * Classical Roman & literary typography (*Cinzel* for small-caps/eyebrows, *Cormorant Garamond* for titles, *Inter* for interface/chips, *JetBrains Mono* for citations).
  * Curated metadata chips, indicator metrics, and subtle hairline gold borders.
* **Source Folder Safety (Strict Rule):**
  * Original research workspaces (`/Users/leo/dev/leo family history` and `/Users/leo/dev/cardross`) remain **strictly read-only**.
  * Archival assets and catalog metadata are copied and processed locally inside `dev/history`.
* **Asset Optimization:**
  * Automated image pipeline via `sharp` converting heavy camera scans and JPEGs into modern, responsive `.webp` and optimized MozJPEG formats.
  * Bandwidth reduction of ~60% (from ~140 MB down to ~55 MB) for instant edge loading on Vercel.

---

## 2. Technical Stack & Architectural Decisions

```
                           ┌─────────────────────────────────────────┐
                           │            Vercel Edge / CDN            │
                           └────────────────────┬────────────────────┘
                                                │
                     ┌──────────────────────────┴──────────────────────────┐
                     ▼                                                     ▼
        ┌─────────────────────────┐                           ┌─────────────────────────┐
        │   Landing Portal (/)    │                           │    Client i18n Engine   │
        │ - Museum-grade hub      │◄──────────────────────────┤ - Auto browser detect   │
        │ - Archive selection     │                           │ - localStorage memory   │
        │ - Status indicators     │                           │ - EN / PT-BR switcher   │
        └────────────┬────────────┘                           └─────────────────────────┘
                     │
       ┌─────────────┴────────────────────────┐
       ▼                                      ▼
┌─────────────────────────────┐  ┌─────────────────────────────┐
│  /family (Panzonato)        │  │  /cardross                  │
│  - 1B Component Refactor    │  │  - Research Dossier Teaser  │
│  - 9 Chapters & Narratives  │  │  - NLS Maps & Canmore Scope │
│  - 1891 Passenger Manifest  │  │  - Erskine Lineage & Forth  │
│  - 6-Gen Interactive Tree   │  │  - Coming Soon status badge │
│  - Transatlantic Timeline   │  └─────────────────────────────┘
│  - Primary Documents Grid   │
└─────────────────────────────┘
```

| Layer | Choice | Rationale |
| :--- | :--- | :--- |
| **Framework** | **Astro 5 (SSG)** | Zero JavaScript by default, instant page transitions, native Markdown/content support, built-in image optimization. |
| **Hosting Adapter** | **`@astrojs/vercel`** | Direct static output (`.vercel/output/static`), global edge CDN distribution with zero cold starts. |
| **Image Pipeline** | **Sharp (Node.js)** | High-fidelity WebP generation, max dimensions bounded to 1800px retina width, eliminating multi-megabyte raw camera bloat. |
| **Typography** | **Google Fonts** | `Cinzel`, `Cormorant Garamond`, `Inter`, `JetBrains Mono`. |
| **State & i18n** | **Vanilla TS + Storage** | Lightweight client-side dictionary replacement (`data-i18n` & `data-i18n-html`) with zero framework runtime overhead. |

---

## 3. Directory Layout

```
/Users/leo/dev/history/
├── astro.config.mjs                    # Astro config with static output & @astrojs/vercel adapter
├── package.json                        # Dependencies: astro, @astrojs/vercel, sharp, typescript
├── tsconfig.json                       # Strict TypeScript configuration
├── .gitignore                          # Excludes dist, .astro, .vercel, node_modules
├── PROVENANCE.md                       # Master ledger linking all web records back to source catalogs
├── PLAN.md                             # This master plan
├── scripts/
│   └── copy-and-optimize-assets.mjs    # Asset ingestion & compression script
├── public/
│   ├── favicon.svg                     # Archival crest SVG
│   └── assets/                         # Optimized WebP + JPEG media assets
│       ├── LZJP-NJD/                   # Giuseppe Giacomo Panzonato photos & certificates
│       │   ├── historical_context/     # Genoa, Santos, Hospedaria, Capivari historical photos
│       │   └── *.webp / *.jpeg         # Church, font, frescoes, cemetery photographs
│       └── cardross/                   # Cardross Estate preview photo
└── src/
    ├── content/
    │   └── family_history_catalog.md   # Copy of primary lineage inventory (46 primary records)
    ├── i18n/
    │   ├── en.json                     # English translations dictionary (225+ keys)
    │   ├── pt.json                     # Portuguese translations dictionary (225+ keys)
    │   └── client.ts                   # Client-side language detection & DOM updater
    ├── components/
    │   ├── Navbar.astro                # Global header with brand, chapter nav, and language toggle
    │   ├── LanguageToggle.astro        # Reactive EN / BR switcher button
    │   └── ProvenanceFooter.astro      # Archival citations referencing origin catalogs
    ├── layouts/
    │   └── BaseLayout.astro            # Option A museum theme, fonts, reset, and container
    └── pages/
        ├── index.astro                 # Front Portal: Sub-history selector & overview
        ├── family/index.astro          # Full 1B refactor of The Panzonato Odyssey
        └── cardross/index.astro        # Cardross Estate research teaser & scope overview
```

---

## 4. Phased Implementation Roadmap

### Phase 1: Project Initialization & Configuration
1. Initialize `package.json` with `astro`, `@astrojs/vercel`, `sharp`, `typescript`.
2. Configure `astro.config.mjs` for static output and Vercel edge deployment.
3. Configure `tsconfig.json` with strict type checking.
4. Establish `.gitignore` to prevent build artifacts and dependencies from entering git.

### Phase 2: Asset Ingestion & Optimization Pipeline
1. Create `scripts/copy-and-optimize-assets.mjs`.
2. Ingest referenced images from `/Users/leo/dev/leo family history/assets/LZJP-NJD/` and `/Users/leo/dev/cardross/my photos/`.
3. Use Sharp to:
   * Constrain max width to 1800px (retaining retina sharpness).
   * Encode to WebP (quality 80) and MozJPEG (quality 82).
   * Skip non-web raw video files.
   * Verify original folders are 100% read-only.
4. Store optimized output in `public/assets/`.

### Phase 3: Internationalization Engine
1. Extract translation strings from `/Users/leo/dev/leo family history/index.html` into structured JSON:
   * `src/i18n/en.json` (English master dictionary).
   * `src/i18n/pt.json` (Brazilian Portuguese dictionary).
2. Add portal navigation and status keys to both dictionaries.
3. Create `src/i18n/client.ts` to handle:
   * Preferred language detection (`navigator.language` / `navigator.languages`).
   * Persistent choice storage (`localStorage.getItem('history_lang')`).
   * Dynamic DOM replacement for `[data-i18n]` and `[data-i18n-html]`.

### Phase 4: Archival Provenance Registry
1. Copy `family_history_catalog.md` into `src/content/family_history_catalog.md`.
2. Write `PROVENANCE.md` detailing:
   * Source 1: `/Users/leo/dev/leo family history` (46 primary records, 6 generations).
   * Source 2: `/Users/leo/dev/cardross` (MISSION.md, Canmore, HES, NLS maps).
   * Genealogical transmission: Domenico & Angela $\rightarrow$ Giuseppe & Fosca $\rightarrow$ José Filho & Assumpta $\rightarrow$ Leonildes & José $\rightarrow$ Edelcio & Graciela $\rightarrow$ Leonardo & Geremias.
3. Build `src/components/ProvenanceFooter.astro` displaying source citations on every page.

### Phase 5: Front Portal (`src/pages/index.astro`)
1. Implement **Option A (Archival Museum Grade)** styling.
2. Build Hero Section with heraldic crest, title, subtitle, and indicator metrics.
3. Render Sub-history Cards:
   * **Active Card:** *The Panzonato Odyssey* (links to `/family`).
   * **In Progress Card:** *Cardross House & Estate* (links to `/cardross`).
4. Integrate reactive `LanguageToggle.astro` and `ProvenanceFooter.astro`.

### Phase 6: Panzonato Family Chronicle Refactor (`src/pages/family/index.astro`)
1. Refactor the 2,220-line HTML chronicle into clean Astro components and layout:
   * Chapter 1: Origins (Gambarare di Mira, San Giovanni Battista, 1856 baptismal font).
   * Chapter 2: The Crisis (Agrarian distress, gristmill tax, pellagra, 1882 flood, Lei Áurea).
   * Chapter 3: The Crossing (Port of Genoa, SS Colombo, 1891 steerage crossing).
   * Chapter 4: Arrival (Santos harbor, Paranapiacaba funicular, Hospedaria dos Imigrantes do Brás).
   * Chapter 5: New Life (Capivari coffee fazendas, Sorocabana railway, colonato labor, land acquisition).
   * Chapter 6: Family Tree (6 generations, Dante Causa badges, Arlindo Panssonatto dedication).
   * Chapter 7: Key Dates (Transatlantic timeline from 1856 to 2024).
   * Chapter 8: The Archive (Italian civil/parish certificates, landing manifests, Brazilian cartório acts).
   * Chapter 9: The Return (2023–2024 return to Gambarare di Mira, closing the circle 132 years later).
2. Wire up sticky chapter navigation with smooth scroll and language toggle.

### Phase 7: Cardross Estate Teaser (`src/pages/cardross/index.astro`)
1. Implement teaser page presenting the ongoing investigation from `cardross/MISSION.md`.
2. Display the 3 research pillars: Architectural Evolution, The Erskine Lineage, Historical Cartography.
3. Include Canmore ID, Historic Environment Scotland, and NLS map layer references.
4. Provide return navigation to the portal hub.

### Phase 8: Verification & Vercel Deployment
1. Verify static build execution (`pnpm build`).
2. Test local preview (`pnpm preview`).
3. Validate HTTP 200 responses and asset resolution across all routes.
4. Deploy to Vercel via CLI (`vercel`) or GitHub automated integration.

---

## 5. Provenance Reference Summary

* **Family History Source:**
  * Directory: `/Users/leo/dev/leo family history`
  * Inventory File: `family_history_catalog.md`
  * Original HTML: `index.html` (2,220 lines)
  * Scope: 46 Primary Files (19 PDFs, 23 Photographs, 1 Video, 1 DOC, 1 ZIP)
* **Cardross Estate Source:**
  * Directory: `/Users/leo/dev/cardross`
  * Research Directive: `MISSION.md`
  * Archive: `cardross_archive/`
  * Scope: Canmore ID, HES Designations, NLS historical maps (Pont, Roy, Blaeu, OS).
