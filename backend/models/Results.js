/*
const mongoose = require('mongoose');

const { Schema } = mongoose;

const questionResultSchema = new Schema({
  correct: Number,
  wrong: Number,
  qn_number: Number,
});

const resultSchema = new Schema({
  _quiz: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
  },
  results: [
    {
      type: Number, // list of quiz scores
    },
  ],
  // attempts: [quizAttemptSchema],
  question_results: [questionResultSchema], // count of correct/ wrong attempts for each question
});

const Results = mongoose.model('Results', resultSchema);

module.exports = Results;
*/
