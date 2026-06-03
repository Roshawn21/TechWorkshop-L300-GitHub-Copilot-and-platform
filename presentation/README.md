# Interview Demo — Presentation & Collateral

Supporting material for a live demo of **GitHub Copilot + GitHub Actions**.

## Contents
| File | Purpose |
|---|---|
| `copilot-actions-overview.pptx` | 6-slide overview deck (GitHub-themed) |
| `generate_slides.mjs` | Reproducible generator for the deck (`pptxgenjs`) |
| `COPILOT_PROMPT.md` | Ready-to-paste prompt for the live Copilot agent step |
| `DEMO_RUNBOOK.md` | Step-by-step talk track, timings, and fallbacks |

The verified reference workflow used as a safety net lives at
`../.github/workflows/dotnet-ci.yml`.

## Regenerate the slides
Requires Node.js (system Python is not used here).
```bash
cd presentation
npm install        # installs pptxgenjs
node generate_slides.mjs
```
This (re)writes `copilot-actions-overview.pptx`.

## Demo flow (TL;DR)
1. In VS Code, a Copilot agent generates a .NET CI workflow (see `COPILOT_PROMPT.md`).
2. Commit & push to the `interview-demo` branch.
3. Watch the workflow run live in the repo's **Actions** tab.

See `DEMO_RUNBOOK.md` for the full script.
