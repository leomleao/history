# Video Production Dossier: Shot 8 (`shot-8-video.mp4`)

**Scene**: Shot 8 — Arrival at Capivari Station & Facing the Unknown (0:35 – 0:40)  
**Planned Target File**: `output/videos/shot-8-video.mp4`  
**Input Keyframe**: [`output/stills/shot-8-still-start.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-8-still-start.png)  
**Status**: Pre-Production Specification / Ready for Video Generation  

---

## 1. Technical Video Parameters

| Parameter | Planned Value |
| :--- | :--- |
| **Model Engine** | `kling3_0_turbo` |
| **Input Keyframe (`--start-image`)** | [`output/stills/shot-7-still.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-7-still.png) |
| **Duration** | 5 seconds (0:30 – 0:35) |
| **Aspect Ratio** | 16:9 Landscape |
| **Resolution** | 1080p |
| **Credit Cost** | 10.0 credits |

---

## 2. Planned CLI Invocation & Exact Motion Prompt

### Command
```bash
higgsfield generate create kling3_0_turbo \
  --prompt "Slow cinematic camera drift and subtle pull-back outside the Capivari railway station: warm late afternoon golden light shines across the red clay road, father Giuseppe stands holding their wooden travel chest, blinking slowly and looking across the unfamiliar frontier with solemn uncertainty, mother Fosca softly adjusts the swaddled infant Eugenio against her shawl, 10-year-old Luigia and her young siblings look around at the foreign red dust with hesitant, watchful eyes, light breeze softly rustling fabrics and stirring fine dust particles, atmospheric 19th-century documentary realism, 35mm film grain" \
  --start-image output/stills/shot-7-still.png \
  --duration 5 \
  --resolution 1080p \
  --wait
```

---

## 3. Narrative & Voiceover Alignment

- **Narrative Perspective**: 10-year-old Luigia Panzonato in the present tense (December 1891).
- **VO Track (EN)**:
  > *"Another train carried us to the end of the line: Capivari. We stepped down onto a road of red dust with only one wooden chest between the eight of us. Nobody spoke our tongue. We didn't know where we would sleep, or how we were going to survive."*
- **VO Track (PT-BR)**:
  > *"Outro trem nos levou até o fim da linha: Capivari. Descemos numa estrada de terra vermelha, com um único baú de madeira para nós oito. Ninguém falava a nossa língua. Não sabíamos onde íamos dormir, nem como íamos sobreviver."*

---

## 4. Cinematography & Motion Rationale

1. **The Threshold of the Unknown**:
   - The camera begins anchored on the family and subtly pulls back, expanding the frame to emphasize their isolation in the vast red-dirt landscape of the São Paulo frontier.
2. **Atmospheric Texture**:
   - Swirling red dust motes caught in the horizontal late-afternoon sunbeams.
   - The contrast between the rigid Victorian brickwork of the station and the untamed red earth road.
3. **Character Micro-Behaviors**:
   - Giuseppe’s weathered hands resting firmly on the wooden chest, his shoulder muscles taking a steady breath.
   - Fosca gently soothing infant Eugenio against the evening chill.
   - Luigia’s observant gaze scanning the surroundings, registering the sheer scale of the new world.
