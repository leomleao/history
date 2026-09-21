# Pre-Production Keyframe Dossier: Shot 4 End (`shot-4-still-end.png`)

**Scene**: Shot 4 — The Steerage Hold & The Atlantic Abyss (Second 5.0 Transition)  
**Planned Target File**: `output/stills/shot-4-still-end.png`  
**Matching Start Keyframe**: [`output/stills/shot-4-still-start.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-4-still-start.png)  
**Next Sequence (Shot 5 Start)**: [`output/stills/shot-5-still-start.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-5-still-start.png) (Upper deck entering Guanabara Bay / Rio)  
**Status**: **Ready for User Approval to Generate**  

---

## 1. Cinematic & Narrative Function (Connecting Shot 4 to Shot 5)

- **The Motion Arc (0:15 to 0:20)**:
  - **Start (0.0s)**: Cramped, violent rolling steerage tween-deck hold of the *Colombo*; Giuseppe bracing their wooden chest against iron stanchions; Fosca holding the children close as a thin ray of hatch daylight cuts the gloom.
  - **Action Progression**: The violent swaying slowly settles as the ship leaves the stormy Atlantic waters. Overhead, the heavy iron hatchway locks click open, and the tarpaulins are drawn back by crew members.
  - **End (5.0s)**: A brilliant, blinding column of pure tropical golden daylight pours directly down through the open hatchway into the dark hold. Giuseppe (36) stands tall, extending a steady hand to help Fosca rise with sleeping baby Eugenio. 10-year-old Luigia and her young brother stand beside them, their upturned faces bathed in glorious golden sunlight, eyes wide with profound relief and awe as crew above shout that the coast of South America has appeared.
- **Visual & Narrative Bridge into Shot 5**:
  - The family looking up into the flood of open tropical daylight cuts directly to the open upper deck in Shot 5 as they emerge into the sunlit expanse of Guanabara Bay and see Rio de Janeiro.

---

## 2. Planned CLI Invocation & Exact Prompt

### Command
```bash
higgsfield generate create gpt_image_2_5 \
  --prompt "Cinematic historic photograph inside the dark tween-deck steerage hold of the steamship Colombo in late November 1891. The stormy darkness is dramatically broken as the wide square cargo hatchway directly above is opened, flooding the gloomy hold with a brilliant, glorious beam of tropical golden sunlight and blue sky from the open ocean deck above. In the center of the radiant light beam standing beside their rope-bound wooden chest, Italian immigrant father Giuseppe (aged 36, matching giuseppe reference, lean athletic build, dark hair, dark mustache, no white hair, rustic work clothes) extends his hand with exhausted relief to support mother Fosca Moro (aged 30, matching fosca reference, dark Victorian dress and shawl) holding baby Eugenio. Beside them, 10-year-old daughter Luigia and her young siblings look straight up toward the open sky with expressions of profound wonder, survival, and rebirth, dust and straw motes dancing in the radiant sunbeam. Dramatic chiaroscuro lighting, emotional historical documentary realism, cinematic wide shot, 35mm film grain" \
  --image ./images/giuseppe.jpg \
  --image ./images/Fosca.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait
```

### Reference Inputs
- **Giuseppe Face Reference**: [`images/giuseppe.jpg`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/giuseppe.jpg)
- **Fosca Face Reference**: [`images/Fosca.jpg`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/Fosca.jpg)

---

## 3. Historical Sources & Direct Connections

1. **Surviving the Atlantic Crossing on the *Colombo***:
   - *Source*: Commissariato Generale dell’Emigrazione & *Archivio di Stato*.
   - Voyages across the Atlantic took between 24 and 30 days. Steerage passengers lived in cramped, windowless tween-decks with numbered berths (Bays 23 & 27). Surviving the crossing without losing a child to yellow fever or measles was regarded as a miracle.
2. **The Emergence to Light**:
   - The opening of the main hatchway signaled the end of open-ocean steerage confinement and the arrival in Brazilian territorial waters.
