//invokeurl: https://6r6cpkzwaj.execute-api.us-east-1.amazonaws.com/beta/recipients/create

const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

exports.handler = async (event, context, callback) => {
    const docClient = new AWS.DynamoDB.DocumentClient();
    let statusCode = 200;
    let responseBody = "";
    const headers = {
        "Content-Type": "application/json"
    };
    const recipient = JSON.parse(event.body);
    var params = {
        TableName: "Recipients",
        Item: recipient
    };
    try {
        const data = await docClient.put(params).promise();
        console.log(data);
        responseBody = JSON.stringify(data);
    } catch (e) {
        responseBody = `Unable to create recipient: ${e}`;
        statusCode = 403;
    }
    const response = {
        statusCode,
        headers,
        body: responseBody
    };
    return response;
};
