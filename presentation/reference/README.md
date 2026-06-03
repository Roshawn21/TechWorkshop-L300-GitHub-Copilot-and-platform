# Reference / answer key

These files are **not active workflows on the demo branch** — they are the verified target output
for the **live** portions of the demo, kept here as a fallback.

## `ci-health-report.md` + `ci-health-report.lock.yml`
The GitHub Agentic Workflow (gh-aw) that the presenter authors **live** in Part 2 of the demo
(see `../DEMO_RUNBOOK.md` → "Part 2"). The demo branch's `.github/workflows/` is intentionally
clean so the file is created on stage with Copilot. A verified copy also lives on the default
branch (`main`) so it is dispatchable for the live issue-creation payoff.

**If live authoring drifts**, copy these into `.github/workflows/` and compile/dispatch:

```bash
cp presentation/reference/ci-health-report.md .github/workflows/
gh aw compile ci-health-report
gh workflow run ci-health-report.lock.yml --ref main
```

The matching live-authoring prompt is in `../COPILOT_PROMPT.md` → "Agentic workflow".
