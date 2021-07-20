// Require objects.
const express = require('express');
const app = express();
const {SQS} = require('aws-sdk');
const queueUrl = "your queue url";
const receipt = "your receipt handler";

// Instantiate SQS.
const sqs = new SQS({region: 'your region'});  // us-east-1
// Creating a queue.
app.get('/create', function (req, res) {
    const params = {
        QueueName: "MyFirstQueue"
    };
    sqs.createQueue(params, function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            console.log(data);
            res.send(data);
        } 
    });
});
// delete Queue
app.get('/deleteQueue', function (req, res) {
    const params = {
        QueueUrl: queueUrl
    };
    
    sqs.deleteQueue(params, function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            console.log(data);
            res.send(data);
        } 
    });
});

// Listing our queues.
app.get('/list', function (req, res) {
    sqs.listQueues(function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            console.log(data);
            res.send(data);
        } 
    });
});

// Sending a message.
// NOTE: Here we need to populate the queue url you want to send to.
// That constable is indicated at the top of app.js.
app.get('/send', function (req, res) {
    const params = {
        MessageBody: JSON.stringify({
            "message": "Hello World!"
        }),
        QueueUrl: queueUrl,
        DelaySeconds: 0
    };

    sqs.sendMessage(params, function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            console.log(data);
            res.send(data);
        } 
    });
});



// Receive a message.
// NOTE: This is a great long polling example. You would want to perform
// this action on some sort of job server so that you can process these
// records. In this example I'm just showing you how to make the call.
// It will then put the message "in flight" and I won't be able to 
// reach that message again until that visibility timeout is done.
app.get('/receive', function (req, res) {
    const params = {
        QueueUrl: queueUrl,
        VisibilityTimeout: 600 // 10 min wait time for anyone else to process.
    };
    
    sqs.receiveMessage(params, function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            console.log(data);
            res.send(data);
        } 
    });
});

// Deleting a message.
app.get('/delete', function (req, res) {
    const params = {
        QueueUrl: queueUrl,
        ReceiptHandle: receipt
    };
    
    sqs.deleteMessage(params, function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            console.log(data);
            res.send(data);
        } 
    });
});

// Purging the entire queue.
app.get('/purge', function (req, res) {
    const params = {
        QueueUrl: queueUrl
    };
    
    sqs.purgeQueue(params, function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            console.log(data);
            res.send(data);
        } 
    });
});

// Start server.
const server = app.listen(3000, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log('AWS SQS example app listening at http://%s:%s', host, port);
});
