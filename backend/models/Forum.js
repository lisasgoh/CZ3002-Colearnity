const mongoose = require('mongoose');

const { Schema } = mongoose;

const Post = require('./Post');
const Quiz = require('./Quiz');

const forumSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  _teacher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  _subforums: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Forum',
    },
  ],
  _quizzes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Quiz',
    },
  ],
  _posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  is_sub: {
    type: Boolean,
    required: true,
  },
  _parentforum: {
    type: Schema.Types.ObjectId,
    ref: 'Forum',
  },

});

const Forum = mongoose.model('Forum', forumSchema);

forumSchema.pre('remove', function (next) {
  Forum.remove({ _parentforum: this.id }).exec();
  Post.remove({ _forum: this.id }).exec();
  Quiz.remove({ _forum: this.id }).exec();
  next();
});

module.exports = Forum;
