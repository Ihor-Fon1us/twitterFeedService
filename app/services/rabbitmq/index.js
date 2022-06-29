const amqp = require('amqplib');
const { url } = require('../../config/config');

class RABBITMQ {
  constructor() {
    this.connection = null;
    this.channel = null;
    this.connect();
  }

  async connect() {
    try {
      this.connection = await amqp.connect(url.rabbitmq, { durable: true });
      this.channel = await this.connection.createChannel();
    } catch (err) {
      console.log(err);
      // throw new Error('Connection failed');
    }
  }

  async postData(queueName, data) {
    if (!this.connection) await this.connect();
    try {
      await this.channel.sendToQueue(queueName, new Buffer.from(JSON.stringify(data)));
    } catch (err) {
      console.error(err);
    }
  }

  async initConsumeHandler(queueName, model) {
    if (!this.connection) await this.connect();
    try {
      await this.channel.assertQueue(queueName);
      await this.channel.consume(queueName, (msg) => {
        model.create(JSON.parse(msg.content.toString()));
        //this.channel.ack(msg);
      });
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new RABBITMQ();
