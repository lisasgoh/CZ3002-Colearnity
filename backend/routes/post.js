var Comment = require("../models/Comment");
var Post = require("../models/Post");

var express = require("express");
var postRouter = express.Router();

// get individual post info
postRouter.get("/:id", (req, res) => {
  Post.findById(
    req.params.id.populate("_comments").populate("_poster", "username"),
    function (err, post) {
      if (err) res.send(err);
      else {
        res.json(post);
      }
    }
  );
});

// create post
// TODO: add to forum & user db
postRouter.post("/", (req, res) => {
  const body = req.body;
  // check if user is part of forum
  const post = new Post({
    title: body.title,
    description: body.description,
    votes: 0,
    _poster: req.user._id,
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
  Post.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then((updatedPost) => {
      res.json(updatedPost);
    })
    .catch((error) => next(error));
});

//delete post
// delete post from forum
// delete post from user
postRouter.delete("/:id", (req, res) => {
  Post.findByIdAndRemove(req.params.id).then((post) => {
    if (err) res.send(err);
    else {
      Forum.findByIdAndUpdate(
        req.query.forum_id,
        { $pull: { posts: { _id: req.params.id } } },
        function (err) {
          if (err) res.send(err);
          else {
            Users.findByIdAndUpdate(
              req.user._id,
              { $pull: { _posts: { _id: req.params.id } } },
              { multi: true },
              function (err) {
                if (err) res.send(err);
                else res.send("Success: Post Deleted");
              }
            );
          }
        }
      );
    }
  });
});

module.exports = postRouter;
