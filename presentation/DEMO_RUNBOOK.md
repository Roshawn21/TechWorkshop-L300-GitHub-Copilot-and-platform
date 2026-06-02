# Demo Runbook — GitHub Copilot + GitHub Actions

**Audience:** GitHub interview panel (Solutions Engineer III)
**Repo:** `Roshawn21/TechWorkshop-L300-GitHub-Copilot-and-platform`  ·  **Branch:** `interview-demo`
**Story:** *"From Prompt to Production"* — generate a CI workflow with a Copilot agent in VS Code,
push it, and watch GitHub Actions run it live.

---

## 0 · Pre-flight (before you present)
- [ ] On branch `interview-demo` (`git switch interview-demo`).
- [ ] VS Code open at repo root; GitHub Copilot signed in; Copilot Chat visible.
- [ ] Browser tab open to the repo's **Actions** tab, logged in.
- [ ] Open `presentation/copilot-actions-overview.pptx` (slides 1–3).
- [ ] Reference workflow exists as a safety net: `.github/workflows/dotnet-ci.yml`.
- [ ] (Recommended) Do one **dry-run push** earlier so you know Actions goes green. See §4.
- [ ] Close noisy panels / silence notifications; bump editor font size.

---

## 1 · Frame it with the slides (~2–3 min)
- **Slide 1 — Title:** the "From Prompt to Production" framing.
- **Slide 2 — Agenda:** Copilot → Customizing Copilot → Actions → Live demo.
- **Slide 3 — Copilot:** completions → chat → **agents** (delegate whole tasks).
- **Slide 4 — Customizing Copilot (Primitives):** instructions, prompts, skills, custom agents, MCP,
  hooks, memory — how Copilot gets grounded in *this* repo.
- **Slide 5 — Actions:** events → workflows → jobs/steps → runners. Land the tie-in:
  *"Copilot writes the YAML, Actions runs it."*

## 2 · Generate the workflow in VS Code (~3–4 min)
1. Open **Copilot Chat → Agent mode** (or the repo's `github-actions-expert` agent).
2. Paste the prompt from `presentation/COPILOT_PROMPT.md`.
3. Narrate as it works: it reads the repo, follows the repo's CI/CD **instructions**, writes
   `.github/workflows/dotnet-ci-demo.yml`.
4. **Review the diff out loud** — call out SHA-pinned actions, `permissions: contents: read`,
   `concurrency`. Accept the changes.
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

## Timing (≈8–10 min total)
| Segment | Target |
|---|---|
| Slides | 1–2 min |
| Generate workflow | 3–4 min |
| Commit & push | 1 min |
| Live Actions run | 2 min |

## Fallbacks (if something slips)
- **Agent output is off / won't validate:** the verified `.github/workflows/dotnet-ci.yml` is already
  committed — push that instead and keep narrating.
- **No internet for the agent:** show the committed `dotnet-ci.yml` and explain it as if generated.
- **Run is slow / queued:** open a previous green run to show the step output while the new one finishes.
- **Build red unexpectedly:** open the failed step, ask Copilot Chat *"why did this step fail?"* — turns
  a failure into a feature (Copilot-assisted troubleshooting).

## Reset between runs
```bash
# Remove the demo-generated workflow so you can regenerate cleanly next time
git rm .github/workflows/dotnet-ci-demo.yml 2>/dev/null
git commit -m "Reset demo workflow" 2>/dev/null
```

## Key talking points to hit
- Copilot **agents** delegate whole tasks, grounded in *this* repo's context & instructions.
- Workflows are **code** — versioned, reviewed in PRs, secured (SHA-pin, least privilege, OIDC).
- The full loop — author, secure, run, troubleshoot — lives on **one platform**.
