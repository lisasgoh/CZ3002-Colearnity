var Forum = require("../models/Forum");
var Post = require("../models/Post");

var express = require("express");
var forumRouter = express.Router();

//create new forum
forumRouter.post("/", (req, res) => {
  const forum = {
    name: req.body.name,
    description: req.body.description,
    _teacher: req.query.user_id,
    is_sub: false,
  };
  forum
    .save()
    .then((forum) => {
      res.redirect(`/`);
    })
    .catch((err) => {
      res.send(err);
    });
});

//get forum details
forumRouter.get("/:id", (req, res) => {
  Forum.findById(req.params.forum_id).then((forum) => {
    if (err) res.send(err);
    else res.redirect(`/`);
  });
});

//change forum details
forumRouter.put("/:id", (req, res) => {
  Forum.findByIdAndUpdate(req.params.forum_id, req.body)
    .then((updatedForum) => {
      res.json(updatedForum);
    })
    .catch((error) => res.send(error));
});

//delete forum
// delete from posts
// delete from users (cascade delete)
forumRouter.delete("/:id", (req, res) => {
  Forum.findByIdAndRemove(req.params.forum_id).then((forum) => {
    if (err) res.send(err);
    else {
      // delete from posts
    }
  });
});
