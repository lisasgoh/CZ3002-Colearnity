const Quiz = require("../models/Quiz");
const Forum = require("../models/Forum");

var express = require("express");
var quizRouter = express.Router();


//create new quiz
//save the quiz in forum
quizRouter.post("/", (req, res) => {
  //console.log(req.user);
  //console.log(req.isAuthenticated());
  const question_list = [];
  for (const qns of req.body.questions){
    const question = {};
    question.title = qns.title;
    question.point = qns.point;
    option_list = []
    for (const ops of qns.options){
      const option = {};
      option.optionNumber = ops.optionNumber;
      option.answerBody = ops.answerBody;
      option.isCorrectAnswer = ops.isCorrectAnswer;
      option_list.push(option);
    };
    question.options = option_list; 
    question_list.push(question);
  };
  const quiz = new Quiz({
    title: req.body.title,
    description: req.body.description,
    _teacher: req.user.id,
    _forum: req.query.forum_id,
    questions: question_list
  });
  //console.log(question_list);
    quiz.save((err, doc) => {
      if (err)
          res.send(err);
      Forum.findByIdAndUpdate(req.query.forum_id,
          { $push: { _quizzes: doc._id } },
          { new: true },
          (err, post) => {
              if (err)
                  res.send(err);
              res.json({doc});
          }
      )
  });
});

// get quiz by id
quizRouter.get("/:quiz_id", (req, res) => {
    Quiz.findById(req.params.quiz_id, function (err, quiz) {
      if (err) res.send(err);
      else res.json(quiz);
    });
  });

// get quiz under forum given a forum id
quizRouter.get("/filter/:forum_id", (req, res) => {
    const id = req.params.forum_id;
    Quiz.find({_forum : id}, function (err, quiz) {
      if (err) res.send(err);
      else res.json(quiz);
    });
  });

/*
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
*/

// delete quiz by id
// delete the quiz refernce from the forum
quizRouter.delete("/:quiz_id", (req, res, next) =>{
    const id = req.params.quiz_id;
    /*Quiz.findByIdAndDelete(id)
    .exec()
    .then(result => {
        res.json(result);
    })
    .catch(err =>{ res.send(err);});*/
    Quiz.findByIdAndRemove(id, (err) => {
      if(err)
          console.error(err);
    
      Forum.update({ 
          "topics" : { $in : [id] } 
      }, { 
          $pullAll : { _quizzes : [id] }
      } , (err, subject) => {
    
      })
    });
})

module.exports = quizRouter;

