# AGY Videos — Production Governance & Rules

This document establishes the mandatory local rules and operational gates for producing AI-generated historical video shorts in the `agy-videos` project using the Higgsfield platform.

---

## The Non-Negotiable Gates

### Gate 1: Historical Source Alignment
- Every story and script must be grounded in primary archival sources from this repository (e.g., passenger manifests, civil registration acts, ship engineering histories, contemporary passenger diaries).
- **Hard Rule**: Clearly separate documented facts (names, dates, ages, ship dimensions, destinations) from dramatized sensory reconstruction. Never invent contradictory historical details.

### Gate 2: Explicit Script Approval
- **NO VIDEO MAY BE GENERATED UNTIL THE SCRIPT AND SHOT LIST RECEIVE FORMAL APPROVAL FROM THE USER.**
- The script, narration text, scene-by-scene visual descriptions, and emotional beats must be reviewed and accepted in writing before prompting video models.

### Gate 3: Credit Check & Cost Estimation
- Before submitting **any** generation job to Higgsfield, the agent must check and log:
  1. Current account balance via:
     ```bash
     higgsfield account status
     ```
  2. Estimated job cost via:
     ```bash
     higgsfield generate cost <model> [flags]
     ```
- If credits are insufficient or generation would deplete the starter budget unexpectedly, stop and notify the user.
- No blind or background batch generations. Every generation run must specify the exact model, parameters, cost, and expected output.

---

## Standard Production Pipeline

```
[Phase 1: Historical Research] 
   └── Analyze archive records & contemporary testimony (context-and-sources.md)
[Phase 2: Script & Storyboard] 
   └── Write narrative script, scene beats, and camera instructions (script-draft.md)
[Phase 3: Human Gate - Script Approval] 
   └── User reviews and approves script (MANDATORY GATE)
[Phase 4: Higgsfield Production Blueprint] 
   └── Model selection, reference image prompts, video shot prompts, audio cues
[Phase 5: Human Gate - Credit & Job Approval] 
   └── Run `higgsfield account status` + cost estimate, user confirms job dispatch
[Phase 6: Video & Audio Generation] 
   └── Dispatch jobs via Higgsfield CLI with `--wait`
[Phase 7: Review & Final Assembly] 
   └── Quality review, virality/hook check if applicable, archive deliverable
```

---

## Higgsfield Reference Baseline
- **Primary Video Engine**: `seedance_2_5` (SOTA cinematic motion, image-to-video, 1080p, natural physics and human emotional expression) or `kling3_0` / `minimax_hailuo`.
- **Anchor Keyframe Image Engine**: `gpt_image_2_5` / `soul_cinematic` for period-accurate costume, lighting, and face consistency.
- **Audio & Sound Design Engine**: `seed_audio` for environmental foley (iron hull groaning, Atlantic waves, engine vibrations, wind, steerage murmurs).
- **Authentication**: Current account authenticated as `leomleao@gmail.com`.
