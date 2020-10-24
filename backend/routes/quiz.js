/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const Quiz = require('../models/Quiz');
const Forum = require('../models/Forum');
const Result = require('../models/Results');
const Users = require('../models/Users');

const quizRouter = express.Router();

// create new quiz
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
      { new: true },
      (err, post) => {
        if (err) { res.send(err); }
        res.json({ doc });
      });
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

// get quiz under forum given a forum id
quizRouter.get('/filter', (req, res) => {
  const id = req.query.forum_id;
  Quiz.find({ _forum: id }, (err, quiz) => {
    if (err) res.send(err);
    else res.json(quiz);
  });
});

quizRouter.delete('/:id', (req, res) => {
  Quiz.findByIdAndRemove(req.params.id).then((quiz) => {
    Forum.findByIdAndUpdate(
      req.query.forum_id,
      { $pull: { _quizzes: { _id: req.params.id } } },
    )
      .then((forum) => {
        Users.findByIdAndUpdate(
          req.user.id,
          { $pull: { _quizzes: { _id: req.params.id } } },
        )
          .then((user) => {
            res.send('Success: Quiz Deleted');
          })
          .catch((err) => res.send(err));
      }).catch((err) => res.send(err));
  }).catch((err) => res.send(err));
});

module.exports = quizRouter;
