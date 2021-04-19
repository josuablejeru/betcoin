resource "aws_api_gateway_rest_api" "openapi" {
  name        = "${terraform.workspace}-betcoin-api"
  body        = file("../openapi.yaml")
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
