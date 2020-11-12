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
  if (!req.user) {
    return res.status(401).send({ error: 'unauthorized user' });
  }
  // Test if parent forum ID is given if it is a sub forum
  if (!req.query.forum_id) {
    return res.status(400).send({ error: 'forum not given' });
  }
  // Test if forum ID is a valid Mongoose Object ID
  if (!req.query.forum_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({ error: 'invalid forum id' });
  }
  const { questions } = req.body;
  console.log(questions);
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
  console.log(quiz);
  Users.findById(req.user.id).then((currentuser) => {
    if (currentuser.is_student === false) {
      quiz.save((err, doc) => {
        if (err) {
          res.send(err);
        }
        Forum.findByIdAndUpdate(
          req.query.forum_id,
          { $push: { _quizzes: doc._id } },
          { new: true },
        )
          .then(() => {
            Users.findByIdAndUpdate(req.user.id, {
              $push: { _quizzes: doc._id },
            }).then((user) => {
              console.log(user);
              res.json(quiz);
            });
          })
          .catch((error) => res.send(error));
      });
    } else {
      res.status(401).send({ error: 'current user not a teacher, not authorised to post quiz ' });
    }
  });
});

// get quiz by id
quizRouter.get('/:id', (req, res) => {
  Quiz.findById(req.params.id)
    .populate({
      path: '_teacher',
      model: 'Users',
      select: { _id: 1, username: 1 },
    })
    .populate({ path: '_forum', model: 'Forum', select: { _id: 1, name: 1, description: 1 } })
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
  const { attempt } = req.body;
  console.log(attempt);
  Quiz.findById(req.params.id)
    .then((quiz) => {
      let marks = 0;
      let total = 0;
      const results = attempt.map((choice, index) => {
        console.log(`Chosen option${choice - 1}`);
        const question = quiz.questions[index];
        console.log(question);
        const { points } = question;
        total += points;
        question.stats.choices[choice - 1] += 1;
        quiz.markModified('questions');
        if (question.options[choice - 1].isCorrectAnswer === true) {
          console.log('Correct answer');
          question.stats.correct += 1;
          marks += points;
          return points;
        }
        console.log('Wrong answer');
        question.stats.wrong += 1;
        return 0;
      });
      console.log(`Results${results}`);
      console.log(`Attempt${attempt}`);
      console.log(`Marks${marks}`);
      console.log(`userid${req.user.id}`);
      console.log(`total${total}`);
      const quizAttempt = new QuizAttempt({
        _quiz: req.params.id,
        _user: req.user.id,
        attempt,
        results,
        marks,
        total,
      });
      console.log(`Quiz Attempt: ${quizAttempt}`);
      // const result = quiz.results;
      quizAttempt
        .save()
        .then((savedAttempt) => {
          quiz._attempts.push(savedAttempt);
          quiz.results.push(marks);
          return quiz.save();
        })
        .then(() => {
          Users.findByIdAndUpdate(req.user.id, {
            // req.user.id,
            $push: { _attempts: quizAttempt },
          }).then(() => {
            res.json(quizAttempt);
          });
        })
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
  Quiz.findByIdAndRemove(req.params.id)
    .then(() => {
      Forum.findByIdAndUpdate(req.query.forum_id, {
        $pull: { _quizzes: req.params.id },
      })
        .then(() => {
          Users.findByIdAndUpdate(req.user.id, {
            $pull: { _quizzes: req.params.id },
          })
            .then(() => {
              res.send('Success: Quiz Deleted');
            })
            .catch((err) => res.send(err));
        })
        .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err));
});

module.exports = quizRouter;
