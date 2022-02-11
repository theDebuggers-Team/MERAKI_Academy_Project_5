//import connenction from database
const { connection } = require("../database/db");
`UPDATE products SET title=?,description=?,price=?,image=? ,category=? where id=?`
//create controller for create add like
const addLike = (req, res) => {
    const productId = req.params.id;
    const { value } = req.body;
    // const user_id = req.token.userId;
    const query = `UPDATE products SET rating=rating+? ,counter=counter+1  where id=? `;
    const data = [value,productId];
    connection.query(query, data, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: `Something went wrong while creating a new rating`,
          err: err,
        });
      }
      res.status(200).json({
        success: true,
        message: `The rating has been created successfully`,
        results: result,
      });
    });   
};
const deletelike = (req, res) => {};

module.exports = { addLike, deletelike };
/*
 UPDATE member_profile 
    SET points = points + 1
    WHERE user_id = '".$userid."'

 */