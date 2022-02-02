//import connenction from database
const {connection} = require("../database/db");

//create controller for create New comment

const createNewComment = (req, res) => {
  const productId = req.params.id
  const {comment} =req.body
  const commenter_id = req.token.userId
  const query = `insert into comments (comment,commenter_id,productId) values (?,?,?) `
  const data = [ comment, commenter_id,productId ]
  
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
