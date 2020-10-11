const Result = require("../models/Results");

var express = require("express");
var resultRouter = express.Router();


// post result
resultRouter.post("/", (req, res) => {
 
    const result = new Result({
        _quiz: req.query.quiz_id,
        result: req.body.result,
        question_results: [
            {
                correct: req.body.question_results.correct,
                wrong: req.body.question_results.wrong,
                qn_number: req.body.question_results.qn_number,
            }
        ]

  });
  result
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
});


module.exports = resultRouter;
