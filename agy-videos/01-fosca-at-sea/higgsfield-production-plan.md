# Higgsfield Video Production Plan: "Through Luigia's Eyes"

**Project**: `01-fosca-at-sea`  
**Narrative Perspective**: Ten-Year-Old Luigia (In the Moment, Present Tense)  
**Story Arc**: Veneto Train → Genoa → Cape Verde Cage & Hold → War in Rio & Paranapiacaba Incline → Brás Hostel → Coffee Rows & Forbidden Tongue → Capivari Ledger  
**Account Status**: `leomleao@gmail.com`  
**Current Balance**: 194.9 credits *(Audited 21 Sep 2026)*  
**Chosen Strategy**: **Lean Turbo Tier (~42.5 credits total)**  
**Aspect Ratio**: 16:9 Landscape  
**Language Editions**: Synchronized Dual Track — English (`en`) & Brazilian Portuguese (`pt-br`)  
**Production Gate**: **HARD STOP** — No CLI jobs will be submitted until the user explicitly commands: *"Generate videos"*.

---

## 1. Budget Breakdown (Lean Turbo Strategy)

| Asset | Model / Tool | Specs | Unit Cost | Total Cost |
| :--- | :--- | :--- | :--- | :--- |
| **5x Master Stills** | `gpt_image_2_5` | 16:9, 2K Resolution | 1.0 credit | **5.0 credits** |
| **Shot 1 (Veneto-Genoa Train)** | `kling3_0_turbo` | 5s, 16:9, Start Image | 7.5 credits | **7.5 credits** |
| **Shot 2 (Cape Verde & Hold)** | `kling3_0_turbo` | 5s, 16:9, Start Image | 7.5 credits | **7.5 credits** |
| **Shot 3 (War & Paranapiacaba)** | `kling3_0_turbo` | 5s, 16:9, Start Image | 7.5 credits | **7.5 credits** |
| **Shot 4 (Coffee & Forbidden Tongue)** | `kling3_0_turbo` | 5s, 16:9, Start Image | 7.5 credits | **7.5 credits** |
| **Shot 5 (Ledger of 8 Names)** | `kling3_0_turbo` | 5s, 16:9, Start Image | 7.5 credits | **7.5 credits** |
| **Total Production Estimate** | | | | **42.5 credits** |
| **Remaining Reserve** | | | | **~152.4 credits** |

---

## 2. Generation Blueprints (Ready for Execution Phase)

### Step 1: Generate Master Anchor Stills (Cost: 5 credits)

```bash
# Shot 1: The Steam Train Across Italy (Veneto to Genoa)
higgsfield generate create gpt_image_2_5 \
  --prompt "Cinematic interior of an 1891 vintage third-class steam train carriage speeding through northern Italian countryside in autumn rain, 10-year-old girl Luigia holding her 5-year-old brother Luigi close on a wooden bench, Italian laborer father Giuseppe Panzonato (matching giuseppe reference) guarding a rope-bound wooden chest, mother Fosca Moro (matching fosca reference) holding an infant to her breast, looking through rain-streaked window toward the distant towering black iron hull of the steamship Colombo in Genoa harbor, authentic 19th century period realism, 35mm film grain" \
  --image ./images/fosca.jpg \
  --image ./images/giuseppe.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait

# Shot 2: The Floating Cage (Cape Verde Cliffs from Deck)
higgsfield generate create gpt_image_2_5 \
  --prompt "Cinematic photograph on the iron deck of the steamship Colombo anchored off Porto Grande Mindelo Cape Verde in 1891, harsh tropical sun, jagged black volcanic cliffs in background (matching reference image), Italian peasant mother Fosca Moro and her six small children clutching the iron railing from which they are forbidden to leave, black coal dust swirling in the air smudging their sweaty faces, deep isolation and longing, 35mm photography" \
  --image ./images/cape-verde-porto-grande-1890.webp \
  --image ./images/fosca.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait

# Shot 3: War in Rio & The Mountain Incline (Paranapiacaba)
higgsfield generate create gpt_image_2_5 \
  --prompt "Cinematic split transition concept: on one side, dramatic view of Guanabara Bay in late November 1891 with the menacing black ironclad battleship Riachuelo (matching reference image) aiming heavy cannons at the city, on the other side, an authentic São Paulo Railway funicular passenger carriage being hauled up steep tropical mountain rainforest cliffs by heavy steel cables into the freezing dense mist of Paranapiacaba (matching historical railway reference image), dramatic tension, 35mm film grain" \
  --image ./images/encouracado-riachuelo-1891-ferrez.webp \
  --image ./images/paranapiacaba-funicular-railway.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait

# Shot 4: The Red Earth & The Forbidden Tongue (Coffee Rows & Whispers)
higgsfield generate create gpt_image_2_5 \
  --prompt "Cinematic wide-medium shot in a Brazilian coffee plantation in 1891, harsh blinding tropical sun over endless rows of green coffee trees in red soil (matching historical Gaensly harvest photo), Italian laborer father Giuseppe and young daughter Luigia hoeing red dirt with blistered hands, while in foreground shadow under the eaves of a humble wooden colono house, mother Fosca Moro (matching fosca reference) wraps her shawl around her children, whispering secretly with a hand over her lips, protective defiance against cultural erasure, 35mm historical film" \
  --image ./images/colheita-cafe-gaensly.jpg \
  --image ./images/fosca.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait

# Shot 5: The Ledger of Eight Living Souls
higgsfield generate create gpt_image_2_5 \
  --prompt "Cinematic macro photograph of the authentic 1891 immigrant registration ledger book page (matching reference book spread Book 031, Page 283) with handwritten names Giuseppe, Fosca, Luigia, Catarina, Candida, Luigi, Domenico, Eugenio, and destination Tietê in dark sepia calligraphy, warmly illuminated by golden light, in the soft background the eight family members stand together on the red earth of Capivari outside the historic station, proud, resilient, unbroken" \
  --image ./images/panzonato-hospedaria-1891-page.jpg \
  --image ./images/estacao-capivari-historica.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait
```

---

### Step 2: Animate Video Motion with Kling 3.0 Turbo (Cost: 37.5 credits)

```bash
# Shot 1: The Rushing Train to Genoa
higgsfield generate create kling3_0_turbo \
  --prompt "Slow cinematic camera pan inside the rattling wooden train carriage, rain lashing against the glass, the father steadies the rope on the trunk, young Luigia looks up with wide eyes as the locomotive whistle screams into the echoing port station" \
  --start-image <SHOT_1_STILL_ID> \
  --duration 5 \
  --wait

# Shot 2: Trapped at Cape Verde
higgsfield generate create kling3_0_turbo \
  --prompt "Cinematic slow push-in on the children clutching the iron railing of the ship under the blinding equatorial sun, black coal dust blowing across their faces, barren volcanic mountains in the background, the mother places her protective hands on their shoulders" \
  --start-image <SHOT_2_STILL_ID> \
  --duration 5 \
  --wait

# Shot 3: Riachuelo Cannons into Paranapiacaba Mist
higgsfield generate create kling3_0_turbo \
  --prompt "Dramatic cinematic movement: dark smoke drifts past the massive naval gun turrets of the battleship Riachuelo in the harbor, dissolving into the funicular train carriage being hauled up steep mountain cliffs through swirling white fog" \
  --start-image <SHOT_3_STILL_ID> \
  --duration 5 \
  --wait

# Shot 4: Coffee Hoeing into Secret Venetian Whisper
higgsfield generate create kling3_0_turbo \
  --prompt "Cinematic rack focus from the father hoeing the dusty red earth under the burning sun to the mother inside the dim colono shack, gently pulling her children close, whispering quietly in secret, emotional maternal warmth amidst hardship" \
  --start-image <SHOT_4_STILL_ID> \
  --duration 5 \
  --wait

# Shot 5: The Archival Ledger to the Living Family
higgsfield generate create kling3_0_turbo \
  --prompt "Smooth macro camera glide across the aged manuscript ledger revealing the eight family names in rich sepia ink, rack focusing to the family standing together in the golden light of Capivari, unbroken and eternal" \
  --start-image <SHOT_5_STILL_ID> \
  --duration 5 \
  --wait
```

---

## 3. Audio & Soundscape Plan
- **Narrator Voice Profile**: 10-year-old girl (Luigia), urgent, vulnerable, fiercely protective, intimate.
  - Track 1 (`en`): English narration.
  - Track 2 (`pt-br`): Brazilian Portuguese narration.
- **Foley & Sound Design (`seed_audio`)**:
  - Steam locomotive rhythm and train whistle on iron rails (Scene 1).
  - Equatorial trade winds, heavy coal shovels on iron barges, ocean swell (Scene 2).
  - Naval alarm bells, muffled artillery boom, screeching funicular steel cables, echoing hostel clamor (Scene 3).
  - Iron hoes cutting dry red soil, distant overseer calls, hushed Venetian dialect bedtime prayer (Scene 4).
  - Dip pen on parchment, train whistle over coffee hills, deep resonant cello conclusion (Scene 5).
