import json
import boto3
import os
import uuid


def session_init():
    """ creates a new user session and save it to dynamo """
    table_name = os.getenv("DYNAMODB_TABLE")
    table = boto3.resource('dynamodb').Table(table_name)
    session_id = str(uuid.uuid4())

    response = table.put_item(Item={"SessionId": session_id, "Score": 0})

    return {"session_id": session_id, "response": response}


def handler(event, context):
    session = session_init()

    response = {
        "statusCode": 201,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
        },
        "body": json.dumps({"sessionId": session.get("session_id")})
    }

    return response
