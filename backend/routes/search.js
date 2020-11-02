const express = require('express');
const Post = require('../models/Post');
const Forum = require('../models/Forum');
const Util = require('../util/util');

const searchRouter = express.Router();

// get post(s) based on search keywords post info - /api/search?postKeyWord=(words)
searchRouter.get('/post', (req, res) => {
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
    } else if (req.user) {
      Util.getPostsVoteInfo([post], req.user.id, (postWithVote) => {
        res.json(postWithVote);
      });
    } else {
      res.json(post);
    }
  });
});

// get forum(s) based on search keywords forum info - /api/search?forumKeyword=(words)
searchRouter.get('/forum', (req, res) => {
  const str = new RegExp(`.*${req.query.forumKeyword}.*`, 'i');
  Forum.find({
    $or: [
      { name: str },
      { description: str },
    ],
  }, (err, forum) => {
    if (err) {
      res.send(err);
    } else { res.json(forum); }
  });
});

module.exports = searchRouter;
