import os
import json
from pprint import pprint
import boto3


TABLE_NAME = os.getenv('DYNAMODB_TABLE')


def put_guess(userId, point, guess, table=None, table_name=None):
    """
    time, btc_set, btc_after,
    """
    if not table:
        table = boto3.resource('dynamodb').Table(table_name)

    # create transaction on user
    r = table.put_item(Item={
        'UserId': userId,
        'Score': point,
        'Guess': guess
    })
    return r


def store_guess(event, context):

    dynamo_response = put_guess(userId=event['userId'],
                                point=event['point'],
                                guess=event['guess'],
                                table_name=TABLE_NAME)

    response = {
        "statusCode": 201,
        "body": json.dumps(dynamo_response)
    }

    return response
