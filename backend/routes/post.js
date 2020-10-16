/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const Post = require('../models/Post');
const Forum = require('../models/Forum');
const Users = require('../models/Users');

const postRouter = express.Router();

// get individual post info
postRouter.get('/:id', (req, res) => {
  console.log('HERE');
  console.log(req.params.id);
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
    .then((post) => {
      res.json(post);
    })
    .catch((error) => res.json(error));
});

// get all posts (for testing)
postRouter.get('/', (req, res) => {
  Post.find({}).then((posts) => res.json(posts));
});

// create post
// TODO: add to forum & user db
postRouter.post('/', (req, res) => {
  console.log('FDSFSDFDSfSD');
  console.log(req.body);
  console.log(req.query);
  console.log(req.user);
  const temp = '5f7f525d56b9835b245e8aaf';
  // check if user is part of forum
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    votes: 0,
    _poster: temp, // req.user.id
    _comments: [],
    _forum: req.query.forum_id,
  });
  console.log('DFDSFSdsdsddDFDSFDS');
  post
    .save()
    .then(() => Forum.findById(req.query.forum_id)
      .then((forum) => {
        console.log('DFDSFSDFDSFDS');
        forum._posts.unshift(post);
        console.log(forum);
        return forum.save();
      }).then(() => Users.findById(req.user.id).then((user) => {
        user._posts.unshift(post);
        console.log(user);
        return user.save();
      }))
      .then((user) => res.json(user))
      .catch((error) => res.json(error)));
});

postRouter.post('/', (req, res) => {
  const { body } = req;
  // check if user is part of forum
  const post = new Post({
    title: body.title,
    description: body.description,
    votes: 0,
    _poster: req.user.id,
    _comments: [],
    _forum: req.query.forum_id,
  });
  post
    .save()
    .then(() => Forum.findById(req.query.forum_id)
      .then((forum) => {
        forum._posts.unshift(post);
        console.log(forum);
        return forum.save();
      }).then(() => Users.findById(req.user.id).then((user) => {
        user._posts.unshift(post);
        console.log(user);
        return user.save();
      }).then((user) => res.json(user))
        .catch((error) => res.json(error))));
});

// update post title/description
postRouter.put('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then((updatedPost) => {
      res.json(updatedPost);
    })
    .catch((error) => res.json(error));
});

// delete post
// delete post from forum
// delete post from user
postRouter.delete('/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id).then((post) => {
    Forum.findByIdAndUpdate(
      req.query.forum_id,
      { $pull: { _posts: { _id: req.params.id } } },
    ).then(() => {
      Users.findByIdAndUpdate(
        req.user.id,
        { $pull: { _posts: { _id: req.params.id } } },
      )
        .then((deletedPost) => {
          res.send('Success: Post Deleted');
        })
        .catch((err) => res.json(err));
    }).catch((err) => res.json(err));
  }).catch((err) => res.json(err));
});

module.exports = postRouter;
