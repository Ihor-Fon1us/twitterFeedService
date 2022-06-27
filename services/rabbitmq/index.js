const amqp = require("amqplib");
const { url } = require('../../config/config');
const Twitt = require('../../models/twitt');

const queueName = 'twitt';

class RABBITMQ {
    constructor () {
        this.connection = null;
        this.channel = null;
        this.connect();
    }
    async connect () {
        try {
            this.connection = await amqp.connect(url.rabbitmq, { durable: true });
            this.channel = await this.connection.createChannel();
            await this.channel.assertQueue(queueName);
            this.channel.consume(queueName, (msg) => {
                Twitt.create(msg.content.toString());
                this.channel.ack(msg);
               })
        } catch (err){
            console.log(err);
            throw new Error('Connection failed');
        }
    }
    async postData (data) {
        if (!this.connection) await this.connect()
        try {
            this.channel.sendToQueue(queueName, new Buffer.from(JSON.stringify(data)));
        } catch (err){
            console.error(err);
        }
    }
    async receiveData () {
        return this.channel.consume(queueName, (msg) => {
            return msg.content.toJSON();
        })
    }
}
module.exports = new RABBITMQ()