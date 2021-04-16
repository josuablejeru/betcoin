resource "aws_ssm_parameter" "user_score_dynamodb_arn" {
  name  = "/betcoin/${terraform.workspace}/user-score-dynamodb-arn"
  type  = "String"
  value = aws_dynamodb_table.user_score.arn

  depends_on = [
    aws_dynamodb_table.user_score
  ]
}
