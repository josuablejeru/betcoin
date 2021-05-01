import os
import json
import boto3
import random
import uuid


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
    body = json.loads(event['body'])
    table_name = os.getenv("DYNAMODB_TABLE")

    session_id = body.get('sessionId')
    point = body.get('point')

    dynamo_response = put_guess(
        session_id=session_id,
        point=point,
        table_name=table_name
    )

    score = dynamo_response.get("Attributes").get("Score")

    body = {"guessId": str(uuid.uuid4()), "score": int(score)}
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
