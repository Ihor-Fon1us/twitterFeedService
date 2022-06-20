const express = require('express');
const router = express.Router();


router.route('/posts')
.get(function(req, res) {
  res.send('respond with a resource');
})  // GET all posts

router.route('/post')
.post(function(req, res) {
  res.send('respond with a resource');
})  // POST a new post

module.exports = router;
