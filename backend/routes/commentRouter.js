const express = require("express");

//create comment router

const commentRouter = express.Router();

// import coments controllers from "CommentControllers"

const {
  createNewComment,
  updateCommentById,
  deleteCommentById,
  deleteCommentByUserId,
} = require("../controllers/CommentControllers");

//create end point for create comment

commentRouter.post("/", createNewComment);

//create end point for update comment

commentRouter.put("/:id", updateCommentById);

//create end point for delete comment by id

commentRouter.delete("/delete/:id", deleteCommentById);

//create end point for delete comment by user_id

commentRouter.delete("/delete/:user_id", deleteCommentByUserId);

module.exports = { commentRouter };
