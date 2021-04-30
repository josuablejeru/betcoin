import os
import json
import boto3

from http.cookies import SimpleCookie


def get_score(session_id, table_name):
    table = boto3.resource('dynamodb').Table(table_name)

    response = table.get_item(Key={'SessionId': session_id})

    return response['Item']


def handler(event, context):
    table_name = os.getenv("DYNAMODB_TABLE")
    print(event)

    session_id = event.get('pathParameters').get('sessionId')

    dynamo_response = get_score(
        session_id=session_id, table_name=table_name)

    print(dynamo_response)
    score = dynamo_response.get("Score")

    body = {"score": int(score)}
    response = {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
        },
        "body": json.dumps(body)
    }

    return response
