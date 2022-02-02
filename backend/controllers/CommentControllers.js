//import connenction from database
const {connection} = require("../database/db");

//create controller for create New comment

const createNewComment = (req, res) => {
  const productId = req.params.id
  const {comment,user_id} =req.body
  // const commenter_id = req.token.userId
  const query = `insert into comments (comment,user_id,product_id) values (?,?,?) `
  const data = [ comment, user_id,productId ]
  connection.query(query, data,(err, result)=>{
    if(err){
     return res.status(404).json({success: false, message:`something went wrong while creating a new comment`,err: err})
    }
    res.status(200).json({success: true, message:`The comment has been created success`,results: result})
  })

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
