const express = require("express");

//create product router
const productRouter = express.Router();
// import products comtrollers from "ProductControllers"

const {
  createNewProduct,
  getAllProducts,
  getAnProductById,
  getAnProductByCategory,
  deleteAnProductById,
  deleteAnProductByUserId,
  updateAnProductById,
} = require("../controllers/ProductController");

//create end points

//1- create  new product

productRouter.post("/", createNewProduct);

//2-  get all products

productRouter.get("/", getAllProducts);

//3- for get product by id

productRouter.get("/search_1/id", getAnProductById);

//4- get product by category

productRouter.get("/search_2/category", getAnProductByCategory);

//5- delete product by id

productRouter.delete("/delete_1/:id", deleteAnProductById);

//6- delete product by user_id

productRouter.delete("/delete_2/:user_id", deleteAnProductByUserId);

//7- update product

productRouter.put("/update/:id", updateAnProductById);

module.exports ={productRouter}