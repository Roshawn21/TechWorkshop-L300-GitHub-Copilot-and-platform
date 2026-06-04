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
- Add a final "Test" step. There are no test projects yet, so make it a mock/no-op
  placeholder that echoes a message and stays green, ready to switch to `dotnet test`
  once a test project is added.
- Pin every action to a full commit SHA with a human-readable version comment.
- Add a concurrency group keyed on the ref that cancels in-progress runs.

Follow the repository's GitHub Actions CI/CD best-practices instructions.
```

## Follow-up prompts (optional, to show iteration)

- “Add a caching step for NuGet packages to speed up restore.”
- “Convert the mock test step into a real `dotnet test` step and explain why it's safe even though there are no test projects yet.”
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
- on: a weekday morning schedule (cron) and workflow_dispatch, PLUS a push trigger scoped to this
  workflow file (paths: .github/workflows/ci-health-report.md and .github/workflows/ci-health-report.lock.yml)
  on the demo branches "interview-demo" and "interview-demo-2". This is what lets the workflow run
  LIVE during the demo: workflow_dispatch/schedule only fire from the default branch, so the push
  trigger is what makes a commit on the demo branch run it immediately.
- engine: copilot WITH model: gpt-4o. IMPORTANT — pin gpt-4o explicitly. The default
  (claude-sonnet-4.6) and gpt-5-mini both return "400 The requested model is not supported" for this
  account's Copilot session; only gpt-4o is verified working. Use:
      engine:
        id: copilot
        model: gpt-4o
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
- **Run it live off the demo branch** — the path-scoped `push` trigger means committing the compiled
  `ci-health-report.md`/`.lock.yml` to `interview-demo-2` fires the run immediately (no need to be on
  `main`). After editing the `.md`, always recompile: `gh aw compile ci-health-report`.
- **Model must be gpt-4o** — verified green from both `main` (dispatch) and `interview-demo-2` (push);
  `gpt-5-mini` and `claude-sonnet-4.6` fail with `400 model not supported` on this account.
- **Setup note:** needs Issues enabled, the compiled workflow on the branch you trigger from, and a
  **fine-grained PAT** (`github_pat_…`, owner Roshawn21, Copilot Requests: Read) in the
  `COPILOT_GITHUB_TOKEN` secret — OAuth `gho_` tokens are rejected. See `DEMO_RUNBOOK.md`.
