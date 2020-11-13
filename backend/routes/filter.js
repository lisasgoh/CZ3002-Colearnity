/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const Post = require('../models/Post');
const Forum = require('../models/Forum');

const filterRouter = express.Router();

// get post(s) based on filter keywords post info - /api/filter?filter=(words)
filterRouter.get('/', (req, res) => {
  const { filter } = req.query;

  // get forum id from forum name
  Forum.find({
    name: filter,
  }, (err, result) => {
    if (err) res.send(err);
    else {
      Post.find({
        _forum: result[0]._id,
      }, (err, post) => {
        if (err) res.send(err);
        else res.json(post);
      });
    }
  });
});

module.exports = filterRouter;
