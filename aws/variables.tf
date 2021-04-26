variable "aws_region" {
  description = "aws_region"
  type        = string
  default     = "eu-central-1"
}

variable "domain_name" {
  description = "domain url"
  type        = string
}

variable "aws_access_key_id" {
  description = "AWS access key"
  type        = string
  sensitive   = true
}

variable "aws_secret_access_key" {
  description = "AWS secret access key"
  type        = string
  sensitive   = true
}

variable "function_names" {
  description = "Lambda function names used by betcoin api"
  type        = list(string)
  default     = ["create_session", "store_guess", "get_score"]
}

variable "github_repo" {
  description = "github repository name"
  type        = string
  default     = "betcoin"
}

variable "github_token" {
  description = "github token for the repository"
  type        = string
  sensitive   = true
}

variable "github_owner" {
  description = "github username"
  type        = string
}
