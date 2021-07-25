import { SQS } from 'aws-sdk';
const queueUrl = "your queue url";
const receipt = "your receipt handler";
import { promisify } from "util";

// Instantiate SQS.
const sqs = new SQS({ region: 'your region' });  // us-east-1

/*
 By default this methods don't support promise. Hence we are using promisify to convert callback functions to 
 promises.
*/
const CreateQueue= promisify(sqs.createQueue).bind(sqs);
const DeleteQueue= promisify(sqs.deleteQueue).bind(sqs);
const ListQueues= promisify(sqs.listQueues).bind(sqs);
const SendMessage= promisify(sqs.sendMessage).bind(sqs);
const ReceiveMessage= promisify(sqs.receiveMessage).bind(sqs);
const DeleteMessage= promisify(sqs.deleteMessage).bind(sqs);
const PurgeQueue= promisify(sqs.purgeQueue).bind(sqs);
const GetQueue = promisify(sqs.getQueueUrl).bind(sqs);

/* 
  Create a Queue.
  const params = {
    QueueName: "MyFirstQueue"
};
*/
async function createQueue(createQueueParams) {
    try {
        const createQueueResponse = await CreateQueue(createQueueParams);
        console.log(createQueueResponse);
    } catch (err) {
        console.log(err.message);
    }
}

/* 
   Delete a Queue
   const params = {
        QueueUrl: queueUrl
    };
*/

async function deleteQueue(deleteQueueParams) {
    try {
        const deleteQueueResponse = await DeleteQueue(deleteQueueParams);
        console.log(deleteQueueResponse);
    } catch (err) {
        console.log(err.message);
    }
}

/* 
   Get a Queue
   const params = {
        QueueUrl: queueUrl
    };
*/

async function getQueue(getQueueParams) {
    try {
        const getQueueResponse = await GetQueue(getQueueParams);
        console.log(getQueueResponse);
    } catch (err) {
        console.log(err.message);
    }
}

/* 
 List Queues. 
 No body.
*/
async function listQueues(listQueuesParams) {
    try {
        const listQueuesResponse = await ListQueues();
        console.log(listQueuesResponse);
    } catch (err) {
        console.log(err.message);
    }
}


/* 
 Sending a message.

 const params = {
        //  MessageBody must be in the sting format
        MessageBody: JSON.stringify({
            "message": "Hello World!"
        }),
        QueueUrl: queueUrl,
        DelaySeconds: 0
    };
*/

async function sendMessage(sendMessageParams) {
    try {
        const sendMessageResponse = await SendMessage(sendMessageParams);
        console.log(sendMessageResponse);
    } catch (err) {
        console.log(err.message);
    }
}


/*
 Receive a message.

 NOTE: This is a great long polling example. You would want to perform
 this action on some sort of job server so that you can process these
 records. In this example I'm just showing you how to make the call.
 It will then put the message "in flight" and I won't be able to 
 reach that message again until that visibility timeout is done.

 const params = {
        QueueUrl: queueUrl,
        VisibilityTimeout: 600 // 10 min wait time for anyone else to process.
    };
*/
async function receiveMessage(receiveMessageParams) {
    try {
        const receiveMessageResponse = await ReceiveMessage(receiveMessageParams);
        console.log(receiveMessageResponse);
    } catch (err) {
        console.log(err.message);
    }
}

/* 
 Delete a message.
  const params = {
    QueueUrl: queueUrl,
    ReceiptHandle: receipt
  };
*/
async function deleteMessage(deleteMessageParams) {
    try {
        const deleteMessageResponse = await DeleteMessage(deleteMessageParams);
        console.log(deleteMessageResponse);
    } catch (err) {
        console.log(err.message);
    }
}

/* 
 Purging the entire queue.
 const params = {
        QueueUrl: queueUrl
 };
*/
async function purgeQueue(purgeQueueParams) {
     try {
        const purgeQueueResponse = await PurgeQueue(purgeQueueParams);
        console.log(purgeQueueResponse);
    } catch (err) {
        console.log(err.message);
    }
}

const params = {
    QueueUrl: queueUrl,
    // ReceiptHandle: receipt
    // QueueName: "MyQueue",
    // MessageBody: JSON.stringify({
    //    "message": "Hello World!"
    // }),
    // DelaySeconds: 0,
    // VisibilityTimeout: 600 // 10 min wait time for anyone else to process.
}
// deleteQueue(params);
// createQueue(params)
// listQueues(params);
// getQueue(params);
// sendMessage(params);
// receiveMessage(params);
// deleteMessage(params);
// purgeQueue(params);

