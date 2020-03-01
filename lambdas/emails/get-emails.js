// invokeurl: https://gzbqn7xvgd.execute-api.us-east-1.amazonaws.com/beta/mail


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
    var params = {
        TableName: "SentEmails"
    };
    try {
        const data = await docClient.scan(params).promise();
        responseBody = JSON.stringify(data);
    } catch (e) {
        responseBody = `Unable to get emails: ${e}`;
        statusCode = 403;
    }
    const response = {
        statusCode,
        headers,
        body: responseBody
    };
    return response;
};
