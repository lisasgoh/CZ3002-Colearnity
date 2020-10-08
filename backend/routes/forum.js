const Forum = require("../models/Forum");
const Post = require("../models/Post");
const Users = require("../models/Users");

var express = require("express");
var forumRouter = express.Router();

//create new forum
// add to users
forumRouter.post("/", (req, res) => {
  // console.log("HI");
  // console.log(req.session);
  const forum = new Forum({
    name: req.body.name,
    description: req.body.description,
    _teacher: req.user._id,
    is_sub: req.body.is_sub,
  });
  forum
    .save()
    .then((forum) => {
      res.json(forum);
    })
    .catch((err) => {
      res.send(err);
    });
});

//get forum details todo -> populate fields --> consider sorting
forumRouter.get("/:id", (req, res) => {
  Forum.findById(req.params.forum_id).then((forum) => {
    if (err) res.send(err);
    else res.redirect(`/`);
  });
});

//change forum details todo
forumRouter.put("/:id", (req, res) => {
  Forum.findByIdAndUpdate(req.params.forum_id, req.body)
    .then((updatedForum) => {
      res.json(updatedForum);
    })
    .catch((error) => res.send(error));
});

//delete forum
// delete all posts
// delete from users (cascade delete)
forumRouter.delete("/:id", (req, res) => {
  Forum.findByIdAndRemove(req.params.forum_id).then((forum) => {
    if (err) res.send(err);
    else {
      Users.update(
        {},
        { $pull: { _forums: { _id: this._id } } },
        { multi: true },
        function (err) {
          if (err) res.send(err);
          else res.send("Success: Forum Deleted");
        }
      );
    }
  });
});

module.exports = forumRouter;
