const express = require('express');
const router = express.Router();
const Twitt = require('../models/twitt');

const { twittSchema } = require('../models/validator/validatorSchema');
const { validate } = require('../services/validate');
const { sendToQueue } = require('../services/rabbitmq/send');

const hendlerGet = () => {
  return (req, res, next) => {
    res.setHeader('Content-Type', 'application/stream+json');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Connection', 'keep-alive');
    
    const inputStream = Twitt.findAllWithStream({objectMode: true});
    
    inputStream.on('data', (data) => {
      res.write(data);
    })/* .on('end', () => {
      console.log('end');
    })  */
    
    Twitt.afterCreate(function(twitt) {
      // console.log('afterCreate');
      res.write(JSON.stringify(twitt));
    })
  }
}

/* Twitt.create({
      nickname: nickname,
      text: text,
      createdAt: createdAt
    }).then(function(twitt) {
      res.send(twitt);
    }).catch(function(err) {
      res.send(err);
    }) */

const hendlerPost = () => {
  return (req, res, next) => {
    const data = {nickname: req.body.nickname, text: req.body.text, createdAt: new Date()}
    sendToQueue('twitt', data);
  }
}

router.route('/posts')
.get(hendlerGet())  // GET all posts

router.route('/post')
.post(validate(twittSchema), hendlerPost())  // POST a new post

module.exports = router;
