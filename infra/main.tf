# -----------------------------------------------------------------------------
# Resource Group
# All resources for ZavaStorefront in WestUS3
# -----------------------------------------------------------------------------

module "resource_group" {
  source  = "Azure/avm-res-resources-resourcegroup/azurerm"
  version = "~> 0.2"

  name             = local.resource_group_name
  location         = var.location
  enable_telemetry = true
  tags             = local.common_tags
}
