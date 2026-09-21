# AGY Videos — Production Governance & Rules

This document establishes the mandatory local rules, organizational structure, and operational gates for producing AI-generated historical video shorts in the `agy-videos` project using the Higgsfield platform.

---

## Standard Directory Structure for Every Video Production

Every video production must reside in its own self-contained directory (e.g., `01-fosca-at-sea/`) with the following standardized structure:

```
agy-videos/<XX-project-name>/
  ├── README.md                      # Project overview and index
  ├── script-draft.md                # Cinematic script with synchronized multilingual tracks (EN/PT-BR)
  ├── higgsfield-production-plan.md  # Model selection, prompt blueprints, credit budget
  ├── references/                    # Structured text copies of all historical records & research
  │     ├── README.md                # Index of references and citation mapping
  │     ├── <topic>-history.md       # Primary historical and technical source documents
  │     └── ...
  └── images/                        # High-resolution reference photographs and archival illustrations
        ├── <vessel-name>.jpg        # Direct photographs of historical vessels / locations
        ├── <archival-ledger>.jpg    # Direct primary document scans
        └── ...
```

---

## The Non-Negotiable Gates

### Gate 1: Historical Source Alignment & Local Evidence Dossier
- Every story and script must be grounded in primary archival sources from this repository.
- A local **`references/`** folder and an **`images/`** folder containing actual copies of reference texts and photographic assets (e.g., ship photographs, archival ledgers, contemporary engravings) must be assembled before writing prompts.
- **Hard Rule**: Clearly separate documented primary facts (names, dates, ages, ship dimensions, destinations) from dramatized sensory reconstruction. Never invent contradictory historical details or misattribute external passengers to the family vessel.

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
[Phase 1: Assemble Dossier] 
   └── Copy reference documents into `references/` and images into `images/`
[Phase 2: Script & Storyboard] 
   └── Write dual-track (EN + PT-BR) narrative script linked to visual references
[Phase 3: Human Gate - Script Approval] 
   └── User reviews and approves script (MANDATORY GATE)
[Phase 4: Higgsfield Production Blueprint] 
   └── Model selection, anchor image prompts (gpt_image_2_5), video shot prompts (kling3_0_turbo)
[Phase 5: Human Gate - Credit & Job Approval] 
   └── Run `higgsfield account status` + cost estimate, user confirms job dispatch
[Phase 6: Video & Audio Generation] 
   └── Dispatch jobs via Higgsfield CLI with `--wait`
[Phase 7: Review & Final Assembly] 
   └── Quality review, export dual editions (EN and PT-BR)
```
