var Comment = require("../models/Comment");
var Post = require("../models/Post");

var express = require("express");
const Vote = require("../models/Vote");
var votesRouter = express.Router();

// get info of vote
votesRouter.get("/:id", (req, res) => {
  Vote.findById(req.params.id),
    function (err, vote) {
      if (err) res.send(err);
      else {
        res.json(vote);
      }
    };
});

// create new vote
//check if vote already exists
// increase vote increment for post/comment
votesRouter.post("/", (req, res) => {
  Vote.exists({ _voter: req.query.user._id }), //user voted for the post before
    function (err, result) {
      if (result === true) {
        const oldVote = Number.vote.dir;
        const newVote = Number.req.body.vote_dir;
        vote.dir = newVote;
        const diff = 0;
        if (oldVote === newVote) {
          diff = -newVote;
        } else {
          diff = newVote - oldVote;
        }
        if (vote._comment != null && req.query.comment_id != null) {
          Comment.findOneAndUpdate(req.query.comment_id, {
            $inc: { votes: diff },
          })
            .then((updatedComment) => {
              res.json(updatedComment);
            })
            .catch((error) => res.json(error));
        } else if (vote._post != null && req.query.post_id != null) {
          Post.findOneAndUpdate(req.query.post_id, {
            $inc: { votes: diff },
          })
            .then((updatedPost) => {
              res.json(updatedPost);
            })
            .catch((error) => res.json(error));
        }
      } else {
        const vote = new Vote({
          _voter: req.user._id,
          _comment: req.query.comment_id,
          _post: req.query.post_id,
          dir: req.body.vote_dir,
        });
        vote
          .save()
          .then((savedVote) => {
            res.json(savedVote);
          })
          .catch((error) => res.json(error));
      }
    };
});

module.exports = votesRouter;
