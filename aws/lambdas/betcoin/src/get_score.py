import os
import json
import boto3

from http.cookies import SimpleCookie


def parse_event(event) -> dict:
    parser = SimpleCookie()
    parser.load(event.get('headers').get('Cookie'))
    cookies = {}
    for key, morsel in parser.items():
        cookies[key] = morsel.value

    return {"cookie": cookies}


def get_score(session_id, table_name):
    table = boto3.resource('dynamodb').Table(table_name)

    response = table.get_item(Key={'SessionId': session_id})

    return response['Item']


def handler(event, context):
    event = parse_event(event)
    table_name = os.getenv("DYNAMODB_TABLE")

    session_id = event.get('cookie').get('SESSION_ID')

    dynamo_response = get_score(
        session_id=session_id, table_name=table_name)

    print(dynamo_response)
    score = dynamo_response.get("Score")

    body = {"sessionId": session_id, "score": int(score)}
    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response
