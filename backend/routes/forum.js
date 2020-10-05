var Forum = require("../models/Forum");
var Post = require("../models/Post");

var express = require("express");
var forumRouter = express.Router();

//create new forum
forumRouter.post("/", function (request, response) {
  console.log("creating new post");
  //create new post with received JSON
  response.send("post created");
});

//get forum details
forumRouter.get("/:id", function (request, response) {
  const uuid = request.params[0];
  console.log("getting forum details for id: " + uuid);
  //retrieve forum details from db
  response.send("FORUM DETAILS");
});

//change forum details
forumRouter.put("/forum/*", function (request, response) {
  const uuid = request.params[0];
  console.log("updating forum detail for id: " + uuid);
  //update forum detail in db
  response.send("forum details updated");
});

//delete forum
forumRouter.delete("/forum/*", function (request, response) {
  const uuid = request.params[0];
  console.log("deleting forum for id: " + uuid);
  //delete forum in db
  response.send("forum deleted");
});
