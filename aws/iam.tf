# Frontend hosting
resource "aws_s3_bucket_policy" "s3-policy" {
  bucket = aws_s3_bucket.website.id
  policy = data.aws_iam_policy_document.s3policy.json
}

# Frontend hosting
data "aws_iam_policy_document" "s3policy" {
  statement {
    actions = ["s3:GetObject"]

    resources = [
      aws_s3_bucket.website.arn,
      "${aws_s3_bucket.website.arn}/*"
    ]
    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.oai.iam_arn]
    }
  }
}

# API Gateway lambda invokation
resource "aws_lambda_permission" "lambda_permission" {
  statement_id  = "AllowMyDemoAPIInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "store-guess-dev-store_guess"
  principal     = "apigateway.amazonaws.com"

   source_arn = "${aws_api_gateway_rest_api.openapi.execution_arn}/*"
}
