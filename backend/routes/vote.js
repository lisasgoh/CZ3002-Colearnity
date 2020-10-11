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
  Vote.exists({ _voter: req.query.user.id })
    .then((result) => { // user voted for the post before
      if (result === true) {
        const oldVote = Number.vote.dir;
        const newVote = Number.req.body.vote_dir;
        Vote.findByIdAndUpdate(req.params.id, {
          dir: newVote,
        }).then((vote) => {
          let diff = 0;
          if (oldVote === newVote) {
            diff = -newVote;
          } else {
            diff = newVote - oldVote;
          }
          if (vote.comment != null && req.query.comment_id != null) {
            Comment.findOneAndUpdate(req.query.comment_id, {
              $inc: { votes: diff },
            })
              .then((updatedComment) => {
                res.json(updatedComment);
              })
              .catch((error) => res.json(error));
          } else if (vote.post != null && req.query.post_id != null) {
            Post.findOneAndUpdate(req.query.post_id, {
              $inc: { votes: diff },
            })
              .then((updatedPost) => {
                res.json(updatedPost);
              })
              .catch((error) => res.json(error));
          }
        }).catch((err) => res.json(err));
      } else {
        const newVote = new Vote({
          _voter: req.user.id,
          _comment: req.query.comment_id,
          _post: req.query.post_id,
          dir: req.body.vote_dir,
        });
        newVote
          .save()
          .then((savedVote) => {
            res.json(savedVote);
          })
          .catch((error) => res.json(error));
      }
    }).catch((err) => res.json(err)); // vote exists
});

module.exports = votesRouter;
