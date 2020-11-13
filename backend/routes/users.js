/* eslint-disable no-prototype-builtins */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const passport = require('passport');
const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('./auth');
const Users = require('../models/Users');
const QuizAttempt = require('../models/QuizAttempt');
const Util = require('../util/util');

/** Create new user, auth.optional route -> Anyone can access */
router.post('/', auth.optional, (req, res) => {
  const user = req.body;
  if (!user.email) {
    return res.status(400).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(400).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  return finalUser
    .save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }))
    .catch(() => {
      res.status(400).send({ error: 'duplicate email/username' });
    });
});

/** Login route */
router.post('/login', auth.optional, (req, res, next) => {
  if (!req.body.hasOwnProperty('user')) {
    return res.status(403).send({ error: 'Invalid format' });
  }
  const {
    body: { user },
  } = req;
  if (!user.email) {
    return res.status(400).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(400).json({
      errors: {
        password: 'is required',
      },
    });
  }
  return passport.authenticate('local', (err, passportUser) => {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!passportUser) {
      return res.status(401).send({ error: 'authentication failed' });
    }
    const authenticatedUser = passportUser;
    authenticatedUser.token = passportUser.generateJWT();
    req.login(authenticatedUser, (error) => {
      if (error) {
        return res.status(401).json(error);
      }
      return res.json({ user: authenticatedUser.toAuthJSON() });
    });
  })(req, res, next);
});

/** Gets the user's profile page */
router.get('/current', auth.required, (req, res) => {
  QuizAttempt.aggregate(
    [
      { $match: { _user: new mongoose.Types.ObjectId(req.user.id) } },
      { $sort: { _user: 1, createdAt: 1 } },
      {
        $group: {
          _id: '$_quiz',
          quizAttemptId: { $first: '$_id' },
          createdAt: { $first: '$createdAt' },
        },
      },
    ],
  ).then((quizAttemptIds) => {
    const quizAttemptIdArray = quizAttemptIds
      .map((obj) => new mongoose.Types.ObjectId(obj.quizAttemptId));
    const populateQuery = [{
      path: '_posts',
      model: 'Post',
      select: {
        _id: 1, title: 1, description: 1, votes: 1, _comments: 1,
      },
      populate: [{
        path: '_poster',
        model: 'Users',
        select: {
          _id: 1, username: 1,
        },
      }, {
        path: '_forum',
        model: 'Forum',
        select: {
          _id: 1, name: 1, is_sub: 1,
        },
      }],
    },
    {
      path: '_attempts',
      match: { _id: { $in: quizAttemptIdArray } },
      model: 'QuizAttempt',
      select: {
        _id: 1, marks: 1, total: 1,
      },
      populate: {
        path: '_quiz',
        model: 'Quiz',
        select: {
          _id: 1, title: 1,
        },
      },
    }];
    Users.findById(req.user.id).select(['-_forums', '-_created_forums', '-salt', '-hash'])
      .populate(populateQuery)
      .then((user) => {
        Util.getPostsVoteInfo(user._posts, req.user.id, (postsWithVotes) => {
          const userObj = user.toObject();
          userObj._posts = postsWithVotes;
          res.json(userObj);
        });
      })
      .catch((err) => res.send(err));
  });
});

/** Gets user's home page */
router.get('/home', auth.required, (req, res) => {
  const populateQuery = [{
    path: '_forums',
    model: 'Forum',
    populate: [{
      path: '_posts',
      model: 'Post',
      select: {
        _id: 1, title: 1, description: 1, votes: 1, _comments: 1,
      },
      populate: [{
        path: '_poster',
        model: 'Users',
        select: {
          _id: 1, username: 1,
        },
      }, {
        path: '_forum',
        model: 'Forum',
        select: {
          _id: 1, name: 1, is_sub: 1,
        },
      }],
    },
    {
      path: '_subforums',
      model: 'Forum',
      populate: [
        {
          path: '_posts',
          model: 'Post',
          select: {
            _id: 1, title: 1, description: 1, votes: 1, _comments: 1,
          },
          populate: [{
            path: '_poster',
            model: 'Users',
            select: {
              _id: 1, username: 1,
            },
          }, {
            path: '_forum',
            model: 'Forum',
            select: {
              _id: 1, name: 1, is_sub: 1,
            },
          }],
        },
      ],
    }],
  }, {
    path: '_created_forums',
    model: 'Forum',
    select: { _id: 1, name: 1 },
  }];
  return Users.findById(req.user.id).select(['-_grades', '-_posts', '-_attempts', '-_quizzes', '-salt', '-hash'])
    .populate(populateQuery)
    .then((user) => {
      let subforums = [];
      user._forums.forEach((forum) => {
        subforums = subforums.concat(forum._subforums);
      });
      const allForums = user._forums.concat(subforums);
      const homePagePosts = allForums.reduce((result, item) => result.concat(item._posts), []);
      Util.getPostsVoteInfo(homePagePosts, req.user.id, (postsWithVotes) => {
        const userObj = user.toObject();
        userObj.homePagePosts = postsWithVotes;
        res.json(userObj);
      });
    })
    .catch((err) => res.send(err));
});

router.post('/logout', (req, res) => {
  res.clearCookie('connect.sid');
  res.redirect('/');
});

module.exports = router;
