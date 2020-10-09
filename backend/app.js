var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var passport = require("passport");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var commentRouter = require("./routes/comment");
var postRouter = require("./routes/post");
var voteRouter = require("./routes/vote");
var forumRouter = require("./routes/forum");

var User = require("./models/Users");
require("./config/passport");

const mongoose = require("mongoose");
const cors = require("cors");

mongoose.promise = global.Promise;

var app = express();

// connect to mongodb
const url = `mongodb+srv://colearnity:zHiVt0wXsWUQ3MKB@cluster0.4j8bx.mongodb.net/<dbname>?retryWrites=true&w=majority`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  console.log('serialize: ' + user._id);
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  console.log('deserialize: ' + id);
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/comments", commentRouter);
app.use("/api/posts", postRouter);
app.use("/api/votes", voteRouter);
app.use("/api/forum", forumRouter);

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
