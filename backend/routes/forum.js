/* eslint-disable consistent-return */
/* eslint-disable no-console */
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
  // Test if user is authorised
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
  console.log(forum);
  if (req.body.is_sub === true) { // add parent forum id and subforums list
    console.log('IS SUBFORUM');
    Forum.findById(req.query.forum_id).then((parentForum) => {
      if (parentForum == null) {
        return res.status(400).send({ error: 'parent forum does not exist' });
      } if (parentForum.is_sub === true) {
        console.log('HEREERERE parent forumi s sub');
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
    /*
    forum.save().then((savedForum) => {
      console.log(savedForum);
      Forum.findByIdAndUpdate(req.query.forum_id,
        { $push: { _subforums: savedForum._id } })
        .then((parentForum) => {
          console.log(parentForum);
          res.json(savedForum);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send(err);
        });
    }); */
  } else {
    console.log(forum);
    forum.save((err, savedForum) => {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          return res.status(422).send({ error: 'Forum already exists' });
        }
      } else {
        console.log('herer successfully save');
        Users.findByIdAndUpdate(req.user.id,
          { $push: { _created_forums: savedForum._id } })
          .then(() => {
            res.json(savedForum);
          });
      }
    });
  }
});

// TODO : un/Subscribe to forum
// Only can sub to main forum, not sub forum
forumRouter.post('/:id', (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: 'unauthorized user' });
  }
  Forum.findById(req.params.id).then((forum) => {
    if (forum.is_sub === true) {
      res.status(400).send({ error: 'Only main forum can be subscribed to. ' });
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
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
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
        }).then((savedForum) => {
          console.log(savedForum);
          const forumPosts = savedForum._posts;
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
            savedForum._posts = forumPostsWithVote;
            console.log(`Final forum${JSON.stringify(savedForum, null, 1)}`);
            res.json(savedForum);
          });
        }).catch((err) => res.send(err));
      } else {
        res.json(forum);
      }
    })
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
