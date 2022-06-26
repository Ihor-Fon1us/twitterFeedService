const amqp = require('amqplib/callback_api');

const connectToRabbitmq = (cb) => {
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
            cb(ch);
        });
    });
}

module.exports = connectToRabbitmq;