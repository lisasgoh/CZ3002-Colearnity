const mongoose = require("mongoose");
const { Schema } = mongoose;

const GradeSchema = new mongoose.Schema({
  _quiz: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
  },
  grades: [
    {
      type: Number,
    },
  ],
  marks: {
    type: Number,
  },
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_student: {
    type: Boolean,
  },
  university: {
    type: String,
  },
  course_of_study: {
    type: String,
  },
  _forums: [
    {
      type: Schema.Types.ObjectId,
      ref: "Forum",
    },
  ],
  _grades: [GradeSchema],
  _posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  _quizzes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
