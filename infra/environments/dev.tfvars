# -----------------------------------------------------------------------------
# Development Environment Configuration
# Region: westus3 | Environment: dev
# -----------------------------------------------------------------------------

environment  = "dev"
location     = "westus3"
project_name = "zava"
owner        = "ZavaStorefront"

# Dev-optimized SKUs (cost savings)
app_service_sku = "B1"
acr_sku         = "Basic"

# Enable AI Foundry for GPT-4 and Phi model support
# NOTE: Disabled due to Azure Policy blocking shared key access on storage accounts
# Re-enable once policy exemption is obtained or managed identity auth is configured
enable_ai_foundry = false

# AI models to deploy (optional - can be deployed manually or via separate config)
ai_models = []

# Additional tags
tags = {
  CostCenter = "Development"
  Purpose    = "TechWorkshop-L300"
}
