const mongoose = require("mongoose");
const { Schema } = mongoose;

const forumSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  _teacher: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
  },
});
