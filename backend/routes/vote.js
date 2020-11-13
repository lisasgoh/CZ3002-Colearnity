/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

const Vote = require('../models/Vote');

const votesRouter = express.Router();

/** Vote for post or comment */
votesRouter.post('/', (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: 'unauthorized user' });
  }
  // If neither postID or commentID given
  if (!req.query.post_id && !req.query.comment_id) {
    return res.status(400).send({ error: 'neither post nor comment given' });
  }
  if (!req.body.vote_dir) {
    return res.status(400).send({ error: 'Invalid format: Vote dir not given' });
  }
  if (req.body.vote_dir !== -1 && req.body.vote_dir !== 1) {
    return res.status(400).send({ error: 'Invalid format: Vote dir can only be 1 (Upvote) or -1 (Downvote)' });
  }
  if (req.query.post_id != null) {
    // Check for invalid Post ID
    if (!req.query.post_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({ error: 'invalid post id' });
    }
    // Check if user voted for post before
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
        const oldVoteVal = vote.dir;
        const newVoteVal = req.body.vote_dir;
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
        }, { new: true })
          .then((newPost) => res.json(newPost))
          .catch((error) => res.json(error));
      });
  } else if (req.query.comment_id != null) {
    // Check for invalid comment ID
    if (!req.query.comment_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({ error: 'invalid comment id' });
    }
    // Check if user voted for comment before
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
      const oldVoteVal = vote.dir;
      const newVoteVal = req.body.vote_dir;
      if (oldVoteVal === newVoteVal) {
        diff = -newVoteVal;
        vote.dir = 0;
      } else {
        diff = newVoteVal - oldVoteVal;
        vote.dir = newVoteVal;
      }
      vote.save();
      return diff;
    }).then((diff) => {
      Comment.findByIdAndUpdate(req.query.comment_id, {
        $inc: { votes: diff },
      }, { new: true })
        .then((newComment) => res.json(newComment))
        .catch((error) => res.json(error));
    });
  }
});

module.exports = votesRouter;
