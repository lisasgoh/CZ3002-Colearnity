const express = require('express');
const Result = require('../models/Results');
// const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const Users = require('../models/Users');
const Results = require('../models/Results');

const resultRouter = express.Router();

// post empty set of result when a new quiz is created
resultRouter.post('/', (req, res) => {
  const result = new Result({
    _quiz: req.query.quiz_id,
    result: [],
    question_results: [],
  });
  result
    .save()
    .then(() => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

// take quiz and submit attempt
// update in user
// update quiz result
// update quiz details
resultRouter.post('/takequiz', (req, res) => {
  const quizAttempt = new QuizAttempt({
    _user: req.user.id,
    _quiz: req.query.quiz_id,
    attempt: req.body.attempt,
  });
  quizAttempt
    .save()
    .then(() => Users.findById(req.user.id))
    .then((user) => {
      user.quizzes.unshift(req.query.quiz_id);
      return user.save();
    })
    .then(() => {
      Results.findOneAndUpdate({ _quiz: req.query.quiz_id },
        {
          results: { $push: req.body.result },
        }, {
          new: true,
        });
    })
    .catch((err) => {
      res.send(err);
    });
});

// get result given quiz id
resultRouter.get('/:quiz_id', (req, res) => {
  Result.find({ _quiz: req.params.id }, (err, result) => {
    if (err) res.send(err);
    else res.json(result);
  });
});

module.exports = resultRouter;
