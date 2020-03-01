//invokeurl: https://gzbqn7xvgd.execute-api.us-east-1.amazonaws.com/beta/mail/send

const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxf508153849644a7ea96924f4dde342c4.mailgun.org';
const api_key = "51a34ba690409aacc8f9c813fd0ad46f-9dda225e-cc116559";
const mg = mailgun({apiKey: api_key, domain: DOMAIN});

exports.handler = async (event, context, callback) => {
    const docClient = new AWS.DynamoDB.DocumentClient();
    let statusCode = 200;
    let responseBody = "";
    const headers = {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
    };
    const emailData = JSON.parse(event.body);
    var params = {
        TableName: "SentEmails",
        Item: emailData
    };
    try {
        const mailgunResponse = await mg.messages().send(emailData);
        const messageId = mailgunResponse.id;
        emailData.id = messageId.substring(1, messageId.length - 1);
        emailData.currentStatus = 'queued';
        const data = await docClient.put(params).promise();
        responseBody = JSON.stringify(mailgunResponse);
    } catch (e) {
        responseBody = `Unable to create email: ${e}`;
        statusCode = 403;
    }
    const response = {
        statusCode,
        headers,
        body: responseBody
    };
    return response;
};
