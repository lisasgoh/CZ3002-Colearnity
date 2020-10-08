var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

/*var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var commentRouter = require("./routes/comment");
var postRouter = require("./routes/post");
var voteRouter = require("./routes/vote");*/

require("./models/Users");
require("./config/passport");

const mongoose = require("mongoose");
const cors = require("cors");

mongoose.promise = global.Promise;

var app = express();

// json parser
var bodyParser = require("body-parser");
app.use(bodyParser.json());

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
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "passport-tutorial",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);

/*app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/comments", commentRouter);
app.use("/api/posts", postRouter);
app.use("/api/votes", voteRouter);
*/
app.use(require("./routes"));

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
