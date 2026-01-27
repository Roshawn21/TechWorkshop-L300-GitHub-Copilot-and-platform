# -----------------------------------------------------------------------------
# Local Values
# Centralized naming conventions and common configurations
# -----------------------------------------------------------------------------

locals {
  # Naming prefix for all resources
  # Format: {project}-{environment}-{location_short}
  location_short       = "wus3"
  resource_name_prefix = "${var.project_name}-${var.environment}-${local.location_short}"

  # Resource-specific names following Azure naming conventions
  # https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-naming
  resource_group_name   = "rg-${local.resource_name_prefix}"
  app_service_plan_name = "asp-${local.resource_name_prefix}"
  app_service_name      = "app-${local.resource_name_prefix}"
  acr_name              = replace("acr${var.project_name}${var.environment}${local.location_short}", "-", "")
  log_analytics_name    = "log-${local.resource_name_prefix}"
  app_insights_name     = "appi-${local.resource_name_prefix}"
  ai_hub_name           = "aih-${local.resource_name_prefix}"
  ai_project_name       = "aip-${local.resource_name_prefix}"
  key_vault_name        = "kv-${var.project_name}-${var.environment}"
  storage_account_name  = replace("st${var.project_name}${var.environment}ai", "-", "")

  # Common tags applied to all resources
  common_tags = merge(
    {
      Environment = var.environment
      Project     = var.project_name
      Owner       = var.owner
      ManagedBy   = "terraform"
      Repository  = "TechWorkshop-L300-GitHub-Copilot-and-platform"
    },
    var.tags
  )

  # App Service configuration
  app_service_config = {
    dotnet_version    = "6.0"
    always_on         = var.environment == "prod"
    use_32_bit_worker = false
    health_check_path = "/health"
  }
}
