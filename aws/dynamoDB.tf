resource "aws_dynamodb_table" "user_score" {
  name         = "${terraform.workspace}-user-score"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "SessionId"

  attribute {
    name = "SessionId"
    type = "S"
  }
  tags = {
    "stage"   = terraform.workspace
    "project" = "betcoin"
  }
}

