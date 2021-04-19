resource "aws_api_gateway_rest_api" "openapi" {
  name        = "${terraform.workspace}-betcoin-api"
  body        = templatefile("../openapi.yaml", {
    store_guess_function = "store-guess-${terraform.workspace}-store_guess",
    region = var.aws_region,
    account_id = data.aws_caller_identity.current.account_id
    })
  description = "API Backend for Betcoin"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_deployment" "backend" {
  rest_api_id = aws_api_gateway_rest_api.openapi.id

  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.openapi.body))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "backend" {
  deployment_id = aws_api_gateway_deployment.backend.id
  rest_api_id   = aws_api_gateway_rest_api.openapi.id
  stage_name    = terraform.workspace

  
}
