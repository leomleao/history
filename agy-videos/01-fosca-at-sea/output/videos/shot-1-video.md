# Video Production Dossier: Shot 1 (`shot-1-video.mp4`)

**Scene**: Shot 1 — The Home in Gambarare & The Irreversible Choice (0:00 – 0:05)  
**Planned Target File**: `output/videos/shot-1-video.mp4`  
**Input Keyframe**: [`output/stills/shot-1-still.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-1-still.png)  
**Status**: Pre-Production Specification / Ready for Video Generation  

---

## 1. Technical Video Parameters

| Parameter | Planned Value |
| :--- | :--- |
| **Model Engine** | `kling3_0_turbo` |
| **Input Keyframe (`--start-image`)** | [`output/stills/shot-1-still.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-1-still.png) |
| **Duration** | 5 seconds |
| **Aspect Ratio** | 16:9 Landscape |
| **Resolution** | 1080p (or 720p option) |
| **Credit Cost** | 10.0 credits (1080p) / 7.5 credits (720p) |

---

## 2. Planned CLI Invocation & Exact Motion Prompt

### Command
```bash
higgsfield generate create kling3_0_turbo \
  --prompt "Subtle cinematic camera push-in inside the candlelit stone kitchen in Gambarare: father Giuseppe pulls and knots the heavy hemp rope on the wooden trunk with steady determination, mother Fosca softly rocks the swaddled baby Eugenio in her shawl, candlelight flickers against the wet window as rain streaks the dark glass outside, solemn 19th-century atmospheric realism, 35mm film grain" \
  --start-image output/stills/shot-1-still.png \
  --duration 5 \
  --resolution 1080p \
  --wait
```

---

## 3. Narrative & Voiceover Alignment

- **Narrative Perspective**: 10-year-old Luigia Panzonato in the present tense (October 1891).
- **VO Track (EN)**:
  > *"In the dead of night, Father looked around our bare kitchen and made the choice: 'We starve here, or we take the ship.' We packed our only wooden chest and shut the door of our house in Gambarare forever. We walked through the cold mud to catch the train across Italy to Genoa."*
- **VO Track (PT-BR)**:
  > *"No meio da noite, meu pai olhou para a nossa cozinha vazia e tomou a decisão: 'Ou morremos de fome aqui, ou pegamos o navio.' Guardamos tudo num único baú e fechamos a porta da nossa casa em Gambarare para sempre. Caminhamos pela lama fria até pegar o trem que cruzava a Itália rumo a Gênova."*

---

## 4. Cinematography & Motion Rationale

1. **Intimate Lighting & Flame Physics**:
   - The subtle flicker of candlelight casting shifting shadows across Giuseppe's hands and Fosca's profile.
2. **Rain & The Cold World Outside**:
   - Rain droplets lashing the dark window, emphasizing the contrast between the warmth of their ancestral hearth and the bleak exile awaiting them.
3. **The Physical Burden**:
   - The tension in the hemp rope as Giuseppe cinches the chest closed, embodying the irreversible seal on their Italian past.
