/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const passport = require('passport');
const router = require('express').Router();
const auth = require('./auth');
const Users = require('../models/Users');

// POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res) => {
  const {
    body: { user },
  } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
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
    .catch((error) => res.json(error));
});

// POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res) => {
  console.log('HERE');
  console.log(req.body);
  const {
    body: { user },
  } = req;
  /*
  if (!user) {
    return res.status(401).json({
      errors: {
        email: 'is required',
      },
    });
  } */
  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  return passport.authenticate(
    'local',
    (err, passportUser) => {
      if (err) {
        return res.status(401).json(err);
      }
      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();
        req.login(user, (err) => {
          if (err) {
            return res.status(401).json(err);
          }
          return res.json({ user: user.toAuthJSON() });
        });
      }
      // return res.status(400).info;
    },
  )(req, res);
});

// GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res) => {
  console.log(req.isAuthenticated());

  const populateQuery = [{ path: '_forums', model: 'Forum', select: { _id: 1, name: 1 } }, {
    path: '_posts',
    model: 'Post',
    select: {
      _id: 1, title: 1, description: 1, votes: 1,
    },
  }];

  return Users.findById(req.user.id).populate(populateQuery).exec((err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
  // }).catch((err) => res.json(err));
  // return res.json({ user: user.toAuthJSON() });
});
router.get('/home', (req, res) => {
  console.log(req.isAuthenticated());
  console.log(req.user.id);
  /*  const {
    payload: { id },
  } = req;
*/
  console.log('DFSDrereerwrereeFS');
  const populateQuery = {
    path: '_forums',
    model: 'Forum',
    select: { _id: 1, name: 1 },
    populate: {
      path: '_posts',
      model: 'Post',
      select: {
        _id: 1, title: 1, description: 1, votes: 1,
      },
    },
  };

  return Users.findById(req.user.id)
    .populate(populateQuery)
    .then((user) => {
      console.log(user);
      res.json(user);
    })
    .catch((err) => res.send(err));
  // }).catch((err) => res.json(err));
  // return res.json({ user: user.toAuthJSON() });
});

// Testing
router.get('/:id', (req, res) => {
  console.log('DFDSFShgghfddfD');
  Users.findById(req.params.id).populate({ path: '_forums', model: 'Forum', select: { _id: 1, name: 1 } })
    .populate({
      path: '_posts',
      model: 'Post',
      select: {
        _id: 1, title: 1, description: 1, votes: 1,
      },
    }).then((user) => res.json(user))
    .catch((err) => res.json(err));
});

module.exports = router;
