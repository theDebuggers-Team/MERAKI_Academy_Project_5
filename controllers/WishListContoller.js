const { connection } = require("../database/db");

//create controller for add new product to wishlist

const getWishListByUserId = (req, res) => {
  const userId = req.token.userId;
  const query = `SELECT
  products.id,title,description,price,rating,counter,firstName,products.user_id, users.users_image,products.image,category
  FROM
    wishlist
  INNER JOIN
    products
  ON
    products.id = wishlist.product_id
  INNER JOIN
    users
  ON
    users.id=wishlist.user_id where users.id = ? and users.is_deleted =0 and wishlist.is_deleted=0`;
  const data = [userId];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server error`,
        err: err,
      });
    } else {
      if (!result.length) {
        return res.status(200).json({
          success: false,
          message: "wishlist empty",
        });
      }
      res.status(200).json({
        success: true,
        message: `wishlist for the user with id => ${userId}`,
        results: result,
      });
    }
  });
};

//create controller for add new product to wishlist

const addProductToWishList = (req, res) => {
  const productId = req.params.id;
  const userId = req.token.userId;
  const query = `INSERT INTO wishlist (user_id , product_id) VALUES (?,?)`;
  const data = [userId, productId];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Something went wrong while adding to wishlist`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      message: `The product has been added to wishlist successfully`,
      results: result,
    });
  });
};

//create controller for delete  product to wishlist

const deleteProductFromWishList = (req, res) => {
  const productId = req.params.id;
  const query = `UPDATE wishlist SET is_deleted=1 WHERE is_deleted=0 AND product_id = ?`;
  const data = [productId];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Something went wrong while adding to wishlist`,
        err: err,
      });
    } else {
      if (!result.affectedRows) {
        return res.status(404).json({
          success: false,
          message: "product with id is not found",
        });
      }
      res.status(200).json({
        success: true,
        message: `product with with id deleted => ${productId}`,
        results: result,
      });
    }
  });
};

module.exports = {
  getWishListByUserId,
  addProductToWishList,
  deleteProductFromWishList,
};
