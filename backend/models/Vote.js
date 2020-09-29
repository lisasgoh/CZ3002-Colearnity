const mongoose = require("mongoose");
const { Schema } = mongoose;

const voteSchema = new Schema({
  _voter: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  _comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  _post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  dir: {
    type: Number,
  },
});

const populateVoter = function (next) {
  this.populate({
    path: "voter",
    select: "id",
  });
  next();
};

const populateComment = function (next) {
  this.populate({
    path: "comment",
    select: "id",
  });
  next();
};

const populatePost = function (next) {
  this.populate({
    path: "post",
    select: "id",
  });
  next();
};

// Execute populate methods before find query
postSchema.pre("find", populateVoter);
postSchema.pre("findOne", populateVoter);

postSchema.pre("find", populatePost);
postSchema.pre("findOne", populatePost);

postSchema.pre("find", populateComment);
postSchema.pre("findOne", populateComment);

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
