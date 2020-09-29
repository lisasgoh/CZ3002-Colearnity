const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 25,
  },
  options: [{ type: String }],
  correct_ans: {
    type: Number,
  },
  points: {
    type: Number,
  },
});
const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 25,
    },
    description: {
      type: String,
    },
    _teacher: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    _forum: {
      type: Schema.Types.ObjectId,
      ref: "Forum",
    },
    questions: [questionSchema],
  },
  timestamps
);
const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
