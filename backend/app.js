var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var commentRouter = require("./routes/comment");
var postRouter = require("./routes/post");

const mongoose = require("mongoose");
const cors = require("cors");

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

// insert POST/GET functions
/*
//create account
app.post("/account/create", function (request, response) {
  console.log(request.body);
  //create account with -> request.body.username, request.body.password
  request.send("got it");
});

//get account information
app.get("/account/*", function (req, res) {
  const userid = req.params[0];
  console.log("get request for user id: " + userid);
  //get account info for -> userid
  res.send(userid);
});

//change account information
app.put("/account/*", function (request, response) {
  const userid = req.params[0];
  console.log("put request for user id: " + userid);
  //update user (userid) with the received information
  //check with team on the format of profile information changed
  response.send("User profile changed");
});

//delete account
app.delete("/account/*", function (request, response) {
  const userid = req.params[0];
  console.log("delete account for user:" + userid);
  //delete user in the database/flag user as deleted
  response.send("User profile deleted");
});

//create new post
app.post("/posts", function (request, response) {
  console.log("create new post");
  //create post with received JSON
  //figure out JSON structure later with team
  response.send("Post created");
});

//get all posts
app.get("/posts", function (request, response) {
  console.log("get all posts");
  //access db and get all post and then forward it
  response.send("POSTS - TO BE UPDATED WITH REAL POSTS");
});

//get post by uuid
app.get("/posts/*", function (request, response) {
  const uuid = request.params[0];
  console.log("get post for id: " + uuid);
  //access db to retrieve posts for uuid
  response.send("post detail");
});

//put post by uuid
app.put("/posts/*", function (request, response) {
  const uuid = request.params[0];
  console.log("change post details for id: " + uuid);
  //update db
  response.send("post updated");
});

//delete post by uuid
app.delete("/posts/*", function (request, response) {
  const uuid = request.params[0];
  console.log("delete post for id: " + uuid);
  //delete post in db
  response.send("post deleted");
});

//create new comment
app.post("/comments", function (request, response) {
  console.log("create new comment");
  //create new comment from received JSON
  response.send("comment created");
});

//get  by uuid
app.get("/comments/*", function (request, response) {
  const uuid = request.params[0];
  console.log("get comment by id: " + uuid);
  //retrieve comment from db using uuid
  response.send("COMMENT DATA - TO BE UPDATED ONCE DB IS READY");
});

//change comment details by uuid
app.put("/comments/*", function (request, response) {
  const uuid = request.params[0];
  console.log("updating comment details for id: " + uuid);
  //update comment in db
  response.send("Comment update");
});

//delete comment by uuid
app.delete("/comments/*", function (request, response) {
  const uuid = request.params[0];
  console.log("deleting comment id: " + uuid);
  //delete comment in db
  response.send("comment deleted");
});

//TODO @NEEDS UPDATE FOR THE ?id=123 parameters
//create new vote @NEEDS UPDATE FOR THE ?id=123 parameters
app.post("/votes", function (request, response) {
  console.log("creating new vote");
  //create new vote in db
  response.send("vote created");
});

//TODO @NEEDS UPDATE FOR THE ?id=123 parameters
//get vote for a user/post/commentid
app.get("/votes", function (request, response) {
  console.log("get votes for (parameter ids)");
  //retrieve vote 1 or 0 from db
  response.send("vote for userX for commentX in postX is (1/0)");
});

//create new quiz
app.post("/quiz", function (request, response) {
  console.log("create new quiz");
  //create new quiz in db
  response.send("quiz created");
});

//TODO @NEEDS UPDATE FOR THE ?id=123 parameters
//get quiz with ?forum= parameter
app.get("/quiz", function (request, response) {
  //read ?forum = parameter
  console.log("get forumid quiz from db");
  //retrieve quiz from db
  response.send("QUIZ DATA");
});

//get quiz details
app.get("/quiz/*", function (request, response) {
  const uuid = request.params[0];
  console.log("get quiz details for id: " + uuid);
  //get quiz details from db
  response.send("QUIZ INFO");
});

//change quiz details
app.put("/quiz/*", function (request, response) {
  const uuid = request.params[0];
  console.log("update quiz info for quiz id: " + uuid);
  //update quiz id in db
  response.send("quiz updated");
});

//delete quiz
app.delete("/quiz/*", function (request, response) {
  const uuid = request.params[0];
  console.log("deleting quiz id: " + uuid);
  //delete quiz in db
  response.send("quiz deleted");
});

//TODO @NEEDS UPDATE FOR THE ?id=123 parameters
//add result
app.post("/results", function (request, response) {
  //read ?id=123 parameter
  console.log("adding result");
  //add result in db
  response.send("result added");
});

//create new forum
app.post("/forum", function (request, response) {
  console.log("creating new post");
  //create new post with received JSON
  response.send("post created");
});

//get forum details
app.get("/forum/*", function (request, response) {
  const uuid = request.params[0];
  console.log("getting forum details for id: " + uuid);
  //retrieve forum details from db
  response.send("FORUM DETAILS");
});

//change forum details
app.put("/forum/*", function (request, response) {
  const uuid = request.params[0];
  console.log("updating forum detail for id: " + uuid);
  //update forum detail in db
  response.send("forum details updated");
});

//delete forum
app.delete("/forum/*", function (request, response) {
  const uuid = request.params[0];
  console.log("deleting forum for id: " + uuid);
  //delete forum in db
  response.send("forum deleted");
});*/

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/comments", commentRouter);
app.use("/api/posts", postRouter);

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
