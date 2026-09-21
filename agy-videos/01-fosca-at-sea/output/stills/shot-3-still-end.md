# Pre-Production Keyframe Dossier: Shot 3 End (`shot-3-still-end.png`)

**Scene**: Shot 3 — The Ocean Stops & The Barred Shore (Second 5.0 Transition)  
**Planned Target File**: `output/stills/shot-3-still-end.png`  
**Matching Start Keyframe**: [`output/stills/shot-3-still-start.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-3-still-start.png)  
**Next Sequence (Shot 4 Start)**: [`output/stills/shot-4-still-start.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-4-still-start.png) (Tween-deck steerage hold in Atlantic storm)  
**Status**: **Ready for User Approval to Generate**  

---

## 1. Cinematic & Narrative Function (Connecting Shot 3 to Shot 4)

- **The Motion Arc (0:10 to 0:15)**:
  - **Start (0.0s)**: Immigrant family standing at the wooden deck railing of the *Colombo* in Porto Grande bay (Mindelo, Cape Verde), staring wistfully at the volcanic peaks through iron bars under blinding midday sun.
  - **Action Progression**: Giant iron steam winches roar to life, hoisting heavy wicker coal baskets from black lighters. Clouds of dense black coal dust blow violently across the deck. Ship crew in white maritime uniforms and brass buttons aggressively shout orders and wave batons, forcing all steerage passengers away from the open air.
  - **End (5.0s)**: At the open iron hatchway leading down into the tween-deck hold: dark coal dust swirls in the air. 10-year-old Luigia pulls her collar up over her nose and mouth, turning her face back toward the open hatch. Giuseppe (36), with coal dust coating his coat and brow, wraps his muscular arm protectively around Fosca and infant Eugenio, forcefully guiding the children down the steep iron companionway ladder into the pitch-black hold below.
- **Visual & Narrative Bridge into Shot 4**:
  - Descending through the iron hatchway leads seamlessly into Shot 4—the cramped, rolling steerage hold where 700 passengers are confined during the Atlantic crossing.

---

## 2. Planned CLI Invocation & Exact Prompt

### Command
```bash
higgsfield generate create gpt_image_2_5 \
  --prompt "Cinematic historic photograph in harsh tropical sunlight and swirling black coal dust on the wooden steerage deck of the steamship Colombo anchored off the volcanic cliffs of Cape Verde in November 1891. Giant iron steam winches and cables hoist heavy coal baskets in the background, filling the air with soot. In the foreground at the steep iron companionway hatch leading down into the ship's dark hold, Italian immigrant father Giuseppe (aged 36, matching giuseppe reference, lean athletic build, dark hair and dark mustache, no white hair, work clothes dusted with coal soot) stands with protective urgency, ushering his family toward the ladder. Beside him, mother Fosca Moro (aged 30, matching fosca reference, dark Victorian dress and shawl) shields swaddled baby Eugenio from the blowing coal dust, while 10-year-old daughter Luigia pulls her dress collar over her face to breathe, her young eyes wide with apprehension as she steps down into the dark abyss of the lower hold. Authentic 19th-century maritime documentary realism, cinematic framing, dynamic motion, dramatic contrast, 35mm film grain" \
  --image ./images/cape-verde-porto-grande-1890.webp \
  --image ./images/colombo-drydock-1901.jpg \
  --image ./images/giuseppe.jpg \
  --image ./images/Fosca.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait
```

### Reference Inputs
- **Porto Grande Cape Verde**: [`images/cape-verde-porto-grande-1890.webp`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/cape-verde-porto-grande-1890.webp)
- **Steamship Colombo**: [`images/colombo-drydock-1901.jpg`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/colombo-drydock-1901.jpg)
- **Giuseppe Face Reference**: [`images/giuseppe.jpg`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/giuseppe.jpg)
- **Fosca Face Reference**: [`images/Fosca.jpg`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/Fosca.jpg)

---

## 3. Historical Sources & Direct Connections

1. **Quarantine & Coaling Brutality**:
   - *Primary Source*: Italian Maritime Sanitary Regulations (1890s) & *Colombo* voyage logs.
   - Steerage passengers were strictly barred from coming ashore during coaling at Mindelo to prevent desertion, yellow fever introduction, and maritime delays. When coaling began, passengers were locked below decks (*stiva*) to keep them out of working rigging, enduring extreme suffocating heat.
2. **Physical Action**:
   - Giuseppe physically shielding his family and driving them down the hatchway captures the sheer physical hardship and loss of dignity suffered by third-class emigrants treated as human cargo.
