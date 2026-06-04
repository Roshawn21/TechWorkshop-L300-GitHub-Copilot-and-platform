---
description: "Reviews build health and test coverage for the Zava app, then opens an issue with findings and next steps."
emoji: "🩺"
labels: ["ci", "automation", "diagnostics"]
on:
  # Runs automatically on weekday mornings (13:00 UTC ≈ 9am ET)...
  schedule:
    - cron: "0 13 * * 1-5"
  # ...and can be dispatched on demand for the live demo.
  workflow_dispatch:

engine: copilot

# The agent runs read-only. Writes happen only through safe-outputs.
permissions:
  contents: read
  issues: read
  pull-requests: read

safe-outputs:
  create-issue:
    title-prefix: "[ci-health] "
    labels: [ci-health, automated]
    max: 1

tools:
  github:
---

# CI Health & Test-Gap Report

You are a repository maintenance agent for the **Zava Storefront** app (an ASP.NET Core
MVC project in `src/`, built by the `.NET CI` workflow in `.github/workflows/dotnet-ci.yml`).

Your job is to produce a concise **CI health and test-coverage report** and open a single
GitHub issue with it.

Do the following:

1. **Build health** — Review the recent runs of the `.NET CI` workflow. Summarize whether
   builds are passing, and call out any recurring failures or warnings worth attention.
2. **Test-coverage gaps** — Inspect `src/` (Controllers, Services, Models). Note that the
   project currently has **no test project**. Identify the highest-value units to cover first
   (e.g., `CartService`, `ProductService`, controller actions) and explain why each matters.
3. **Actionable next steps** — Propose 3–5 concrete, small, reviewable tasks (for example:
   "add an xUnit test project", "cover `CartService.AddToCart` add/update/remove paths",
   "treat nullable warnings as errors in CI"). Keep each step crisp.

Then **create one issue** that contains:

- A short summary (2–3 sentences) of current CI health.
- A prioritized "Test-coverage gaps" section.
- A "Suggested next steps" checklist (use `- [ ]` task items).
- Links to the relevant workflow file and any referenced source files.

Keep the issue concise and skimmable. Do not make code changes — only report and recommend.
