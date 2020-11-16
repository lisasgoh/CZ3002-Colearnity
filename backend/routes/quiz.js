/* eslint-disable no-prototype-builtins */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

const express = require('express');
const Quiz = require('../models/Quiz');
const Forum = require('../models/Forum');
const Users = require('../models/Users');
const QuizAttempt = require('../models/QuizAttempt');

const quizRouter = express.Router();

/** Creates new quiz */
quizRouter.post('/', (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: 'unauthorized user' });
  }
  // Test if forum ID is given
  if (!req.query.forum_id) {
    return res.status(400).send({ error: 'forum not given' });
  }
  // Test if forum ID is a valid Mongoose Object ID
  if (!req.query.forum_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({ error: 'invalid forum id' });
  }
  // Test if questions variable is present
  if (!req.body.hasOwnProperty('questions')) {
    return res.status(400).send({ error: 'Invalid format: No questions provided' });
  }
  Forum.findById(req.query.forum_id).then((forum) => {
    // Test if forum exists
    if (forum == null) {
      return res.status(400).send({ error: 'Forum does not exist' });
    }
    // Test if forum is a subforum
    if (forum.is_sub === false) {
      return res.status(400).send({ error: 'Forum is not a sub forum' });
    }
    const { questions } = req.body;
    let totalPoints = 0;
    const quizQuestions = questions.map((question, index) => {
      totalPoints += question.points;
      const opts = question.options;
      const newOpts = opts.map((opt, optIndex) => {
        const newOpt = {
          optionNumber: optIndex + 1,
          answerBody: opt.answerBody,
          isCorrectAnswer: opt.isCorrectAnswer,
        };
        return newOpt;
      });
      // Initialise statistics
      const stats = {
        correct: 0,
        wrong: 0,
        choices: [0, 0, 0, 0],
      };
      const newQn = {
        questionNumber: index + 1,
        title: question.title,
        points: question.points,
        options: newOpts,
        stats,
      };
      return newQn;
    });
    const quiz = new Quiz({
      title: req.body.title,
      description: req.body.description,
      _teacher: req.user.id,
      _forum: req.query.forum_id,
      total_points: totalPoints,
      questions: quizQuestions,
      _attempts: [],
      results: [],
    });
    Users.findById(req.user.id).then((currentuser) => {
      if (currentuser.is_student === false) {
        quiz.save((err, doc) => {
          if (err) {
            if (err.name === 'ValidationError') {
              return res.status(422).send({ error: 'Title required for quiz and questions' });
            }
          }
          Forum.findByIdAndUpdate(
            req.query.forum_id,
            { $push: { _quizzes: doc._id } },
            { new: true },
          )
            .then(() => {
              Users.findByIdAndUpdate(req.user.id, {
                $push: { _quizzes: doc._id },
              }).then(() => res.json(quiz));
            })
            .catch((error) => res.send(error));
        });
      } else {
        return res.status(401).send({ error: 'current user not a teacher, not authorised to post quiz ' });
      }
    });
  }).catch((err) => res.send(err));
});

/** Gets quiz given an ID */
quizRouter.get('/:id', (req, res) => {
  // Test if ID is a valid Mongoose Object ID
  if (!req.params.id || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({ error: 'invalid quiz id' });
  }
  Quiz.findById(req.params.id)
    .populate({
      path: '_teacher',
      model: 'Users',
      select: { _id: 1, username: 1 },
    })
    .populate({ path: '_forum', model: 'Forum', select: { _id: 1, name: 1, description: 1 } })
    .then((quiz) => res.json(quiz))
    .catch((err) => res.json(err));
});

/** Does quiz */
quizRouter.post('/:id', (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: 'unauthorized user' });
  }
  // Test if ID is a valid Mongoose Object ID
  if (!req.params.id || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({ error: 'invalid forum id' });
  }
  // Test whether format is valid
  if (!req.body.hasOwnProperty('attempt')) {
    return res.status(400).send({ error: 'Invalid format' });
  }
  const { attempt } = req.body;
  Quiz.findById(req.params.id)
    .then((quiz) => {
      if (quiz == null) {
        return res.status(404).send({ error: 'Quiz does not exist' });
      }
      let marks = 0;
      let total = 0;
      // Test whether user finished the quiz
      if (attempt.length !== quiz.questions.length) {
        return res.status(400).send({ error: 'Did not finish the quiz' });
      }
      const results = attempt.map((choice, index) => {
        // Test if each choice is valid (Only 1 to 4)
        if (choice <= 0 || choice > 4) {
          return res.status(400).send({ error: 'Invalid attempt choice' });
        }
        const question = quiz.questions[index];
        const { points } = question;
        total += points;
        question.stats.choices[choice - 1] += 1;
        quiz.markModified('questions');
        if (question.options[choice - 1].isCorrectAnswer === true) {
          question.stats.correct += 1;
          marks += points;
          return points;
        }
        question.stats.wrong += 1;
        return 0;
      });
      const quizAttempt = new QuizAttempt({
        _quiz: req.params.id,
        _user: req.user.id,
        attempt,
        results,
        marks,
        total,
      });
      quizAttempt
        .save()
        .then((savedAttempt) => {
          quiz._attempts.push(savedAttempt);
          quiz.results.push(marks);
          return quiz.save();
        })
        .then(() => {
          Users.findByIdAndUpdate(req.user.id, {
            $push: { _attempts: quizAttempt },
          }).then(() => {
            res.json(quizAttempt);
          });
        })
        .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err));
});

/** Delete quiz -> Only for teachers */
quizRouter.delete('/:id', (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: 'unauthorized user' });
  }
  // Test if forum ID is a valid Mongoose Object ID
  if (!req.params.id || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({ error: 'invalid quiz id' });
  }
  Quiz.findByIdAndRemove(req.params.id)
    .then((quiz) => {
      Forum.findByIdAndUpdate(quiz._forum, {
        $pull: { _quizzes: req.params.id },
      })
        .then(() => {
          QuizAttempt.remove({ _quiz: req.params.id })
            .then(() => res.send('Success: Quiz Deleted'));
        })
        .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err));
});

module.exports = quizRouter;
