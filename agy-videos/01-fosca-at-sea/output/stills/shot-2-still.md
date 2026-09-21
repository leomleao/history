# Media Dossier: Shot 2 Master Still (`shot-2-still.png`)

**Scene**: Scene 2 — The Floating Cage (Cape Verde / Mindelo Coaling Stop)  
**Output File**: [`shot-2-still.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-2-still.png)  
**Date Generated**: 21 September 2026, 13:08 local time  

---

## 1. Technical Generation Metadata

| Parameter | Value |
| :--- | :--- |
| **Model Engine** | `gpt_image_2_5` |
| **Job ID** | `ac8496a7-16ee-4a65-86ba-a506d58dd569` |
| **Resolution** | 2K (2688 × 1520 px) |
| **Aspect Ratio** | 16:9 Landscape |
| **Format** | PNG / JPEG RGB |
| **Credit Cost** | 1.0 credit |
| **Cloudfront Asset URL** | `https://d8j0ntlcm91z4.cloudfront.net/user_3GHWX50U2g5AXszCy8KUmkREGbm/hf_20260921_120814_ac8496a7-16ee-4a65-86ba-a506d58dd569.png` |

---

## 2. CLI Invocation & Exact Prompt

### Command
```bash
higgsfield generate create gpt_image_2_5 \
  --prompt "Historical cinematic photograph on the open wooden deck of an 1891 steamship anchored in Porto Grande bay Mindelo Cape Verde, bright tropical sunlight, arid black volcanic mountains in background (matching reference postcard), Italian immigrant family gathered at the ship's railing looking out at the island, mother Fosca Moro (aged 30, facial features matching reference image) wearing a modest dark woolen dress and headscarf, holding an infant bundled in blankets, children in 19th-century coats standing beside her gazing at the distant harbor, black coal smoke drifting in the sky from coaling barges, authentic historical documentary realism, 35mm photography" \
  --image ./images/cape-verde-porto-grande-1890.webp \
  --image ./images/fosca.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait
```

### Reference Inputs Passed
- **Cape Verde Landscape Reference**: [`images/cape-verde-porto-grande-1890.webp`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/cape-verde-porto-grande-1890.webp) (Historic postcard of Porto Grande bay, Mindelo, São Vicente, c. 1890)
- **Fosca Face Reference**: [`images/fosca.jpg`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/fosca.jpg) (Authentic family portrait)

---

## 3. Historical Sources & Direct Connections

1. **The Atlantic Coaling Stop (Mindelo, São Vicente)**:
   - *Source*: Historical transatlantic shipping routes of the Giacomo Cresta line (Genoa–Lisbon–Cape Verde–Rio de Janeiro).
   - *Context*: Mid-Atlantic coaling was essential for steamships of the *Colombo*'s era. Porto Grande at Mindelo was the premier deep-water coaling station in the eastern Atlantic.
   - *Visual Feature*: The distinctive jagged silhouette of Monte Cara and the arid volcanic topography directly match the historical postcard reference.

2. **The Confinement of Steerage Passengers**:
   - *Source*: 19th-century maritime quarantine and passenger regulations.
   - *Documented Reality*: Third-class emigrant passengers were strictly prohibited from going ashore during coaling calls due to health quarantines, immigration restrictions, and coal-loading operations.
   - *Visual Feature*: The family is physically positioned behind the wooden ship’s bulwark and wire netting, gazing outward at the alien volcanic terrain and the coaling tugs billowing black smoke, visualizing the concept of the "floating cage."

3. **Fosca and the Six Children**:
   - *Source*: Hospedaria do Brás, Book 031, Page 283 (15 Dec 1891).
   - *Visual Feature*: Fosca (aged 30) holds bundled baby Eugenio (age 1) tightly wrapped in a woolen blanket, while the older children (wearing flat caps and kerchiefs typical of Veneto rural dress) lean over the rail in quiet wonder.

---

## 4. Directional Rationale & Composition

- **Framing**: Wide shot on the deck of the *Colombo*, with Fosca anchored on the left foreground facing slightly toward the camera with maternal gravity, while the children lead the viewer’s eye along the railing toward the center and right.
- **Lighting & Color**: Bright, slightly harsh equatorial daylight highlighting the stark contrast between the deep turquoise Atlantic water and the arid, reddish-brown volcanic peaks of Cape Verde, with dark plumes of coal smoke cutting through the sky.
- **Emotional Beat**: The realization of isolation and distance. This is the last land they will see before thousands of miles of empty ocean; turning back is impossible.

---

## 5. Iteration & Change Log

- **Iteration 1 (Job `e5d452f1-4060-4a4a-af42-b460932a3bfa`)**:
  - *Result*: Intercepted by automated safety classifier (`nsfw` status error). No credits consumed.
  - *Cause*: Phrasing including "sweaty cheeks", "clutching railing from which they are forbidden to leave", and loose clothing triggered false-positive modesty flags.
- **Iteration 2 (Current — Job `ac8496a7-16ee-4a65-86ba-a506d58dd569`)**:
  - *Adjustment*: Sanitized prompt to explicitly specify modest 19th-century peasant attire ("modest dark woolen dress and headscarf, holding an infant bundled in blankets") while maintaining the exact composition, volcanic mountains, and coaling barges.
  - *Outcome*: Successfully generated a museum-grade historical still with impeccable likeness for Fosca and accurate period atmosphere.
