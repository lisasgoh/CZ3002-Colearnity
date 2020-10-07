var Comment = require("../models/Comment");
var Post = require("../models/Post");

var express = require("express");
var commentRouter = express.Router();

//get comment by id
commentRouter.get("/:id", (req, res) => {
  Comment.findById(req.params.comment_id, function (err, comment) {
    if (err) res.send(err);
    else res.json(comment);
  });
});

// get all comments (test)
commentRouter.get("/", (req, res) => {
  Comment.find({}).then((comments) => res.json(comments));
});

// create new comment
commentRouter.post("/", (req, res) => {
  const comment = new Comment({
    text: req.body.text,
    votes: 0,
    _commenter: req.query.user_id,
    _post: req.query.post_id,
  });
  comment
    .save()
    .then((comment) => {
      return Post.findById(req.query.post_id);
    })
    .then((post) => {
      post.comments.unshift(comment);
      return post.save();
    })
    .then((post) => {
      res.redirect(`/`); //res.json(post)
    })
    .catch((err) => {
      res.send(err);
    });
});

// update comment text
commentRouter.put("/:id", (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, {
    text: req.body.text,
  })
    .then((updatedComment) => {
      res.json(updatedComment);
    })
    .catch((error) => next(error));
});

// update comment votes
commentRouter.put("/votes/:id", (req, res) => {
  Comment.findOneAndUpdate(req.params.comment_id, { $inc: { votes: 1 } })
    .then((updatedComment) => {
      res.json(updatedComment);
    })
    .catch((error) => next(error));
});

//delete comment
commentRouter.delete("/:id", (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id).then((comment) => {
    if (err) res.send(err);
    else {
      Post.findByIdAndUpdate(
        req.params.post_id,
        { $pull: { comments: { _id: req.params.comment_id } } },
        function (err) {
          if (err) res.send(err);
          else res.send("Success: Comment Deleted");
        }
      );
    }
  });
});

module.exports = commentRouter;
