/* eslint-disable no-param-reassign */
const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

const Vote = require('../models/Vote');

const votesRouter = express.Router();

// get info of vote
votesRouter.get('/:id', (req, res) => {
  Vote.findById(req.params.id).then((vote) => {
    res.json(vote);
  }).catch((err) => res.json(err));
});

// create new vote
// check if vote already exists
// increase vote increment for post/comment
votesRouter.post('/', (req, res) => {
  // Check if user voted for post/comment before
  if (req.query.post_id != null) {
    Vote.findOne({ _voter: req.user.id, _post: req.query.post_id })
      .then((vote) => {
        let diff = 0;
        if (vote == null) {
          const newVote = new Vote({
            _voter: req.user.id,
            _post: req.query.post_id,
            dir: req.body.vote_dir,
          });
          diff = req.body.vote_dir;
          newVote.save();
          return diff;
        }
        console.log(vote);
        console.log('The user has voted on this post');
        const oldVoteVal = vote.dir;
        const newVoteVal = Number(req.body.vote_dir);
        if (oldVoteVal === newVoteVal) {
          diff = -newVoteVal;
          vote.dir = 0;
        } else {
          diff = newVoteVal - oldVoteVal;
          vote.dir = newVoteVal;
        }
        vote.save();
        return diff;
      })
      .then((diff) => {
        Post.findByIdAndUpdate(req.query.post_id, {
          $inc: { votes: diff },
        })
          .then((oldPost) => {
            res.json(oldPost);
          })
          .catch((error) => res.json(error));
      });
  } else if (req.query.comment_id != null) {
    Vote.findOne({ _voter: req.user.id, _comment: req.query.comment_id }).then((vote) => {
      let diff = 0;
      if (vote == null) {
        const newVote = new Vote({
          _voter: req.user.id,
          _comment: req.query.comment_id,
          dir: req.body.vote_dir,
        });
        diff = req.body.vote_dir;
        newVote.save();
        return diff;
      }
      console.log(vote);
      console.log('The user has voted on this comment');
      const oldVoteVal = vote.dir;
      const newVoteVal = Number(req.body.vote_dir);
      console.log(oldVoteVal);
      console.log(newVoteVal);
      if (oldVoteVal === newVoteVal) {
        diff = -newVoteVal;
        vote.dir = 0;
      } else {
        diff = newVoteVal - oldVoteVal;
        vote.dir = newVoteVal;
      }
      vote.save();
      console.log(diff);
      return diff;
    }).then((diff) => {
      Comment.findByIdAndUpdate(req.query.comment_id, {
        $inc: { votes: diff },
      })
        .then((oldComment) => {
          res.json(oldComment);
        })
        .catch((error) => res.json(error));
    });
  }
});

module.exports = votesRouter;
