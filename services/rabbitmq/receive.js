const amqp = require('amqplib/callback_api');

const receiveFromQueue = (queueName) => {
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
            ch.consume(queueName, (msg) => {
                return msg.content.toJSON();
            });
        });
    });
}

module.exports.receiveFromQueue = receiveFromQueue;
