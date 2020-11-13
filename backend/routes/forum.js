/* eslint-disable consistent-return */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const mongoose = require('mongoose');
const Forum = require('../models/Forum');
const Users = require('../models/Users');
const QuizAttempt = require('../models/QuizAttempt');
const Util = require('../util/util');

const forumRouter = express.Router();

/** Create new forum */
forumRouter.post('/', (req, res) => {
  // Test if user is authorized
  if (!req.user || (req.user && req.user.is_student)) {
    return res.status(401).send({ error: 'unauthorized user' });
  }
  // Test if required fields are given
  if (!req.body.name || !req.body.description || !req.body.hasOwnProperty('is_sub')) {
    return res.status(400).send({ error: 'invalid form submission' });
  }
  // Test if parent forum ID is given if it is a sub forum
  if (req.body.is_sub === true && !req.query.forum_id) {
    return res.status(400).send({ error: 'parent forum not given' });
  }
  // Test if forum ID is a valid Mongoose Object ID
  if (req.body.is_sub === true && !req.query.forum_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({ error: 'invalid forum id' });
  }
  const forum = new Forum({
    name: req.body.name,
    description: req.body.description,
    _teacher: req.user.id,
    is_sub: req.body.is_sub,
    _parentforum: req.query.forum_id,
  });
  if (req.body.is_sub === true) { // add parent forum id and subforums list
    Forum.findById(req.query.forum_id).then((parentForum) => {
      if (parentForum == null) {
        return res.status(400).send({ error: 'parent forum does not exist' });
      } if (parentForum.is_sub === true) {
        return res.status(400).send({ error: 'parent forum is not a main forum' });
      }
      forum.save((err, savedForum) => {
        if (err) {
          if (err.name === 'MongoError' && err.code === 11000) {
            return res.status(422).send({ error: 'Forum already exists' });
          }
        } else {
          parentForum._subforums.push(savedForum._id);
          parentForum.save();
          res.json(savedForum);
        }
      });
    });
  } else {
    forum.save((err, savedForum) => {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          return res.status(422).send({ error: 'Forum already exists' });
        }
      } else {
        Users.findByIdAndUpdate(req.user.id,
          { $push: { _created_forums: savedForum._id } })
          .then(() => {
            res.json(savedForum);
          });
      }
    });
  }
});

/** Subscribe to forum */
forumRouter.post('/:id', (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: 'unauthorized user' });
  }
  if (!req.params.id || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({ error: 'invalid forum id' });
  }
  Forum.findById(req.params.id).then((forum) => {
    if (forum == null) {
      return res.status(400).send({ error: 'forum does not exist' });
    } if (forum.is_sub === true) {
      return res.status(400).send({ error: 'Cannot subscribe to sub forum' });
    }
    Users.findById(req.user.id)
      .then((user) => {
        if (user._forums.includes(req.params.id)) {
          user._forums.remove(req.params.id);
        } else {
          user._forums.unshift(req.params.id);
        }
        return user.save();
      })
      .then(() => res.send({ success: 'Success: User has successfully subscribed / unsubscribed' }))
      .catch((err) => res.send(err));
  });
});

/** Get forum details */
forumRouter.get('/:id', (req, res) => {
  if (!req.params.id || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({ error: 'invalid forum id' });
  }
  Forum.findById(req.params.id)
    .populate({ path: '_teacher', model: 'Users', select: { _id: 1, username: 1 } })
    .populate({ path: '_subforums', model: 'Forum', select: { _id: 1, name: 1 } })
    .populate({ path: '_quizzes', model: 'Quiz', select: { _id: 1, title: 1 } })
    .populate({
      path: '_posts',
      model: 'Post',
      select: {
        title: 1, votes: 1, _poster: 1, description: 1, tags: 1, _comments: 1,
      },
      populate: { path: '_poster', model: 'Users', select: { _id: 1, username: 1 } },
    })
    .then((forum) => {
      if (forum == null) {
        return res.status(404).send({ error: 'forum does not exist' });
      }
      if (req.user) {
        const forumPosts = forum._posts;
        // Gets whether the user voted on the posts in the forum
        Util.getPostsVoteInfo(forumPosts, req.user.id, (postsWithVotes) => {
          const forumObj = forum.toObject();
          forumObj._posts = postsWithVotes;
          if (forum.is_sub === false) {
            // Check whether user is subscribed to the forum
            forumObj.isSubscribed = false;
            Users.findById(req.user.id).then((user) => {
              if (user._forums.includes(req.params.id)) {
                forumObj.isSubscribed = true;
              }
              res.json(forumObj);
            }).catch((err) => res.send(err));
          } else {
            QuizAttempt.aggregate(
              [
                {
                  $match: {
                    $and:
                    [
                      { _user: new mongoose.Types.ObjectId(req.user.id) },
                      { _quiz: { $in: forum._quizzes } }],
                  },
                },
                { $sort: { _user: 1, createdAt: 1 } },
                {
                  $group: {
                    _id: '$_quiz',
                    quizAttemptId: { $first: '$_id' },
                    createdAt: { $first: '$createdAt' },
                  },
                },
              ],
            ).then((quizAttemptIds) => {
              const quizAttemptIdArray = quizAttemptIds
                .map((obj) => new mongoose.Types.ObjectId(obj.quizAttemptId));
              // Gets the user's quiz attempts in that sub forum
              QuizAttempt.find({ _id: { $in: quizAttemptIdArray } })
                .populate({ path: '_quiz', model: 'Quiz', select: { _id: 1, title: 1 } })
                .then((quizAttempts) => {
                  forumObj.quizAttempts = quizAttempts;
                  res.json(forumObj);
                }).catch((err) => res.send(err));
            });
          }
        });
      } else {
        return res.json(forum);
      }
    });
});

/** Delete forum given an ID  */
forumRouter.delete('/:id', (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: 'unauthorized user' });
  }
  if (!req.params.id || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({ error: 'invalid post id' });
  }
  Forum.findByIdAndRemove(req.params.id).then((forum) => {
    if (forum == null) {
      return res.status(400).send({ error: 'forum does not exist' });
    }
    Users.update(
      {},
      {
        $pull: {
          _forums: { _id: req.params.id },
          _created_forums: { _id: req.params.id },
        },
      },
      { multi: true },
      (err) => {
        if (err) res.send(err);
        else res.send('Success: Forum Deleted');
      },
    );
  }).catch((err) => res.send(err));
});

module.exports = forumRouter;
