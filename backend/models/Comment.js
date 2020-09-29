const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    text: {
      type: String,
    },
    _commenter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    votes: {
      type: Number,
    },
    _post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  timestamps
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
