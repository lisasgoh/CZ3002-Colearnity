/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const Vote = require('./Vote');

const commentSchema = new Schema(
  {
    text: {
      type: String,
    },
    _commenter: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    votes: {
      type: Number,
    },
    _post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  },
  { timestamps: true },
);

const populateComments = function (next) {
  this.populate({
    path: 'comments',
    select: 'commenter createdAt text votes',
  });
  next();
};

commentSchema.pre('find', populateComments);
commentSchema.pre('findById', populateComments);

commentSchema.pre('remove', function (next) {
  Vote.remove({ _comment: this._id }).exec();
  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
