const express = require('express');
const Post = require('../models/Post');
const Forum = require('../models/Forum');
const Util = require('../util/util');

const searchRouter = express.Router();

/**  get post(s) based on search keywords post info */
searchRouter.get('/post', (req, res) => {
  const str = new RegExp(`.*${req.query.postKeyword}.*`, 'i');
  Post.find({
    $or: [
      { title: str },
      { description: str },
    ],
  }).populate([{ path: '_poster', model: 'Users', select: { _id: 1, username: 1 } },
    { path: '_forum', model: 'Forum', select: { _id: 1, name: 1, is_sub: 1 } }])
    .then((posts) => {
      if (req.user) {
        Util.getPostsVoteInfo(posts, req.user.id, (postsWithVote) => {
          res.json(postsWithVote);
        });
      } else {
        res.json(posts);
      }
    }).catch((err) => res.send(err));
});

/** get forum(s) based on search keywords forum info */
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
