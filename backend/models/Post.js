const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 25,
    },
    description: {
      type: String,
    },
    _poster: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    _comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    _forum: {
      type: Schema.Types.ObjectId,
      ref: "Forum",
      required: true,
    },
    votes: {
      type: Number,
    },
  },
  { timestamps: true }
);
/*
const populatePoster = function (next) {
  this.populate({
    path: "poster",
    select: "username",
  });
  next();
};

const populateComments = function (next) {
  this.populate({
    path: "comments",
    select: "commenter createdAt text votes",
  });
  next();
};

const populateForum = function (next) {
  this.populate({
    path: "forum",
  });
  next();
};
// Execute populate methods before find query
postSchema.pre("find", populatePoster);
postSchema.pre("findOne", populatePoster);

postSchema.pre("find", populateComments);
postSchema.pre("findOne", populateComments);

postSchema.pre("find", populateForum);
postSchema.pre("findOne", populateForum); */

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
