# Higgsfield Video Production Plan: "Through Luigia's Eyes"

**Project**: `01-fosca-at-sea`  
**Narrative Perspective**: Ten-Year-Old Luigia (In the Moment, Present Tense)  
**Story Arc**: Linear Odyssey (Veneto Ruin → Ports of No Return → Rolling Hold & Doubt → Arriving into War in Rio → São Paulo Red Earth & Ledger)  
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
| **Shot 1 (Veneto Desperation)** | `kling3_0_turbo` | 5s, 16:9, Start Image | 7.5 credits | **7.5 credits** |
| **Shot 2 (Ports & Cape Verde)** | `kling3_0_turbo` | 5s, 16:9, Start Image | 7.5 credits | **7.5 credits** |
| **Shot 3 (The Rolling Hold)** | `kling3_0_turbo` | 5s, 16:9, Start Image | 7.5 credits | **7.5 credits** |
| **Shot 4 (War in Guanabara Bay)** | `kling3_0_turbo` | 5s, 16:9, Start Image | 7.5 credits | **7.5 credits** |
| **Shot 5 (Ledger & Platform)** | `kling3_0_turbo` | 5s, 16:9, Start Image | 7.5 credits | **7.5 credits** |
| **Total Production Estimate** | | | | **42.5 credits** |
| **Remaining Reserve** | | | | **~152.4 credits** |

---

## 2. Generation Blueprints (Ready for Execution Phase)

### Step 1: Generate Master Anchor Stills (Cost: 5 credits)

```bash
# Shot 1: The Desperate Decision — Veneto
higgsfield generate create gpt_image_2_5 \
  --prompt "Cinematic wide shot of flooded rural Veneto Italy in autumn 1891, cold thick river mist, muddy ground, ruined crop fields, Italian laborer father Giuseppe Panzonato (facial features matching giuseppe reference) fiercely pulling tight ropes around a single battered wooden chest, hands red and cold, mother Fosca Moro (aged 30, facial features matching fosca reference) in dark wool shawl holding 1-year-old infant to her breast, her eyes filled with tense fear, 10-year-old daughter Luigia holding 5-year-old brother's coat, somber dramatic lighting, 35mm film grain, 19th century historical realism" \
  --image ./images/fosca.jpg \
  --image ./images/giuseppe.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait

# Shot 2: The Point of No Return — Cape Verde Coaling Port
higgsfield generate create gpt_image_2_5 \
  --prompt "Cinematic wide shot in Porto Grande Mindelo Cape Verde in 1891, harsh tropical equatorial sunlight, barren black jagged volcanic mountains in background (matching historical reference image), steamship Colombo anchored in turquoise water, black coal dust swirling in the hot air as coal lighters fuel the iron ship, on deck Italian emigrant mother Fosca with six small children clinging to her woolen skirts, sweaty faces smudged with black coal soot, looking out at the alien volcanic shore with deep apprehension, authentic 19th century maritime photography" \
  --image ./images/cape-verde-porto-grande-1890.webp \
  --image ./images/fosca.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait

# Shot 3: The Rolling Hold & Agony of Doubt
higgsfield generate create gpt_image_2_5 \
  --prompt "Interior of an 1891 emigrant steamship steerage hold during heavy Atlantic storm, dim chiaroscuro lighting from a single swinging brass oil lantern, rough timber bunk frames, straw mattresses, 30-year-old Venetian peasant mother Fosca Moro (facial features directly matching reference image) sitting braced on a wooden trunk, clutching a 1-year-old infant to her neck while firmly locking a 3-year-old toddler between her knees, tears tracing through grime on her cheeks in silent terror for her children's survival, 10-year-old daughter Luigia gently helping her 5-year-old brother drink from a tin cup, intense maternal resilience, 35mm film texture" \
  --image ./images/fosca.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait

# Shot 4: Arriving into War — Guanabara Bay (Battleship Riachuelo)
higgsfield generate create gpt_image_2_5 \
  --prompt "Dramatic cinematic photograph from the deck of the steamship Colombo entering Guanabara Bay Rio de Janeiro in November 1891, cloudy dramatic tropical sky, looming nearby in the water is the massive black ironclad Brazilian battleship Riachuelo (matching historical photograph with twin heavy naval gun turrets) trained directly toward the capital city, steam patrol launches with armed soldiers, on the Colombo deck father Giuseppe (matching giuseppe reference) and mother Fosca (matching fosca reference) stand clutching their six children in shock and horror, fear of arriving into a war zone, 35mm period photography" \
  --image ./images/encouracado-riachuelo-1891-ferrez.webp \
  --image ./images/giuseppe.jpg \
  --image ./images/fosca.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait

# Shot 5: The Archival Ledger & São Paulo Train Platform
higgsfield generate create gpt_image_2_5 \
  --prompt "Macro cinematic split-composition photograph: in foreground, sharp textured view of the authentic 1891 immigrant registration ledger book page (matching reference book spread) with handwritten calligraphy names Giuseppe, Fosca, Luigia, Catarina, Candida, Luigi, Domenico, Eugenio, and Tietê, in the warm golden background softly out of focus, sunlit 1891 São Paulo immigrant train platform with steam locomotive ready for the coffee plantations, dust motes floating in sunbeams" \
  --image ./images/panzonato-hospedaria-1891-page.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait
```

---

### Step 2: Animate Video Motion with Kling 3.0 Turbo (Cost: 37.5 credits)

```bash
# Shot 1: Tense Packing in Veneto
higgsfield generate create kling3_0_turbo \
  --prompt "Slow cinematic tracking shot, cold autumn wind blowing dry leaves across the muddy ground, father Giuseppe desperately pulls the hemp rope tight around the wooden trunk, mother Fosca exchanges a terrified glance with him while holding the baby, young Luigia looks at her brother's trembling hand" \
  --start-image <SHOT_1_STILL_ID> \
  --duration 5 \
  --wait

# Shot 2: Volcanic Winds & Coal Dust at Cape Verde
higgsfield generate create kling3_0_turbo \
  --prompt "Slow cinematic pan across the deck of the ship under the blinding tropical sun, black coal dust blowing in the trade winds, the jagged volcanic peaks of Cape Verde towering in the background, the mother pulls her children closer against her skirts with anxious determination" \
  --start-image <SHOT_2_STILL_ID> \
  --duration 5 \
  --wait

# Shot 3: The Rolling Hold & Tears in the Dark
higgsfield generate create kling3_0_turbo \
  --prompt "Handheld cinematic camera rolling heavily with the 20-degree tilt of the ship, the brass lantern swings violently overhead casting dramatic shifting amber shadows, mother Fosca weeps quietly while bracing her toddler between her knees, holding her infant tight as the wooden frames groan" \
  --start-image <SHOT_3_STILL_ID> \
  --duration 5 \
  --wait

# Shot 4: Battleship Riachuelo & The Threat of War
higgsfield generate create kling3_0_turbo \
  --prompt "Cinematic tracking shot past the menacing black ironclad battleship Riachuelo in Guanabara bay, smoke drifting from gun turrets, naval launch cutting the water with soldiers, on the passenger deck the father pulls his children behind him in disbelief and protective terror" \
  --start-image <SHOT_4_STILL_ID> \
  --duration 5 \
  --wait

# Shot 5: The Ledger into São Paulo Sunlight
higgsfield generate create kling3_0_turbo \
  --prompt "Smooth macro camera glide across the aged ledger page revealing the eight family names in rich sepia ink, then rack focusing to the sunlit steam train on the platform as steam billows into the golden morning air, sense of overwhelming relief and rebirth" \
  --start-image <SHOT_5_STILL_ID> \
  --duration 5 \
  --wait
```

---

## 3. Audio & Soundscape Plan
- **Narrator Voice Profile**: 10-year-old girl (Luigia), urgent, emotionally taut, observant, vulnerable yet resilient.
  - Track 1 (`en`): English narration.
  - Track 2 (`pt-br`): Brazilian Portuguese narration.
- **Foley & Music (`seed_audio`)**:
  - Whistling cold autumn wind, dripping eaves, tightening hemp rope (Scene 1).
  - Clanging coal shovels on iron, steam venting, seagulls over volcanic waters (Scene 2).
  - Violent crash of Atlantic waves against iron plates, creaking timbers, infant crying, whispering prayers (Scene 3).
  - Military drums, distant harbor bells, deep steam launch engines, tense low string drone (Scene 4).
  - Triumphant, warm acoustic cello and locomotive steam release, steel dip pen scratching paper (Scene 5).
