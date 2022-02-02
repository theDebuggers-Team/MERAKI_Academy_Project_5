//import connenction from database
const { connection } = require("../database/db.js");

//create controller for create New product

const createNewProduct = (req, res) => {};

//create controller for getAllProducts

const getAllProducts = (req, res) => {
  const query = `select * from products where is_deleted = 0`;

  connection.query(query, (err, result) => {
    if (err) {
      res
        .status(404)
        .json({ success: false, message: "server error", err: err });
    } else {
      res
        .status(200)
        .json({ success: true, message: `All the products`, results: result });
    }
  });
};

//create controller for getAnProductById

const getAnProductById = (req, res) => {};

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
