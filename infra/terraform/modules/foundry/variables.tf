variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
}

variable "location" {
  description = "Azure region"
  type        = string
}

variable "foundry_name" {
  description = "Name of the Microsoft Foundry workspace"
  type        = string
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
}
