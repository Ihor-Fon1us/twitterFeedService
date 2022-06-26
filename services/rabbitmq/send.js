const amqp = require('amqplib/callback_api');

const sendToQueue = (queueName, message) => {
    amqp.connect('amqp://localhost', (err, conn) => {
        if (err) {
            console.log(err);
            return;
        }
        conn.createChannel((err, ch) => {
            if (err) {
                console.log(err);
                return;
            }
            ch.assertQueue(queueName);
            ch.sendToQueue(queueName, message);
        });
    });
}

module.exports.sendToQueue = sendToQueue;