/*var express = require("express");
var router = express.Router();
var postController = require("../controllers/posts");
var commentController = require("../controllers/comments");
var commentCommentsController = require("../controllers/commentComments");

//Post Routes
router.get("/api/posts", postController.getAll);
router.post("/api/posts", postController.create);
router.get("/api/posts/:post_id", postController.show);
router.put("/api/posts/:post_id", postController.update);
router.delete("/api/posts/:post_id", postController.delete);

//Comment Routes
router.get("/api/posts/:post_id/comments", commentsController.index);
router.post("/api/posts/:post_id/comments", commentsController.create);
router.get("/api/posts/:post_id/comments/:comment_id", commentsController.show);
router.put(
  "/api/posts/:post_id/comments/:comment_id",
  commentsController.update
);
router.delete(
  "/api/posts/:post_id/comments/:comment_id",
  commentsController.destroy
);
router.get(
  "/api/posts/:post_id/comments/:comment_id/comments",
  commentCommentsController.show
);
router.post(
  "/api/posts/:post_id/comments/:comment_id/comments",
  commentCommentsController.create
);
router.delete(
  "/api/posts/:post_id/comments/:comment_id/comments/:commentComment_id",
  commentCommentsController.destroy
);

module.exports = router;
*/
