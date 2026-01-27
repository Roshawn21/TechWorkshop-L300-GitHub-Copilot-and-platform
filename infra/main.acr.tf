# -----------------------------------------------------------------------------
# Azure Container Registry
# Container image hosting with RBAC-based access (no passwords)
# -----------------------------------------------------------------------------

module "container_registry" {
  source  = "Azure/avm-res-containerregistry-registry/azurerm"
  version = "~> 0.4"

  name                = local.acr_name
  resource_group_name = module.resource_group.name
  location            = var.location
  enable_telemetry    = true

  sku = var.acr_sku

  # Security: Disable admin user (use RBAC instead)
  admin_enabled = false

  # Security: Disable anonymous pull
  anonymous_pull_enabled = false

  # Enable zone redundancy for prod (not available in Basic SKU)
  zone_redundancy_enabled = var.acr_sku == "Premium" ? true : false

  # Diagnostic settings - send to Log Analytics
  diagnostic_settings = {
    to_log_analytics = {
      name                  = "acr-diagnostics"
      workspace_resource_id = module.log_analytics.resource_id
    }
  }

  tags = local.common_tags

  depends_on = [module.resource_group]
}

# -----------------------------------------------------------------------------
# Role Assignment: App Service → ACR (AcrPull)
# Enables App Service to pull images without credentials
# -----------------------------------------------------------------------------

resource "azurerm_role_assignment" "app_service_acr_pull" {
  scope                = module.container_registry.resource_id
  role_definition_name = "AcrPull"
  principal_id         = module.app_service.resource.identity[0].principal_id
  principal_type       = "ServicePrincipal"

  depends_on = [module.app_service, module.container_registry]
}
