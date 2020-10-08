var Comment = require("../models/Comment");
var Post = require("../models/Post");

var express = require("express");
const Vote = require("../models/Vote");
var votesRouter = express.Router();

// get info of vote
votesRouter.get("/:id", (req, res) => {
  Vote.findById(req.params.vote_id),
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
  Vote.exists({ _voter: req.query.user._id }),
    function (err, result) {
      if (result === true) {
        const oldVote = Number.vote.dir;
        const newVote = Number.req.query.vote_dir;
        vote.dir = newVote;
        if (vote._comment != null && req.params.comment_id != null) {
          Comment.findOneAndUpdate(req.params.comment_id, {
            $inc: { votes: newVote - oldVote },
          })
            .then((updatedComment) => {
              res.json(updatedComment);
            })
            .catch((error) => res.json(error));
        } else if (vote._post != null && req.params.post_id != null) {
          Post.findOneAndUpdate(req.params.post_id, {
            $inc: { votes: newVote - oldVote },
          })
            .then((updatedPost) => {
              res.json(updatedPost);
            })
            .catch((error) => res.json(error));
        }
      } else {
        const vote = new Vote({
          _voter: req.query.user._id,
          _comment: req.query.comment_id,
          _post: req.query.post_id,
          dir: req.query.dir,
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
