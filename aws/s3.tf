resource "aws_s3_bucket" "website" {
  bucket = "${terraform.workspace}-betcoin"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "404.html"
  }

  tags = {
    "stage" : terraform.workspace,
    "project" : "betcoin"
  }
}

resource "aws_s3_bucket_public_access_block" "s3block" {
  bucket                  = aws_s3_bucket.website.id
  block_public_acls       = false
  block_public_policy     = false 
}
