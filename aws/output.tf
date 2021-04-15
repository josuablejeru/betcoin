output "cloudfront_url" {
  value = aws_cloudfront_distribution.site_distribution.domain_name
}
