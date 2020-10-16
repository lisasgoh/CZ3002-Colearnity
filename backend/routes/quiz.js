const express = require('express');
const Quiz = require('../models/Quiz');

const quizRouter = express.Router();

// create new quiz
quizRouter.post('/', (req, res) => {
  // console.log(req.user);
  // console.log(req.isAuthenticated());
  const questionList = [];
  const { questions } = req.body;
  questions.map((question) => {
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
      title: question.title,
      point: question.point,
      options: newOpts,
    };
    return newQn;
  });
  /*
  for (const qns of questions) {
    const question = {};
    question.title = qns.title;
    question.point = qns.point;
    optionList = [];
    const options = qns.options;
    for (const ops of qns.options) {
      const option = {};
      option.optionNumber = ops.optionNumber;
      option.answerBody = ops.answerBody;
      option.isCorrectAnswer = ops.isCorrectAnswer;
      optionList.push(option);
    }
    question.options = optionLlist;
    questionList.push(question);
  } */
  const quiz = new Quiz({
    title: req.body.title,
    description: req.body.description,
    _teacher: req.user.id,
    _forum: req.query.forum_id,
    questions: questionList,
  });
  console.log(questionList);
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
  // req.body.map((ops).value => updateOps[ops.propName])
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
