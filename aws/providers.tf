terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }

  /* include this store your Terraform state on s3
  backend "s3" {
    bucket         = "s3-bucket-name"
    encrypt        = true
    dynamodb_table = "dynamo-table-name"
    key            = "aws-twitter-data-processer/"
    region         = "eu-central-1"
  }
  */
}

provider "aws" {
  region                  = "eu-central-1"
  shared_credentials_file = "~/.aws/credentials"
}

provider "aws" {
  alias  = "us-east-1"
  region = "us-east-1"
}
