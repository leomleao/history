# Video Production Dossier: Shot 2 (`shot-2-video.mp4`)

**Scene**: Shot 2 — The Wall-Slide Transition & Settling into the Train Seat (0:05 – 0:10)  
**Output Video File**: [`output/videos/shot-2-video.mp4`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/videos/shot-2-video.mp4)  
**Previous Sequence (Shot 1)**: [`output/videos/shot-1-video.mp4`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/videos/shot-1-video.mp4) (Exiting cottage door, camera sliding right across wall)  
**Next Sequence (Shot 3)**: [`output/videos/shot-3-video.mp4`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/videos/shot-3-video.mp4) (Seated on train bench, Luigia looking out window at Genoa harbor)  
**Start Keyframe (`--start-image`)**: [`output/stills/shot-2-still-start.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-2-still-start.png) (Exact last frame of Shot 1)  
**End Keyframe (`--end-image`)**: [`output/stills/shot-2-still-end.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-2-still-end.png) (Exact first frame of Shot 3)  
**Status**: **COMPLETED & VERIFIED (Pixel-Perfect Continuous Match Cut)**  
**Date Generated**: 21 September 2026, 15:41 local time  

---

## 1. Technical Video Parameters

| Parameter | Value |
| :--- | :--- |
| **Model Engine** | `kling3_0` (Standard Mode) |
| **Job ID** | `ab1ca4b1-8b59-43be-bc42-9101265eccb5` |
| **Start Frame (`--start-image`)** | [`output/stills/shot-2-still-start.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-2-still-start.png) (Exact last frame of Shot 1) |
| **End Frame (`--end-image`)** | [`output/stills/shot-2-still-end.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-2-still-end.png) (Exact first frame of Shot 3) |
| **Duration** | 5.04 seconds (0:05 – 0:10) |
| **Aspect Ratio** | 16:9 Landscape |
| **Resolution** | 720p (1276 × 720 px @ 24 fps) |
| **Audio Stream** | AAC stereo (192 kbps, 44.1 kHz, muxed with `output/audio/shot-2-sfx.mp3`) |
| **Credit Cost** | 7.5 credits (Video) + 1.25 credits (SFX) |
| **Cloudfront Asset URL** | `https://d8j0ntlcm91z4.cloudfront.net/user_3GHWX50U2g5AXszCy8KUmkREGbm/hf_20260921_144021_ab1ca4b1-8b59-43be-bc42-9101265eccb5.mp4` |

---

## 2. Exact CLI Invocation & Motion Prompt

### Command
```bash
higgsfield generate create kling3_0 \
  --prompt "Cinematic camera slide to the right across the dark wall, transitioning into the interior of the vintage third-class train carriage in October 1891: father Giuseppe steps into frame and lowers himself onto the wooden bench beside mother Fosca and their children, resting his hands firmly over the rope-bound travel chest. The carriage rattles on the iron tracks, soft motion of rainy landscape visible through the window, warm lantern light, authentic 19th-century historical realism, 35mm film grain" \
  --start-image output/stills/shot-2-still-start.png \
  --end-image output/stills/shot-2-still-end.png \
  --duration 5 \
  --mode std \
  --sound off
```

---

## 3. Narrative & Voiceover Alignment

- **Narrative Perspective**: 10-year-old Luigia Panzonato in the present tense (October 1891).
- **VO Track (EN)**:
  > *"We walked through the cold mud in the dark to catch the early train across Italy. Father hoisted our chest into the wooden carriage and took his seat beside us, shaking the rain from his coat."*
- **VO Track (PT-BR)**:
  > *"Caminhamos pela lama fria no escuro para pegar o primeiro trem que cruzava a Itália. Meu pai ergueu nosso baú para dentro do vagão de madeira e se sentou ao nosso lado, sacudindo a chuva do casaco."*

---

## 4. Visual Motion Analysis & Quality Assessment

1. **Seamless Match Cut from Shot 1 (0.0s – 1.0s)**:
   - Starts exactly on the dark blurred cottage wall in motion, continuing the lateral pan rightward initiated at the climax of Shot 1.
2. **Train Aisle Reveal (1.0s – 2.5s)**:
   - The camera pans across the center aisle of the vintage wooden carriage, revealing warm overhead lantern sconces, wooden high-backed bench rows, and fellow passengers in 1890s caps.
3. **Arrival at Family Bench (2.5s – 4.0s)**:
   - Giuseppe steps into frame, turning and lowering himself onto the wooden bench beside Fosca. He places his weathered hands over the hemp ropes tied around the family's wooden travel chest.
4. **Locking into Shot 3 Composition (4.0s – 5.0s)**:
   - The camera tracks into the exact side-profile framing: Giuseppe on the left with his hands on the chest, Luigia and her brother in the center, and Fosca nursing baby Eugenio on the right by the rain-slicked window overlooking Genoa harbor.
   - Zero seam or spatial dislocation when cutting from Shot 2 directly into Shot 3.
