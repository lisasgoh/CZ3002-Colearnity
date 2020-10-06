const mongoose = require("mongoose");
const { Schema } = mongoose;

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
    ref: "User",
    required: true,
  },
  _subforums: [
    {
      type: Schema.Types.ObjectId,
      ref: "Forum",
    },
  ],
  _quizzes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
  _posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  is_sub: {
    type: Boolean,
    required: true,
  },
});

const Forum = mongoose.model("Forum", forumSchema);

module.exports = Forum;
