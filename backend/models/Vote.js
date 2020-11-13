const mongoose = require('mongoose');

const { Schema } = mongoose;

const voteSchema = new Schema({
  _voter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  _comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  },
  _post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  dir: {
    type: Number,
  },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
