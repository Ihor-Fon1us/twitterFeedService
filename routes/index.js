const express = require('express');
const router = express.Router();
const stream = require('stream');

const Sequelize = require('sequelize-cockroachdb');
const sequelizeStream = require('node-sequelize-stream');
const sequelize = new Sequelize('postgresql://root@localhost:26257/defaultdb?sslmode=disable');
const EventEmitter = require('../event');

const Twitt = sequelize.define("Twitt", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: {
    type: Sequelize.STRING,
  },
  text: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

sequelizeStream(sequelize);


Twitt.sync({
  force: false,
})
const eventEmitter = new EventEmitter();
router.route('/posts')
.get(async function(req, res) {
  
  res.setHeader('Content-Type', 'application/stream+json');
  //res.setHeader('Transfer-Encoding', 'chunked');
  res.setHeader('Connection', 'keep-alive');
  
  const inputStream = Twitt.findAllWithStream({objectMode: true});
  
  inputStream.on('data', (data) => {
    res.write(data);
  }).on('end', () => {
    console.log('end');
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
  Twitt.afterCreate(function(twitt) {
    eventEmitter.fire('newTwitt', twitt);
  })
})  // POST a new post

module.exports = router;
