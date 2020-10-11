/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const Users = require('../models/Users');

const commentRouter = express.Router();

// get comment by id
commentRouter.get('/:id', (req, res) => {
  Comment.findById(req.params.comment_id, (err, comment) => {
    if (err) res.send(err);
    else res.json(comment);
  });
});

// get all comments (test)
commentRouter.get('/', (req, res) => {
  Comment.find({}).then((comments) => res.json(comments));
});

// create new comment
commentRouter.post('/', (req, res) => {
  const comment = new Comment({
    text: req.body.text,
    votes: 0,
    _commenter: req.user.id,
    _post: req.query.post_id,
  });
  console.log(comment);
  comment
    .save()
    .then(() => Post.findById(req.query.post_id))
    .then((post) => {
      post._comments.unshift(comment);
      return post.save();
    })
    .then((post) => {
      // res.redirect(`/`);
      console.log(comment);
      res.json(post);
    })
    .catch((err) => {
      res.send(err);
    });
});

// update comment text
commentRouter.put('/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, {
    text: req.body.text,
  })
    .then((updatedComment) => {
      res.json(updatedComment);
    })
    .catch((error) => res.send(error));
});

// delete comment
// delete from users???? TODO REMOVE
// delete from posts
commentRouter.delete('/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id).then((comment) => {
    Post.findByIdAndUpdate(
      req.query.post_id,
      { $pull: { comments: { _id: req.params.id } } },
    )
      .then((post) => {
        Users.findByIdAndUpdate(
          req.user.id,
          { $pull: { _comments: { _id: req.params.id } } },
        )
          .then((user) => {
            res.send('Success: Comment Deleted');
          })
          .catch((err) => res.send(err));
      }).catch((err) => res.send(err));
  }).catch((err) => res.send(err));
});

module.exports = commentRouter;
