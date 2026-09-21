# Pre-Production Keyframe Dossier: Shot 7 End (`shot-7-still-end.png`)

**Scene**: Shot 7 — Arrival at Capivari Station & The First Steps into the Frontier (Second 5.0 Transition)  
**Planned Target File**: `output/stills/shot-7-still-end.png`  
**Matching Start Keyframe**: [`output/stills/shot-7-still-start.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-7-still-start.png)  
**Next Sequence (Shot 8 Start)**: [`output/stills/shot-8-still-start.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-8-still-start.png) (Coffee plantation rows & whispering the mother tongue)  
**Status**: **Ready for User Approval to Generate**  

---

## 1. Cinematic & Narrative Function (Connecting Shot 7 to Shot 8)

- **The Motion Arc (0:30 to 0:35)**:
  - **Start (0.0s)**: Family standing outside the red-brick Capivari railway station on the red dirt road, Giuseppe with his hand resting on the wooden chest, stunned by the vastness of the frontier.
  - **Action Progression**: Giuseppe takes a deep breath, bends down, and hoists the heavy wooden chest onto his muscular shoulder. He turns his back to the station and begins walking down the open red dirt road. Fosca, Luigia, and the children fall into step beside him.
  - **End (5.0s)**: Walking down the wide red clay road (*terra roxa*) away from Capivari Station into the open countryside: Giuseppe (36) carries the rope-bound chest on his right shoulder, his trousers and boots caked in red dust, walking with determined strides. Fosca (30) walks at his left side holding baby Eugenio in her shawl, while 10-year-old Luigia leads her younger brother by the hand. In the background behind them stands the receding red-brick station, and in the distance ahead rise the green coffee-covered hills under the late afternoon golden sun. A rustic wooden farm wagon passes in the distance, stirring up an amber cloud of red dust.
- **Visual & Narrative Bridge into Shot 8**:
  - Walking down the red road into the coffee hills directly places them in the coffee rows of Shot 8, where their physical labor and cultural survival begin.

---

## 2. Planned CLI Invocation & Exact Prompt

### Command
```bash
higgsfield generate create gpt_image_2_5 \
  --prompt "Cinematic historic photograph in warm late afternoon golden sunlight on the wide, unpaved red clay road (terra roxa) in Capivari, São Paulo, in December 1891. The Italian immigrant family is walking down the red dirt road away from the historic red-brick Capivari railway station visible in the background, heading into the vast frontier toward distant green coffee hills. In the lead, father Giuseppe (aged 36, matching giuseppe reference, lean athletic build, dark hair, full dark mustache, work trousers, vest and wool cap, boots caked in red dust) carries the heavy rope-bound wooden travel chest on his shoulder with rugged determination. Walking beside him, mother Fosca Moro (aged 30, matching fosca reference, dark hair in bun, dark Victorian travel dress) cradles infant Eugenio against her chest, while 10-year-old Luigia holds the hand of her 5-year-old brother, their simple clothes dusted with red earth as they take their first steps into their new life. Fine red dust motes glow in the golden sunbeams. Authentic 19th-century documentary realism, cinematic wide tracking shot, natural warm lighting, 35mm film grain" \
  --image ./images/estacao-capivari-historica.jpg \
  --image ./images/giuseppe.jpg \
  --image ./images/Fosca.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait
```

### Reference Inputs
- **Capivari Station Architecture**: [`images/estacao-capivari-historica.jpg`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/estacao-capivari-historica.jpg)
- **Giuseppe Face Reference**: [`images/giuseppe.jpg`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/giuseppe.jpg)
- **Fosca Face Reference**: [`images/Fosca.jpg`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/Fosca.jpg)

---

## 3. Historical Sources & Direct Connections

1. **The Walk from Station to Fazenda**:
   - Rural railway stations in 1891 São Paulo were simple drop-off points. Immigrants walked on foot or were transported on flatbed ox-carts along unpaved dirt tracks directly to the plantation colonies (*colônias de fazenda*).
2. **The "Terra Roxa" Encounter**:
   - For northern Italians accustomed to the humid green pastures and stone pathways of Veneto, the fine, staining red dust of the Paulista interior was an indelible sensory shock that permanently altered their clothing, skin, and memories.
