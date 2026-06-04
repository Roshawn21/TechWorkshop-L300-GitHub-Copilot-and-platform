# Demo Runbook — Interview Panel: From Prompt to Production (Copilot CLI)

**Audience:** GitHub interview panel (Solutions Engineer III)
**Repo:** `Roshawn21/TechWorkshop-L300-GitHub-Copilot-and-platform`  ·  **Branch:** `interview-demo`
**Story:** *"From Prompt to Production"* — generate a CI workflow with a Copilot **CLI** agent,
push it, and watch GitHub Actions run it live.

> **Two runbooks, same demo assets — both Copilot CLI.** This is the **alternate, more technical**
> interview-panel track. The **primary interview script** — a mock customer meeting with a slide-by-slide
> cheat sheet and lines to memorize — lives in **`DEMO_RUNBOOK_CUSTOMER.md`**. Both drive the same
> underlying assets (the `github-actions-expert` agent, `COPILOT_PROMPT.md`, the `dotnet-ci` workflow,
> and the `ci-health-report` agentic workflow) from **Copilot CLI**; they differ in audience framing, not
> tooling. The §0 pre-flight, Fallbacks, and Agentic prerequisites below apply to **both** tracks.

---

## 0 · Pre-flight (before you present)
- [ ] On branch `interview-demo` (`git switch interview-demo`).
- [ ] Terminal open at repo root; **Copilot CLI** installed and signed in (`copilot` launches).
- [ ] Browser tab open to the repo's **Actions** tab, logged in.
- [ ] Open `presentation/copilot-actions-overview.pptx` (slides 1–3).
- [ ] Reference workflow exists as a safety net: `.github/workflows/dotnet-ci.yml`.
- [ ] (Recommended) Do one **dry-run push** earlier so you know Actions goes green. See §4.
- [ ] Close noisy panels / silence notifications; bump terminal font size.

---

## 1 · Frame it with the slides (~2–3 min)
- **Slide 1 — Title:** the "From Prompt to Production" framing.
- **Slide 2 — Agenda:** Copilot → Customizing Copilot → Actions → Live demo.
- **Slide 3 — Copilot:** completions → chat → **agents** (delegate whole tasks).
- **Slide 4 — Customizing Copilot (Primitives):** instructions, prompts, skills, custom agents, MCP,
  hooks, memory — how Copilot gets grounded in *this* repo.
- **Slide 5 — Actions:** events → workflows → jobs/steps → runners. Land the tie-in:
  *"Copilot writes the YAML, Actions runs it."*

## 2 · Generate the workflow with Copilot CLI (~3–4 min)
1. In the terminal, launch **Copilot CLI** (`copilot`) and select the repo's `github-actions-expert`
   agent.
2. Paste the prompt from `presentation/COPILOT_PROMPT.md`.
3. Narrate as it works: it reads the repo, follows the repo's CI/CD **instructions**, writes
   `.github/workflows/dotnet-ci-demo.yml`.
4. **Review the diff out loud** — call out SHA-pinned actions, `permissions: contents: read`,
   `concurrency`. Approve the changes.
5. (Optional) One follow-up prompt (e.g., add NuGet caching) to show iteration.

## 3 · Commit & push (~1 min)
```bash
git add .github/workflows/dotnet-ci-demo.yml
git commit -m "Add .NET CI workflow generated with Copilot"
git push
```
> If you used the agent's file name `dotnet-ci-demo.yml`, that's fine — it sits alongside the
> committed reference `dotnet-ci.yml`.

## 4 · Watch it run live in GitHub (~2 min)
1. Switch to the browser **Actions** tab → the new run appears for `interview-demo`.
2. Click in → open the **Build & test** job → expand steps in real time:
   *checkout → setup-dotnet → restore → build → ✅ green*.
3. Closing line: *"Prompt to green pipeline in minutes — all reviewed as code, secured by default."*

---

## 5 · Part 2 — Agentic workflow that opens an Issue (~3–4 min)
**Story:** *Continuous AI* — the same repo knowledge running in Actions when no one is at the editor.
A scheduled **CI Health & Test-Gap Report** agentic workflow reviews the app + recent CI runs and
**opens an issue** automatically (via `safe-outputs: create-issue`).

**Pre-reqs (set up before the demo — see "Agentic workflow prerequisites" below):**
- Issues enabled on the repo, a `COPILOT_GITHUB_TOKEN` secret configured, and a verified copy of
  the workflow already on the **default branch (`main`)** so it's dispatchable for the live payoff.
  These are one-time setup steps. The demo branch's `.github/workflows/` is intentionally clean so
  you author the workflow **live** on stage.

**On stage (author it live — same flow as Part 1):**
1. Show **Slide 6 (Agentic Workflows)** — frontmatter vs. body, read-only agent, safe outputs.
2. **Generate it live.** In Copilot CLI, paste the "Agentic workflow" prompt from
   `COPILOT_PROMPT.md`. Watch Copilot create `.github/workflows/ci-health-report.md` from scratch.
3. Read the result aloud as it lands: `on: schedule + workflow_dispatch`, `permissions: …read`,
   `engine: copilot`, `safe-outputs: create-issue`. Emphasize: *the agent runs read-only; a separate
   permission-scoped job opens the issue — defense against prompt injection.*
4. Compile it: `gh aw compile ci-health-report` → produces the `.lock.yml`. Commit & push.
5. Trigger it: **Actions tab → "CI Health & Test-Gap Report" → Run workflow** (or
   `gh workflow run ci-health-report.lock.yml --ref main`). *Note: `workflow_dispatch` runs from the
   default branch, so the verified copy on `main` is what fires — your freshly-authored one matches it.*
6. Watch the jobs: *activation → agent (read-only) → safe_outputs → detection*.
7. Open the **Issues** tab → show the new `[ci-health] …` issue the agent wrote.
8. Closing line: *"That's Continuous AI — the platform doing repo hygiene on its own, with humans
   still the final gate."*

> **Answer key / fallback:** a verified copy lives in `presentation/reference/ci-health-report.md`
> (+ `.lock.yml`). If the live authoring drifts, copy that into `.github/workflows/` and continue.

---

## 6 · Close on security — GitHub Advanced Security (~1 min, talk-track)
**When:** at the very end, *after* the workflow run is green in GitHub (and after the agentic issue).
This lands the "secure" half of *write, secure, build, deploy* without slowing the build demo.

> **Say:** *"We just went from prompt to a green pipeline — and as delivery accelerates, security has to
> keep pace. GitHub Advanced Security folds straight into this same workflow."*

Three pillars, one platform:
- **Code scanning (CodeQL)** — find vulnerabilities in source on every push/PR.
- **Secret scanning (+ push protection)** — catch leaked credentials before they merge.
- **Dependency review / Dependabot** — guard against supply-chain risk in PRs.

> **Shift-left line:** *"Security becomes part of the development workflow, not a separate gate after the
> fact — same PRs, same Actions, same review loop."*

**Optional live tie-in (if time / already enabled):** open the repo's **Security** tab → show
*Code scanning*, *Secret scanning*, and *Dependabot* alerts. To enable beforehand: repo **Settings →
Code security** → turn on CodeQL default setup, Secret scanning + push protection, and the Dependency graph.

> **Closing line:** *"Copilot wrote it, Actions ran it, Advanced Security hardened it — write, secure,
> build, and deploy on one platform."*

---

## Timing (≈13–15 min total)
| Segment | Target |
|---|---|
| Slides | 2–3 min |
| Generate workflow | 3–4 min |
| Commit & push | 1 min |
| Live Actions run | 2 min |
| Part 2 — author agentic workflow live → issue | 3–4 min |
| Close on security — GHAS talk-track | 1 min |

## Fallbacks (if something slips)
- **Agent output is off / won't validate:** the verified `.github/workflows/dotnet-ci.yml` is already
  committed — push that instead and keep narrating.
- **No internet for the agent:** show the committed `dotnet-ci.yml` and explain it as if generated.
- **Run is slow / queued:** open a previous green run to show the step output while the new one finishes.
- **Build red unexpectedly:** open the failed step, ask Copilot CLI *"why did this step fail?"* — turns
  a failure into a feature (Copilot-assisted troubleshooting).
- **Live authoring of the agentic workflow drifts:** copy the verified
  `presentation/reference/ci-health-report.md` (+ `.lock.yml`) into `.github/workflows/` and continue.
- **Agentic run fails at "Validate COPILOT_GITHUB_TOKEN":** the token isn't set — fall back to
  `gh issue create --title "[ci-health] CI Health & Test-Gap Report" --body-file <notes>` to show the
  same outcome, or open a previously created `[ci-health]` issue and walk through it.

## Reset between runs
```bash
# Remove the demo-generated workflow so you can regenerate cleanly next time
git rm .github/workflows/dotnet-ci-demo.yml 2>/dev/null
git commit -m "Reset demo workflow" 2>/dev/null
```

## Key talking points to hit
- Copilot **agents** delegate whole tasks, grounded in *this* repo's context & instructions.
- Workflows are **code** — versioned, reviewed in PRs, secured (SHA-pin, least privilege, OIDC).
- **Agentic Workflows** extend the same primitives into Actions — *Continuous AI* that runs when no
  one is at the editor, with read-only agents + safe outputs + human review as the final gate.
- The full loop — author, secure, run, troubleshoot, automate — lives on **one platform**.
- **GitHub Advanced Security** (code scanning, secret scanning, dependency review) folds into the same
  Actions/PR workflow — close on it to land *write, **secure**, build, deploy* on one platform.

## Agentic workflow prerequisites (one-time setup)
The `ci-health-report` agentic workflow (gh-aw) needs the following before it can run live:

1. **Install the extension** (authoring/compiling): `gh extension install github/gh-aw`
2. **Enable Issues** on the repo (done): `gh repo edit --enable-issues`
3. **Keep a verified copy on the default branch.** `workflow_dispatch` and `schedule` only run from the
   **default branch (`main`)**, so the verified `.md` + compiled `.lock.yml` are committed to `main`.
   The **demo branch is intentionally clean** (no `ci-health-report.*` in `.github/workflows/`) so you
   author it **live** — the answer key lives in `presentation/reference/`. After editing, recompile with
   `gh aw compile ci-health-report`.
4. **Configure the Copilot token secret** (required by `engine: copilot`):
   `gh aw secrets bootstrap`  — or set it directly:
   `gh aw secrets set COPILOT_GITHUB_TOKEN --value <token-with-copilot-access>`
   Without this the run stops at the **"Validate COPILOT_GITHUB_TOKEN secret"** step.
5. **Dispatch to verify:** `gh workflow run ci-health-report.lock.yml --ref main`, then check the
   **Issues** tab for the new `[ci-health] …` issue.
