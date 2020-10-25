const mongoose = require('mongoose');

const { Schema } = mongoose;

const optionSchema = new Schema({
  optionNumber: {
    type: Number,
  },
  answerBody: {
    type: String,
  },
  isCorrectAnswer: {
    type: Boolean,
    default: false,
  },
});

const questionSchema = new Schema({
  questionNumber: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
    maxlength: 25,
  },
  options: [optionSchema],
  points: {
    type: Number,
  },
  correct: Number,
  wrong: Number,
});

const quizSchema = new Schema({
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
    ref: 'User',
    required: true,
  },
  _forum: {
    type: Schema.Types.ObjectId,
    ref: 'Forum',
  },
  questions: [questionSchema],
  results: [
    {
      type: Number, // list of quiz scores
    },
  ],
  _attempts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'QuizAttempt',
    },
  ],
});
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
