const mongoose = require('mongoose');

const { Schema } = mongoose;

const quizAttemptSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  _quiz: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
  },
  attempt: [
    {
      type: Number, // list of answers submitted by the user
    },
  ],
});

const QuizAttempt = mongoose.model('QuizAttempt', quizAttemptSchema);

module.exports = QuizAttempt;