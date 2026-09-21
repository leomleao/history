# Pre-Production Keyframe Dossier: Shot 1 End (`shot-1-still-end.png`)

**Scene**: Shot 1 — The Home in Gambarare & Exiting the Cottage (Second 5.0 Transition)  
**Planned Target File**: `output/stills/shot-1-still-end.png`  
**Matching Start Keyframe**: [`output/stills/shot-1-still-start.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-1-still-start.png) (Kitchen table by candlelight)  
**Next Sequence (Shot 2 Start)**: Wall-Slide Transition into Train Carriage  
**Status**: **Ready for User Approval to Generate**  

---

## 1. Cinematic & Narrative Function (Connecting Shot 1 to Shot 2)

- **The Motion Arc (0:00 to 0:05)**:
  - **Start (0.0s)**: Family grouped around the kitchen table in Gambarare by candlelight; Giuseppe cinches the hemp rope around the wooden chest; Fosca holds baby Eugenio; children watch solemnly.
  - **Action Progression**: Giuseppe finishes knotting the rope, hoists the heavy wooden chest by its hemp rope handle, and walks toward the open doorway. Fosca and the children follow immediately behind him.
  - **End (5.0s)**: Giuseppe is in mid-stride stepping out through the open wooden doorway of the Gambarare cottage into the driving rain and dark mud. The cold blue night light catches his determined profile and the wet wooden chest. On the right side of the frame, the dark weathered stone cottage wall looms, setting up a dynamic camera slide to the right across the wall. Behind Giuseppe in the doorway, Fosca holding infant Eugenio and the children are stepping right behind him.
- **Visual & Camera Bridge into Shot 2**:
  - The shot concludes with the camera sliding to the right across the dark stone cottage wall, wiping across the wall into the wooden interior wall of the third-class train carriage in Shot 2.

---

## 2. Planned CLI Invocation & Exact Prompt

### Command
```bash
higgsfield generate create gpt_image_2_5 \
  --prompt "Cinematic historic documentary photograph in cold autumn darkness and driving rain in October 1891, at the open doorway of a humble stone peasant cottage in Gambarare, Veneto. Father Giuseppe Panzonato (aged 36, matching giuseppe reference, lean athletic build, dark hair, full dark mustache, no white hair, rustic work trousers, vest, and wool cap) is captured in mid-motion stepping out through the weathered wooden doorway into the rainy night, carrying the heavy rope-bound wooden travel chest by its hemp handle. Cold blue rain light illuminates his determined profile as he steps over the stone threshold. To his right, the thick dark stone exterior wall of the cottage fills the right edge of the frame, setting up a camera pan. Inside the dark doorway behind him, mother Fosca Moro (aged 30, matching fosca reference) holding bundled infant Eugenio and the children follow closely at his heels. Atmospheric 19th-century documentary realism, cinematic framing, dramatic chiaroscuro lighting, 35mm film grain" \
  --image ./images/giuseppe.jpg \
  --image ./images/Fosca.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait
```

### Reference Inputs Passed
- **Giuseppe Panzonato Face Reference**: [`images/giuseppe.jpg`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/giuseppe.jpg) (Aged 36, lean athletic build, dark hair, dark mustache)
- **Fosca Moro Face Reference**: [`images/Fosca.jpg`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/Fosca.jpg) (Aged 30, dark hair in bun, Victorian travel dress, shawl)

---

## 3. Directional Rationale & Pacing

- **Eliminating the Teleportation Issue**:
  - Fosca and the children are not 20 meters away outside; they are grouped immediately behind Giuseppe as he crosses the threshold.
  - The movement from table to doorway is unified in one continuous forward motion.
- **The Wall-Slide Transition**:
  - The right-side stone wall serves as a motivated whip/slide wipe that seamlessly matches into the wooden wall of the train carriage in Shot 2.
