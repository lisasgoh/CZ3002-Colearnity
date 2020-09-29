const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionResultSchema = new Schema({
  correct: Number,
  wrong: Number,
  qn: Number,
});

const resultSchema = new Schema({
  _quiz: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
  },
  results: [
    {
      type: Number,
    },
  ],
  question_results: [questionResultSchema],
});

const Results = mongoose.model("Results", resultSchema);

module.exports = Results;
