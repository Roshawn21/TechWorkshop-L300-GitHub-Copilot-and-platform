# Copilot instructions

This repository serves three distinct purposes; identify which one a task touches before editing:

1. **Workshop docs site** (`docs/`, `index.md`, `_config.yml`, `Gemfile`) — a Jekyll site (just-the-docs
   theme) describing a hands-on Azure/GitHub modernization lab. Deployed to GitHub Pages from `main`.
2. **Zava Storefront app** (`src/`) — a .NET 6 ASP.NET Core MVC sample e-commerce app used as the subject
   of the lab and live demos.
3. **Interview demo collateral** (`presentation/`, `.github/workflows/dotnet-ci.yml`,
   `.github/agents|instructions|skills/`) — a self-contained Copilot + Actions demo (slides, runbook,
   prompts, a reference CI workflow, and a gh-aw agentic workflow). Lives on the `interview-demo` branch.

These three parts are independent — a docs change should not touch `src/`, and demo collateral should not
alter the lab content.

## Build / run / test

**Zava app** (`src/`, .NET 6 — note local SDK may be newer):
- Build: `dotnet build src/ZavaStorefront.sln --configuration Release`
- Run: `dotnet run --project src/ZavaStorefront.csproj` (serves on `https://localhost:5001`)
- **There are no test projects.** CI's "Test" step is an intentional no-op placeholder so the pipeline
  stays green. If you add tests, create a test project and switch that step to `dotnet test`. To run a
  single test once one exists: `dotnet test --filter "FullyQualifiedName~<TestName>"`.

**Docs site** (Jekyll, Ruby 3.1):
- `bundle install` then `bundle exec jekyll serve` (theme: just-the-docs, pinned in `Gemfile`).

**Presentation deck** (`presentation/`, Node — not Python):
- `cd presentation && npm install && node generate_slides.mjs` regenerates
  `copilot-actions-overview.pptx`. The `.mjs` file is the single source of truth for the deck; edit it
  rather than the `.pptx`. Never commit the `~$*.pptx` Office lock file.

## GitHub Actions conventions

- **Pin actions to a full commit SHA** with the version in a trailing comment (e.g.
  `actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2`), not `@v4`. This is enforced by
  `.github/instructions/github-actions-ci-cd-best-practices.instructions.md` and the `GitHub Actions
  Expert` agent in `.github/agents/`.
- Default to `permissions: contents: read` (least privilege) and add a `concurrency` group that cancels
  superseded runs. See `dotnet-ci.yml` as the canonical example.
- `dotnet-ci.yml` is the verified, deliberately-green reference CI and the demo fallback — keep it green.

## Agentic workflow (gh-aw)

The `ci-health-report` agentic workflow opens an issue summarizing CI health. Conventions to preserve:
- A gh-aw workflow is a Markdown file with YAML frontmatter (`on`, `engine: copilot`, read-only
  `permissions`, `safe-outputs: create-issue`, `tools`) plus a natural-language body. Compile with
  `gh aw compile ci-health-report` to (re)generate the `.lock.yml`; never hand-edit the `.lock.yml`.
- The agent runs **read-only**; all writes go through `safe-outputs` (a separate permission-scoped job).
- `workflow_dispatch`/`schedule` only fire from the **default branch (`main`)**, so the dispatchable copy
  lives there. The verified answer-key copy is in `presentation/reference/` and the demo branch's
  `.github/workflows/` is intentionally clean so it can be authored live.
- Running it requires a `COPILOT_GITHUB_TOKEN` secret (set via `gh aw secrets bootstrap`).

## App conventions

- `src/` uses nullable reference types and implicit usings (enabled in the `.csproj`).
- State is **session-based, no database**: `CartService` stores the cart in session (30-min timeout,
  cleared on checkout); `ProductService` returns static product data. Don't introduce a DB for cart/product
  features unless the task explicitly asks.
- Standard MVC layout: `Controllers/` → `Services/` (business logic) → `Models/`, rendered via `Views/`.

## Docs conventions

- Lab content lives under `docs/NN_topic/` with numbered Markdown files (`NN_MM.md`) and a section index
  (`NN_topic.md`). Follow the existing numeric prefix ordering when adding pages.
