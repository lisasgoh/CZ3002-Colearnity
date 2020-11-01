/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const express = require('express');
const Post = require('../models/Post');
const Forum = require('../models/Forum');
const Users = require('../models/Users');
const Vote = require('../models/Vote');

const postRouter = express.Router();

// get individual post info
postRouter.get('/:id', (req, res) => {
  console.log('HERE');
  console.log(req.params.id);
  Post.findById(req.params.id)
    .populate({
      path: '_comments',
      model: 'Comment',
      select: {
        _id: 1, text: 1, votes: 1, createdAt: 1,
      },
      populate: { path: '_commenter', model: 'Users', select: { _id: 1, username: 1 } },
    })
    .populate({ path: '_poster', model: 'Users', select: { _id: 1, username: 1 } })
    .then((post) => {
      console.log(post);
      if (req.user) {
        const postObj = post.toObject();
        Vote.findOne({ _post: post._id, _voter: req.user.id })
          .then((votePost) => {
            if (votePost == null) {
              postObj.userVote = 0;
            } else {
              postObj.userVote = votePost.dir;
            }
            console.log(JSON.stringify(postObj, null, 1));
            const comments = postObj._comments;
            const promises = comments
              .map((comment) => Vote.findOne({ _comment: comment._id, _voter: req.user.id })
                .then((voteComment) => {
                  if (voteComment == null) {
                    comment.userVote = 0;
                  } else {
                    comment.userVote = voteComment.dir;
                  }
                  return comment;
                }));
            Promise.all(promises).then((commentsWithVote) => {
              console.log(`votesss${JSON.stringify(commentsWithVote)}`);
              postObj._comments = commentsWithVote;
              console.log(`Final post${JSON.stringify(postObj, null, 1)}`);
              res.json(postObj);
            }).catch((error) => res.json(error));
          });
      } else {
        res.json(post);
      }
    })
    .catch((error) => res.json(error));
});

// get all posts (for testing)
postRouter.get('/', (req, res) => {
  Post.find({}).then((posts) => res.json(posts));
});

// create post
// TODO: add to forum & user db
postRouter.post('/', (req, res) => {
  // console.log(req.body);
  // console.log(req.query);
  // console.log(req.user);
  // const temp = '5f7f525d56b9835b245e8aaf';
  // check if user is part of forum
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    votes: 0,
    _poster: req.user.id,
    _comments: [],
    _forum: req.query.forum_id,
  });
  post
    .save()
    .then(() => Forum.findByIdAndUpdate(req.query.forum_id,
      { $push: { _posts: { $each: [post._id], $position: 0 } } },
      { new: true })
      .then((forum) => {
        console.log(forum);
        Users.findByIdAndUpdate(req.user.id,
          { $push: { _posts: { $each: [post._id], $position: 0 } } },
          { new: true })
          .then((user) => {
            console.log(user);
            res.json(post);
          });
      })
      .catch((error) => res.json(error)));
});

/*
postRouter.post('/', (req, res) => {
  const { body } = req;
  // check if user is part of forum
  const post = new Post({
    title: body.title,
    description: body.description,
    votes: 0,
    _poster: req.user.id,
    _comments: [],
    _forum: req.query.forum_id,
  });
  post
    .save()
    .then(() => Forum.findById(req.query.forum_id)
      .then((forum) => {
        forum._posts.unshift(post);
        console.log(forum);
        return forum.save();
      }).then(() => Users.findById(req.user.id).then((user) => {
        user._posts.unshift(post);
        console.log(user);
        return user.save();
      }).then(() => res.json(post))
        .catch((error) => res.json(error))));
});
*/

// update post title/description
postRouter.put('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then((updatedPost) => {
      res.json(updatedPost);
    })
    .catch((error) => res.json(error));
});

/*
// delete post
// delete post from forum
// delete post from user
// only can delete when current user is the poster
postRouter.delete('/:id', (req, res) => {
  Post.findById(req.params.id).then((post) => {
    console.log(post._poster);
    console.log(req.user.id);
    if (post._poster.toString().localeCompare(req.user.id.toString()) === 0) {
      Post.findByIdAndRemove(req.params.id).then(() => {
        Forum.findByIdAndUpdate(
          req.query.forum_id,
          { $pull: { _posts: req.params.id } },
        ).then(() => {
          Users.findByIdAndUpdate(
            req.user.id,
            { $pull: { _posts: req.params.id } },
          )
            .then(() => {
              res.send('Success: Post Deleted');
            })
            .catch((err) => res.json(err));
        }).catch((err) => res.json(err));
      }).catch((err) => res.json(err));
    } else {
      res.send('current user not the poster, hence not allowed to delete. ');
    }
  }).catch((err) => res.json(err));
});
*/

postRouter.delete('/:id', (req, res) => {
  console.log('Delete post!');
  Post.findById(req.params.id).then((post) => {
    console.log(post._poster);
    console.log(req.user.id);
    if (post._poster.toString().localeCompare(req.user.id.toString()) === 0) {
      Post.findByIdAndDelete(req.params.id)
        .then((removedPost) => res.json(removedPost))
        .catch((err) => res.send(err));
    } else {
      res.send('current user not the poster, hence not allowed to delete. ');
    }
  });
});

module.exports = postRouter;
