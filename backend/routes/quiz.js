const express = require('express');
const Quiz = require('../models/Quiz');

const quizRouter = express.Router();

// create new quiz
quizRouter.post('/', (req, res) => {
  // console.log(req.user);
  // console.log(req.isAuthenticated());
  const quiz = new Quiz({
    title: req.body.title,
    description: req.body.description,
    _teacher: req.user.id,
    _forum: req.query.forum_id,
    questions: [
      {
        title: req.body.question.qn_title,
        option: [
          {
            optionNumber: req.body.question.option.optionNumber,
            answerBody: req.body.question.option.answerBody,
            isCorrectAnswer: req.body.question.option.isCorrectAnswer,
          },

        ],
        point: req.body.question.point,

      },
    ],
  });
  quiz
    .save()
    .then(() => {
      res.json(quiz);
    })
    .catch((err) => {
      res.send(err);
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

// update quiz details,
quizRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Quiz.findByIdAndUpdate(id, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

// delete quiz by id
quizRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  Quiz.findByIdAndDelete(id)
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => { res.send(err); });
});

module.exports = quizRouter;
