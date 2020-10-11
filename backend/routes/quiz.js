const Quiz = require("../models/Quiz");
const Forum = require("../models/Forum");

var express = require("express");
var quizRouter = express.Router();


//create new quiz
quizRouter.post("/", (req, res) => {
  //console.log(req.user);
  //console.log(req.isAuthenticated());
  const quiz = new Quiz({
    title: req.body.title,
    description: req.body.description,
    _teacher: req.user.id,
    _forum: req.query.forum_id

  });
  quiz
    .save()
    .then((Quiz) => {
      res.json(quiz);
    })
    .catch((err) => {
      res.send(err);
    });
});

// get quiz by id
quizRouter.get("/:quiz_id", (req, res) => {
    Quiz.findById(req.params.quiz_id, function (err, quiz) {
      if (err) res.send(err);
      else res.json(quiz);
    });
  });

// update quiz details, 
quizRouter.put("/:quiz_id", (req, res, next) =>{
    const id = req.params.quiz_id;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Quiz.findByIdAndUpdate(id, {$set: updateOps})
        .exec()
        .then( result =>{
            console.log(result);
            res.json(result);
        })
        .catch(err => {
            res.send(err);
        });
})

// delete quiz by id
quizRouter.delete("/:quiz_id", (req, res, next) =>{
    const id = req.params.quiz_id;
    Quiz.findByIdAndDelete(id)
    .exec()
    .then(result => {
        res.json(result);
    })
    .catch(err =>{ res.send(err);});
})

// get quiz under forum given a forum id?



module.exports = quizRouter;

