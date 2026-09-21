# Pre-Production Keyframe Dossier: Shot 6 End (`shot-6-still-end.png`)

**Scene**: Shot 6 — Hospedaria do Brás & Departure for the Interior (Second 5.0 Transition)  
**Planned Target File**: `output/stills/shot-6-still-end.png`  
**Matching Start Keyframe**: [`output/stills/shot-6-still-start.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-6-still-start.png)  
**Next Sequence (Shot 7 Start)**: [`output/stills/shot-7-still-start.png`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/output/stills/shot-7-still-start.png) (Arrival outside Capivari Station on the red earth road)  
**Status**: **Ready for User Approval to Generate**  

---

## 1. Cinematic & Narrative Function (Connecting Shot 6 to Shot 7)

- **The Motion Arc (0:25 to 0:30)**:
  - **Start (0.0s)**: Immigrant families arriving at the vast, noisy brick platform of Hospedaria dos Imigrantes do Brás in São Paulo.
  - **Action Progression**: The family moves through registration (Book 031, Page 283, registered for Tietê/Capivari), exiting the medical and dorm buildings toward the internal railway spur where the rural immigrant train is boarding.
  - **End (5.0s)**: Beside the wooden passenger train cars on the Brás rail siding: steam billows around the iron wheels. Giuseppe (aged 36) heaves their rope-bound wooden travel chest up into the open baggage door of the wooden carriage. Fosca (aged 30), holding infant Eugenio, steps up onto the iron train steps, while 10-year-old Luigia ushers her younger siblings aboard. A station conductor in uniform checks their paper transit slip.
- **Visual & Narrative Bridge into Shot 7**:
  - Boarding the train at Brás directly explains how they arrive in Shot 7, where they step down outside Capivari Station at the terminus of that exact rail line.

---

## 2. Planned CLI Invocation & Exact Prompt

### Command
```bash
higgsfield generate create gpt_image_2_5 \
  --prompt "Cinematic historic photograph in mid-December 1891 at the railway platform of Hospedaria dos Imigrantes do Brás in São Paulo. A vintage wooden immigrant train with steam locomotive stands on the tracks, white steam billowing along the platform. Italian immigrant father Giuseppe (aged 36, matching giuseppe reference, lean athletic build, dark hair, full dark mustache, work trousers and vest) uses both hands to heave their sole rope-bound wooden travel chest into the open baggage doorway of the train car. Beside the coach entrance, mother Fosca Moro (aged 30, matching fosca reference, dark hair in bun, dark Victorian dress and shawl) holds infant Eugenio in her arms as she steps up onto the iron train footstep, while 10-year-old Luigia helps her young brothers and sisters climb aboard into the carriage. Other immigrant families with sacks and bundles move along the platform in the background under the high brick walls of the hostel. Authentic 19th-century railway documentary realism, cinematic wide shot, natural daylight, 35mm film grain" \
  --image ./images/trem_imigrantes_hospedaria.jpg \
  --image ./images/hospedaria_dos_imigrantes_patio_1890_gaensly.jpg \
  --image ./images/giuseppe.jpg \
  --image ./images/Fosca.jpg \
  --aspect_ratio 16:9 \
  --resolution 2k \
  --wait
```

### Reference Inputs
- **Immigrant Train at Brás**: [`images/trem_imigrantes_hospedaria.jpg`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/trem_imigrantes_hospedaria.jpg)
- **Hospedaria Courtyard**: [`images/hospedaria_dos_imigrantes_patio_1890_gaensly.jpg`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/hospedaria_dos_imigrantes_patio_1890_gaensly.jpg)
- **Giuseppe Face Reference**: [`images/giuseppe.jpg`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/giuseppe.jpg)
- **Fosca Face Reference**: [`images/Fosca.jpg`](file:///Users/leo/dev/history/agy-videos/01-fosca-at-sea/images/Fosca.jpg)

---

## 3. Historical Sources & Direct Connections

1. **Hospedaria do Brás Railway Spur**:
   - The Hospedaria dos Imigrantes possessed its own private internal railway platform directly linked to the São Paulo Railway and Sorocabana network. Immigrants boarded subsidized trains directly inside the hostel complex for transit to plantation destinations.
2. **Contract 15 December 1891 (Book 031, Page 283)**:
   - On 15 December 1891, the Panzonato family was formally assigned to Tietê / Capivari, boarding the train with their contract slip and single travel chest.
