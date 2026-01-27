# -----------------------------------------------------------------------------
# Log Analytics Workspace
# Central logging for all resources
# -----------------------------------------------------------------------------

module "log_analytics" {
  source  = "Azure/avm-res-operationalinsights-workspace/azurerm"
  version = "~> 0.4"

  name                = local.log_analytics_name
  resource_group_name = module.resource_group.name
  location            = var.location
  enable_telemetry    = true

  # Retention: 30 days for dev (cost optimization)
  log_analytics_workspace_retention_in_days = var.environment == "prod" ? 90 : 30

  # SKU
  log_analytics_workspace_sku = "PerGB2018"

  tags = local.common_tags

  depends_on = [module.resource_group]
}

# -----------------------------------------------------------------------------
# Application Insights
# APM for the web application
# -----------------------------------------------------------------------------

module "application_insights" {
  source  = "Azure/avm-res-insights-component/azurerm"
  version = "~> 0.2"

  name                = local.app_insights_name
  resource_group_name = module.resource_group.name
  location            = var.location
  enable_telemetry    = true

  # Link to Log Analytics workspace
  workspace_id = module.log_analytics.resource_id

  # Application type
  application_type = "web"

  tags = local.common_tags

  depends_on = [module.log_analytics]
}
