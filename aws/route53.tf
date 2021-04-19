resource "aws_route53_record" "websitedomain" {
  name    = var.domain_name
  zone_id = data.aws_route53_zone.domain.zone_id
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.site_distribution.hosted_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "api" {
  name = aws_api_gateway_domain_name.api.domain_name
  type = "A"
  zone_id = data.aws_route53_zone.domain.id

  alias {
   evaluate_target_health = true
   name = aws_api_gateway_domain_name.api.cloudfront_domain_name
   zone_id = aws_api_gateway_domain_name.api.cloudfront_zone_id
  }
}

data "aws_route53_zone" "domain" {
  name = var.domain_name
}
