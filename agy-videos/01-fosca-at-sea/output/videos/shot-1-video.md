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
  > *"In our home in Gambarare, the river floods had ruined the harvest. Father said: 'We starve here, or we take the ship.' We packed our only wooden chest and shut the door forever. In the train to Genoa, nobody spoke. Father stared at his hands; Mother held baby Eugenio tight. Neither of them knew if we were escaping death... or leading all six of us straight into it."*
- **VO Track (PT-BR)**:
  > *"Na nossa casa em Gambarare, as cheias do rio tinham destruído a colheita. Meu pai disse: 'Ou morremos de fome aqui, ou pegamos o navio.' Guardamos tudo num único baú e fechamos a porta para sempre. No trem até Gênova, ninguém falava. Meu pai olhava para as próprias mãos; minha mãe apertava o bebê Eugenio no peito. Nenhum dos dois sabia se estávamos fugindo da morte... ou levando os seis filhos para a desgraça."*

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
