resource "github_actions_secret" "aws_access_key_id" {
  repository      = var.github_repo
  secret_name     = "AWS_ACCESS_KEY_ID"
  plaintext_value = var.aws_access_key_id
}

resource "github_actions_secret" "aws_secret_access_key" {
  repository      = var.github_repo
  secret_name     = "AWS_SECRET_ACCESS_KEY"
  plaintext_value = var.aws_secret_access_key
}

resource "github_actions_secret" "aws_s3_bucket_name" {
  repository      = var.github_repo
  secret_name     = "AWS_S3_BUCKET_NAME"
  plaintext_value = aws_s3_bucket.website.id

  depends_on = [
    aws_s3_bucket.website
  ]
}

resource "github_actions_secret" "aws_cloudfront_distribution_id" {
  repository      = var.github_repo
  secret_name     = "AWS_CLOUDFRONT_DISTRIBUTION_ID"
  plaintext_value = aws_cloudfront_distribution.site_distribution.id

  depends_on = [
    aws_cloudfront_distribution.site_distribution
  ]
}
