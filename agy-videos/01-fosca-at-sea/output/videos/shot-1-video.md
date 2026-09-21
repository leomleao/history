# Video Production Dossier: Shot 1 (`shot-1-video.mp4`)

**Scene**: Scene 1 — The Steam Train Across Italy (Veneto to Genoa, October 1891)  
**Planned Target File**: `output/videos/shot-1-video.mp4`  
**Input Keyframe**: [`output/stills/shot-1-still.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-1-still.png)  
**Status**: Pre-Production Specification / Awaiting User Execution Confirmation  

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
  --prompt "Subtle cinematic camera movement inside the vintage wooden third-class train carriage: rain streaks down the glass window as the misty Italian countryside speeds past outside, father Giuseppe gently tightens the rope on the wooden chest, mother Fosca softly cradles the sleeping infant, young Luigia blinks slowly and looks wistfully through the rain-streaked window toward the distant harbor, natural carriage vibrations, atmospheric 19th-century cinematic realism, 35mm film grain" \
  --start-image output/stills/shot-1-still.png \
  --duration 5 \
  --resolution 1080p \
  --wait
```

---

## 3. Narrative & Voiceover Alignment

- **Narrative Perspective**: 10-year-old Luigia Panzonato in the present tense (October 1891).
- **VO Track (EN)**:
  > *"The train smelled of wet wool and coal smoke. Father kept his hands locked on our wooden trunk — everything we owned was inside it. Mother didn't speak. She just held baby Eugenio against her chest, watching the grey Veneto fields vanish behind us. We were going to Genoa. We were crossing an ocean we had never seen."*
- **VO Track (PT-BR)**:
  > *"O trem cheirava a lã molhada e fumaça de carvão. Meu pai mantinha as mãos presas no nosso baú de madeira — tudo o que tínhamos no mundo estava ali dentro. Minha mãe não dizia nada. Apenas segurava o pequeno Eugenio contra o peito, vendo os campos cinzentos do Vêneto desaparecerem pela janela. Estávamos indo para Gênova. Íamos atravessar um oceano que nunca tínhamos visto."*

---

## 4. Cinematography & Motion Rationale

1. **Rhythmic Carriage Sway**:
   - The subtle rolling motion of an 1891 third-class carriage along the Rete Mediterranea line.
2. **Rain & Atmospheric Depth**:
   - Droplets running across the glass layer between the warm interior cabin and the stormy Ligurian coast.
3. **Micro-Behaviors**:
   - Giuseppe's hands resting firmly on the rough hemp rope of their only luggage trunk.
   - Fosca's gentle breathing as she protects the infant from drafts.
   - Luigia's contemplative eyes capturing the irrevocable leap into migration.
