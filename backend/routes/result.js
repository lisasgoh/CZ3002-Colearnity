const express = require('express');
const Result = require('../models/Results');

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

// get result given quiz id
resultRouter.get('/', (req, res) => {
  Result.find({ _quiz: req.query.quiz_id }, (err, result) => {
    if (err) res.send(err);
    else res.json(result);
  });
});

// get result given result id
resultRouter.get('/:id', (req, res) => {
  Result.findById(req.params.id, (err, result) => {
    if (err) res.send(err);
    else res.json(result);
  });
});

module.exports = resultRouter;
