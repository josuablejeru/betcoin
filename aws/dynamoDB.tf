resource "aws_dynamodb_table" "user_score" {
  name         = "${terraform.workspace}-user-score"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "UserId"
  range_key    = "Score"

  attribute {
    name = "UserId"
    type = "S"
  }

  attribute {
    name = "Score"
    type = "N"
  }

  tags = {
    "stage"   = terraform.workspace
    "project" = "betcoin"
  }
}

