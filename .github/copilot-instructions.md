# Copilot Instructions for Zava Storefront

## Project Overview

This is an **ASP.NET Core 6.0 MVC e-commerce storefront** demonstrating GitHub Copilot, Azure deployment, and GitHub Actions. The `src/` folder contains the main app; `docs/` contains workshop lab guides.

## Architecture

```
Controllers → Services → Models
     ↓           ↓
   Views     Session (cart state)
```

- **No database**: Product catalog is static in-memory (`ProductService`), cart uses session storage
- **Service lifetimes**: `ProductService` is Singleton (immutable data), `CartService` is Scoped (per-request session access)
- **Session-based cart**: Serialized to JSON in `HttpContext.Session` via `CartService`

## Key Patterns

### Dependency Injection

All services are registered in [Program.cs](src/Program.cs):
```csharp
builder.Services.AddSingleton<ProductService>();  // Static product data
builder.Services.AddScoped<CartService>();        // Session-bound cart
builder.Services.AddHttpContextAccessor();        // Required for CartService
```

### Controller Structure

Controllers use constructor injection and structured logging:
```csharp
public HomeController(ILogger<HomeController> logger, ProductService productService, CartService cartService)
```

Actions follow PRG (Post-Redirect-Get) pattern for cart modifications—all `[HttpPost]` actions return `RedirectToAction()`.

### View Pattern

- Views inject `CartService` directly for cart badge display in `_Layout.cshtml`
- Models passed via `View(model)`, totals via `ViewBag`
- Bootstrap 5 + Bootstrap Icons for UI

## Commands

```bash
# Run from src/ directory
cd src
dotnet run                    # Runs on https://localhost:5001
dotnet build                  # Build only
dotnet watch run              # Hot reload development
```

## File Conventions

| Directory | Purpose |
|-----------|---------|
| `src/Controllers/` | MVC controllers (one per feature area) |
| `src/Services/` | Business logic, no interfaces needed for this scale |
| `src/Models/` | Simple POCOs with no validation attributes |
| `src/Views/{Controller}/` | Feature-specific views |
| `docs/` | Workshop labs (Jekyll site, not app code) |

## When Adding Features

1. **New entity**: Add model in `Models/`, service in `Services/`, register in `Program.cs`
2. **New page**: Add action in controller, create view in `Views/{Controller}/`
3. **Session data**: Follow `CartService` pattern—serialize to JSON, use session key constant
4. **Logging**: Use `_logger.LogInformation()` with structured parameters: `"Action {Param}"`, not string interpolation

## Known Constraints

- Session timeout: 30 minutes (configured in `Program.cs`)
- Cart clears on checkout (by design, no order persistence)
- Product images use external placeholder URLs (picsum.photos)
- Target framework: .NET 6.0 (LTS)
