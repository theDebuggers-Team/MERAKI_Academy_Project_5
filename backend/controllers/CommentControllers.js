//import connenction from database
const { connection } = require("../database/db");

//create controller for create New comment

const createNewComment = (req, res) => {};

//create controller for update comment by id

const updateCommentById = (req, res) => {
  const commentId = req.params.id;
  const { comment } = req.body;
  const query = `update comments set comment = ? where id = ? And is_deleted = 0`;
  const data = [comment, commentId];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: `Server Error`, error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(200).json({
        success: false,
        message: `no comments found with the inducated ${commentId}`,
      });
    }
    res.status(201).json({
      success: true,
      message: `comment updated successfully`,
      results: result,
    });
  });
};

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
