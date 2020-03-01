//invokeurl: https://42n9v8oae7.execute-api.us-east-1.amazonaws.com/beta/mail-event/dispatch

const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

exports.handler = async (event, context, callback) => {
    const docClient = new AWS.DynamoDB.DocumentClient();
    let statusCode = 200;
    let responseBody = "";
    const headers = {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
    };
    const snsParams = {
        Message: event.body,
        TopicArn: "arn:aws:sns:us-east-1:963347408275:EmailTracker"
    };
    const publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(snsParams).promise();
    try {
        await publishTextPromise;
        const mailEvent = JSON.parse(event.body);
        const eventData = mailEvent['event-data'];
        if (eventData) {
            const messageId = eventData.message && eventData.message.headers && eventData.message.headers["message-id"];
            const eventName = eventData.event;
            const timestamp = eventData.timestamp;
            const updateParams = {
                TableName: "SentEmails",
                Key: {
                    id: messageId
                },
                UpdateExpression: "set currentStatus = :currentStatus, lastUpdated = :lastUpdated, #events = list_append(if_not_exists(#events, :empty_list), :events)",
                ExpressionAttributeValues: {
                    ":currentStatus": eventName,
                    ":lastUpdated": timestamp,
                    ":events": [JSON.stringify(mailEvent)],
                    ':empty_list': []
                },
                ExpressionAttributeNames: {
                    '#events': 'events'
                },
                ReturnValues: "UPDATED_NEW"
            };
            const data = await docClient.update(updateParams).promise();
            statusCode = 200;
            responseBody = JSON.stringify(data);
        } else {
            statusCode = "500";
            responseBody = "Event data is not present in the request payload"
        }
    } catch (e) {
        statusCode = 403;
        responseBody = JSON.stringify(e);
    }

    const response = {
        statusCode,
        headers,
        body: responseBody
    };
    return response;
};
