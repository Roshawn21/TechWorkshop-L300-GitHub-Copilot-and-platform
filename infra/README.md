# ZavaStorefront Infrastructure

This directory contains Terraform configurations for deploying the ZavaStorefront application to Azure.

## Prerequisites

- [Terraform](https://www.terraform.io/downloads) >= 1.5.0
- [Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli) >= 2.50.0
- Azure subscription with appropriate permissions
- Set `ARM_SUBSCRIPTION_ID` environment variable

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        Resource Group (westus3)                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────┐    RBAC (AcrPull)    ┌──────────────────────┐        │
│  │ App Service  │◄────────────────────►│ Container Registry   │        │
│  │   (Linux)    │                      │      (Basic)         │        │
│  └──────┬───────┘                      └──────────────────────┘        │
│         │                                                               │
│         │ Telemetry                                                     │
│         ▼                                                               │
│  ┌──────────────┐         ┌──────────────────────┐                     │
│  │  Application │◄───────►│   Log Analytics      │                     │
│  │   Insights   │         │     Workspace        │                     │
│  └──────────────┘         └──────────────────────┘                     │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                     Azure AI Foundry                             │   │
│  │  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐        │   │
│  │  │  AI Hub     │────►│  AI Project │     │  Key Vault  │        │   │
│  │  └─────────────┘     └─────────────┘     └─────────────┘        │   │
│  │                                           ┌─────────────┐        │   │
│  │                                           │   Storage   │        │   │
│  │                                           └─────────────┘        │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Quick Start

```bash
# 1. Login to Azure
az login

# 2. Set subscription
export ARM_SUBSCRIPTION_ID="your-subscription-id"

# 3. Initialize Terraform
cd infra
terraform init

# 4. Plan (with dev environment)
terraform plan -var-file="environments/dev.tfvars"

# 5. Apply
terraform apply -var-file="environments/dev.tfvars"
```

## Files

| File | Purpose |
|------|---------|
| `terraform.tf` | Provider configuration and version constraints |
| `variables.tf` | Input variable definitions |
| `locals.tf` | Naming conventions and computed values |
| `main.tf` | Resource group |
| `main.acr.tf` | Container Registry with RBAC |
| `main.appservice.tf` | App Service Plan and Web App |
| `main.monitoring.tf` | Log Analytics and Application Insights |
| `main.ai.tf` | Azure AI Foundry (Hub, Project, dependencies) |
| `outputs.tf` | Output values |
| `environments/dev.tfvars` | Dev environment configuration |

## Security Features

- **No credentials stored**: ACR access via Managed Identity + RBAC
- **TLS 1.2 minimum**: Enforced on App Service
- **FTPS disabled**: Secure deployments only
- **Key Vault purge protection**: Enabled
- **Diagnostic logging**: All resources to Log Analytics

## AZD Integration

This infrastructure is designed for Azure Developer CLI (azd):

```bash
# From repository root
azd up          # Provision + deploy
azd down        # Teardown
azd monitor     # Open App Insights
```

See `azure.yaml` in the repository root for AZD configuration.

## Outputs

After deployment, key outputs include:
- `app_service_url` - Application URL
- `acr_login_server` - Container registry for image pushes
- `azure_portal_resource_group_url` - Direct Azure Portal link

## Cost Optimization (Dev)

- App Service: B1 tier (~$13/month)
- ACR: Basic tier (~$5/month)
- Log Analytics: Pay-per-GB
- AI Foundry: Pay-per-use for model inference

For production, upgrade to P1v3 App Service and Standard/Premium ACR.
