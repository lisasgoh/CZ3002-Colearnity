/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */

const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

const commentRouter = express.Router();

/** Posts a new comment */
commentRouter.post('/', (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: 'unauthorized user' });
  }
  // Test if parent forum ID is given if it is a sub forum
  if (!req.query.post_id) {
    return res.status(400).send({ error: 'post not given' });
  }
  // Test if forum ID is a valid Mongoose Object ID
  if (!req.query.post_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({ error: 'invalid post id' });
  }
  const comment = new Comment({
    text: req.body.text,
    votes: 0,
    _commenter: req.user.id,
    _post: req.query.post_id,
  });
  comment.save((err, savedComment) => {
    if (err) {
      return res.status(422).send({ error: 'Error while saving comment' });
    }
    Post.findByIdAndUpdate(req.query.post_id,
      { $push: { _comments: { $each: [savedComment._id], $position: 0 } } },
      { new: true })
      .then((post) => {
        if (post == null) {
          return res.status(400).send({ error: 'Post does not exist' });
        }
        res.json(savedComment);
      })
      .catch((error) => res.send(error));
  });
});

/** Edit a comment given a particular ID */
commentRouter.put('/:id', (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: 'unauthorized user' });
  }
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({ error: 'invalid comment id' });
  }
  if (!req.body.text) {
    return res.status(422).send({ error: 'New text required' });
  }
  Comment.findById(req.params.id).then((comment) => {
    if (comment == null) {
      return res.status(400).send({ error: 'comment does not exist' });
    }
    if (comment._commenter.toString().localeCompare(req.user.id.toString()) === 0) {
      Comment.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true })
        .then((updatedComment) => res.json(updatedComment))
        .catch((err) => res.send(err));
    } else {
      res.status(401).send({ error: 'current user not the original commenter, hence not allowed to edit. ' });
    }
  });
});

/** Delete a comment given a particular ID */
commentRouter.delete('/:id', (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: 'unauthorized user' });
  }
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({ error: 'invalid post id' });
  }
  Comment.findById(req.params.id).then((comment) => {
    if (comment == null) {
      return res.status(400).send({ error: 'comment does not exist' });
    }
    if (comment._commenter.toString().localeCompare(req.user.id.toString()) === 0) {
      Comment.findByIdAndDelete(req.params.id)
        .then((deletedComment) => res.json(deletedComment))
        .catch((err) => res.send(err));
    } else {
      res.status(401).send({ error: 'current user not the original commenter, hence not allowed to delete. ' });
    }
  });
});

module.exports = commentRouter;
