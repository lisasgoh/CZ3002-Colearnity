/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;

// const Post = require('./Post');
// const Quiz = require('./Quiz');

const forumSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  _teacher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  _subforums: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Forum',
    },
  ],
  _quizzes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Quiz',
    },
  ],
  _posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  is_sub: {
    type: Boolean,
    required: true,
  },
  _parentforum: {
    type: Schema.Types.ObjectId,
    ref: 'Forum',
  },

});

const cascadeDelete = function (next) {
  this.model.findOne(this.getQuery()).then((forum) => {
    console.log('Forum cascadeDelete middleware');
    console.log(`Removing ${forum._id}`);
    mongoose.model('Post').find({ _forum: forum._id })
      .then((posts) => {
        console.log(posts);
        posts.forEach((post) => {
          post.remove();
        });
      }).then(() => {
        mongoose.model('Quiz').find({ _forum: forum._id })
          .then((quizzes) => {
            quizzes.forEach((quiz) => {
              quiz.remove();
            });
          }).then(() => {
            mongoose.model('Forum').find({ _parentforum: forum.id })
              .then((subforums) => {
                subforums.forEach((subforum) => {
                  subforum.remove();
                });
              });
          })
          .then(() => next());
      });
  });
};

const cascadeRemove = function (next) {
  mongoose.model('Post').find({ _forum: this._id })
    .then((posts) => {
      console.log(posts);
      posts.forEach((post) => {
        post.remove();
      });
    }).then(() => {
      mongoose.model('Quiz').find({ _forum: this._id })
        .then((quizzes) => {
          quizzes.forEach((quiz) => {
            quiz.remove();
          });
        }).then(() => {
          mongoose.model('Forum').find({ _parentforum: this.id })
            .then((subforums) => {
              subforums.forEach((subforum) => {
                subforum.remove();
              });
            });
        })
        .then(() => next());
    });
};
/*
const deleteFromParent = async function (next) {
  const post = await this.model.findOne(this.getQuery());
  console.log('Post deleteFromParent middleware');
  console.log(`Removing ${post._id}`);
  Forum.updateOne(
    { _posts: post._id },
    { $pull: { _posts: post._id } },
  ).then(() => {
    console.log('Deleted from forum');
    Users.updateOne(
      { _posts: post._id },
      { $pull: { _posts: post._id } },
    ).then(() => next());
  });
}; */

forumSchema.pre('remove', cascadeRemove);
forumSchema.pre('findOneAndDelete', cascadeDelete);
// forumSchema.pre('findOneAndDelete', deleteFromParent);

const Forum = mongoose.model('Forum', forumSchema);

module.exports = Forum;
