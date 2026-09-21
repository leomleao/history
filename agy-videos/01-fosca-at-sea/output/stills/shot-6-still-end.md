# Pre-Production Keyframe Dossier: Shot 5 End (`shot-5-still-end.png`)

**Scene**: Shot 5 — Arriving into War: Rio & Battleship Riachuelo (Second 5.0 Transition)  
**Planned Target File**: `output/stills/shot-5-still-end.png`  
**Matching Start Keyframe**: [`output/stills/shot-5-still-start.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-5-still-start.png)  
**Next Sequence (Shot 6 Start)**: [`output/stills/shot-6-still-start.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-6-still-start.png) (Platform of Hospedaria do Brás)  
**Status**: **Ready for User Approval to Generate**  

---

## 1. Cinematic & Narrative Function (Connecting Shot 5 to Shot 6)

- **The Motion Arc (0:20 to 0:25)**:
  - **Start (0.0s)**: Family standing at the upper deck rail of the *Colombo* looking in disbelief across Guanabara Bay as the ironclad battleship *Riachuelo* points heavy cannons at the city.
  - **Action Progression**: An armed naval steam launch speeds alongside the ship with signal flags flying, ordering merchant traffic away from the insurgent naval line. The *Colombo*’s massive steam whistle roars as the rudder turns hard, leaving a foaming wake as the ship swings south away from the conflict.
  - **End (5.0s)**: Giuseppe (36) pulls Fosca and 10-year-old Luigia back from the iron railing with protective urgency, turning them toward the stern. In the background over the retreating churning wake of the ship, the silhouette of the armored battleship *Riachuelo* and Sugarloaf Mountain fade into distant smoke and sea spray as the ship flees south toward Santos.
- **Visual & Narrative Bridge into Shot 6**:
  - The diversion south away from the Rio insurrection leads directly into Shot 6, where the family lands at Santos, climbs the Serra do Mar by funicular, and enters the sorting platform at Hospedaria do Brás.

---

## 2. Planned CLI Invocation & Exact Prompt

### Command
```bash
higgsfield generate create gpt_image_2_5 \
  --prompt "Cinematic historic documentary photograph on the upper wooden deck of the steamship Colombo in late November 1891, as the vessel sharply turns away from the entrance of Guanabara Bay in Rio de Janeiro. In the background across the foaming ocean wake, the massive black ironclad battleship Riachuelo with its heavy artillery turrets and Sugarloaf Mountain fade into tropical haze and distant artillery smoke. In the foreground on deck, Italian immigrant father Giuseppe (aged 36, matching giuseppe reference, lean athletic build, dark hair and dark mustache, no white hair, brown waistcoat and cap) turns with fierce protective resolve, shielding mother Fosca Moro (aged 30, matching fosca reference) who cradles baby Eugenio close to her chest. 10-year-old Luigia looks back over her shoulder at the armed warships with wide, tense eyes, holding her brother's hand as sea wind whips through their hair and clothing. Tense dramatic action, authentic 19th-century maritime historical realism, cinematic wide framing, natural sea lighting, 35mm film grain" \
  --image ./images/encouracado-riachuelo-1891-ferrez.webp \
  --image ./images/giuseppe.jpg \
  --image ./images/Fosca.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait
```

### Reference Inputs
- **Battleship Riachuelo**: [`images/encouracado-riachuelo-1891-ferrez.webp`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/encouracado-riachuelo-1891-ferrez.webp) (Marc Ferrez 1891 historical photo)
- **Giuseppe Face Reference**: [`images/giuseppe.jpg`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/giuseppe.jpg)
- **Fosca Face Reference**: [`images/Fosca.jpg`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/Fosca.jpg)

---

## 3. Historical Sources & Direct Connections

1. **The First Naval Revolt (November 1891)**:
   - On 23 November 1891, Custódio de Mello trained the *Riachuelo*'s 9.2-inch Armstrong guns on Rio de Janeiro. Ships carrying European emigrants were warned away or diverted south to Santos to avoid crossfire and civil unrest.
2. **The Turn to Santos**:
   - The diversion from Rio to the Port of Santos directly determined the family's destination, funneling them through the São Paulo immigration pipeline (*Hospedaria do Brás*).
