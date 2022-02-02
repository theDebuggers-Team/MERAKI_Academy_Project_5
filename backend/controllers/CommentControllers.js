//import connenction from database
const {connection} = require("../database/db");

//create controller for create New comment

const createNewComment = (req, res) => {
  const productId = req.params.id
};

//create controller for update comment by id

const updateCommentById = (req, res) => {};

//create controller for delete  comment by id

const deleteCommentById = (req, res) => {};

//create controller for delete  comment by user_id

const deleteCommentByUserId = (req, res) => {};

module.exports = {
  createNewComment,
  updateCommentById,
  deleteCommentById,
  deleteCommentByUserId,
};
