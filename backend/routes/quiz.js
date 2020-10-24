/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const Quiz = require('../models/Quiz');
const Forum = require('../models/Forum');
const Result = require('../models/Results');
const { Users } = require('../models/Users');
const { Grade } = require('../models/Users');

const quizRouter = express.Router();

// create new quiz
// Update user
quizRouter.post('/', (req, res) => {
  // console.log(req.user);
  // console.log(req.isAuthenticated());
  const { questions } = req.body;
  questions.map((question, index) => {
    const opts = question.options;
    const newOpts = opts.map((opt) => {
      const newOpt = {
        optionNumber: opt.optionNumber,
        answerBody: opt.answerBody,
        isCorrectAnswer: opt.isCorrectAnswer,
      };
      return newOpt;
    });
    const newQn = {
      questionNumber: index,
      title: question.title,
      point: question.point,
      options: newOpts,
    };
    return newQn;
  });
  const quiz = new Quiz({
    title: req.body.title,
    description: req.body.description,
    _teacher: req.user.id,
    _forum: req.query.forum_id,
    question: questions,
  });
  quiz.save((err, doc) => {
    if (err) { res.send(err); }
    Forum.findByIdAndUpdate(req.query.forum_id,
      { $push: { _quizzes: doc._id } },
      { new: true })
      .then(() => {
        Users.findByIdAndUpdate(req.user.id,
          { $push: { _quizzes: doc._id } });
      })
      .catch((err) => res.send(err));
  });
});

// get quiz by id
quizRouter.get('/:id', (req, res) => {
  Quiz.findById(req.params.id)
    .populate({ path: '_teacher', model: 'Users', select: { _id: 1, username: 1 } })
    .populate({ path: '_forum', model: 'Forum', select: { _id: 1, title: 1 } })
    .then((quiz) => {
      res.json(quiz);
    })
    .catch((err) => res.json(err));
});

// take quiz and submit attempt
// update in user
// update quiz result
// update quiz details
/// check whehter user attempted before
quizRouter.post('/:id', (req, res) => {
  const { attempt } = req.body;
  const attempts = JSON.parse(attempt);
  /* const quizAttempt = new QuizAttempt({
    _user: req.user.id,
    _quiz: req.params.id,
    attempt: attempts,
  }); */
  console.log(attempts);
  Quiz.findById(req.params.id).then((quiz) => {
    let marks = 0;
    const grades = attempts.map((choice, index) => {
      if (quiz.questions[index].options[choice].isCorrectAnswer === true) {
        // const { points } = quiz.questions[index];
        marks += 1;
        return 1;
      }
      return 0;
    });
    console.log(grades);
    const grade = new Grade({
      _quiz: req.params.id,
      grades,
      marks,
    });
    console.log(grade);
    Users.findByIdAndUpdate(req.user.id,
      { $push: { _grades: grade } })
      .then((user) => {
        console.log(user);
        Result.findOneAndUpdate({ _quiz: req.params.id },
          { $push: { results: marks } })
          .then((result) => {
            console.log(`REUSLT${result}`);
            res.json(result);
          })
          .catch((err) => res.send(err));
      })
      /* quizAttempt.save()
          .then((attempt) => res.json(attempt))
          .catch((err) => res.send(err)); */
      .catch((err) => res.send(err));
  })
    .catch((err) => res.send(err));
});

// get quiz under forum given a forum id
quizRouter.get('/filter', (req, res) => {
  const id = req.query.forum_id;
  Quiz.find({ _forum: id }, (err, quiz) => {
    if (err) res.send(err);
    else res.json(quiz);
  });
});

// Only for teachers
quizRouter.delete('/:id', (req, res) => {
  Quiz.findByIdAndRemove(req.params.id).then(() => {
    Forum.findByIdAndUpdate(
      req.query.forum_id,
      { $pull: { _quizzes: { _id: req.params.id } } },
    )
      .then(() => {
        Users.findByIdAndUpdate(
          req.user.id,
          { $pull: { _quizzes: { _id: req.params.id } } },
        )
          .then(() => {
            res.send('Success: Quiz Deleted');
          })
          .catch((err) => res.send(err));
      }).catch((err) => res.send(err));
  }).catch((err) => res.send(err));
});

module.exports = quizRouter;
