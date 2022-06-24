const express = require('express');
const router = express.Router();

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
  force: true,
})
const eventEmitter = new EventEmitter();
router.route('/posts')
.get(async function(req, res) {
  let timer = null;
  res.setHeader('Content-Type', 'application/stream+json');
  res.setHeader('Transfer-Encoding', 'chunked');
  const stream = Twitt.findAllWithStream();
  
  stream.pipe(res);
  const id = Date.now().toString();
   const handler = function(event) {
      clearTimeout(timer);
      console.log('event', event);
      res.status(201);
      res.end( JSON.stringify(event));
   };

   eventEmitter.register(id, handler);
   timer = setTimeout(function(){ 
      console.log('timeout');
      const wasUnregistered = eventEmitter.unregister(id);
      console.log("wasUnregistered", wasUnregistered);
      if (wasUnregistered){
         res.status(200);
         res.end();
      }
   }, 5000);
  
  
  
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
