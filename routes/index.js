const express = require('express');
const router = express.Router();
const knex = require('knex');

const config = {
  client: "cockroachdb",
  connection: process.env.DATABASE_URL || "postgresql://root@localhost:26257/defaultdb?sslmode=disable",
  migrations: {
    directory: "./models",
  },
}
const client = knex(config);
router.route('/posts')
.get(function(req, res) {
  const stream = client.select('*')
  .from('twitt')
  .stream();
  stream.pipe(res);
  
})  // GET all posts

router.route('/post')
.post(function(req, res) {

  nickname = req.body.nickname;
  text = req.body.text;
  createdAt = new Date();
  client.insert({
    nickname: nickname,
    text: text,
    createdAt: createdAt
  }).into('twitt')
  .then(res.send('Submitted Successfully!<br /> Nickname:  ' + nickname + '<br />Text:  ' + text + '<br />Date:  ' + createdAt))
  
     

  
})  // POST a new post

module.exports = router;
