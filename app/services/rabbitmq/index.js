const amqp = require('amqplib');
const { url } = require('../../config/config');

class RABBITMQ {
  constructor(queueName) {
    this.connection = null;
    this.channel = null;
    this.queueName = queueName;
  }

  async connect() {
    try {
      this.connection = await amqp.connect(url.rabbitmq, { durable: true });
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(this.queueName);
    } catch (err) {
      console.log(`Connection failed ${err}`);
      throw new Error('Connection failed');
    }
  }

  async postData(data) {
    if (!this.connection) {
      throw new Error('No connection');
    }
    try {
      await this.channel.sendToQueue(this.queueName, new Buffer.from(JSON.stringify(data)));
    } catch (err) {
      console.error(err);
    }
  }

  async initConsumeHandler(model) {
    console.log('initConsumeHandler');
    if (!this.connection) {
      throw new Error('No connection 2');
    }
    try {
      this.channel.consume(this.queueName, async (msg) => {
        try {
          await model.create(JSON.parse(msg.content.toString()));
          await this.channel.ack(msg);
        } catch (error) {
          console.error(error);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = RABBITMQ;
