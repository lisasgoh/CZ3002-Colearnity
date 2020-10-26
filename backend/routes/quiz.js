/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const Quiz = require('../models/Quiz');
const Forum = require('../models/Forum');
const Users = require('../models/Users');
const QuizAttempt = require('../models/QuizAttempt');

const quizRouter = express.Router();

// create new quiz
// Update user
quizRouter.post('/', (req, res) => {
  // console.log(req.user);
  // console.log(req.isAuthenticated());
  const { questions } = req.body;
  console.log(questions);
  const quizQuestions = questions.map((question, index) => {
    const opts = question.options;
    const newOpts = opts.map((opt, optIndex) => {
      const newOpt = {
        optionNumber: optIndex + 1,
        answerBody: opt.answerBody,
        isCorrectAnswer: opt.isCorrectAnswer,
      };
      return newOpt;
    });
    const newQn = {
      questionNumber: index + 1,
      title: question.title,
      points: question.points,
      options: newOpts,
      correct: 0,
      wrong: 0,
    };
    return newQn;
  });
  const quiz = new Quiz({
    title: req.body.title,
    description: req.body.description,
    _teacher: req.user.id,
    _forum: req.query.forum_id,
    questions: quizQuestions,
    _attempts: [],
    results: [],
  });
  console.log(quiz);
  quiz.save((err, doc) => {
    if (err) { res.send(err); }
    Forum.findByIdAndUpdate(req.query.forum_id,
      { $push: { _quizzes: doc._id } },
      { new: true })
      .then(() => {
        Users.findByIdAndUpdate(req.user.id,
          { $push: { _quizzes: doc._id } })
          .then((user) => {
            console.log(user);
            res.json(user);
          });
      })
      .catch((error) => res.send(error));
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
// [0 , 1] => first option chose for first qn, second option chose for 2nd question
quizRouter.post('/:id', (req, res) => {
  let { attempt } = req.body;
  attempt = JSON.parse(attempt);
  console.log(attempt);
  Quiz.findById(req.params.id).then((quiz) => {
    let marks = 0;
    const results = attempt.map((choice, index) => {
      if (quiz.questions[index].options[choice].isCorrectAnswer === true) {
        const { points } = quiz.questions[index];
        quiz.questions[index].correct += 1;
        marks += points;
        return points;
      }
      quiz.questions[index].wrong += 1;
      return 0;
    });
    const quizAttempt = new QuizAttempt({
      _quiz: req.params.id,
      _user: req.user.id,
      attempt,
      results,
      marks,
    });
    console.log(quizAttempt);
    // const result = quiz.results;
    quizAttempt.save().then((savedAttempt) => {
      quiz._attempts.push(savedAttempt);
      quiz.results.push(marks);
      console.log(quiz);
      return quiz.save();
    }).then(() => {
      Users.findByIdAndUpdate(req.user.id,
        { $push: { _attempts: quizAttempt } })
        .then(() => {
          res.json(quizAttempt);
        });
    }).catch((err) => res.send(err));
  }).catch((err) => res.send(err));
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
      { $pull: { _quizzes: req.params.id } },
    )
      .then(() => {
        Users.findByIdAndUpdate(
          req.user.id,
          { $pull: { _quizzes: req.params.id } },
        )
          .then(() => {
            res.send('Success: Quiz Deleted');
          })
          .catch((err) => res.send(err));
      }).catch((err) => res.send(err));
  }).catch((err) => res.send(err));
});

module.exports = quizRouter;
