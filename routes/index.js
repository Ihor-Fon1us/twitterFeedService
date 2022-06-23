const express = require('express');
const router = express.Router();

//connection: process.env.DATABASE_URL || "postgresql://root@localhost:26257/defaultdb?sslmode=disable"



router.route('/posts')
.get(function(req, res) {
  
  stream.pipe(res);
  
})  // GET all posts

router.route('/post')
.post(function(req, res) {

  nickname = req.body.nickname;
  text = req.body.text;
  createdAt = new Date();
  
  res.send('Submitted Successfully!<br /> Nickname:  ' + nickname + '<br />Text:  ' + text + '<br />Date:  ' + createdAt)
  
     

  
})  // POST a new post

module.exports = router;
