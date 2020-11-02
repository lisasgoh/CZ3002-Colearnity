/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const Forum = require('../models/Forum');
const Users = require('../models/Users');
const Vote = require('../models/Vote');

const forumRouter = express.Router();

// create new forum
// add to users
// TODO: add to users if teacher
// if req.query.forum is valid id
forumRouter.post('/', (req, res) => {
  // console.log("HI");
  // console.log(req.user);
  console.log(req.isAuthenticated());
  console.log(req.body);
  const forum = new Forum({
    name: req.body.name,
    description: req.body.description,
    _teacher: req.user.id,
    is_sub: req.body.is_sub,
    _parentforum: req.query.forum_id,
  });
  console.log(forum);
  if (req.body.is_sub === true) { // add parent forum id and subforums list
    console.log('IS SUBFORUM');
    forum.save().then((forum) => {
      console.log(forum);
      Forum.findByIdAndUpdate(req.query.forum_id,
        { $push: { _subforums: forum._id } })
        .then((parentForum) => {
          console.log(parentForum);
          Users.findByIdAndUpdate(req.user.id,
            { $push: { _created_forums: forum._id } })
            .then((user) => {
              console.log(user);
              res.json(forum);
            });
          res.json(forum);
        })
        .catch((err) => res.send(err));
    });
  } else {
    console.log(forum);
    forum.save().then((forum) => {
      Users.findByIdAndUpdate(req.user.id,
        { $push: { _created_forums: forum._id } })
        .then((user) => {
          console.log(user);
          res.json(forum);
        });
    })
      .catch((err) => res.send(err));
  }
});

// TODO : un/Subscribe to forum
// Only can sub to main forum, not sub forum
forumRouter.post('/:id', (req, res) => {
  console.log('HI');
  // console.log(req.user);
  console.log(req.isAuthenticated());
  Forum.findById(req.params.id).then((forum) => {
    if (forum.is_sub === true) {
      res.status(401);
    }
  }).then(() => {
    Users.findById(req.user.id)
      .then((user) => {
        if (user._forums.includes(req.params.id)) {
          user._forums.remove(req.params.id);
        } else {
          user._forums.unshift(req.params.id);
        }
        return user.save();
      })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.send(err);
      });
  });
});

// get forum details todo -> populate fields --> consider sorting
forumRouter.get('/:id', (req, res) => {
  Forum.findById(req.params.id)
    .populate({ path: '_teacher', model: 'Users', select: { _id: 1, username: 1 } })
    .populate({ path: '_subforums', model: 'Forum', select: { _id: 1, name: 1 } })
    .populate({ path: '_quizzes', model: 'Quiz', select: { _id: 1, title: 1 } })
    .populate({
      path: '_posts',
      model: 'Post',
      select: {
        title: 1, votes: 1, _poster: 1, description: 1, tags: 1,
      },
      populate: { path: '_poster', model: 'Users', select: { _id: 1, username: 1 } },
    })
    .then((forum) => {
      if (req.user) {
        forum = forum.toObject();
        forum.isSubscribed = false;
        Users.findById(req.user.id).then((user) => {
          console.log(user._forums);
          console.log(req.params.id);
          if (user._forums.includes(req.params.id)) {
            console.log('is subscribed');
            forum.isSubscribed = true;
            return forum;
          }
          return forum;
        }).then((forum) => {
          console.log(forum);
          const forumPosts = forum._posts;
          const promises = forumPosts.map((post) => {
            console.log(post._id);
            console.log(req.user.id);
            return Vote.findOne({ _post: post._id, _voter: req.user.id })
              .then((vote) => {
                console.log(vote);
                if (vote == null) {
                  post.userVote = 0;
                } else {
                  post.userVote = vote.dir;
                }
                console.log(post);
                return post;
              });
          });
          Promise.all(promises).then((forumPostsWithVote) => {
            console.log(`votesss${JSON.stringify(forumPostsWithVote)}`);
            forum._posts = forumPostsWithVote;
            console.log(`Final forum${JSON.stringify(forum, null, 1)}`);
            res.json(forum);
          });
        }).catch((err) => res.send(err));
      } else {
        res.json(forum);
      }
    })
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
// delete from users (cascade delete) (parent references -> )
forumRouter.delete('/:id', (req, res) => {
  Forum.findByIdAndRemove(req.params.id).then(() => {
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
