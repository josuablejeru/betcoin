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

data "aws_route53_zone" "domain" {
  name = var.domain_name
}
