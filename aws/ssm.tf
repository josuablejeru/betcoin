resource "aws_ssm_parameter" "user_score_dynamodb_arn" {
  name  = "/betcoin/${terraform.workspace}/user-score-dynamodb-arn"
  type  = "String"
  value = aws_dynamodb_table.user_score.arn

  depends_on = [
    aws_dynamodb_table.user_score
  ]
}

resource "aws_ssm_parameter" "user_score_dynamodb" {
  name = "/betcoin/${terraform.workspace}/user-score-dynamodb-name"
  type = "String"
  value = aws_dynamodb_table.user_score.id

  depends_on = [
    aws_dynamodb_table.user_score
  ]
}