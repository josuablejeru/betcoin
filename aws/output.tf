output "cloudfront_url" {
  value = aws_cloudfront_distribution.site_distribution.domain_name
}

output "api_gateway_url" {
  value = aws_api_gateway_deployment.backend.invoke_url
}