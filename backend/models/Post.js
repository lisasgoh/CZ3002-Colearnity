/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;
//
const Forum = require('./Forum');
const Vote = require('./Vote');
const Users = require('./Users');

const TagSchema = new mongoose.Schema({
  tag: {
    type: String,
    unique: true,
  },
});

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
    tags: [TagSchema],
  },
  { timestamps: true },
);
/*
const populatePoster = function (next) {
  this.populate({
    path: "poster",
    select: "username",
  });
  next();
};

const populateComments = function (next) {
  this.populate({
    path: "comments",
    select: "commenter createdAt text votes",
  });
  next();
};

const populateForum = function (next) {
  this.populate({
    path: "forum",
  });
  next();
};
// Execute populate methods before find query
postSchema.pre("find", populatePoster);
postSchema.pre("findOne", populatePoster);

postSchema.pre("find", populateComments);
postSchema.pre("findOne", populateComments);

postSchema.pre("find", populateForum);
postSchema.pre("findOne", populateForum); */
const cascadeDelete = function (next) {
  this.model.findOne(this.getQuery()).then((post) => {
    console.log('Post cascadeDelete middleware');
    console.log(`Removing ${post._id}`);
    mongoose.model('Comment').find({ _post: post._id }).then((comments) => {
      console.log('HIII');
      console.log(comments);
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
  console.log('Post deleteFromParent middleware');
  console.log(`Removing ${post._id}`);
  Forum.updateOne(
    { _posts: post._id },
    { $pull: { _posts: post._id } },
  ).then(() => {
    console.log('Deleted from forum');
    Users.updateOne(
      { _posts: post._id },
      { $pull: { _posts: post._id } },
    ).then(() => next());
  });
};

postSchema.pre('findOneAndDelete', cascadeDelete);
postSchema.pre('remove', cascadeDelete);

postSchema.pre('findOneAndDelete', deleteFromParent);
postSchema.pre('remove', deleteFromParent);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
