const mongoose = require('mongoose');

const { Schema } = mongoose;
const Comment = require('./Comment');
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
  Comment.remove({ _post: this.id }).exec();
  Vote.remove({ _post: this.id }).exec();
  next();
};

const deleteFromParent = function (next) {
  Forum.update(
    {},
    { $pull: { _posts: { _id: this.id } } },
  ).then(() => {
    Users.update(
      {},
      { $pull: { _posts: { _id: this.id } } },
    );
  });
  next();
};

postSchema.pre('findByIdAndRemove', cascadeDelete);
postSchema.pre('remove', cascadeDelete);

postSchema.pre('findByIdAndRemove', deleteFromParent);
postSchema.pre('remove', deleteFromParent);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
