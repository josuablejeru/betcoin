resource "aws_s3_bucket" "website" {
  bucket = "${terraform.workspace}-betcoin"
  acl    = "private"

  tags = {
    "stage" : terraform.workspace,
    "project" : "betcoin"
  }
}

resource "aws_s3_bucket_public_access_block" "s3block" {
  bucket                  = aws_s3_bucket.website.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
