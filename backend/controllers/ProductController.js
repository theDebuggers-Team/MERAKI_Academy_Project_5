//import connenction from database
const { connection } = require("../database/db.js");

//create controller for create New product

const createNewProduct = (req, res) => {};

//create controller for getAllProducts

const getAllProducts = (req, res) => {};

//create controller for getAnProductById

const getAnProductById = (req, res) => {
  const productId = req.query.id;
  const query = `SELECT title,description,firstName,user_id ,image FROM users INNER JOIN products ON users.id=products.user_id where products.id = ? and products.is_deleted =0 and products.is_deleted =0 and users.is_deleted = 0`;
  const data = [productId];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    } else {
      if (!result.length) {
        return res.status(404).json({
          success: false,
          message: `No products found with the indicated  id => ${productId}`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The products id=> ${productId} `,
        results: result,
      });
    }
  });
};
// No products found with the indicated category

//create controller for getAnProductByCategory

const getAnProductByCategory = (req, res) => {};

//create controller for deleteAnProductById

const deleteAnProductById = (req, res) => {};

//create controller for deleteAnProductByUserId

const deleteAnProductByUserId = (req, res) => {};

//create controller for updateAnProductById

const updateAnProductById = (req, res) => {};

module.exports = {
  createNewProduct,
  getAllProducts,
  getAnProductById,
  getAnProductByCategory,
  deleteAnProductById,
  deleteAnProductByUserId,
  updateAnProductById,
};
