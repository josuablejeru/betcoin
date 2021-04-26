resource "aws_api_gateway_domain_name" "api" {
  domain_name     = "api.${var.domain_name}"
  certificate_arn = aws_acm_certificate_validation.certvalidation.certificate_arn

  endpoint_configuration {
    types = ["EDGE"]
  }
}

resource "aws_api_gateway_base_path_mapping" "api" {
  api_id      = aws_api_gateway_rest_api.openapi.id
  stage_name  = aws_api_gateway_stage.backend.stage_name
  domain_name = aws_api_gateway_domain_name.api.domain_name
  base_path   = aws_api_gateway_stage.backend.stage_name
}

resource "aws_api_gateway_rest_api" "openapi" {
  name = "${terraform.workspace}-betcoin-api"
  body = templatefile("../openapi.yaml", {
    store_guess_function    = "betcoin-${terraform.workspace}-store_guess",
    create_session_function = "betcoin-${terraform.workspace}-create_session",
    get_score_function      = "betcoin-${terraform.workspace}-get_score"
    region                  = var.aws_region,
    account_id              = data.aws_caller_identity.current.account_id
  })
  description = "API Backend for Betcoin"

  endpoint_configuration {
    types = ["EDGE"]
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
