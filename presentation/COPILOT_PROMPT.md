# Copilot Agent Prompt — Generate the CI Workflow (live demo)

Use this in **VS Code → Copilot Chat in Agent mode** (or the `github-actions-expert` custom agent
already in `.github/agents/`). Paste the prompt, let the agent create the file, then accept the diff.

> 💡 Tip: This repo already ships a verified reference at `.github/workflows/dotnet-ci.yml`. If the
> live agent output drifts, fall back to that file (see DEMO_RUNBOOK.md).

---

## Primary prompt (paste this)

```
Create a GitHub Actions CI workflow for this repository at
.github/workflows/dotnet-ci-demo.yml that builds the Zava Storefront app in src/.

Requirements:
- Trigger on push and pull_request to the "interview-demo" and "main" branches, plus workflow_dispatch.
- Set least-privilege permissions (contents: read).
- Use a single ubuntu-latest job named "Build & test" with a 10-minute timeout.
- Steps: checkout, setup-dotnet with dotnet-version 6.0.x, dotnet restore on
  src/ZavaStorefront.sln, then dotnet build in Release with --no-restore.
- Pin every action to a full commit SHA with a human-readable version comment.
- Add a concurrency group keyed on the ref that cancels in-progress runs.

Follow the repository's GitHub Actions CI/CD best-practices instructions.
```

## Follow-up prompts (optional, to show iteration)

- “Add a caching step for NuGet packages to speed up restore.”
- “Add a step that runs `dotnet test` and explain why it's safe even though there are no test projects yet.”
- “Explain each permission and why least privilege matters here.”

## What ‘good’ looks like (talking points while it generates)
- Actions are **SHA-pinned**, not `@v4` (supply-chain safety).
- `permissions: contents: read` — least privilege by default.
- `concurrency` cancels superseded runs → saves runner minutes.
- The workflow is **just code in the repo** — reviewed in PRs like anything else.
