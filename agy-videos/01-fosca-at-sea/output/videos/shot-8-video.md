# Video Production Dossier: Shot 8 (`shot-8-video.mp4`)

**Scene**: Shot 8 — The Coffee Plantation & The Living Roots (0:35 – 0:40)  
**Planned Target File**: `output/videos/shot-8-video.mp4`  
**Input Keyframe**: [`output/stills/shot-8-still.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-8-still.png)  
**Status**: Pre-Production Specification / Ready for Video Generation  

---

## 1. Technical Video Parameters

| Parameter | Planned Value |
| :--- | :--- |
| **Model Engine** | `kling3_0_turbo` |
| **Input Keyframe (`--start-image`)** | [`output/stills/shot-8-still.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-8-still.png) |
| **Duration** | 5 seconds (0:35 – 0:40) |
| **Aspect Ratio** | 16:9 Landscape |
| **Resolution** | 1080p |
| **Credit Cost** | 10.0 credits |

---

## 2. Planned CLI Invocation & Exact Motion Prompt

### Command
```bash
higgsfield generate create kling3_0_turbo \
  --prompt "Slow cinematic camera push-in across the coffee plantation in warm late afternoon light: father Giuseppe stands holding his field hoe beside the harvest basket, mother Fosca softly leans to whisper into young Luigia's ear with a gentle finger to her lips, the children sit close on the red earth listening with calm resilient eyes, soft breeze gently swaying coffee shrub branches in the background, authentic 19th-century historical realism, 35mm film grain" \
  --start-image output/stills/shot-8-still.png \
  --duration 5 \
  --resolution 1080p \
  --wait
```

---

## 3. Narrative & Voiceover Alignment

- **Narrative Perspective**: 10-year-old Luigia Panzonato in the present tense (December 1891).
- **VO Track (EN)**:
  > *"From sunrise to dark, we tended the coffee rows across the red hills. They told us to forget our old ways and altered our family names. But at dusk, Mother gathered us close, whispering in our native tongue: 'Never forget your roots.' The flood did not stop us. The ocean did not claim us. All eight of us stood together, unbroken."*
- **VO Track (PT-BR)**:
  > *"Do amanhecer à noite, cuidávamos dos cafezais pela terra vermelha. Disseram para esquecer nossos costumes e mudaram nossos nomes. Mas ao entardecer, mamãe nos reunia e sussurrava em nossa língua: 'Nunca esqueçam de suas raízes.' A cheia não nos deteve. O oceano não nos levou. Nós oito continuamos de pé, unidos."*

---

## 4. Cinematography & Motion Rationale

1. **Intimacy and Endurance**:
   - A delicate push-in toward Fosca and Luigia beneath the porch eave, focusing on the preservation of heritage and maternal warmth.
2. **Environmental Movement**:
   - Subtle movement of coffee foliage across the rolling hillside under late afternoon sunlight.
3. **Character Micro-Behaviors**:
   - Giuseppe leaning on his hoe with calm dignity.
   - Fosca whispering to her daughter while gently touching her shoulder.
   - The children holding their gaze steady into the lens, embodying resilience.
