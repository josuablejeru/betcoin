import os
import json
import boto3
import random

from pprint import pprint

from http.cookies import SimpleCookie


def parse_event(event) -> dict:
    parser = SimpleCookie()
    parser.load(event.get('headers').get('Cookie'))
    cookies = {}
    for key, morsel in parser.items():
        cookies[key] = morsel.value

    body = json.loads(event['body'])

    return {"cookie": cookies, "body": body}


def put_guess(session_id, point, table_name):
    table = boto3.resource('dynamodb').Table(table_name)

    # create transaction on user
    r = table.update_item(
        Key={
            'SessionId': session_id
        },
        UpdateExpression="set Score = Score + :val",
        ExpressionAttributeValues={
            ':val': point
        },
        ReturnValues="UPDATED_NEW"
    )

    return r


def handler(event, context):
    event = parse_event(event)
    table_name = os.getenv("DYNAMODB_TABLE")

    session_id = event.get('cookie').get('SESSION_ID')
    point = event.get('body').get('point')

    dynamo_response = put_guess(
        session_id=session_id,
        point=point,
        table_name=table_name
    )

    score = dynamo_response.get("Attributes").get("Score")

    body = {"sessionId": session_id, "score": int(score)}
    response = {
        "statusCode": 201,
        "body": json.dumps(body)
    }

    return response
