# -----------------------------------------------------------------------------
# Outputs
# Key information for deployment and integration
# -----------------------------------------------------------------------------

# Resource Group
output "resource_group_name" {
  description = "Name of the resource group containing all resources"
  value       = module.resource_group.name
}

output "resource_group_id" {
  description = "Resource ID of the resource group"
  value       = module.resource_group.resource_id
}

# App Service
output "app_service_name" {
  description = "Name of the App Service"
  value       = module.app_service.resource.name
  sensitive   = true
}

output "app_service_url" {
  description = "Default URL of the App Service"
  value       = "https://${module.app_service.resource.default_hostname}"
  sensitive   = true
}

output "app_service_principal_id" {
  description = "Principal ID of the App Service Managed Identity"
  value       = module.app_service.resource.identity[0].principal_id
  sensitive   = true
}

# Container Registry
output "acr_name" {
  description = "Name of the Azure Container Registry"
  value       = module.container_registry.resource.name
}

output "acr_login_server" {
  description = "Login server URL for the Container Registry"
  value       = module.container_registry.resource.login_server
}

# Monitoring
output "log_analytics_workspace_id" {
  description = "Workspace ID for Log Analytics"
  value       = module.log_analytics.resource.workspace_id
  sensitive   = true
}

output "application_insights_connection_string" {
  description = "Connection string for Application Insights"
  value       = module.application_insights.resource.connection_string
  sensitive   = true
}

output "application_insights_instrumentation_key" {
  description = "Instrumentation key for Application Insights"
  value       = module.application_insights.resource.instrumentation_key
  sensitive   = true
}

# AI Foundry (conditional)
output "ai_hub_name" {
  description = "Name of the Azure AI Hub"
  value       = var.enable_ai_foundry ? local.ai_hub_name : null
}

output "ai_project_name" {
  description = "Name of the Azure AI Project"
  value       = var.enable_ai_foundry ? local.ai_project_name : null
}

output "ai_project_id" {
  description = "Resource ID of the Azure AI Project"
  value       = var.enable_ai_foundry ? module.ai_project[0].resource_id : null
}

# Azure Portal Links
output "azure_portal_resource_group_url" {
  description = "Direct link to the resource group in Azure Portal"
  value       = "https://portal.azure.com/#@/resource${module.resource_group.resource_id}"
}

# Deployment Information
output "deployment_info" {
  description = "Summary of deployed resources"
  sensitive   = true
  value = {
    environment        = var.environment
    location           = var.location
    app_url            = "https://${module.app_service.resource.default_hostname}"
    acr_server         = module.container_registry.resource.login_server
    ai_foundry_enabled = var.enable_ai_foundry
  }
}
