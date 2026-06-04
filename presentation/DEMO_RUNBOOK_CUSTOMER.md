# Interview Demo Runbook — Mock Customer Meeting (≈15 min)

**This is the primary script for the interview.** It is a mock customer meeting, so **assume the room
does not know GitHub Copilot** — establish what it is before showing it. Driven from **Copilot CLI**.

> **Goal (memorize this):** show how **engineering and platform teams use GitHub Copilot to build
> GitHub Actions and agentic workflows** — accelerating software delivery, improving developer
> productivity, and modernizing CI/CD.

**Repo:** `Roshawn21/TechWorkshop-L300-GitHub-Copilot-and-platform` · **Branch:** `interview-demo` ·
**Deck:** `copilot-actions-overview.pptx` (6 slides). Operational detail (pre-flight, fallbacks, agentic
prerequisites) lives in **`DEMO_RUNBOOK.md`** and applies here too.

---

## ⭐ At a glance (the spine — memorize this table)
| # | Beat | On screen | Say it in one line | Time |
|---|------|-----------|--------------------|------|
| 0 | Discovery | **Slide 1 · Title** | "Who's in the room — devs, platform, security, or leadership?" | 1m |
| 1 | Agenda | **Slide 2 · Agenda** | "Copilot → build Actions & agentic workflows → business impact." | 0.5m |
| 2 | Copilot 101 | **Slide 3 · Copilot** | "AI in the dev workflow: completions → chat → agents → CLI." | 2m |
| 3 | Why CLI | Terminal + integrated browser | "Run the app in the browser *and* prompt Copilot at once — no context switch." | 1–2m |
| 4 | Primitives | **Slide 4 · Primitives** | "Agent + skills + MCP = repeatable, secure workflows." | 1m |
| 5 | The app | Terminal / editor | "Zava storefront — I'll improve the CI around it." | 1m |
| 6 | **Generate CI** | **Slide 5 · Actions** + terminal | "Copilot, build a secure, repeatable CI workflow." | 4–5m |
| 7 | Run it live | Browser · Actions tab | "Prompt to green pipeline — all reviewed as code." | 2m |
| 8 | Agentic report | **Slide 6 · Agentic** + Issues tab | "Beyond code-gen: Continuous AI opens the issue itself." | 2m |
| 9 | GHAS | Security tab (stay on Slide 5/6) | "Now secure it — scanning folds into the same workflow." | 1m |
| 10 | Close + Q&A | Slide 1 / blank | "Write, secure, build, deploy — one platform." | 0.5m |

## 🎯 Five lines to memorize
1. **Open:** *"Before we start — are we mostly developers, platform engineers, security, or leadership?"*
2. **Copilot 101:** *"Copilot is AI built into the developer workflow — completions, chat, agents, and in
   the terminal via CLI — that can take on whole tasks."*
3. **The pivot (differentiator):** *"Today is about using Copilot **beyond application code** — to build
   the Actions and agentic workflows that power CI/CD."*
4. **Primitives money quote:** *"The goal isn't generating code — it's combining primitives into
   repeatable, secure engineering workflows."*
5. **Close:** *"GitHub isn't just helping teams write code faster — it's helping them **write, secure,
   build, and deploy** on a single platform."*

---

## 0 · Discovery  ·  **[Slide 1 — Title]**  (~1 min)
Open with a question to set a discovery, customer-first tone:
> **Say:** *"Before we get started, can you tell me a little about the audience today — are we primarily
> developers, platform engineers, security teams, or engineering leadership?"*

Bridge to the agenda:
> **Say:** *"Based on our earlier conversations, your team wants to use Copilot to improve developer
> productivity and accelerate CI/CD. Today I'll show how engineering and platform teams use Copilot to
> build GitHub Actions and agentic workflows — accelerating delivery and modernizing your CI/CD."*

## 1 · Agenda  ·  **[Slide 2 — Agenda]**  (~30 sec)
Four beats, keep moving:
- What GitHub Copilot is (no-assumptions intro).
- How I use **Copilot CLI** in a DevOps workflow.
- Using Copilot to build **GitHub Actions** and **agentic workflows**.
- The **business impact** on engineering and platform teams.

## 2 · Copilot 101  ·  **[Slide 3 — Copilot]**  (~2 min)
Don't assume they know it. Quick, accessible intro, then pivot:
> **Say:** *"GitHub Copilot is an AI assistant built into the developer workflow. Most people meet it as
> code completion in the editor, but it's grown into chat and **agents** — and it runs in the terminal
> via **Copilot CLI** — that can take on whole tasks like building and reviewing automation."*
>
> **Pivot:** *"What I'll focus on is how engineering and platform teams use Copilot **beyond writing
> application code** — to build the GitHub Actions and agentic workflows that power CI/CD."*

## 3 · Why Copilot CLI? — show concurrency live  ·  **[Terminal + VS Code integrated browser]**  (~1–2 min)
> **Say:** *"I'm using Copilot CLI because it's a more natural workflow for infrastructure and DevOps."*

**Show, don't tell — run two things at once.** The CLI lets you drive shell commands *and* Copilot prompts
in parallel. Demonstrate it while you talk:
1. In the terminal, start the Zava app: `dotnet run --project src/ZavaStorefront.csproj`
   (serves on `https://localhost:5001`).
2. Open it **inside VS Code**: Command Palette → **"Simple Browser: Show"** → paste `https://localhost:5001`.
   The running storefront now sits right next to your terminal.
3. With the app live in the integrated browser, fire a **Copilot CLI prompt** in the same terminal (a quick
   repo question, or tee up the workflow prompt). Now a **chat prompt and a CLI command (the running app)
   are going at the same time**.

> **Say (the point):** *"This is the CLI advantage — I can run shell commands and Copilot prompts side by
> side: the app is building and serving in the browser while I'm prompting Copilot, all in one place, no
> context switch."*

Benefits to land: lives in the terminal next to the codebase · less context switching · multiple
concurrent sessions · faster operational loop. Balance and move on:
> *"Copilot Chat is great inside VS Code for editor-driven work; CLI shines for repositories, automation,
> and running things concurrently."*

## 4 · Primitives  ·  **[Slide 4 — Primitives]**  (~1 min)
Stay high level — three the audience will remember:
- **Agent** — an expert persona (here, the repo's `github-actions-expert`).
- **Skills** — repeatable, deterministic actions.
- **MCP** — reach into external tools and systems.

> **Say (money quote):** *"The goal isn't simply generating code — it's combining these primitives into
> repeatable, secure engineering workflows."*

## 5 · The application  ·  **[Terminal / editor]**  (~1 min)
Show the **Zava storefront** (`src/ZavaStorefront`), a customer-facing .NET app:
> **Say:** *"This is a customer-facing storefront app. I'll use Copilot to improve the CI process
> around it."*

## 6 · MAIN DEMO — generate the CI workflow  ·  **[Slide 5 — Actions + Terminal]**  (~4–5 min)
Spend most of your time here. In **Copilot CLI**, show the **agent** + **skills**, then paste the prompt
from `COPILOT_PROMPT.md`:
> **Say:** *"I'm asking Copilot to create a secure, repeatable CI workflow using GitHub Actions."*

Kick it off. **While it generates, narrate Actions (Slide 5):**
> *"GitHub Actions automates testing, validation, deployment, and operational workflows directly in
> GitHub. Business-wise: faster releases, less manual effort, consistent deployments."*

As the diff lands, point at the *good* signals: **SHA-pinned actions**, `permissions: contents: read`,
`concurrency`. Approve it.

> **Fallback:** if generation drifts, the verified `.github/workflows/dotnet-ci.yml` is already committed —
> narrate that instead (see **Fallbacks** in `DEMO_RUNBOOK.md`).

## 7 · Run it live  ·  **[Browser — Actions tab]**  (~2 min)
Switch to GitHub → **Actions** → open the new run → expand the **Build & test** job live
(*checkout → setup-dotnet → restore → build → ✅*).
> **Say:** *"What used to be manual is now accelerated by AI — while still preserving engineering review
> and governance."*

## 8 · Agentic workflow — CI Health Report  ·  **[Slide 6 — Agentic + Issues tab]**  (~2 min)
Your strongest differentiator. Trigger / show the `ci-health-report` agentic workflow (commands in
**Agentic workflow prerequisites**, `DEMO_RUNBOOK.md`), then open **Issues** to show the generated
`[ci-health] …` report:
> **Say:** *"Now we move beyond code generation into operational intelligence — the platform doing repo
> hygiene on its own, read-only, with humans as the final gate."*

Value: **platform teams** gain visibility, monitoring, actionable reporting; **developers** gain faster
issue resolution and less manual investigation.

## 9 · Security / GHAS  ·  **[Security tab — stay on Slide 5/6]**  (~1 min, talk-track)
**When:** at the end, *after* the agentic workflow opens its issue. Close on security so the last beat is
*"…and we secure it too."*
> **Say:** *"We went from prompt to a green pipeline to the platform filing its own issues — and as all
> that delivery accelerates, security has to keep pace. It folds into the same workflow."*

GitHub Advanced Security folds three things into the same Actions/PR loop:
- **Code scanning (CodeQL)** — find vulnerabilities in source.
- **Secret scanning (+ push protection)** — protect credentials before they merge.
- **Dependency review / Dependabot** — guard against supply-chain risk.

> **Shift-left line:** *"GHAS makes security part of the development workflow, not a separate process."*

> **Make it live** (or talk-track): repo **Settings → Code security** → enable *Code scanning* (CodeQL
> default setup), *Secret scanning* (+ push protection), *Dependency graph / review*. Then open the
> **Security** tab and show real alerts.

## 10 · Close + Q&A  ·  **[Slide 1 / blank]**  (~30 sec)
> **Say:** *"Today we saw how Copilot, GitHub Actions, and agentic workflows help teams accelerate
> delivery, improve developer productivity, and strengthen CI/CD — and how AI applies **beyond code
> generation** to help engineering and platform teams ship faster and operate more efficiently."*

Then stop and take questions.

### If asked "why does this matter?" — per-persona
| Persona | The value |
|---|---|
| **Developer** | Less repetitive work. |
| **Platform team** | Better automation. |
| **Security team** | Earlier vulnerability detection. |
| **Leadership** | Faster delivery, more efficiency, less operational overhead, faster time-to-market. |

> **The tie-together line:** *"GitHub isn't just helping teams write code faster — it's helping them
> **write, secure, build, and deploy** software on a single platform."* (Copilot + Actions + GHAS across
> the SDLC — GitHub's strongest competitive advantage.)

---

## Slide ↔ beat map (quick reference)
| Slide | Title | Use during |
|---|---|---|
| 1 | From Prompt to Production | §0 Discovery / §10 Close |
| 2 | Agenda | §1 Agenda |
| 3 | Copilot — your AI pair programmer | §2 Copilot 101 |
| 4 | Customizing Copilot (Primitives) | §4 Primitives |
| 5 | GitHub Actions | §6 Generate CI + §7 Run it live |
| 6 | Agentic Workflows — Continuous AI | §8 CI Health Report |

> §3 (Why CLI — runs the app in the integrated browser), §5 (the app), §7 (live run), and §9 (GHAS /
> Security tab) have **no dedicated slide** — they happen in the terminal/browser.

## Timing (≈15–16 min)
| Segment | Target |
|---|---|
| Discovery + agenda (slides 1–2) | 1.5 min |
| Copilot 101 + why CLI + run app in browser (slide 3) | 3–4 min |
| Primitives + the app (slide 4) | 2 min |
| Main demo — generate workflow (slide 5) | 4–5 min |
| Run it live (Actions) | 2 min |
| Agentic CI Health Report (slide 6) | 2 min |
| GHAS talk-track (Security tab) | 1 min |
| Close + Q&A | 30 sec |
