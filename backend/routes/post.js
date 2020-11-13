/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const express = require('express');
const Post = require('../models/Post');
const Forum = require('../models/Forum');
const Users = require('../models/Users');
const Vote = require('../models/Vote');

const postRouter = express.Router();

/** Get a post given a particular ID */
postRouter.get('/:id', (req, res) => {
  if (!req.params.id || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({ error: 'invalid post id' });
  }
  // This populates the child references (comments) with its data such as the comment text
  Post.findById(req.params.id)
    .populate({
      path: '_comments',
      model: 'Comment',
      select: {
        _id: 1, text: 1, votes: 1, createdAt: 1,
      },
      populate: { path: '_commenter', model: 'Users', select: { _id: 1, username: 1 } },
    })
    .populate({ path: '_poster', model: 'Users', select: { _id: 1, username: 1 } })
    .populate({
      path: '_forum',
      model: 'Forum',
      select: {
        _id: 1, name: 1, description: 1, is_sub: 1,
      },
    })
    .then((post) => {
      if (post == null) {
        return res.status(404).send({ error: 'post does not exist' });
      }
      // If user is authenticated, identify if the user has voted on the post or any of the comments
      if (req.user) {
        const postObj = post.toObject();
        Vote.findOne({ _post: post._id, _voter: req.user.id })
          .then((votePost) => {
            if (votePost == null) {
              postObj.userVote = 0;
            } else {
              postObj.userVote = votePost.dir;
            }
            const comments = postObj._comments;
            const promises = comments
              .map((comment) => Vote.findOne({ _comment: comment._id, _voter: req.user.id })
                .then((voteComment) => {
                  if (voteComment == null) {
                    comment.userVote = 0;
                  } else {
                    comment.userVote = voteComment.dir;
                  }
                  return comment;
                }));
            Promise.all(promises).then((commentsWithVote) => {
              postObj._comments = commentsWithVote;
              return res.json(postObj);
            }).catch((error) => res.json(error));
          });
      } else {
        return res.json(post);
      }
    })
    .catch((error) => res.json(error));
});

/** Creates a post */
postRouter.post('/', (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: 'unauthorized user' });
  }
  // Test if parent forum ID is given if it is a sub forum
  if (!req.query.forum_id) {
    return res.status(400).send({ error: 'forum not given' });
  }
  // Test if forum ID is a valid Mongoose Object ID
  if (!req.query.forum_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({ error: 'invalid forum id' });
  }
  // check if user is part of forum
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    votes: 0,
    _poster: req.user.id,
    _comments: [],
    _forum: req.query.forum_id,
  });
  post.save((err, savedPost) => {
    if (err) {
      console.log(err);
      if (err.name === 'ValidationError') {
        return res.status(422).send({ error: 'Title required' });
      }
      return res.status(500);
      // return res.send(err);
    }
    Forum.findByIdAndUpdate(req.query.forum_id,
      { $push: { _posts: { $each: [savedPost._id], $position: 0 } } },
      { new: true })
      .then((forum) => {
        if (forum == null) {
          return res.status(400).send({ error: 'Forum does not exist' });
        }
        Users.findByIdAndUpdate(req.user.id,
          { $push: { _posts: { $each: [savedPost._id], $position: 0 } } },
          { new: true })
          .then(() => {
            console.log(savedPost);
            res.json(savedPost);
          });
      });
  });
});

/** Edit a post given a particular ID */
postRouter.put('/:id', (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: 'unauthorized user' });
  }
  if (!req.params.id || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({ error: 'invalid post id' });
  }
  Post.findById(req.params.id).then((post) => {
    if (post == null) {
      return res.status(400).send({ error: 'post does not exist' });
    }
    if (post._poster.toString().localeCompare(req.user.id.toString()) === 0) {
      Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((updatedPost) => res.json(updatedPost))
        .catch((err) => res.send(err));
    } else {
      res.status(401).send({ error: 'current user not the poster, hence not allowed to edit. ' });
    }
  });
});

/** Delete a post given a particular ID */
postRouter.delete('/:id', (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: 'unauthorized user' });
  }
  if (!req.params.id || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({ error: 'invalid post id' });
  }
  console.log('Delete post!');
  Post.findById(req.params.id).then((post) => {
    if (post == null) {
      return res.status(400).send({ error: 'post does not exist' });
    }
    if (post._poster.toString().localeCompare(req.user.id.toString()) === 0) {
      Post.findByIdAndDelete(req.params.id)
        .then((removedPost) => res.json(removedPost))
        .catch((err) => res.send(err));
    } else {
      res.status(401).send({ error: 'current user not the poster, hence not allowed to delete. ' });
    }
  });
});

module.exports = postRouter;
