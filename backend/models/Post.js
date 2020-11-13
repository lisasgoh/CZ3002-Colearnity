/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const Forum = require('./Forum');
const Vote = require('./Vote');
const Users = require('./Users');

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    _poster: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    _comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    _forum: {
      type: Schema.Types.ObjectId,
      ref: 'Forum',
      required: true,
    },
    votes: {
      type: Number,
    },
    tags: [{
      type: String,
    }],
  },
  { timestamps: true },
);

// document middleware
const cascadeRemove = function (next) {
  mongoose.model('Comment').find({ _post: this._id })
    .then((comments) => {
      comments.forEach((comment) => comment.remove());
    }).then(() => {
      Vote.remove({ _post: this._id }).then(() => next());
    });
};

// query middleware
const cascadeDelete = function (next) {
  this.model.findOne(this.getQuery()).then((post) => {
    mongoose.model('Comment').find({ _post: post._id })
      .then((comments) => {
        comments.forEach((comment) => {
          comment.remove();
        });
      }).then(() => {
        Vote.remove({ _post: post._id }).then(() => next());
      });
  });
};

const deleteFromParent = async function (next) {
  const post = await this.model.findOne(this.getQuery());
  Forum.updateOne(
    { _posts: post._id },
    { $pull: { _posts: post._id } },
  ).then(() => {
    Users.updateOne(
      { _posts: post._id },
      { $pull: { _posts: post._id } },
    ).then(() => {
      next();
    });
  });
};

postSchema.pre('remove', cascadeRemove);
postSchema.pre('findOneAndDelete', cascadeDelete);
postSchema.pre('findOneAndDelete', deleteFromParent);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
