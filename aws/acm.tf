resource "aws_acm_certificate" "website" {
  provider                  = aws.us-east-1
  domain_name               = var.domain_name
  subject_alternative_names = ["*.${var.domain_name}"]
  validation_method         = "DNS"

  tags = {
    "stage"   = terraform.workspace,
    "project" = "betcoin"
  }
}

resource "aws_route53_record" "certvalidation" {
  provider = aws.us-east-1
  for_each = {
    for d in aws_acm_certificate.website.domain_validation_options : d.domain_name => {
      name   = d.resource_record_name
      record = d.resource_record_value
      type   = d.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.domain.zone_id
}

resource "aws_acm_certificate_validation" "certvalidation" {
  provider                = aws.us-east-1
  certificate_arn         = aws_acm_certificate.website.arn
  validation_record_fqdns = [for r in aws_route53_record.certvalidation : r.fqdn]
}
