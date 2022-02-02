const express = require("express");
const authentication = require("../middleware/authentication");
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

commentRouter.post("/:id", authentication, createNewComment);

//create end point for update comment

commentRouter.put("/:id", authentication, updateCommentById);

//create end point for delete comment by id

commentRouter.delete("/delete/:id", authentication, deleteCommentById);

//create end point for delete comment by user_id

commentRouter.delete("/delete/:user_id", authentication, deleteCommentByUserId);

module.exports = { commentRouter };
