// invokeurl: https://6r6cpkzwaj.execute-api.us-east-1.amazonaws.com/beta/recipients


const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

exports.handler = async (event, context, callback) => {
    const docClient = new AWS.DynamoDB.DocumentClient();
    let statusCode = 200;
    let responseBody = "";
    const headers = {
        "Content-Type": "application/json"
    };
    var params = {
        TableName: "Recipients"
    };
    try {
        const data = await docClient.scan(params).promise();
        responseBody = JSON.stringify(data);
    } catch (e) {
        responseBody = `Unable to get recipients: ${e}`;
        statusCode = 403;
    }
    const response = {
        statusCode,
        headers,
        body: responseBody
    };
    return response;
};
