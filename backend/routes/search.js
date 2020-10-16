const express = require('express');
const Post = require('../models/Post');

const searchRouter = express.Router();

// get post(s) based on search keywords post info - /api/search?searchString=(words)
searchRouter.get('/', (req, res) => {
  // console.log("search for keyword(s) received: " +req.query.searchString);
  const str = new RegExp(`.*${req.query.searchString}.*`, 'i');
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

module.exports = searchRouter;
