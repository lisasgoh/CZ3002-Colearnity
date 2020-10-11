/* eslint-disable no-underscore-dangle */
const express = require('express');
const Forum = require('../models/Forum');
const Users = require('../models/Users');

const forumRouter = express.Router();

// create new forum
// add to users
// TODO: add to users if teacher
forumRouter.post('/', (req, res) => {
  // console.log("HI");
  console.log(req.user);
  console.log(req.isAuthenticated());
  const forum = new Forum({
    name: req.body.name,
    description: req.body.description,
    _teacher: req.user.id,
    is_sub: req.body.is_sub,
  });
  forum
    .save()
    .then(() => {
      res.json(forum);
    })
    .catch((err) => {
      res.send(err);
    });
});

// TODO : Subscribe to forum
forumRouter.post('/:id', (req, res) => {
  console.log('HI');
  console.log(req.user);
  console.log(req.isAuthenticated());
  Users.findById(req.user.id)
    .then((user) => {
      user._forums.unshift(req.params.id);
      return user.save();
    })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.send(err);
    });
});

// get forum details todo -> populate fields --> consider sorting
forumRouter.get('/:id', (req, res) => {
  Forum.findById(req.params.id)
    .populate({ path: '_teacher', model: 'Users', select: { _id: 1, username: 1 } })
    .populate({ path: '_subforums', model: 'Forum' })
    .populate({ path: '_quizzes', model: 'Quiz' })
    .populate({
      path: '_posts',
      model: 'Post',
      select: {
        title: 1, votes: 1, _poster: 1, description: 1, tags: 1,
      },
      populate: { path: '_poster', model: 'Users', select: { _id: 1, username: 1 } },
    })
    .then((forum) => res.json(forum))
    .catch((err) => res.send(err));
});

// get all forums (for testing)
forumRouter.get('/', (req, res) => {
  Forum.find()
    .populate({ path: '_teacher', model: 'Users', select: { _id: 1, username: 1 } })
    .populate({ path: '_subforums', model: 'Forum' })
    .populate({ path: '_quizzes', model: 'Quiz' })
    .populate({ path: '_posts', model: 'Post', select: { title: 1, votes: 1, _poster: 1 } })
    .then((forum) => res.json(forum))
    .catch((err) => res.send(err));
});

// change forum details todo
forumRouter.put('/:id', (req, res) => {
  Forum.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedForum) => {
      res.json(updatedForum);
    })
    .catch((error) => res.send(error));
});

// delete forum
// delete all posts
// delete from users (cascade delete)
forumRouter.delete('/:id', (req, res) => {
  Forum.findByIdAndRemove(req.params.id).then(() => {
    Users.update(
      {},
      { $pull: { _forums: { _id: this.id } } },
      { multi: true },
      (err) => {
        if (err) res.send(err);
        else res.send('Success: Forum Deleted');
      },
    );
  }).catch((err) => res.send(err));
});

module.exports = forumRouter;
