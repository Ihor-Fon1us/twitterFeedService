const express = require('express');
const router = express.Router();
const Twitt = require('../models/twitt');

const { twittSchema } = require('../models/validator/validatorSchema');
const { validate } = require('../services/validate');
const RABBITMQ = require('../services/rabbitmq/index');

const hendlerGet = () => {
  return (req, res, next) => {
    res.setHeader('Content-Type', 'application/stream+json');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Connection', 'keep-alive');
    
    const inputStream = Twitt.findAllWithStream({objectMode: true});
    
    inputStream.on('data', (data) => {
      res.write(data);
    });
    
    Twitt.afterCreate(function(twitt) {
      res.write(JSON.stringify(twitt));
    });
  }
}

const hendlerPost = () => {
  return (req, res, next) => {
    const data = {
      nickname: req.body.nickname, 
      text: req.body.text, 
      createdAt: new Date()
    }
    
    RABBITMQ.postData(data)
    .then(res.send(JSON.stringify(data)));
  }
}

router.route('/posts')
.get(hendlerGet())

router.route('/post')
.post(validate(twittSchema), hendlerPost())

module.exports = router;
