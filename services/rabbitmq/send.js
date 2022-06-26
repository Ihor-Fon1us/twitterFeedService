const amqp = require('amqplib/callback_api');
const ch = require('./connect');

const sendToQueue = (queueName, message) => {
    ch.assertQueue(queueName);
    ch.sendToQueue(queueName, message);
}

module.exports.sendToQueue = sendToQueue;