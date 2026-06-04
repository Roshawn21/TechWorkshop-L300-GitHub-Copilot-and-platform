# Break-glass fallback — CI Health & Test-Gap Report

If the live agentic run can't complete during the demo (e.g. the `COPILOT_GITHUB_TOKEN` isn't
fixed in time, or the model is briefly unavailable), create this issue by hand to show the *same
outcome* the agent produces, then talk through it exactly as if the agent had written it.

**Create it in ~10 seconds:**

```
gh issue create -R Roshawn21/GitHub-Demo `
  --title "[ci-health] CI Health & Test-Gap Report" `
  --label "ci-health,automated" `
  --body-file presentation/reference/ci-health-fallback-issue.md
```

(Remove the heading above the `---` first if you want a clean body, or just paste the section below
into the GitHub "New issue" UI.)

---

## CI health summary

The **.NET CI** workflow (`.github/workflows/dotnet-ci-demo.yml`) is **green**: it restores and builds
`src/ZavaStorefront.sln` in Release on every push/PR to `interview-demo*` and `main`. Build time is
healthy and the pipeline uses least-privilege permissions, SHA-pinned actions, and ref-keyed
concurrency.

**Top risk:** the pipeline's **"Test" step is a no-op placeholder** — it echoes a message and stays
green but runs **zero tests**. There is **no test project** in the solution yet, so CI currently proves
only that the app *compiles*, not that it *behaves correctly*.

## Test-coverage gaps (prioritized)

1. **`CartService` (session cart logic) — highest priority.** Add/remove/update quantity, totals, and the
   30-minute session timeout + clear-on-checkout behavior are completely untested. This is the most
   stateful, bug-prone code in the app. → [`src/Services/CartService.cs`](../../src/Services/CartService.cs)
2. **`CartController` actions.** Add-to-cart, remove, and checkout flows have no coverage; regressions
   here directly break the purchase path. → [`src/Controllers/CartController.cs`](../../src/Controllers/CartController.cs)
3. **`ProductService` lookups.** Static catalog reads and "product not found" handling are untested. →
   [`src/Services/ProductService.cs`](../../src/Services/ProductService.cs)
4. **Model invariants.** `Product` / `CartItem` (price, quantity, line-total) edge cases (zero/negative
   quantity, missing product) are unguarded. → [`src/Models/CartItem.cs`](../../src/Models/CartItem.cs),
   [`src/Models/Product.cs`](../../src/Models/Product.cs)
5. **`HomeController` smoke coverage.** No test confirms the catalog page renders. →
   [`src/Controllers/HomeController.cs`](../../src/Controllers/HomeController.cs)

## Suggested next steps

- [ ] Add an xUnit test project (`ZavaStorefront.Tests`) and reference it from `src/ZavaStorefront.sln`.
- [ ] Write unit tests for `CartService` (add/remove/update, totals, session timeout, clear-on-checkout).
- [ ] Add `CartController` tests covering add → checkout and the empty-cart path.
- [ ] Add `ProductService` tests including the not-found case.
- [ ] Switch the CI **"Test"** step in `.github/workflows/dotnet-ci-demo.yml` from the placeholder echo to
      `dotnet test --no-restore --configuration Release`.
- [ ] (Optional) Add a coverage collector (e.g. `coverlet`) and surface the summary in the job log.

*Read-only report — no code was changed.*
