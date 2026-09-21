# AGY Videos Framework

A dedicated workspace and production pipeline for generating cinematic, historically faithful short-form videos from the Panzonato family archival records and 19th-century transatlantic emigration history using the **Higgsfield AI** platform.

---

## Active Git Branch
- **Branch**: `agy-videos`
- **Root Directory**: `agy-videos/`

---

## Current Video Projects

| Index | Project Folder | Title / Subject | Status |
| :--- | :--- | :--- | :--- |
| **01** | `01-fosca-at-sea/` | **Fosca and Six Children at Sea** (*"Eight Across the Ocean"*) | **Framework & Setup Complete (Ready for Generation)** |
| **02** | `02-...` | *Upcoming video project* | *Planned* |

---

## Production Architecture & Governance

All video productions under `agy-videos/` adhere to the mandatory governance rules established in [`RULES.md`](./RULES.md):

1. **Source Fidelity**: All narratives must directly trace back to audited primary records (e.g. Hospedaria do Brás books, civil acts, ship registries).
2. **Explicit Script Approval**: Scripts, scene breakdowns, and voiceovers must be formally approved before video models are called.
3. **Credit Verification Gate**:
   - Current Account: `leomleao@gmail.com`
   - Balance: **194.9 credits** (audited 21 Sep 2026)
   - Every batch runs `higgsfield account status` and `higgsfield generate cost <model>` prior to triggering generation.
4. **Bilingual Dual Tracks**: All videos are prepared in both **English (`en`)** and **Brazilian Portuguese (`pt-br`)**.

---

## Project `01-fosca-at-sea` Structure

- [`context-and-sources.md`](./01-fosca-at-sea/context-and-sources.md): Comprehensive analysis of primary records (Hospedaria Ledger 031/p283, SS *Colombo* specs, contemporary testimony from Francesco Costantin, Ferraguti illustrations, and 1891 steerage realities).
- [`script-draft.md`](./01-fosca-at-sea/script-draft.md): 5-scene cinematic script with synchronized side-by-side English and Brazilian Portuguese voiceover tracks and on-screen text.
- [`higgsfield-production-plan.md`](./01-fosca-at-sea/higgsfield-production-plan.md): Concrete Higgsfield execution blueprint (Lean Turbo tier: 5x `gpt_image_2_5` master stills + 5x `kling3_0_turbo` video motion passes, budgeted at ~42.5 credits).

---

## Execution Command (When Ready)

When you are ready to proceed with generating the assets for Video 01, instruct the agent:
> *"Generate videos for 01-fosca-at-sea"*
