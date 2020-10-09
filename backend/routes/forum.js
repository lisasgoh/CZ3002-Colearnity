const Forum = require("../models/Forum");
const Post = require("../models/Post");
const Users = require("../models/Users");
const Quiz = require("../models/Quiz");

var express = require("express");
var forumRouter = express.Router();

//create new forum
// add to users
forumRouter.post("/", (req, res) => {
  // console.log("HI");
  console.log(req.user);
  console.log(req.isAuthenticated());
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
  Forum.findById(req.params.id)
    .populate({path: '_teacher', model: 'Users', select: { '_id': 1,'username':1}})
    // .populate({path: '_subforums', model: 'Forum'})
    //.populate({path: '_quizzes', model: 'Quiz'})
    //.populate("_posts", { title: 1, votes: 1, _poster: 1 })
    .exec(function(err, forums) {
      if (err) return res.send(err)
      else {
        res.json(forums);
      }
    });
});

// get all forums (for testing)
forumRouter.get("/", (req, res) => {
  Forum.find()
    .populate({path: '_teacher', model: 'Users', select: { '_id': 1,'username':1}})
    .populate({path: '_subforums', model: 'Forum'})
    //.populate({path: '_quizzes', model: 'Quiz'})
    //.populate("_posts", { title: 1, votes: 1, _poster: 1 })
      .exec(function(err, forums) {
        if (err) return res.send(err)
        else {
          res.json(forums);
        }
      });
});

//change forum details todo
forumRouter.put("/:id", (req, res) => {
  Forum.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedForum) => {
      res.json(updatedForum);
    })
    .catch((error) => res.send(error));
});

//delete forum
// delete all posts
// delete from users (cascade delete)
forumRouter.delete("/:id", (req, res) => {
  Forum.findByIdAndRemove(req.params.id).then((forum) => {
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
