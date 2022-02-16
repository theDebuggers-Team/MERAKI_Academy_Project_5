const express = require("express");
const authentication = require("../middleware/authentication");
//create wish_list_contoller router

const wishlistRouter = express.Router();

// import wish_list controllers from "WishListContoller"

const {
  getWishListByUserId,
  addProductToWishList,
  deleteProductFromWishList,
} = require("../controllers/WishListContoller");

//cerate end point to get wishlist

wishlistRouter.get("/", authentication, getWishListByUserId);

//create end point to add product to wishlist

wishlistRouter.post("/add/:id", authentication, addProductToWishList);

//create end point to delete product from wishlist

wishlistRouter.delete("/delete/:id", authentication, deleteProductFromWishList);
module.exports = { wishlistRouter };
