var Comment = require("../models/Comment");
var Post = require("../models/Post");

var express = require("express");
var postRouter = express.Router();

// get individual post info
postRouter.get("/:id", (req, res) => {
  Post.findById(
    req.params.post_id.populate("_comments").populate("_poster", "username"),
    function (err, post) {
      if (err) res.send(err);
      else {
        res.json(post);
      }
    }
  );
});

// create post
postRouter.post("/", (req, res) => {
  const body = req.body;
  console.log(req.query);
  console.log(req.body);
  const post = new Post({
    title: body.title,
    description: body.description,
    votes: 0,
    _poster: req.query.user._id,
    _comments: [],
    _forum: req.query.forum_id,
  });
  post
    .save()
    .then((savedPost) => {
      res.json(savedPost);
    })
    .catch((error) => res.json(error));
});

//update post title/description
postRouter.put("/:id", (req, res) => {
  Post.findByIdAndUpdate(req.params.post_id, { $set: req.body })
    .then((updatedPost) => {
      res.json(updatedPost);
    })
    .catch((error) => next(error));
});

//delete post
module.exports = postRouter;
