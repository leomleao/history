# Higgsfield Video Production Plan: Fosca and Six Children at Sea

**Project**: `01-fosca-at-sea`  
**Account Status**: `leomleao@gmail.com`  
**Current Balance**: 194.9 credits *(Audited 21 Sep 2026)*  
**Chosen Strategy**: **Lean Turbo Tier (~42.5 credits total)**  
**Aspect Ratio**: 16:9 Landscape  
**Language Editions**: Dual Track — English (`en`) & Brazilian Portuguese (`pt-br`)  
**Production Gate**: **HARD STOP** — No CLI jobs will be submitted until the user explicitly commands: *"Generate videos"*.

---

## 1. Budget Breakdown (Lean Turbo Strategy)

By generating master anchor stills with `gpt_image_2_5` (1 credit each) and driving motion with `kling3_0_turbo` (7.5 credits each), we achieve high cinematic quality and historical accuracy while preserving **~152 credits (78% of balance)** for subsequent videos in the `agy-videos` series.

| Asset | Model / Tool | Specs | Unit Cost | Total Cost |
| :--- | :--- | :--- | :--- | :--- |
| **5x Master Stills** | `gpt_image_2_5` | 16:9, 2K Resolution | 1.0 credit | **5.0 credits** |
| **Shot 1 (Exterior)** | `kling3_0_turbo` | 5s, 16:9, Start Image | 7.5 credits | **7.5 credits** |
| **Shot 2 (Steerage)** | `kling3_0_turbo` | 5s, 16:9, Start Image | 7.5 credits | **7.5 credits** |
| **Shot 3 (Care)** | `kling3_0_turbo` | 5s, 16:9, Start Image | 7.5 credits | **7.5 credits** |
| **Shot 4 (Dawn)** | `kling3_0_turbo` | 5s, 16:9, Start Image | 7.5 credits | **7.5 credits** |
| **Shot 5 (Ledger)** | `kling3_0_turbo` | 5s, 16:9, Start Image | 7.5 credits | **7.5 credits** |
| **Total Production Estimate** | | | | **42.5 credits** |
| **Remaining Reserve** | | | | **~152.4 credits** |

---

## 2. Generation Blueprints (Ready for Execution Phase)

### Step 1: Generate Master Anchor Stills (Cost: 5 credits)

```bash
# 1. Exterior Steamship Colombo
higgsfield generate create gpt_image_2_5 \
  --prompt "Wide angle cinematic historical photograph of the 1873-built steamship Colombo in 1891, single tall central black funnel billowing dark coal smoke, long narrow iron hull pitching through heavy slate-gray Atlantic ocean swell, white sea foam, dramatic overcast clouds, authentic 19th-century maritime realism, 35mm film grain" \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait

# 2. Interior Steerage Hold (Fosca & Toddlers)
higgsfield generate create gpt_image_2_5 \
  --prompt "Interior of an 1891 emigrant steamship steerage hold during an Atlantic storm, dim chiaroscuro lighting from a single swinging brass oil lantern, rough timber bunk frames, straw mattresses, 30-year-old Venetian peasant mother Fosca Moro wearing a dark woolen shawl and headscarf, clutching a 1-year-old infant to her chest while firmly anchoring a 3-year-old toddler between her knees on a rough wooden bench, exhausted yet fiercely resolute expression, cinematic period realism, 35mm film grain" \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait

# 3. Family Care & Solidarity (Giuseppe & Daughters)
higgsfield generate create gpt_image_2_5 \
  --prompt "Intimate medium cinematic shot inside 1891 steamship hold, Italian laborer father with dark mustache and flat wool cap carefully holding a tin cup of broth, passing it to his 10-year-old eldest daughter Luigia who gently feeds her 5-year-old younger brother, two younger sisters huddled close under a coarse blanket, warm amber lantern glow against cold dark wood, tender family resilience" \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait

# 4. Dawn on Deck (The Family United)
higgsfield generate create gpt_image_2_5 \
  --prompt "Cinematic wide-medium shot of Italian emigrant family on the damp wooden deck of a steamship at dawn, cold Atlantic mist clearing, first golden morning sun rays breaking through ocean clouds, Venetian mother wrapped in dark shawl holding baby, father beside her with small boy, three young daughters clustered close looking forward at the open sea horizon, hair blown by salt wind, emotional relief and quiet hope" \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait

# 5. The Archival Ledger (Macro Close-up)
higgsfield generate create gpt_image_2_5 \
  --prompt "Cinematic macro photograph of a vintage 1891 immigrant registration ledger book, aged textured parchment paper, a vintage steel-nib dip pen actively writing names in dark sepia calligraphy ink: Giuseppe, Fosca, Luigia, Catarina, Candida, Luigi, Domenico, Eugenio, warm side lighting, soft depth of field, dust motes in soft light beam" \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait
```

---

### Step 2: Animate Video Motion with Kling 3.0 Turbo (Cost: 37.5 credits)

```bash
# Shot 1: Ship cutting through Atlantic swell
higgsfield generate create kling3_0_turbo \
  --prompt "Cinematic tracking shot along the side of the 1891 steamship as it pitches deeply through rolling Atlantic swells, cold ocean spray, churning waves, heavy industrial steam engine motion" \
  --start-image <IMAGE_1_ID_OR_PATH> \
  --duration 5 \
  --wait

# Shot 2: Steerage hold rolling with the sea
higgsfield generate create kling3_0_turbo \
  --prompt "Handheld cinematic camera rolling with the heave of the ship, the brass lantern overhead sways dramatically casting shifting amber shadows, the mother tightens her embrace on the infant as the hull creaks" \
  --start-image <IMAGE_2_ID_OR_PATH> \
  --duration 5 \
  --wait

# Shot 3: Feeding and tending the children
higgsfield generate create kling3_0_turbo \
  --prompt "Subtle tender cinematic camera movement, the father steadies the tin cup as the ship rolls gently, the elder sister softly comforts the younger boy, warm lantern light flickering" \
  --start-image <IMAGE_3_ID_OR_PATH> \
  --duration 5 \
  --wait

# Shot 4: Morning wind on deck
higgsfield generate create kling3_0_turbo \
  --prompt "Slow cinematic push-in on the family standing on deck at sunrise, golden sunlight reflecting off wet deck planks, shawls and hair fluttering in the fresh sea breeze, looking forward with hope" \
  --start-image <IMAGE_4_ID_OR_PATH> \
  --duration 5 \
  --wait

# Shot 5: Pen gliding across the historical ledger
higgsfield generate create kling3_0_turbo \
  --prompt "Smooth macro camera glide across the aged ledger page as the dip pen inscribes the final family names in rich sepia ink, soft golden particles floating in warm light" \
  --start-image <IMAGE_5_ID_OR_PATH> \
  --duration 5 \
  --wait
```

---

## 3. Audio & Post-Production Plan
- **Foley & Sound Design**: Generate iron hull creaks, engine thud, ocean spray, and brass lantern clinking using `higgsfield generate create seed_audio`.
- **Narration**: Record/generate two vocal tracks (EN and PT-BR) matching the timestamps in `script-draft.md`.
- **Export Editions**:
  1. `01-fosca-at-sea-en.mp4` (English VO + English Title Cards)
  2. `01-fosca-at-sea-pt-br.mp4` (Portuguese VO + Portuguese Title Cards)
