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
});

const questionResultSchema = new Schema({
  correct: Number,
  wrong: Number,
  qn_number: Number,
});

const resultSchema = new Schema({
  results: [
    {
      type: Number, // list of quiz scores
    },
  ],
  // attempts: [quizAttemptSchema],
  question_results: [questionResultSchema], // count of correct/ wrong attempts for each question
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
  results: resultSchema,
});
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
