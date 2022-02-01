//import connenction from database
const { connection } = require("../database/db.js");

//create controller for create New product

const createNewProduct = (req, res) => {
  
};

//create controller for getAllProducts

const getAllProducts = (req, res) => {};

//create controller for getAnProductById

const getAnProductById = (req, res) => {};

//create controller for getAnProductByCategory

const getAnProductByCategory = (req, res) => {
  const category = req.query.category
  const query = `SELECT title,description,firstName,user_id FROM users INNER JOIN products ON users.id=products.user_id where products.category = ?`;
};

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
