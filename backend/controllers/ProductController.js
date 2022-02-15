//import connenction from database
const { connection } = require("../database/db.js");

//create controller for create New product

const createNewProduct = (req, res) => {
  const { title, description, price, image, category, latitude1, longitude1 } =
    req.body;
  console.log(req.token);
  console.log(typeof req.body.longitude1);
  const user_id = req.token.userId;
  const query = `insert into products (title, description, price, image,user_id,category,latitude1,longitude1) values (?,?,?,?,?,?,?,?)`;

  const data = [
    title,
    description,
    price,
    image,
    user_id,
    category,
    latitude1,
    longitude1,
  ];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Something went wrong While creating product`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      message: `product created`,
      results: result,
    });
  });
};

//Select * from <table_name> LIMIT value_1, OFFSET value_2
// value_2=(page-1)*value_1

//create controller for getAllProducts
const getAllProducts = (req, res) => {
  const { page, limit } = req.query;

  const query = `select * from products  where is_deleted = 0 LIMIT ? OFFSET ? `;
  const data = [limit - 0, (page - 1) * limit];
  connection.query(query, data, (err, result) => {
    if (err) {
      console.log(err);
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

const getAnProductById = (req, res) => {
  const productId = req.query.id;
  const query = `SELECT title,rating,counter,products.id,description,phone_Number,firstName,user_id, users.users_image,products.image,price,category FROM users INNER JOIN products ON users.id=products.user_id where products.id = ? and products.is_deleted =0 and products.is_deleted =0 and users.is_deleted = 0`;
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
const getAnProductByCategory = (req, res) => {
  const category = req.query.category;

  const query = `SELECT  title,description,firstName,user_id, users.users_image,products.image,category FROM users INNER JOIN products ON users.id=products.user_id where products.category = ? and products.is_deleted = 0`;

  const data = [category];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    } else {
      if (!result.length) {
        return res.status(200).json({
          success: false,
          message: "No products found with the indicated category",
          results: result,
        });
      }
      res.status(200).json({
        success: true,
        message: `All products with Category=> ${category}`,
        results: result,
      });
    }
  });
};

//create controller for deleteAnProductById

const deleteAnProductById = (req, res) => {
  const productId = req.params.id;
  const query = `UPDATE products SET is_deleted =1 where id=?`;
  const data = [productId];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server error",
        err: err,
      });
    } else {
      if (!result.affectedRows) {
        return res.status(404).json({
          success: false,
          message: `The product: ${productId} is not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Succeeded to delete product with id: ${productId}`,
      });
    }
  });
};

//create controller for deleteAnProductByUserId
const deleteAnProductByUserId = (req, res) => {
  const userId = req.params.user_id;
  const query = `UPDATE products SET is_deleted =1 where user_id=? and is_deleted =0`;
  const data = [userId];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    } else {
      if (!result.affectedRows) {
        return res.status(404).json({
          success: false,
          message: `No products found with the indicated  user_id => ${userId}`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The products with user_id was deleted=> ${userId} `,
      });
    }
  });
};

//create controller for updateAnProductById
const updateAnProductById = (req, res) => {
  const productId = req.params.id;
  const { title, description, price, image, category } = req.body;

  const query = `UPDATE products SET title=?,description=?,price=?,image=? ,category=? where id=?`;
  const data = [title, description, price, image, category, productId];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "The product with id: ${id} is not found",
        err: err,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Product with id :${productId} is updated`,
        results: result,
      });
    }
  });
};

module.exports = {
  createNewProduct,
  getAllProducts,
  getAnProductById,
  getAnProductByCategory,
  deleteAnProductById,
  deleteAnProductByUserId,
  updateAnProductById,
};
