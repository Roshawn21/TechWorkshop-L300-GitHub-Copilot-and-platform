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

---

# Agentic workflow (gh-aw) — generate the CI Health report (Part 2)

Use this to author the **agentic** workflow live (this is the intended Part 2 flow — author it on
stage, not pre-built). A verified answer-key copy lives in `presentation/reference/ci-health-report.md`
as a fallback. gh-aw is a Markdown file with YAML frontmatter (`on`, `permissions`, `engine`,
`safe-outputs`, `tools`) + a natural-language body.

## Primary prompt (paste this)

```
Create a GitHub Agentic Workflow (gh-aw) at .github/workflows/ci-health-report.md that opens an
issue summarizing CI health and test-coverage gaps for the Zava app in src/.

Frontmatter:
- on: a weekday morning schedule (cron) plus workflow_dispatch.
- engine: copilot
- permissions (read-only): contents: read, issues: read, pull-requests: read.
- safe-outputs: create-issue with title-prefix "[ci-health] ", labels [ci-health, automated], max 1.
- tools: github.

Body: instruct the agent to review the .NET CI workflow's recent runs and the src/ code
(noting there is no test project yet), then create ONE concise issue with: a short CI-health
summary, a prioritized "Test-coverage gaps" list, and a "Suggested next steps" checklist using
- [ ] task items, with links to the relevant files. Do not change code — only report.

Then compile it with `gh aw compile ci-health-report`.
```

## Talking points (while it generates)
- **Frontmatter vs. body** — structured control around natural-language intent.
- **Read-only agent + safe outputs** — the agent can't write; a separate permission-scoped job
  opens the issue it requests (defense against prompt injection).
- **Continuous AI** — this is the same repo knowledge running on a schedule, not in the editor.
- **Setup note:** needs Issues enabled, the workflow on the **default branch**, and a
  `COPILOT_GITHUB_TOKEN` secret (`gh aw secrets bootstrap`). See `DEMO_RUNBOOK.md`.
