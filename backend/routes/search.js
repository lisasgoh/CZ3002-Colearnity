const express = require('express');
const Post = require('../models/Post');
const Forum = require('../models/Forum');

const searchRouter = express.Router();

// get post(s) based on search keywords post info - /api/search?postKeyWord=(words)
searchRouter.get('/', (req, res) => {
  // console.log("search for keyword(s) received: " +req.query.postKeyword);
  const str = new RegExp(`.*${req.query.postKeyword}.*`, 'i');
  Post.find({
    $or: [
      { title: str },
      { description: str },
    ],
  }, (err, post) => {
    if (err) {
      res.send(err);
    } else { res.json(post); }
  });
});

// get post(s) based on search keywords post info - /api/search?forumKeyword=(words)
searchRouter.get('/', (req, res) => {
  const str = new RegExp(`.*${req.query.forumKeyword}.*`, 'i');
  Forum.find({
    $or: [
      { name: str },
      { description: str },
    ],
  }, (err, post) => {
    if (err) {
      res.send(err);
    } else { res.json(post); }
  });
});

module.exports = searchRouter;
