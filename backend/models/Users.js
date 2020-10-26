/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

/*
const GradeSchema = new mongoose.Schema({
  _quiz: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
  },
  grades: [
    {
      type: Number,
    },
  ],
  marks: {
    type: Number,
  },
}); */

const UsersSchema = new Schema({
  hash: String,
  salt: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  is_student: {
    type: Boolean,
    required: true,
  },
  university: {
    type: String,
  },
  course_of_study: {
    type: String,
  },
  _forums: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Forum',
      unique: true,
    },
  ],
  _created_forums: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Forum',
      unique: true,
    },
  ],
  // _grades: [GradeSchema],
  _posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  _attempts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'QuizAttempt',
    },
  ],
});

UsersSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
};

UsersSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

UsersSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    'secret',
  );
};

UsersSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;
