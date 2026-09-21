# Video Production Dossier: Shot 2 (`shot-2-video.mp4`)

**Scene**: Shot 2 — The Train Across Italy & The Looming Hull (0:05 – 0:10)  
**Planned Target File**: `output/videos/shot-2-video.mp4`  
**Input Keyframe**: [`output/stills/shot-2-still.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-2-still.png)  
**Status**: Pre-Production Specification / Ready for Video Generation  

---

## 1. Technical Video Parameters

| Parameter | Planned Value |
| :--- | :--- |
| **Model Engine** | `kling3_0_turbo` |
| **Input Keyframe (`--start-image`)** | [`output/stills/shot-2-still.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-2-still.png) |
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
  --start-image output/stills/shot-2-still.png \
  --duration 5 \
  --resolution 1080p \
  --wait
```

---

## 3. Narrative & Voiceover Alignment

- **Narrative Perspective**: 10-year-old Luigia Panzonato in the present tense (October 1891).
- **VO Track (EN)**:
  > *"On the train to Genoa, nobody spoke. Father stared at his hands; Mother held baby Eugenio so tight. Neither knew if we were escaping death... or leading all six of us straight into it. And then, through the rain, we saw the ship. A black iron monster called Colombo."*
- **VO Track (PT-BR)**:
  > *"No trem até Gênova, ninguém falava. Meu pai olhava para as próprias mãos; minha mãe apertava o bebê no peito. Nenhum dos dois sabia se estávamos fugindo da morte... ou levando os seis filhos para a desgraça. E então, pela janela na chuva, vimos o navio. Um monstro de ferro preto chamado Colombo."*

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
