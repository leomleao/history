# Higgsfield Video Production Plan: "Through Luigia's Eyes"

**Project**: `01-fosca-at-sea`  
**Narrative Perspective**: Ten-Year-Old Luigia (In the Moment, Present Tense)  
**Story Arc**: Linear Journey (Veneto → Colombo Embarkation → Rolling Hold → Deck at Dawn → São Paulo Platform & Ledger)  
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
| **Shot 1 (Veneto Departure)** | `kling3_0_turbo` | 5s, 16:9, Start Image | 7.5 credits | **7.5 credits** |
| **Shot 2 (Colombo Embarkation)** | `kling3_0_turbo` | 5s, 16:9, Start Image | 7.5 credits | **7.5 credits** |
| **Shot 3 (The Rolling Hold)** | `kling3_0_turbo` | 5s, 16:9, Start Image | 7.5 credits | **7.5 credits** |
| **Shot 4 (Dawn on Deck)** | `kling3_0_turbo` | 5s, 16:9, Start Image | 7.5 credits | **7.5 credits** |
| **Shot 5 (Ledger & Train)** | `kling3_0_turbo` | 5s, 16:9, Start Image | 7.5 credits | **7.5 credits** |
| **Total Production Estimate** | | | | **42.5 credits** |
| **Remaining Reserve** | | | | **~152.4 credits** |

---

## 2. Generation Blueprints (Ready for Execution Phase)

### Step 1: Generate Master Anchor Stills (Cost: 5 credits)

```bash
# Shot 1: Leaving Veneto (Stone Farmhouse, Damp Autumn, Packing the Trunk)
higgsfield generate create gpt_image_2_5 \
  --prompt "Cinematic wide shot of rural Veneto Italy in autumn 1891, damp stone farmhouse, bare trees, muddy ground after river flooding, Italian laborer father Giuseppe Panzonato (facial features matching giuseppe reference image) tying thick hemp rope around a battered wooden chest, mother Fosca Moro (aged 30, facial features matching fosca reference image) wearing dark wool shawl holding 1-year-old infant on her hip, 10-year-old daughter Luigia holding 5-year-old brother's hand looking back, somber determined mood, 35mm film grain, 19th century historical realism" \
  --image ./images/fosca.jpg \
  --image ./images/giuseppe.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait

# Shot 2: Quayside & Steamship Colombo (Looking up at Black Iron Hull)
higgsfield generate create gpt_image_2_5 \
  --prompt "Low angle cinematic photograph on wet stone European quayside in 1891, looking up at the towering black riveted iron hull of the steamship Colombo (matching historical reference image with single tall black smokestack billowing coal smoke), Italian emigrant families with wicker baskets ascending wooden gangplank, 10-year-old girl in coarse woolen coat looking up in wide-eyed awe, misty maritime atmosphere, 35mm photography" \
  --image ./images/colombo-drydock-1901.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait

# Shot 3: The Rolling Hold (Fosca Bracing the Children)
higgsfield generate create gpt_image_2_5 \
  --prompt "Interior of an 1891 emigrant steamship steerage hold during heavy Atlantic seas, dim chiaroscuro lighting from a single swinging brass oil lantern, rough timber bunk frames, straw mattresses, 30-year-old Venetian peasant mother Fosca Moro (facial features directly matching reference image) sitting braced on a wooden trunk, clutching a 1-year-old infant to her neck while firmly locking a 3-year-old toddler between her knees, 10-year-old daughter Luigia gently helping her 5-year-old brother drink from a tin cup, sisters huddled under blankets, intense maternal resilience, 35mm film texture" \
  --image ./images/fosca.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait

# Shot 4: Dawn on Deck (First Warm Sun over Calm Atlantic)
higgsfield generate create gpt_image_2_5 \
  --prompt "Cinematic wide-medium shot of Italian emigrant family on the damp wooden deck of a steamship at sunrise, calm tranquil ocean swell, cold morning sea fog illuminated by golden sun rays, Venetian mother Fosca (matching fosca reference) in dark woolen shawl holding baby, father Giuseppe (matching giuseppe reference) beside her with 5-year-old boy on his shoulders, 10-year-old Luigia and her two sisters standing by the wooden railing smiling toward the glowing sea horizon, salt wind blowing their hair, hopeful emotional relief, 35mm period photography" \
  --image ./images/fosca.jpg \
  --image ./images/giuseppe.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait

# Shot 5: São Paulo Arrival Platform & Archival Ledger
higgsfield generate create gpt_image_2_5 \
  --prompt "Macro cinematic split-composition photograph: in the foreground, sharp textured view of the authentic 1891 immigrant registration ledger book page (matching reference book spread) with handwritten calligraphy names Giuseppe, Fosca, Luigia, Catarina, Candida, Luigi, Domenico, Eugenio, and Tietê, in the warm golden background softly out of focus, sunlit 1891 São Paulo immigrant train platform with steam locomotive ready for the coffee plantations, dust motes floating in sunbeams" \
  --image ./images/panzonato-hospedaria-1891-page.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait
```

---

### Step 2: Animate Video Motion with Kling 3.0 Turbo (Cost: 37.5 credits)

```bash
# Shot 1: Packing the trunk in Veneto
higgsfield generate create kling3_0_turbo \
  --prompt "Slow cinematic tracking shot, cold autumn wind blowing dry leaves across the muddy ground, father Giuseppe tightens the rope around the wooden chest, 10-year-old Luigia squeezes her little brother's hand and turns to follow her mother, emotional period realism" \
  --start-image <SHOT_1_STILL_ID> \
  --duration 5 \
  --wait

# Shot 2: Boarding the Colombo
higgsfield generate create kling3_0_turbo \
  --prompt "Slow upward tilt from the wet cobblestone dock to the towering black iron hull of the steamship, black coal smoke drifting across the overcast sky, crowd of emigrants slowly moving up the gangplank, the young girl gazes up in awe" \
  --start-image <SHOT_2_STILL_ID> \
  --duration 5 \
  --wait

# Shot 3: The Rolling Hold
higgsfield generate create kling3_0_turbo \
  --prompt "Handheld cinematic camera rolling with the 20-degree tilt of the ship, the brass lantern overhead sways violently casting dramatic shifting amber shadows, mother Fosca tightens her protective embrace on the sleeping baby as the wooden berths creak, the older daughter steadies the tin cup" \
  --start-image <SHOT_3_STILL_ID> \
  --duration 5 \
  --wait

# Shot 4: Dawn on Deck
higgsfield generate create kling3_0_turbo \
  --prompt "Slow cinematic push-in on the family standing on deck at sunrise, golden light reflecting on the sea, gentle sea breeze fluttering their shawls and hair, the mother smiles softly with relief, looking toward the horizon" \
  --start-image <SHOT_4_STILL_ID> \
  --duration 5 \
  --wait

# Shot 5: Ledger into Train Platform
higgsfield generate create kling3_0_turbo \
  --prompt "Smooth macro camera pan across the aged ledger page revealing the eight family names in rich sepia ink, then rack focusing to the sunlit steam train on the platform as steam billows into the golden morning air" \
  --start-image <SHOT_5_STILL_ID> \
  --duration 5 \
  --wait
```

---

## 3. Audio & Soundscape Plan
- **Narrator Voice Profile**: 10-year-old girl (Luigia), earnest, steady, observant, intimate.
  - Track 1 (`en`): English narration with slight natural cadence.
  - Track 2 (`pt-br`): Brazilian Portuguese narration.
- **Foley Elements (`seed_audio`)**:
  - Autumn wind and creaking rope on wood (Scene 1).
  - Steam locomotive/ship hiss and quayside commotion (Scene 2).
  - Heavy iron groaning, 20-degree roll wave crashes, clinking lantern chains (Scene 3).
  - Peaceful morning sea wash and gentle breeze (Scene 4).
  - Dip pen nib on paper and distant train whistle (Scene 5).
