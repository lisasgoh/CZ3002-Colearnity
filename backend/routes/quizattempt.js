const express = require('express');
const QuizAttempt = require('../models/QuizAttempt');

const quizAttemptRouter = express.Router();

/** Gets quiz attempt info */
quizAttemptRouter.get('/:id', (req, res) => {
  QuizAttempt.findById(req.params.id)
    .populate({
      path: '_quiz',
      model: 'Quiz',
      select: {
        _id: 1, title: 1, description: 1, questions: 1,
      },
      populate: {
        path: '_forum',
        model: 'Forum',
        select: {
          _id: 1, name: 1,
        },
      },
    }).then((quizAttempt) => res.json(quizAttempt));
});

module.exports = quizAttemptRouter;
