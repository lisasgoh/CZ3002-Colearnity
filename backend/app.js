/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');

const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const commentRouter = require('./routes/comment');
const postRouter = require('./routes/post');
const voteRouter = require('./routes/vote');
const forumRouter = require('./routes/forum');
const quizRouter = require('./routes/quiz');
const resultRouter = require('./routes/result');
const searchRouter = require('./routes/search');
const filterRouter = require('./routes/filter');

const Users = require('./models/Users');
require('./config/passport');

mongoose.promise = global.Promise;

const app = express();

// connect to mongodb
const url = 'mongodb+srv://colearnity:zHiVt0wXsWUQ3MKB@cluster0.4j8bx.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  origin: 'http://localhost:3001',
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log(`serialize: ${user._id}`);
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  console.log(`deserialize: ${id}`);
  Users.findById(id, (err, user) => {
    done(err, user);
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/comments', commentRouter);
app.use('/api/posts', postRouter);
app.use('/api/votes', voteRouter);
app.use('/api/forum', forumRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/result', resultRouter);
app.use('/api/search', searchRouter);
app.use('/api/filter', filterRouter);

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
/*
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); */
module.exports = app;
