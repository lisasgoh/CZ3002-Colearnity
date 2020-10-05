/*var models = require("../models");
var Comment = models.Comment;
// var CommentComments = models.commentComments;
var TextPost = models.TextPost;

function getAll(req, res) {
  TextPost.findById(req.params.post_id, function (err, post) {
    if (err) res.send(err);
    else {
      var comments = post.comments;
      res.json(comments);
    }
  });
}

function show(req, res) {
  Comment.findById(req.params.comment_id, function (err, comment) {
    if (err) res.send(err);
    else res.json(comment);
  });
}

function create(req, res) {
  Comment.create(req.body, function (err, comment) {
    if (err) res.send(err);
    else {
      TextPost.findById(req.params.post_id, function (err, post) {
        if (err) res.send(err);
        else {
          post.comments.push(comment);
          post.save();
          res.json(post);
        }
      });
    }
  });
}

function update(req, res) {
  TextPost.findById(req.params.post_id, function (err, post) {
    if (err) res.send(err);
    var commentToUpdate = post.comments.id(req.params.comment_id);
    commentToUpdate.content = req.body.content;
    commentToUpdate.votes = req.body.votes;

    post.save();
    res.json(commentToUpdate);
  });
  //   }
  // })
}

function destroy(req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function (err, comment) {
    if (err) res.send(err);
    else {
      // Remove comment from Post too!
      TextPost.findByIdAndUpdate(
        req.params.post_id,
        { $pull: { comments: { _id: req.params.comment_id } } },
        function (err) {
          if (err) res.send(err);
          else res.send("Success: Comment Deleted");
        }
      );
    }
  });
}

module.exports.index = index;
module.exports.show = show;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;
*/
