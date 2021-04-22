import os
import json
from pprint import pprint
import boto3
import uuid
import random


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

    response = {
        "statusCode": 201,
        "body": json.dumps({'guessId': str(uuid.uuid4()),
                            'score': random.randrange(-10, 10, 1)})
    }

    return response
