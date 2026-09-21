# Pre-Production Keyframe Dossier: Shot 2 End (`shot-2-still-end.png`)

**Scene**: Shot 2 — The Train Across Italy & The Looming Hull (Second 5.0 Transition)  
**Planned Target File**: `output/stills/shot-2-still-end.png`  
**Matching Start Keyframe**: [`output/stills/shot-2-still-start.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-2-still-start.png)  
**Next Sequence (Shot 3 Start)**: [`output/stills/shot-3-still-start.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-3-still-start.png) (Deck of Colombo at Cape Verde coaling stop)  
**Status**: **Ready for User Approval to Generate**  

---

## 1. Cinematic & Narrative Function (Connecting Shot 2 to Shot 3)

- **The Motion Arc (0:05 to 0:10)**:
  - **Start (0.0s)**: Interior of rattling wooden third-class carriage; Giuseppe gripping the chest; Fosca holding baby; Luigia looking through rain-streaked glass as the port appears in the distance.
  - **Action Progression**: The train slows and screeches to a halt along the wet stone harbor tracks of Genoa. 10-year-old Luigia reaches up with her woolen sleeve and wipes a clear circle through the misty condensation on the window. Outside the glass, the colossal black iron hull of the *Colombo* looms immediately overhead.
  - **End (5.0s)**: Looking past Luigia’s hand against the freshly wiped window circle: directly outside in the driving rain, the massive black-and-red iron plates, riveted hull, and smoking black funnel of the steamship *Colombo* fill the window view. On the stone pier, hundreds of Italian emigrants in dark caps and shawls queue at the wooden gangplank under umbrella-bearing port officials. Giuseppe has risen from the carriage bench, hoisting the wooden chest, shouting to the family to gather their bundles.
- **Visual & Narrative Bridge into Shot 3**:
  - The looming black hull of the *Colombo* and the family boarding cuts directly to their life aboard the ship as it leaves Europe, crosses the Atlantic, and coals in Cape Verde.

---

## 2. Planned CLI Invocation & Exact Prompt

### Command
```bash
higgsfield generate create gpt_image_2_5 \
  --prompt "Cinematic historic photograph in heavy autumn rain at the Port of Genoa in October 1891, viewed from inside the vintage wooden third-class train carriage that has just stopped at the harbor quay. 10-year-old Luigia Panzonato has just wiped a clear circle through the foggy condensation on the carriage window with her wool sleeve, staring out with wide, astonished eyes. Directly through the window glass, towering colossal over the wet stone pier, is the massive black-and-red iron hull and tall smoking black funnel of the steamship Colombo matching the drydock ship reference photo. On the wet cobblestone quay below the ship's steep wooden gangway, crowds of poor Italian emigrants in dark wool coats and shawls wait in the rain. Inside the carriage behind Luigia, father Giuseppe (aged 36, matching giuseppe reference, lean athletic build, dark hair, dark mustache) stands up from the wooden bench hoisting the heavy rope-bound wooden chest onto his shoulder, while mother Fosca (aged 30, matching fosca reference) gathers the children. Dramatic scale, cinematic composition, authentic 19th-century documentary realism, natural moody harbor light, 35mm film grain" \
  --image ./images/colombo-drydock-1901.jpg \
  --image ./images/genoa-port-1892-noack.webp \
  --image ./images/giuseppe.jpg \
  --image ./images/Fosca.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait
```

### Reference Inputs
- **Steamship Colombo Hull**: [`images/colombo-drydock-1901.jpg`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/colombo-drydock-1901.jpg) (Riveted black iron plates, red lower hull, clipper bow)
- **Port of Genoa Historic Quay**: [`images/genoa-port-1892-noack.webp`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/genoa-port-1892-noack.webp) (Alfred Noack 1892 emigrant quayside)
- **Giuseppe Panzonato Face Reference**: [`images/giuseppe.jpg`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/giuseppe.jpg)
- **Fosca Moro Face Reference**: [`images/Fosca.jpg`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/Fosca.jpg)

---

## 3. Historical Sources & Direct Connections

1. **Porto di Genova & The Emigrant Trains**:
   - The Rete Mediterranea line brought emigrant trains directly to the maritime quays of Genoa (Ponte dei Mille).
   - Immigrants walked directly from third-class rail carriages to the gangways of transatlantic liners.
2. **The Visual Shock of the Machine Age**:
   - For rural Venetian peasant children like Luigia, who had only seen canal barges and village fields, the sight of a 104-meter, 3,000-ton ocean-going iron steamship was an overwhelming, terrifying encounter with modern industrial power.
