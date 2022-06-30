const express = require('express');

const router = express.Router();
const Twitt = require('../models/twitt');

const { twittSchema } = require('../models/validator/validatorSchema');
const { validate } = require('../services/validate');
const RABBITMQ = require('../services/rabbitmq/index');

const queueName = 'twitt';

const rabbit = new RABBITMQ(queueName);
rabbit.connect().then(() => rabbit.initConsumeHandler(Twitt)).catch((err) => console.log(err));

const handlerGet = () => (req, res) => {
  res.setHeader('Content-Type', 'application/stream+json');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.setHeader('Connection', 'keep-alive');

  const inputStream = Twitt.findAllWithStream({ objectMode: true });

  inputStream.on('data', (data) => {
    res.write(data);
  });

  Twitt.afterCreate((twitt) => {
    res.write(JSON.stringify(twitt));
  });
};

const handlerPost = () => (req, res) => {
  const data = {
    nickname: req.body.nickname,
    text: req.body.text,
    createdAt: new Date(),
  };

  rabbit.postData(queueName, data)
    .then(() => res.send(JSON.stringify(data)))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

router.route('/posts')
  .get(handlerGet());

router.route('/post')
  .post(/* validate(twittSchema) */ handlerPost());

module.exports = router;
