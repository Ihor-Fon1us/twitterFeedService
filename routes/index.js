const express = require('express');
const router = express.Router();

const Twitt = require('../model/twitt');

Twitt.sync({
  force: false,
})


router.route('/posts')
.get(async function(req, res) {
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
})  // GET all posts

router.route('/post')
.post(function(req, res) {
  nickname = req.body.nickname;
  text = req.body.text;
  Twitt.create({
    nickname: nickname,
    text: text,
  }).then(function(twitt) {
    res.send(twitt);
  }).catch(function(err) {
    res.send(err);
  })
  
})  // POST a new post

module.exports = router;
